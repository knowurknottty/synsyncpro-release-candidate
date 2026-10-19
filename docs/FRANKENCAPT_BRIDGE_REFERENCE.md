# FrankenCAPT browser bridge — public proof reference

**Audience:** integrators and maintainers. **Status:** source-present, unit tests exist, **live integration not re-run**. **Applies to:** `src/frankencapt/FrankenCAPTBridge.ts` and `publicRelease.ts` at `dcc5f0b`.

This is an **in-page JavaScript object**, not an HTTP endpoint, MCP server, remotely authenticated API, release-signing service or medical-device interface. `App.tsx` installs the bridge through `installFrankenCAPTBridge(audioEngine)`.

## Access the bridge

~~~js
const bridge = globalThis.__FRANKENCAPT_SYNSYNC__;
if (!bridge) throw new Error('Open the running React app first');
console.log(bridge.handshake());
console.table(bridge.getReleaseModules());
console.log(bridge.getReleaseModuleManifest('focus'));
console.log(bridge.getState());
~~~

Read operations above have no intentional audio playback side effect. The global is installed as a non-enumerable property and is removed when its installing effect cleans up.

## Methods

| Method | Input | Returns | Effect |
| --- | --- | --- | --- |
| `handshake()` | none | bridge ID/version, capabilities, five-module release summary, disclosure flags, hash | read |
| `getState()` | none | readiness, playback state, protocol ID/phase, volume, QA metrics | read |
| `getReleaseModules()` | none | five public module descriptors | read |
| `getReleaseModuleManifest(id)` | one of five module IDs | sanitized metadata/frequency envelope/safety flags plus `manifestHash` | read |
| `inspectActiveProtocol()` | none | manifest or `null` | read |
| `inspectProtocol(protocol)` | caller-supplied runtime `Protocol` | manifest | read, but may summarize caller-provided data |
| `play(protocol)` | runtime `Protocol` | Promise of receipt | **starts audio** |
| `stop()` | none | receipt | **stops audio** |
| `setVolume(volume)` | finite number; clamps to 0–1 | receipt | **changes gain** |
| `answerChallenge(text)` | string, truncated to 512 characters | hashed challenge/response and receipt | read |

`play` checks that protocol ID/title, phase array and duration are present before delegating to `AudioEngine`. That is **not** a complete security, clinical or full protocol validation barrier. Notably, the bridge's `play` path does not present the UI's Medical → Safety → Consent dialog; integrators must impose their own equivalent safety UX and do not gain special authorization merely by reaching the global.

## Public release IDs

| Module ID | Protocol ID | Intended proof purpose |
| --- | --- | --- |
| `pain` | `neuro_analgesia` | staged multi-phase audio demonstration |
| `sleep` | `deep_sleep_delta` | delta-oriented long-form session |
| `focus` | `focus_v5_professional` | multi-layer focus-oriented spec |
| `anxiety` | `anxiety_relief_v4` | downshift-oriented spec |
| `depression` | `mood_elevator_v4` | staged mood-oriented spec |

These are the **selected proof-module identifiers**, not all registry entries, and they are **not clinical indications**.

## Contract details and caveats

The `handshake().bridgeId` is `frankencapt.synsync.v1` with reported bridge version `1.0.0`. The runtime `moduleCount` is five. Manifests summarize phase count, durations, min/max carrier/beat values, feature flags (noise, entrainment, spatial movement, harmonic overlays, jitter, DBSS and split-hemisphere) and selected safety classification.

Receipts and manifest hashes use `fnv1a32` implemented by `stableHash`. **FNV-1a is not collision-resistant cryptography, a signature or a signed proof of live audio output.** Challenge responses are suitable only as lightweight repeatable client-state fingerprints. Their timestamps are client-generated.

The bridge is deliberately a narrow **sanitized metadata surface** for the built-in five-module descriptors. Do not use it to claim encryption of source code or immunity to browser reverse engineering.

## Examples

~~~js
// Read-only inspection
const manifest = bridge.getReleaseModuleManifest('sleep');
console.log(manifest.id, manifest.durationSeconds, manifest.phaseCount);

// Challenge (not remote attestation)
const receipt = bridge.answerChallenge('verify-session-42');
console.log(receipt.action, receipt.challengeHash, receipt.responseHash);
~~~

No production remote authentication or credential exchange is described because none is proven by this source contract.

**Sources:** `src/frankencapt/FrankenCAPTBridge.ts`, `src/frankencapt/publicRelease.ts`, `src/frankencapt/__tests__/FrankenCAPTBridge.test.ts`.
