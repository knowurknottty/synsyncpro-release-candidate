# SynSync Pro

SynSync Pro is the public Web/PWA proof surface for the SynSync neuroacoustic engine.

The current release-candidate tree exposes the real browser application, Web Audio engine, public protocol surface, deterministic verification tests, and the narrow FrankenCAPT bridge used to prove that the runtime is present without exposing private source, private protocols, secrets, local file paths, or the full private corpus.

SynSync is not a playlist or a static meditation skin. The application schedules staged entrainment phases, carrier/beat movement, colored-noise shaping, spatial behavior, safety metadata, visualizer output, offline rendering, and quality readouts through a real Web Audio graph.

## Canonical Web/PWA Application

The public application now uses one canonical React application tree across supported viewport sizes. Resolution, orientation, zoom, and DPR may change layout mechanics, but they no longer select a separate mobile application implementation.

The release-candidate includes regression coverage for:

- phone, tablet, desktop, 4K, and breakpoint-boundary viewport sizes;
- repeated resize and portrait/landscape transitions;
- visualizer backing-store and DPR synchronization;
- deterministic visualizer fallback when WebGL2/cymatics is unavailable;
- PWA clean install, stale-cache purge, offline recovery, and canonical-shell persistence;
- mobile-width reachability of core controls;
- deterministic audio non-regression and spectral verification.

## Public Modules and Protocol Surface

The public release surface includes the curated public protocol set and the five named release modules used by the FrankenCAPT proof bridge:

- Pain: `neuro_analgesia`
- Sleep: `deep_sleep_delta`
- Focus: `focus_v5_professional`
- Anxiety: `anxiety_relief_v4`
- Depression: `mood_elevator_v4`

These named modules are proof keys for the bridge, not a statement that the browser application's complete public protocol surface is limited to five entries.

## FrankenCAPT Bridge

The application exposes a narrow proof surface for CAPT/FrankenCAPT:

```ts
globalThis.__FRANKENCAPT_SYNSYNC__.handshake()
globalThis.__FRANKENCAPT_SYNSYNC__.getReleaseModules()
globalThis.__FRANKENCAPT_SYNSYNC__.getReleaseModuleManifest('focus')
globalThis.__FRANKENCAPT_SYNSYNC__.answerChallenge('prove you are live')
```

The bridge is intentionally sanitized. It can prove the engine is present, list the five named release modules, return hashed protocol manifests, report safety/evidence metadata, and delegate playback. It does not expose raw source, private protocols, secrets, local file paths, private prompts, or the full private protocol corpus.

## Verification

The repository contains unit, integration, audio, protocol-validation, production-build, and Playwright browser gates.

```zsh
npm ci
npm run type-check
npm test -- --run
npm run build
npm run validate:protocols
npm run test:e2e
```

The Web UI Validation GitHub Actions workflow runs the core package, type, unit, build, and browser-regression gates for relevant web changes.

## Release Status

The canonical Web/PWA remediation has been merged to `main`, but this repository should still be treated as release-candidate work until the intended provenance and licensing sequence is complete:

1. Final CAPT/BioCAPT Constitutional Commons license text approved.
2. Release documents and license hashed.
3. Blockchain timestamping completed if retained as part of the release process.
4. PGP-signed release commit created.
5. PGP-signed release tag created.

Do not treat an unsigned tree as the final provenance artifact.

## License

The intended license is the CAPT/BioCAPT Constitutional Commons license being prepared for the release family.

Human-readable intent:

- Individuals may use the public modules freely for personal, non-commercial use.
- Commercial, corporate, institutional, surveillance, coercive, manipulative, extractive, or harmful use requires explicit written permission and a paid license.
- The work may not be used to harm, exploit, enclose, surveil, manipulate, enslave, or extract from people.
- The final legal text controls once approved, hashed, signed, and published.

## Public Proof, Private Moat

SynSync is released in layers. The public application and named release modules prove that the engine performs real browser-side DSP and protocol execution. Private curation logic, personalization pathways, private protocol material, and deeper CAPT/BioCAPT integration remain outside this public proof surface.
