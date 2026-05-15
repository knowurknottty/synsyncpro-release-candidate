/**
 * @fileoverview React hook for SynSync profile management.
 *
 * Wraps ProfileManager in React state machine using useReducer.
 * All ProfileManager operations are async; state updates are dispatched
 * after each operation completes.
 *
 * State machine:
 *   idle ──→ loading ──→ loaded
 *             │        ↗
 *             └─→ error
 *             └─→ no_profile
 *   loaded ──→ activating ──→ loaded
 *   any ──→ cleared (→ no_profile)
 *
 * @example
 * ```tsx
 * import { useProfile } from './hooks/useProfile';
 * import { SERVER_EC_PUBLIC_KEY } from './constants';
 *
 * function App() {
 *   const {
 *     status,
 *     profile,
 *     error,
 *     activateFromKeyFile,
 *     addSession,
 *     exportBackup,
 *     clearProfile,
 *   } = useProfile({
 *     serverActivationUrl: import.meta.env.VITE_ACTIVATION_URL,
 *     serverPublicKeyJwk: SERVER_EC_PUBLIC_KEY,
 *   });
 *
 *   if (status === 'loading' || status === 'activating') return <Spinner />;
 *   if (status === 'no_profile') return <ActivationScreen onFile={activateFromKeyFile} />;
 *   if (status === 'error') return <ErrorScreen error={error} />;
 *   if (status === 'loaded') return <MainApp profile={profile} />;
 *   return null;
 * }
 * ```
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { ProfileManager } from '../utils/profileManager';
import { formatExpiryForDisplay } from '../utils/subscriptionVerifier';
import type {
  ActivationKeyFile,
  BackupExportOptions,
  ProfileError,
  ProfileManagerConfig,
  Prescription,
  SessionRecord,
  UserPreferences,
  UserProfile,
} from '../types/profile';

// ─── State Machine ────────────────────────────────────────────────────────────

type ProfileStatus = 'idle' | 'loading' | 'activating' | 'loaded' | 'error' | 'no_profile';

interface ProfileState {
  status: ProfileStatus;
  profile: UserProfile | null;
  error: ProfileError | null;
}

type ProfileAction =
  | { type: 'LOAD_START' }
  | { type: 'ACTIVATE_START' }
  | { type: 'SUCCESS'; profile: UserProfile }
  | { type: 'ERROR'; error: ProfileError }
  | { type: 'NO_PROFILE' }
  | { type: 'CLEAR' };

const initialState: ProfileState = {
  status: 'idle',
  profile: null,
  error: null,
};

function profileReducer(state: ProfileState, action: ProfileAction): ProfileState {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, status: 'loading', error: null };
    case 'ACTIVATE_START':
      return { ...state, status: 'activating', error: null };
    case 'SUCCESS':
      return { status: 'loaded', profile: action.profile, error: null };
    case 'ERROR':
      return { status: 'error', profile: null, error: action.error };
    case 'NO_PROFILE':
      return { status: 'no_profile', profile: null, error: null };
    case 'CLEAR':
      return { status: 'no_profile', profile: null, error: null };
    default:
      return state;
  }
}

// ─── Return Type ──────────────────────────────────────────────────────────────

export interface UseProfileReturn {
  // ─── Status ─────────────────────────────────────────────────────────────────
  status: ProfileStatus;
  profile: UserProfile | null;
  error: ProfileError | null;
  isLoading: boolean;
  isActive: boolean;
  /** Human-readable subscription expiry string for display */
  expiryDisplay: string | null;

  // ─── Activation ─────────────────────────────────────────────────────────────
  /**
   * Parse + activate from a File input (e.g., from <input type="file"> or drag-drop).
   * Reads file as JSON, validates structure, calls server, builds profile.
   */
  activateFromKeyFile: (file: File) => Promise<void>;
  /**
   * Upgrade/renew subscription from a new key file.
   * Preserves existing userData and sessions.
   */
  upgradeSubscription: (file: File) => Promise<void>;

  // ─── Mutations ───────────────────────────────────────────────────────────────
  loadProfile: () => Promise<void>;
  addSession: (session: Omit<SessionRecord, 'id' | 'timestamp'>) => Promise<void>;
  updatePreferences: (patch: Partial<UserPreferences>) => Promise<void>;
  upsertPrescription: (prescription: Prescription) => Promise<void>;
  removePrescription: (prescriptionId: string) => Promise<void>;

  // ─── Export / Import ─────────────────────────────────────────────────────────
  /**
   * Generate and trigger browser download of encrypted backup.
   * Re-encrypts with fresh userSecret (independent export credential).
   */
  exportBackup: (options?: BackupExportOptions) => Promise<void>;
  /**
   * Import an encrypted backup file, replacing current profile.
   * Validates JWT before overwriting.
   */
  importBackup: (file: File) => Promise<void>;

  // ─── Cleanup ─────────────────────────────────────────────────────────────────
  clearProfile: () => Promise<void>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Primary React hook for SynSync encrypted profile management.
 *
 * @param config  ProfileManagerConfig — should be stable across renders
 *                (memoize or use a module-level constant)
 *
 * Stability note: ProfileManager is created once per hook lifecycle using useMemo
 * keyed to serverActivationUrl. If serverPublicKeyJwk reference changes on every
 * render, extract it to a module-level constant to prevent unnecessary re-creation.
 */
