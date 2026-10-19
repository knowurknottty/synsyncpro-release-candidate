# Public capability coverage and canonical doc ownership

**Revision audited:** `dcc5f0b`. **Coverage means documented presence/limitations**, not real-world certification.

| Capability | Primary evidence | Canonical doc | Implementation/status |
| --- | --- | --- | --- |
| Shared responsive React interface | `App.tsx`, `components/DesktopApp.tsx` | [User guide](USER_GUIDE.md) | SOURCE PRESENT |
| Guided vs Expert mode | `App.tsx`, `SettingsPanel.tsx` | [User guide](USER_GUIDE.md) | SOURCE PRESENT |
| Protocol selection/categories | `ProtocolVault.ts`, `ProtocolList.tsx` | [User guide](USER_GUIDE.md) | SOURCE PRESENT |
| Play, pause, resume, stop | `useAudioPlayback.ts`, `AudioEngine.ts` | [User guide](USER_GUIDE.md) | SOURCE PRESENT; browser untested |
| Multi-phase DSP | `src/audio/constants.ts`, `AudioEngine.ts`, `src/audio/dsp/**` | [Technical manual](TECHNICAL_MANUAL.md) | SOURCE PRESENT |
| Binaural, iso, monaural and noise | AudioEngine and protocol source | [Technical manual](TECHNICAL_MANUAL.md) | SOURCE PRESENT; per-protocol behavior variable |
| Visualization and fallback | `Visualizer.tsx`, `VisualizerOptimized.tsx`, fallback test | [Compatibility](COMPATIBILITY_AND_PWA.md) | SOURCE PRESENT; runtime untested |
| Safety and contraindication UI | `SafetyGateModal.tsx`, `services/ProtocolSafety.ts` | [Safety](SAFETY_AND_EVIDENCE.md) | SOURCE PRESENT; P0 mismatch |
| WAV offline export | `WavExporter.tsx`, `AudioEngine.renderOffline` | [User guide](USER_GUIDE.md) | SOURCE PRESENT; no render receipt |
| Settings/local preferences | `App.tsx`, `SettingsPanel.tsx` | [User guide](USER_GUIDE.md) | SOURCE PRESENT |
| Portable `.syns` access file | `AccessKeyService.ts` | [Privacy](PRIVACY_AND_ACCESS.md) | SOURCE PRESENT; not paid authority |
| Profile and session storage | `profileStorage.ts`, `local-storage-manager.ts` | [Privacy](PRIVACY_AND_ACCESS.md) | SOURCE PRESENT |
| Local analytics/export | `LocalAnalytics.ts`, `DataExportPanel.tsx` | [Privacy](PRIVACY_AND_ACCESS.md) | SOURCE PRESENT; full network audit not run |
| Practitioner protocol plans | `src/components/Plan*.tsx`, `src/services/Plan*.ts` | [Existing plan guide](../PROTOCOL_PLAN_USER_GUIDE.md) | SOURCE PRESENT; current UI integration unverified |
| FrankenCAPT bridge | `src/frankencapt/**` | [Bridge reference](FRANKENCAPT_BRIDGE_REFERENCE.md) | SOURCE PRESENT; direct-bridge safety gap |
| Public five-module mapping | `src/frankencapt/publicRelease.ts` | [Bridge reference](FRANKENCAPT_BRIDGE_REFERENCE.md) | SOURCE PRESENT |
| PWA/install/offline | `sw.js`, `manifest.json`, `netlify.toml` | [Compatibility](COMPATIBILITY_AND_PWA.md) | SOURCE PRESENT; offline scope unverified |
| CI checks | `.github/workflows/*.yml`, `package.json` | [Verification](VERIFICATION_MATRIX.md) | SOURCE PRESENT; fresh run not executed |
| License/provenance | `LICENSE.md`, `PROVENANCE.md` | [Release](RELEASE_AND_PROVENANCE.md) | PENDING official release |
| Live external wearable integration | `services/MuseEEGService.ts`, `components/WearableConnect.tsx` | [Technical manual](TECHNICAL_MANUAL.md) | CODE PRESENT; real-device certification **unverified** |
| Medical safety/efficacy claims | Internal evidence registry | [Safety](SAFETY_AND_EVIDENCE.md) | NOT CLINICALLY VALIDATED BY THIS AUDIT |
| Public CLI/server REST API | No published contract identified during bounded review | [Technical manual](TECHNICAL_MANUAL.md) | NOT ASSERTED |
| Native signed macOS/iOS release | No official artifacts evidenced in this repo | [Release](RELEASE_AND_PROVENANCE.md) | NOT ASSERTED |

## Overlap resolution

- The new `docs/README.md` is the **current documentation index**.
- The root `README.md` remains the authoritative **repository identity and status** front door.
- `PROVENANCE.md` retains the historical hash snapshot as history; do not refresh in-place.
- `PROTOCOL_PLAN_*` pages are retained, but their UI availability must be verified before advertised as shipped.
- `AUDIOWORKLET_INTEGRATION.md` and `src/audio-worklets/**` remain technical reference, cross-checked with actual current imports.
- Prior reports such as `UI_UX_AUDIT.md`, `OPTIMIZATION_REPORT.md` and `docs/COMPLETE_*` remain historical, not competing current status pages.
- No new license, code of conduct, commercial SLA, health policy or fake release notes were generated.

## Ownership change rules

For UI changes update User guide + quickstart if affected. For DSP/protocol changes update Technical manual + Safety and evidence + verification receipts. For bridge changes update Bridge reference + integration tests. For storage changes update Privacy. For deployment changes update Compatibility + Configuration. For release changes update Release and provenance only against immutable evidence.
