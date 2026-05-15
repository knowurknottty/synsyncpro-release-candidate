/**
 * SynSync Pro — Encrypted Profile Manager
 *
 * Full pipeline: file generation → distribution → user load → decrypt → validate →
 * mutate → re-encrypt → persist → archive → anonymous export.
 *
 * All cryptographic operations are in-memory only. No plaintext ever touches
 * IndexedDB, localStorage, or disk. The file IS the credential.
 *
 * @module profileManager
 */

import type {
  TierType,
  ProfilePayload,
  ProfileFileHeader,
  ProfileError,
  ArchiveOptions,
  SessionData,
  PrescriptionEntry,
  UserPreferences,
} from '../types/profile';
import { TIER_INDICES, TIER_INDEX_MAP } from '../types/profile';
import { getTierPhrase, getTierExpiry } from './tierSecrets';

// ─── Binary Layout Constants ──────────────────────────────────────────────────

/** File magic bytes: ASCII "SYPS" */
const MAGIC = new Uint8Array([0x53, 0x59, 0x50, 0x53]);

/** Current format version. Increment if binary layout changes. */
const FORMAT_VERSION = 0x01;

/**
 * Fixed header size in bytes:
 *   4  magic
 *   1  format version
 *   1  tier hint (unverified)
 *   3  instance ID (24-bit LE, max 16,777,215)
 *  16  PBKDF2 salt
 *  12  AES-GCM IV
 *   4  payload length (32-bit LE)
 * ─────
 *  41 bytes total
 */
const HEADER_SIZE = 41;
const SALT_SIZE = 16;
const IV_SIZE = 12;
const PBKDF2_ITERATIONS = 100_000;

/** Minimum valid file size: header + 1 byte ciphertext + 16 byte GCM tag */
const MIN_FILE_SIZE = HEADER_SIZE + 1 + 16;

// ─── IndexedDB Constants ──────────────────────────────────────────────────────

const IDB_DB_NAME    = 'SynSyncPro';
const IDB_DB_VERSION = 1;
const IDB_STORE      = 'profile';
const IDB_KEY        = 'active';

// ─── Guard ────────────────────────────────────────────────────────────────────

function assertSecureContext(): void {
  if (!globalThis.crypto?.subtle) {
    throw {
      code: 'CRYPTO_UNAVAILABLE',
      message:
        'Web Crypto API is unavailable. SynSync Pro requires a secure context ' +
        '(HTTPS or localhost). Ensure you are not in an insecure iframe.',
    } satisfies ProfileError;
  }
}

// ─── Low-Level Crypto ─────────────────────────────────────────────────────────

function randomBytes(n: number): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(n));
}

/** Constant-time hex string comparison — prevents timing side-channels on HMAC verify. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

function bufToHex(buf: Uint8Array): string {
  return Array.from(buf, b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * HMAC-SHA256(keyMaterial, data) → hex string.
 * Used for:
 *   1. masterSecret derivation: HMAC(tierPhrase, instanceId.toString())
 *   2. tierHmac commitment:     HMAC(tierPhrase, tier|expiry|instanceId)
 */
async function hmacSha256(keyMaterial: string, data: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(keyMaterial),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return bufToHex(new Uint8Array(sig));
}

/**
 * Derives an AES-GCM-256 CryptoKey from a master secret hex string and a random salt.
 *
 * masterSecret → PBKDF2(SHA-256, salt, 100k) → AES-GCM-256
 *
 * The master secret is itself an HMAC output (256 bits of entropy), so PBKDF2 here
 * primarily adds key stretching and domain separation via the salt, not password
 * strengthening (there's no low-entropy password in this flow).
 */