export function useProfile(config: ProfileManagerConfig): UseProfileReturn {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const isMounted = useRef(true);

  // Manager is stable for lifetime of hook unless serverActivationUrl changes
  const manager = useMemo(
    () => new ProfileManager(config),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config.serverActivationUrl],
  );

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  // Safe dispatch — no-op if component unmounted
  const safeDispatch = useCallback(
    (action: ProfileAction) => {
      if (isMounted.current) dispatch(action);
    },
    [],
  );

  // ─── Parse activation key file from browser File object ─────────────────────

  const parseKeyFile = useCallback(async (file: File): Promise<ActivationKeyFile> => {
    let text: string;
    try {
      text = await file.text();
    } catch (e) {
      throw new Error(`Failed to read file "${file.name}": ${(e as Error).message}`);
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      throw new Error(
        `"${file.name}" is not valid JSON. Expected a SynSync activation key file.`,
      );
    }

    const k = parsed as Partial<ActivationKeyFile>;
    if (!k.keyId || !k.activationToken || !k.tier || !k.issuedAt || !k.checksum) {
      throw new Error(
        `"${file.name}" is missing required fields (keyId, activationToken, tier, issuedAt, checksum). ` +
        'Ensure this is a valid SynSync activation key file.',
      );
    }

    return parsed as ActivationKeyFile;
  }, []);

  // ─── Load ────────────────────────────────────────────────────────────────────

  const loadProfile = useCallback(async () => {
    safeDispatch({ type: 'LOAD_START' });
    const result = await manager.loadProfile();

    if (!isMounted.current) return;

    if (result.ok) {
      safeDispatch({ type: 'SUCCESS', profile: result.profile });
    } else if (result.error.code === 'NO_PROFILE') {
      safeDispatch({ type: 'NO_PROFILE' });
    } else {
      safeDispatch({ type: 'ERROR', error: result.error });
    }
  }, [manager, safeDispatch]);

  // Auto-load on mount
  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Activation ──────────────────────────────────────────────────────────────

  const activateFromKeyFile = useCallback(async (file: File) => {
    safeDispatch({ type: 'ACTIVATE_START' });

    let keyFile: ActivationKeyFile;
    try {
      keyFile = await parseKeyFile(file);
    } catch (e) {
      safeDispatch({
        type: 'ERROR',
        error: { code: 'INVALID_ACTIVATION_KEY', message: (e as Error).message },
      });
      return;
    }

    const result = await manager.activateFromKeyFile(keyFile);
    if (!isMounted.current) return;

    if (result.ok) {
      safeDispatch({ type: 'SUCCESS', profile: result.profile });
    } else {
      safeDispatch({ type: 'ERROR', error: result.error });
    }
  }, [manager, parseKeyFile, safeDispatch]);

  const upgradeSubscription = useCallback(async (file: File) => {
    safeDispatch({ type: 'ACTIVATE_START' });

    let keyFile: ActivationKeyFile;
    try {
      keyFile = await parseKeyFile(file);
    } catch (e) {
      safeDispatch({
        type: 'ERROR',
        error: { code: 'INVALID_ACTIVATION_KEY', message: (e as Error).message },
      });
      return;
    }

    const result = await manager.upgradeSubscription(keyFile);
    if (!isMounted.current) return;

    if (result.ok) {
      safeDispatch({ type: 'SUCCESS', profile: result.profile });
    } else {
      safeDispatch({ type: 'ERROR', error: result.error });
    }
  }, [manager, parseKeyFile, safeDispatch]);

  // ─── Mutations ───────────────────────────────────────────────────────────────

  const addSession = useCallback(
    async (session: Omit<SessionRecord, 'id' | 'timestamp'>) => {
      const result = await manager.addSession(session);
      if (result.ok && isMounted.current) {
        safeDispatch({ type: 'SUCCESS', profile: result.profile });
      }
    },
    [manager, safeDispatch],
  );

  const updatePreferences = useCallback(
    async (patch: Partial<UserPreferences>) => {
      const result = await manager.updatePreferences(patch);
      if (result.ok && isMounted.current) {
        safeDispatch({ type: 'SUCCESS', profile: result.profile });
      }
    },
    [manager, safeDispatch],
  );

  const upsertPrescription = useCallback(
    async (prescription: Prescription) => {
      const result = await manager.upsertPrescription(prescription);
      if (result.ok && isMounted.current) {
        safeDispatch({ type: 'SUCCESS', profile: result.profile });
      }
    },
    [manager, safeDispatch],
  );

  const removePrescription = useCallback(
    async (prescriptionId: string) => {
      const result = await manager.removePrescription(prescriptionId);
      if (result.ok && isMounted.current) {
        safeDispatch({ type: 'SUCCESS', profile: result.profile });
      }
    },
    [manager, safeDispatch],
  );

  // ─── Export / Import ─────────────────────────────────────────────────────────

  const exportBackup = useCallback(
    async (options?: BackupExportOptions) => {
      const blob = await manager.exportBackup(options);
      if (!blob) {
        console.warn('[SynSync] exportBackup called with no loaded profile');
        return;
      }

      // Trigger browser download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `synsync-backup-${Date.now()}.enc`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Revoke object URL after a tick to ensure download started
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    },
    [manager],
  );

  const importBackup = useCallback(
    async (file: File) => {
      let blob: Blob;
      try {
        const buffer = await file.arrayBuffer();
        blob = new Blob([buffer], { type: 'application/octet-stream' });
      } catch (e) {
        safeDispatch({
          type: 'ERROR',
          error: { code: 'UNKNOWN', message: `Failed to read file: ${(e as Error).message}` },
        });
        return;
      }

      safeDispatch({ type: 'LOAD_START' });
      const result = await manager.importBackupBlob(blob);
      if (!isMounted.current) return;

      if (result.ok) {
        safeDispatch({ type: 'SUCCESS', profile: result.profile });
      } else {
        safeDispatch({ type: 'ERROR', error: result.error });
      }
    },
    [manager, safeDispatch],
  );

  // ─── Cleanup ─────────────────────────────────────────────────────────────────

  const clearProfile = useCallback(async () => {
    await manager.clearProfile();
    if (isMounted.current) safeDispatch({ type: 'CLEAR' });
  }, [manager, safeDispatch]);

  // ─── Derived State ────────────────────────────────────────────────────────────

  const expiryDisplay = useMemo(() => {
    if (!state.profile) return null;
    return formatExpiryForDisplay(state.profile.subscription.claims);
  }, [state.profile]);

  return {
    status: state.status,
    profile: state.profile,
    error: state.error,
    isLoading: state.status === 'loading' || state.status === 'activating',
    isActive: state.status === 'loaded',
    expiryDisplay,
    loadProfile,
    activateFromKeyFile,
    upgradeSubscription,
    addSession,
    updatePreferences,
    upsertPrescription,
    removePrescription,
    exportBackup,
    importBackup,
    clearProfile,
  };
}
