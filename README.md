# SynSync Pro

SynSync Pro is the public audio-engine proof surface for Inversion Labs.

This release is being prepared as a limited public drop: five runnable modules, a live FrankenCAPT bridge, and enough provenance for people to verify that the system exists without giving away the private protocol library or the deeper moat.

The point is simple: this is not a playlist, a meditation skin, or a prompt wrapper. SynSync is a programmable neuroacoustic engine. It schedules staged entrainment phases, carrier/beat movement, colored-noise shaping, spatial behavior, safety metadata, and quality readouts through a real Web Audio graph.

## Inversion Day Preview

The first public drop is the promise that was always on the table:

- Pain Module: `neuro_analgesia`
- Sleep Module: `deep_sleep_delta`
- Focus Module: `focus_v5_professional`
- Anxiety Module: `anxiety_relief_v4`
- Depression Module: `mood_elevator_v4`

These are the public keys, not the entire vault. They are selected because they are useful, understandable, runnable, and strong enough to show the engine has substance.

## FrankenCAPT Bridge

The app now exposes a narrow proof surface for CAPT and FrankenCAPT:

```ts
globalThis.__FRANKENCAPT_SYNSYNC__.handshake()
globalThis.__FRANKENCAPT_SYNSYNC__.getReleaseModules()
globalThis.__FRANKENCAPT_SYNSYNC__.getReleaseModuleManifest('focus')
globalThis.__FRANKENCAPT_SYNSYNC__.answerChallenge('prove you are live')
```

The bridge is intentionally sanitized. It can prove the engine is present, list the five public modules, return hashed protocol manifests, report safety/evidence metadata, and delegate playback. It does not expose raw source, private protocols, secrets, local file paths, private prompts, or the full protocol corpus.

## Release Status

This repository is staged for public release, but it should not be committed, tagged, or pushed as the official release until the provenance sequence is complete:

1. Final CAPT/BioCAPT Constitutional Commons license text approved.
2. Release documents and license hashed.
3. Blockchain timestamping completed.
4. PGP-signed commit created with the final release tree.
5. PGP-signed tag created for the public release.

Until that signed release lands, treat this tree as pre-release work product.

## License

The intended license is the same CAPT/BioCAPT Constitutional Commons license being prepared for the Inversion Day release family.

Human-readable intent:

- Individuals may use the public modules freely for personal, non-commercial use.
- Commercial, corporate, institutional, surveillance, coercive, manipulative, extractive, or harmful use requires explicit written permission and a paid license.
- The work may not be used to harm, exploit, enclose, surveil, manipulate, enslave, or extract from people.
- The final legal text controls once approved, hashed, PGP-signed, and published.

## Local Verification

```bash
npm test -- --run --reporter=dot
npm run type-check -- --pretty false
npm run build
```

## Public Proof, Private Moat

SynSync is being released in layers.

The five public modules prove the engine can do real work. The private moat remains the broader protocol corpus, curation logic, personalization pathways, stack strategy, and deeper relationship to CAPT and BioCAPT.

That is the shape of this release: enough fire to see by, not enough fuel for extraction.