async function deriveAesKey(masterSecret: string, salt: Uint8Array): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey(
    'raw',
    enc.encode(masterSecret),
    'PBKDF2',
    false,
    ['deriveKey'],
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

// ─── Tier Key Derivation ──────────────────────────────────────────────────────

/**
 * Derives the master secret for a (tier, instanceId) pair.
 *
 * masterSecret = HMAC-SHA256(TIER_PHRASE[tier], instanceId.toString())
 *
 * This is the value you LOG on your server alongside distributionTag.
 * Given masterSecret you can prove a file belongs to a distribution event.
 * Given only instanceId you cannot recover masterSecret without the tier phrase.
 */
export async function deriveMasterSecret(tier: TierType, instanceId: number): Promise<string> {
  return hmacSha256(getTierPhrase(tier), instanceId.toString());
}

/**
 * Computes the tierHmac commitment string.
 *
 * tierHmac = HMAC-SHA256(TIER_PHRASE[tier], `${tier}|${expiry ?? 'lifetime'}|${instanceId}`)
 *
 * Binds tier, expiry, and instanceId together cryptographically.
 * Modifying any of these three values in decrypted payload invalidates this HMAC.
 */
async function computeTierHmac(
  tier: TierType,
  expiry: string | null,
  instanceId: number,
): Promise<string> {
  const commitment = `${tier}|${expiry ?? 'lifetime'}|${instanceId}`;
  return hmacSha256(getTierPhrase(tier), commitment);
}

// ─── Binary File Assembly / Parsing ──────────────────────────────────────────

/**
 * Assembles the final binary file from its components.
 *
 * Layout:
 *   [SYPS(4)][version(1)][tierHint(1)][instanceId 24-bit LE(3)]
 *   [salt(16)][iv(12)][payloadLen 32-bit LE(4)][ciphertext+GCM tag(var)]
 */
function assembleFileBytes(
  tierIndex: number,
  instanceId: number,
  salt: Uint8Array,
  iv: Uint8Array,
  ciphertext: ArrayBuffer,
): Uint8Array {
  const ct = new Uint8Array(ciphertext);
  const buf = new Uint8Array(HEADER_SIZE + ct.byteLength);
  const view = new DataView(buf.buffer);
  let offset = 0;

  // Magic
  buf.set(MAGIC, offset); offset += 4;
  // Version
  buf[offset++] = FORMAT_VERSION;
  // Tier hint (unverified — fast path hint only)
  buf[offset++] = tierIndex & 0xff;
  // Instance ID — 24-bit little-endian
  buf[offset++] = (instanceId)       & 0xff;
  buf[offset++] = (instanceId >> 8)  & 0xff;
  buf[offset++] = (instanceId >> 16) & 0xff;
  // Salt
  buf.set(salt, offset); offset += SALT_SIZE;
  // IV
  buf.set(iv, offset);   offset += IV_SIZE;
  // Payload length
  view.setUint32(offset, ct.byteLength, /*littleEndian=*/true); offset += 4;
  // Ciphertext (includes GCM auth tag — appended automatically by SubtleCrypto)
  buf.set(ct, offset);

  return buf;
}

interface ParsedFile {
  header: ProfileFileHeader;
  salt: Uint8Array;
  iv: Uint8Array;
  ciphertext: Uint8Array;
}

/**
 * Parses the binary file header and extracts components.
 * Does NOT decrypt — caller is responsible for decryption.
 *
 * Failure modes:
 *   - File too small → INVALID_FORMAT
 *   - Bad magic bytes → INVALID_FORMAT (not a SynSync file at all)
 *   - Unsupported version → INVALID_FORMAT (old file, or different app)
 *   - Truncated payload → INVALID_FORMAT (partial download or fs corruption)
 */
function parseFileBytes(bytes: Uint8Array): ParsedFile {
  if (bytes.byteLength < MIN_FILE_SIZE) {
    throw {
      code: 'INVALID_FORMAT',
      message: `File too small: ${bytes.byteLength} bytes (minimum ${MIN_FILE_SIZE}). ` +
               `File may be truncated or is not a SynSync profile.`,
    } satisfies ProfileError;
  }

  // Magic check
  for (let i = 0; i < 4; i++) {
    if (bytes[i] !== MAGIC[i]) {
      throw {
        code: 'INVALID_FORMAT',
        message: `Invalid file magic at byte ${i}. Expected 'SYPS', got '${String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3])}'. ` +
                 `This is not a SynSync profile file.`,
      } satisfies ProfileError;
    }
  }

  let offset = 4;
  const formatVersion = bytes[offset++];

  if (formatVersion !== FORMAT_VERSION) {
    throw {
      code: 'INVALID_FORMAT',
      message: `Unsupported format version: 0x${formatVersion.toString(16).padStart(2, '0')}. ` +
               `This app supports version 0x${FORMAT_VERSION.toString(16).padStart(2, '0')}. ` +
               `You may need to update SynSync Pro.`,
    } satisfies ProfileError;
  }

  const tierIndex  = bytes[offset++];
  const instanceId = bytes[offset] | (bytes[offset + 1] << 8) | (bytes[offset + 2] << 16);
  offset += 3;

  const salt = bytes.slice(offset, offset + SALT_SIZE); offset += SALT_SIZE;
  const iv   = bytes.slice(offset, offset + IV_SIZE);   offset += IV_SIZE;

  const view = new DataView(bytes.buffer, bytes.byteOffset);
  const payloadLen = view.getUint32(offset, /*littleEndian=*/true); offset += 4;

  if (bytes.byteLength < offset + payloadLen) {
    throw {
      code: 'INVALID_FORMAT',
      message: `File truncated. Header declares ${payloadLen} bytes of payload, ` +
               `but only ${bytes.byteLength - offset} bytes remain. ` +
               `File may have been corrupted or incompletely downloaded.`,
    } satisfies ProfileError;
  }

  const ciphertext = bytes.slice(offset, offset + payloadLen);

  return {
    header: { magic: 'SYPS', formatVersion, tierIndex, instanceId },
    salt,
    iv,
    ciphertext,
  };
}

// ─── Encrypt / Decrypt ────────────────────────────────────────────────────────

async function encryptPayload(
  payload: ProfilePayload,
  tier: TierType,
  instanceId: number,
  salt: Uint8Array,
  iv: Uint8Array,
): Promise<ArrayBuffer> {
  const master = await deriveMasterSecret(tier, instanceId);
  const key = await deriveAesKey(master, salt);
  const plaintext = new TextEncoder().encode(JSON.stringify(payload));
  return crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext);
}

