# Technical manual — release-candidate architecture

**Audience:** engineers, code reviewers, integrators. **Revision:** `dcc5f0b`. **Evidence:** inspected source, **not** newly executed tests.

## System boundaries

The current web candidate is React 19 + TypeScript + Vite 6, Web Audio API, custom AudioWorklets, Tailwind CSS, and browser persistence. The package metadata calls itself `neurosyncpro` at `0.0.0`; those internal values are not a signed product release version. `netlify.toml` targets a Vite `dist` build but **this repo is not the canonical production site source**.

~~~mermaid
flowchart LR
    User[User and UI] --> App[App.tsx and responsive DesktopApp]
    App --> Hook[useAudioPlayback]
    Hook --> Engine[services/AudioEngine.ts]
    Spec[Protocol specs] --> Adapter[src/audio/specAdapter]
    Adapter --> Registry[src/audio/constants]
    Registry --> Engine
    Engine --> DSP[DSP helpers, oscillators, gains, noise and spatial nodes]
    DSP --> Audio[Web Audio destination]
    Engine --> Visual[Analyser and visualizer]
    App --> Storage[localStorage, OPFS and IndexedDB]
    App --> Bridge[FrankenCAPT browser bridge]
    Bridge --> Engine
~~~

Text alternative: the UI selects a normalized protocol and calls an audio playback hook. The engine creates and schedules an audio graph from phase parameters, drives browser audio output and exposes analyser data for visualization. Browser storage persists selected user data. A limited browser-global bridge can inspect and control the engine.

## Main code paths

| Area | Current source | Responsibility |
| --- | --- | --- |
| Application entry | `index.tsx`, `App.tsx` | Context providers, access session, modal state, protocol selection and playback gating |
| Responsive UI | `components/DesktopApp.tsx` | Guided/Expert flows, protocol list, visualizations, phase timeline, export |
| Playback hook | `src/hooks/useAudioPlayback.ts` | React audio state, play/pause/resume/stop, hook callbacks |
| Audio implementation | `services/AudioEngine.ts` | Web Audio graph lifecycle, tone/noise creation, phase scheduling, offline render, QA |
| Protocol spec source | `src/protocols/specs/**` | Phase-oriented protocol definitions |
| Spec adapter/registry | `src/audio/specAdapter.ts`, `src/audio/constants.ts` | Convert specs to normalized runtime protocols; `PROTOCOLS` map |
| Alternative graph compiler | `src/dsp/compiler/**`, `src/dsp/graph/**` | Compiled `ProtocolSpec` representation and DSP graph |
| Bridge | `src/frankencapt/**` | Limited in-page proof, inspection, control and receipt hashes |
| Safety | `services/ProtocolSafety.ts`, `src/safety/**`, `components/SafetyGateModal.tsx` | Metadata classification, screening and UI acknowledgement |
| Data | `services/AccessKeyService.ts`, `src/utils/profileStorage.ts`, `src/services/PlanDatabase.ts` | Public preview, `.syns` format, OPFS/IndexedDB and plan records |
| PWA | `sw.js`, `public/manifest.json`, `netlify.toml` | Cache logic, install metadata and candidate hosting rules |

Do **not** assume the graph compiler, legacy specs, every protocol-plan component, every wearable prototype or unreferenced UI file is part of the reachable product just because it exists in source.

## Protocol shape

There are **multiple related types**:
- UI/audio runtime `Protocol` and `Phase` in root `types.ts`;
- graph-based `ProtocolSpec` and `EntrainmentLayer` in `src/protocols/schema.ts`;
- normalized adapted `PROTOCOLS` loaded from `ALL_SPECS` by `src/audio/constants.ts`.

These are not interchangeable JSON wire formats. The core UI consumes normalized runtime `Protocol` objects. The graph compiler also provides a `getProtocolById` / `listProtocols` registry (`src/protocols/index.ts`), but these are internal source functions, not a published HTTP API.

Runtime protocol keys can include duration, phases, frequency progressions, optional isochronic/monaural/binaural modes, noise characteristics, spatial motion, overlays, contraindications and evidence metadata. Names in sources often encode intended outcomes; they do not establish empirical success.

## Audio lifecycle and failure modes

`AudioEngine` holds an `AudioContext`, master gain, limiter, analyser and playback state, plus per-phase modulatable nodes and scheduler. Its context is created during engine initialization; `src/context/AudioEngineContext.tsx` constructs an engine in the provider. Browser autoplay restrictions can suspend playback until a valid gesture/resume.

`useAudioPlayback` delegates `playProtocol`, `pause`, `resume`, `stop` and `setVolume`. Engine code contains phase scheduling and both animation-frame and timeout-managed paths; do not call all scheduling sample-accurate without inspecting each transition. The UI reacts to completion and errors.

Sound is generated via Web Audio oscillators, gain nodes, a compressor/limiter, buffer sources and optional spatial effects. AudioWorklets and DSP utility modules provide additional mechanisms, not necessarily all active for each chosen protocol. Sample rate should derive from actual contexts and export configuration rather than an assumed fixed output.

## Security and privilege separation

The public-page FrankenCAPT bridge is JavaScript in the same origin as the application; it is **not** a cross-origin authenticated service. A method returning a hash receipt cannot authorize paid access or certify that the audio reached the listener. The `.syns` compatibility scheme has a public signing context; the source explicitly warns against treating public-client membership state as subscription authority.

Admin-panel and checkout affordances exist in the code, but production configuration is a separate repository and live backend/payment behavior was **not** audited.

## Verification and known contradictions

The package scripts support type-check, Vitest, protocol validation, build and Playwright E2E. Historical passing checks must not be projected onto future commits. The 0.7-versus-1.0 gain discrepancy, clinical-language overreach and source-vs-UI reachability questions are detailed in the [audit](REPOSITORY_AUDIT_2026-10-19.md).

**Next:** [Bridge contract](FRANKENCAPT_BRIDGE_REFERENCE.md), [Configuration](CONFIGURATION_AND_DEPLOYMENT.md), [Developer onboarding](DEVELOPER_ONBOARDING.md).