/**
 * Attempts decryption for a specific (tier, instanceId) combination.
 * Throws ProfileError with code DECRYPTION_FAILED on wrong key or tampered ciphertext.
 * AES-GCM authentication tag rejection is indistinguishable from wrong key — both
 * surface as DECRYPTION_FAILED. This is intentional (no oracle for key validity).
 */
async function decryptPayload(
  ciphertext: Uint8Array,
  tier: TierType,
  instanceId: number,
  salt: Uint8Array,
  iv: Uint8Array,
): Promise<ProfilePayload> {
  const master = await deriveMasterSecret(tier, instanceId);
  const key = await deriveAesKey(master, salt);

  let plaintext: ArrayBuffer;
  try {
    plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);
  } catch {
    throw {
      code: 'DECRYPTION_FAILED',
      message: `Decryption failed for tier '${tier}'. Wrong key, tampered ciphertext, or corrupted file.`,
    } satisfies ProfileError;
  }

  let payload: ProfilePayload;
  try {
    payload = JSON.parse(new TextDecoder().decode(plaintext)) as ProfilePayload;
  } catch {
    throw {
      code: 'PAYLOAD_CORRUPT',
      message: 'Decryption succeeded but payload JSON is malformed. File may be corrupted.',
    } satisfies ProfileError;
  }

  return payload;
}

// ─── Core Validation ──────────────────────────────────────────────────────────

/**
 * Validates decrypted payload:
 *   1. tierHmac matches expected (tamper detection on subscription fields)
 *   2. Subscription not expired
 *
 * Called after successful decryption. Never called with ciphertext directly.
 */
async function validatePayload(payload: ProfilePayload): Promise<void> {
  // Tier HMAC verification — constant-time comparison
  const expectedHmac = await computeTierHmac(payload.tier, payload.expiry, payload.instanceId);
  if (!timingSafeEqual(payload.tierHmac, expectedHmac)) {
    throw {
      code: 'TIER_TAMPERED',
      message:
        'Subscription data integrity check failed. The tier, expiry, or instance ID ' +
        'in this file has been modified. This file is invalid and cannot be used.',
    } satisfies ProfileError;
  }

  // Expiry
  if (payload.expiry !== null) {
    const expiry = new Date(payload.expiry);
    if (isNaN(expiry.getTime())) {
      throw {
        code: 'PAYLOAD_CORRUPT',
        message: `Invalid expiry date format: '${payload.expiry}'`,
      } satisfies ProfileError;
    }
    if (expiry < new Date()) {
      throw {
        code: 'SUBSCRIPTION_EXPIRED',
        message: `Subscription expired on ${new Date(payload.expiry).toLocaleDateString()}. ` +
                 `Please obtain a new access file to continue.`,
        expiry: payload.expiry,
      } satisfies ProfileError;
    }
  }
}

// ─── Internal Load Pipeline ───────────────────────────────────────────────────

/**
 * Full load pipeline: parse → try-decrypt → validate.
 *
 * Tries the tier hinted in the header first (fast path).
 * Falls back to all tiers sequentially if header tier hint fails
 * (handles bit-flipped headers, manually edited bytes, cross-tier confusion).
 *
 * Failure modes surfaced to caller:
 *   - INVALID_FORMAT: not a SynSync file, truncated
 *   - DECRYPTION_FAILED: all tiers exhausted, nothing worked
 *   - TIER_TAMPERED: decrypted fine but HMAC mismatch
 *   - SUBSCRIPTION_EXPIRED: decrypted and valid but past expiry
 *   - PAYLOAD_CORRUPT: decrypted but JSON malformed
 */
async function loadFromBytes(bytes: Uint8Array): Promise<ProfilePayload> {
  const { header, salt, iv, ciphertext } = parseFileBytes(bytes);
  const { tierIndex, instanceId } = header;

  // Try hinted tier first, then all others as fallback
  const hintedTier = TIER_INDEX_MAP[tierIndex];
  const fallbackTiers = TIER_INDEX_MAP.filter((_, i) => i !== tierIndex);
  const tierOrder: TierType[] = [
    ...(hintedTier ? [hintedTier] : []),
    ...fallbackTiers,
  ];

  let lastDecryptError: ProfileError | null = null;

  for (const tier of tierOrder) {
    try {
      const payload = await decryptPayload(ciphertext, tier, instanceId, salt, iv);
      // Decryption succeeded — now validate (may throw TIER_TAMPERED or SUBSCRIPTION_EXPIRED)
      await validatePayload(payload);
      return payload;
    } catch (err) {
      const e = err as ProfileError;
      if (e.code === 'DECRYPTION_FAILED') {
        lastDecryptError = e;
        continue; // try next tier
      }
      // TIER_TAMPERED, SUBSCRIPTION_EXPIRED, PAYLOAD_CORRUPT — don't retry, propagate
      throw err;
    }
  }

  throw lastDecryptError ?? {
    code: 'DECRYPTION_FAILED',
    message: 'Could not decrypt profile with any known tier key. ' +
             'This file may be from a different installation, a future version, or is corrupted.',
  } satisfies ProfileError;
}

// ─── Public: Load ─────────────────────────────────────────────────────────────

/**
 * Loads and validates a profile from a browser File object (drag-drop or <input type="file">).
 */
export async function loadProfileFromFile(file: File): Promise<ProfilePayload> {
  assertSecureContext();
  const bytes = new Uint8Array(await file.arrayBuffer());
  return loadFromBytes(bytes);
}

/**
 * Loads and validates a profile from raw bytes (IndexedDB retrieval, etc.).
 */
export async function loadProfileFromBytes(bytes: Uint8Array): Promise<ProfilePayload> {
  assertSecureContext();
  return loadFromBytes(bytes);
}

// ─── Public: Save ─────────────────────────────────────────────────────────────

/**
 * Re-encrypts an updated profile payload into raw file bytes.
 *
 * Always generates a fresh salt + IV — every save produces a new ciphertext
 * even if the payload hasn't changed. This provides forward secrecy at rest:
 * an attacker who captures the file at time T cannot confirm whether the
 * content at time T+1 is identical.
 *
 * The tierHmac is recomputed defensively on every save.
 */
export async function saveProfileToBytes(payload: ProfilePayload): Promise<Uint8Array> {
  assertSecureContext();

  const updatedPayload: ProfilePayload = {
    ...payload,
    tierHmac: await computeTierHmac(payload.tier, payload.expiry, payload.instanceId),
    lastModified: new Date().toISOString(),
  };

  const salt = randomBytes(SALT_SIZE);
  const iv   = randomBytes(IV_SIZE);
  const ciphertext = await encryptPayload(
    updatedPayload,
    payload.tier,
    payload.instanceId,
    salt,
    iv,
  );

  return assembleFileBytes(TIER_INDICES[payload.tier], payload.instanceId, salt, iv, ciphertext);
}

// ─── Public: Generate (admin/server/CLI use) ──────────────────────────────────

export interface GenerateProfileOptions {
  tier: TierType;
  /** 1–16,777,215. You maintain the mapping of instanceId → distributionEvent. */
  instanceId: number;
  /**
   * Opaque tag embedded in the file for analytics correlation.
   * Examples: 'austin_conf_2025', 'homepage_hero_cta', 'reddit_ad_may'
   * Must not contain PII. User sees this in their profile if they inspect it.
   */
  distributionTag?: string;
  /** Defaults to now. Override for backdating test files. */
  fromDate?: Date;
}

export interface GenerateProfileResult {
  fileBytes: Uint8Array;
  /**
   * STORE THIS. Maps to (tier, instanceId, distributionTag) for your analytics.
   * It's the HMAC(tierPhrase, instanceId) — uniquely identifies this file
   * without revealing the tier phrase to anyone who sees your logs.
   */
  masterSecret: string;
  instanceId: number;
  tier: TierType;
  expiry: string | null;
  distributionTag?: string;
  generatedAt: string;
}

/**
 * Generates a fresh, blank encrypted profile file for distribution.
 *
 * Intended for:
 *   - Server-side generation at purchase time (paid tiers)
 *   - Batch generation for QR code campaigns (free tiers)
 *   - CLI tooling (scripts/generate-profiles.ts)
 *
 * The masterSecret in the result MUST be logged to your analytics DB/spreadsheet
 * alongside instanceId + distributionTag. This is your only analytics artifact.
 *
 * @example
 * // Batch generate 50 1-month passes for a conference
 * for (let i = 1; i <= 50; i++) {
 *   const result = await generateProfileFile({
 *     tier: '1month',
 *     instanceId: i,
 *     distributionTag: 'austin_conf_2025',
 *   });
 *   await fs.writeFile(`dist/austin-conf-${i}.enc`, result.fileBytes);
 *   await logToDb({ masterSecret: result.masterSecret, ...result });
 * }
 */
export async function generateProfileFile(
  opts: GenerateProfileOptions,
): Promise<GenerateProfileResult> {
  assertSecureContext();

  const { tier, instanceId, distributionTag, fromDate = new Date() } = opts;

  if (!Number.isInteger(instanceId) || instanceId < 1 || instanceId > 16_777_215) {
    throw new RangeError(
      `instanceId must be an integer 1–16,777,215. Got: ${instanceId}`,
    );
  }

  const expiryDate = getTierExpiry(tier, fromDate);
  const expiry = expiryDate?.toISOString() ?? null;

  const tierHmac = await computeTierHmac(tier, expiry, instanceId);
  const masterSecret = await deriveMasterSecret(tier, instanceId);

  const payload: ProfilePayload = {
    version:      '1.1',
    tier,
    expiry,
    instanceId,
    tierHmac,
    distributionTag,
    userData: {
      preferences: defaultPreferences(),
      prescriptions: [],
    },
    sessions:     [],
    createdAt:    fromDate.toISOString(),
    lastModified: fromDate.toISOString(),
  };

  const salt = randomBytes(SALT_SIZE);
  const iv   = randomBytes(IV_SIZE);
  const ciphertext = await encryptPayload(payload, tier, instanceId, salt, iv);
  const fileBytes = assembleFileBytes(TIER_INDICES[tier], instanceId, salt, iv, ciphertext);

  return {
    fileBytes,
    masterSecret,
    instanceId,
    tier,
    expiry,
    distributionTag,
    generatedAt: fromDate.toISOString(),
  };
}

// ─── Public: Anonymous Export ─────────────────────────────────────────────────

/**
 * Produces a re-encrypted file with PII stripped for voluntary research data sharing.
 *
 * What is stripped:
 *   - userData.displayName
 *   - session.notes (unless opts.includeSessionNotes)
 *
 * What is preserved:
 *   - distributionTag (already non-identifying — opaque event code)
 *   - prescriptions (protocol efficacy research requires this)
 *   - sessions (completion rate, satisfaction, efficacy metrics)
 *   - tier / expiry (necessary for cohort analysis)
 *
 * The returned bytes are re-encrypted — this is not a plaintext export.
 * Intended to be uploaded to your research endpoint or emailed voluntarily.
 */
export async function exportAnonymized(
  payload: ProfilePayload,
  opts: { includeSessionNotes?: boolean } = {},
): Promise<Uint8Array> {
  assertSecureContext();

  const stripped: ProfilePayload = {
    ...payload,
    userData: {
      ...payload.userData,
      displayName: undefined,
    },
    sessions: payload.sessions.map(s => ({
      ...s,
      notes: opts.includeSessionNotes ? s.notes : undefined,
    })),
  };

  return saveProfileToBytes(stripped);
}

// ─── Public: Archive ──────────────────────────────────────────────────────────

/**
 * Produces an archived (trimmed) payload + re-encrypted bytes.
 *
 * Returns both the preview payload (for user confirmation UI) and an async commit()
 * that the caller invokes after the user confirms. Nothing is written to storage
 * until commit() is called.
 *
 * Typical UX flow:
 *   1. User opens "Archive Profile" dialog
 *   2. Call archiveProfile() → show preview (session count, size estimate)
 *   3. User confirms → call commit() → new bytes saved to IndexedDB + optional FSA
 *   4. Offer download of archived file before overwriting
 *
 * @example
 * const { preview, archivedBytes } = await archiveProfile(profile, {
 *   keepPrescriptions: true,
 *   keepPreferences: true,
 *   keepSessionCount: 10,
 *   keepDistributionTag: true,
 * });
 * // show preview stats to user
 * console.log(`Will retain ${preview.sessions.length} sessions`);
 */
export async function archiveProfile(
  payload: ProfilePayload,
  opts: ArchiveOptions,
): Promise<{ archivedBytes: Uint8Array; archivedPayload: ProfilePayload }> {
  assertSecureContext();

  let sessions = [...payload.sessions];

  if (opts.keepSessionCount === 0) {
    sessions = [];
  } else if (opts.keepSessionCount > 0) {
    sessions = sessions
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, opts.keepSessionCount);
  }
  // keepSessionCount === -1: keep all

  const archivedPayload: ProfilePayload = {
    ...payload,
    userData: {
      preferences: opts.keepPreferences
        ? payload.userData.preferences
        : defaultPreferences(),
      prescriptions: opts.keepPrescriptions
        ? payload.userData.prescriptions
        : [],
      displayName: payload.userData.displayName,
    },
    sessions,
    distributionTag: opts.keepDistributionTag ? payload.distributionTag : undefined,
    lastModified: new Date().toISOString(),
  };

  const archivedBytes = await saveProfileToBytes(archivedPayload);
  return { archivedBytes, archivedPayload };
}

// ─── Persistence: File System Access API ─────────────────────────────────────

/**
 * Saves file bytes via the File System Access API (modern browsers, user chooses location).
 * If existingHandle is provided and still has write permission, saves silently without
 * re-prompting the user. Otherwise opens a save-as dialog.
 *
 * Failure modes:
 *   - 'showSaveFilePicker' not available → STORAGE_UNAVAILABLE
 *   - User cancels dialog → AbortError (not a ProfileError — let caller handle)
 *   - Permission revoked on existingHandle → falls through to new dialog
 */
export async function saveToFileSystem(
  fileBytes: Uint8Array,
  existingHandle?: FileSystemFileHandle,
): Promise<FileSystemFileHandle> {
  if (!('showSaveFilePicker' in window)) {
    throw {
      code: 'STORAGE_UNAVAILABLE',
      message: 'File System Access API is not available in this browser. Use download instead.',
    } satisfies ProfileError;
  }

  let handle = existingHandle;

  if (handle) {
    // Verify we still have write permission
    const perm = await handle.queryPermission({ mode: 'readwrite' });
    if (perm !== 'granted') {
      handle = undefined; // Fall through to save-as dialog
    }
  }

  if (!handle) {
    handle = await (window as Window & typeof globalThis).showSaveFilePicker({
      suggestedName: `synsync-profile-${new Date().toISOString().slice(0, 10)}.enc`,
      types: [{
        description: 'SynSync Pro Profile',
        accept: { 'application/octet-stream': ['.enc'] },
      }],
    });
  }

  const writable = await handle.createWritable();
  await writable.write(fileBytes);
  await writable.close();
  return handle;
}

/**
 * Opens a file picker and loads the selected profile file.
 * Returns both the raw bytes and the file handle for future saves.
 */
export async function loadFromFileSystemPicker(): Promise<{
  bytes: Uint8Array;
  handle: FileSystemFileHandle;
}> {
  if (!('showOpenFilePicker' in window)) {
    throw {
      code: 'STORAGE_UNAVAILABLE',
      message: 'File System Access API is not available. Use <input type="file"> instead.',
    } satisfies ProfileError;
  }

  const [handle] = await (window as Window & typeof globalThis).showOpenFilePicker({
    types: [{
      description: 'SynSync Pro Profile',
      accept: { 'application/octet-stream': ['.enc'] },
    }],
    multiple: false,
  });

  const file = await handle.getFile();
  const bytes = new Uint8Array(await file.arrayBuffer());
  return { bytes, handle };
}

// ─── Persistence: IndexedDB ───────────────────────────────────────────────────

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_DB_NAME, IDB_DB_VERSION);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(IDB_STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror   = () => reject(req.error ?? new Error('IDBDatabase open failed'));
  });
}

/**
 * Persists encrypted profile bytes to IndexedDB.
 * NOTE: What's stored is still ciphertext — IndexedDB stores the encrypted blob.
 * Plaintext never touches storage.
 */
export async function saveToIndexedDB(fileBytes: Uint8Array): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, 'readwrite');
    tx.objectStore(IDB_STORE).put(fileBytes, IDB_KEY);
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror    = () => { db.close(); reject(tx.error); };
  });
}

/**
 * Retrieves encrypted profile bytes from IndexedDB.
 * Returns null if no profile is stored.
 */
export async function loadFromIndexedDB(): Promise<Uint8Array | null> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(IDB_STORE, 'readonly');
    const req = tx.objectStore(IDB_STORE).get(IDB_KEY);
    req.onsuccess = () => { db.close(); resolve((req.result as Uint8Array) ?? null); };
    req.onerror   = () => { db.close(); reject(req.error); };
  });
}

/** Wipes the stored profile from IndexedDB. Called on error recovery or explicit logout. */
export async function clearIndexedDB(): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, 'readwrite');
    tx.objectStore(IDB_STORE).clear();
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror    = () => { db.close(); reject(tx.error); };
  });
}

// ─── Trigger In-Browser Download ──────────────────────────────────────────────

/**
 * Triggers a browser download of the profile file.
 * Uses the standard anchor click trick — works everywhere, no API restrictions.
 */
export function downloadProfileFile(fileBytes: Uint8Array, filename?: string): void {
  const name = filename ?? `synsync-profile-${new Date().toISOString().slice(0, 10)}.enc`;
  const blob  = new Blob([fileBytes], { type: 'application/octet-stream' });
  const url   = URL.createObjectURL(blob);
  const a     = Object.assign(document.createElement('a'), { href: url, download: name });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Revoke after a tick to ensure the download starts
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function defaultPreferences(): UserPreferences {
  return {
    audioOutputGain:          0.7,
    spatialAudioEnabled:      true,
    visualEntrainmentEnabled: false,
    hapticEnabled:            false,
    onboardingComplete:       false,
    researchDataOptIn:        false,
  };
}

/** Rough estimate of encrypted file size in bytes given payload shape. */
export function estimateFileSize(payload: ProfilePayload): number {
  const jsonLen = JSON.stringify(payload).length;
  // JSON bytes + ~20% overhead for Unicode + GCM tag (16B) + header (41B) + ~10% PBKDF2 expansion
  return Math.ceil(jsonLen * 1.2) + 41 + 16;
}
