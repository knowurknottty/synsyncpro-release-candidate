# SynSync Public Release Provenance

Status: pre-release, unsigned
Generated: 2026-05-15 America/Chicago
Repository: knowurknottty/synsyncpro

This document is the working provenance index for the SynSync public release. It is intentionally prepared before the final blockchain/IPFS/PGP steps so those identifiers can be added without changing the release architecture.

No official release should be made until:

1. `LICENSE.md` is replaced with the final approved CAPT/BioCAPT Constitutional Commons license.
2. The final release tree is hashed again.
3. The release artifact is pinned to IPFS or equivalent content-addressed storage.
4. The release hash is anchored through the selected blockchain/provenance workflow.
5. The release commit and tag are PGP-signed by the owner.

## Public Release Modules

| Module | Protocol ID | Source |
| --- | --- | --- |
| Pain | `neuro_analgesia` | `src/protocols/specs/sufferingReduction/suffering-reduction.spec.ts` |
| Sleep | `deep_sleep_delta` | `src/protocols/specs/sleep/sleep-recovery.spec.ts` |
| Focus | `focus_v5_professional` | `src/protocols/specs/cognitive/performance-focus.spec.ts` |
| Anxiety | `anxiety_relief_v4` | `src/protocols/specs/sufferingReduction/suffering-reduction.spec.ts` |

## FrankenCAPT Proof Surface

The public bridge is exposed as:

```ts
globalThis.__FRANKENCAPT_SYNSYNC__
```

The bridge provides a sanitized handshake, public module manifests, challenge responses, playback delegation, state readout, and safety/evidence metadata. It must not expose raw source, private protocol corpus data, local file paths, secrets, private prompts, or private infrastructure details.

## SHA-256 Hashes

These hashes cover the current pre-release tree before final license replacement, IPFS pinning, and PGP signing.

```text
8959b28fd480c5138eb654402b650920a3115e6930f312fad248864be7c0d736  README.md
e482e71eeff811e2d3e2b3107e8bcd5b024e503653b56d0979371ca0c362c438  LICENSE.md
b1a575b7645f8435a3cb55c85dddb48553576272a8806426646a9895eb2bb0e9  package.json
9a93e3584d8170a12df83e04fb45c64156f8176ca283f6446f02b582a1e98338  package-lock.json
0ce63258407f3ead0f2a53a9f3155a2a5581f99bccfd46d1e56fc8c0e4a6006b  App.tsx
762c5e6cca563d0a4d3d8dc274222dd1de03fbfc705e13f498d3bb5645040ecc  services/AccessKeyService.ts
3186d4891338393dd689888dbf43d61ec422031b6c346efa920aab1ae4eafe38  services/ZipService.ts
084aea1f4a219e05b2229a05f1028d0212f0ff6291841d379535e52a414d7c08  services/AudioEngine.ts
6148732950e10f425ca556b438164ea0a536da0673e7126785e14e662fa4533d  src/frankencapt/FrankenCAPTBridge.ts
8ae922d79a94d1d6aedefc9156ef899c04c026e84859a71609a4d043fa0aea6f  src/frankencapt/publicRelease.ts
649e92714cc115fa3743ac13f72db173c63b8814b905804c5334492a71671080  src/frankencapt/index.ts
c8b4de9155e1d39c7b91b81a030589fcefbe60354c24f1252c5a3bce23a2ecd7  src/frankencapt/__tests__/FrankenCAPTBridge.test.ts
89c845be012ece1d7bd090186f4fff0d86c52850cce17e13e7db77ec5d9590f1  src/protocols/specs/sufferingReduction/suffering-reduction.spec.ts
8ed07bc9591c8bd1475d5b6d011305ad4672ee6e8b09c662d62ceb0128a16c6f  src/protocols/specs/sleep/sleep-recovery.spec.ts
0bc2dcbf1b7763f4cfe0b8049d4c2d5bf896004e92c9ac1c2b836966ab058080  src/protocols/specs/cognitive/performance-focus.spec.ts
4ee0f6a27a29f07a21554592189030530fa166e299ab2fe195b9515205cefdc0  src/audio/NoiseGenerator.ts
ca1e6c04fdde0a1ff2f78f4dd72519b00076cbaf2a4ff12df5eee4799e82aac0  src/modules/TransauralCrosstalkCancellation.ts
8233dba4f94f20c90aaa53d203df1d10a131d92986dd71d1f451a8775bd10a57  src/modules/SpatialAudioSceneDesigner.ts
292defe9ddab09306cba67f4d387e0d67e677cff8ac8bcf16a069b4e94d27204  src/modules/BinauralBeatStereoWidthAnimator.ts
```

## Verification Commands

```bash
shasum -a 256 README.md LICENSE.md package.json package-lock.json App.tsx \
  services/AccessKeyService.ts services/ZipService.ts services/AudioEngine.ts \
  src/frankencapt/FrankenCAPTBridge.ts src/frankencapt/publicRelease.ts \
  src/frankencapt/index.ts src/frankencapt/__tests__/FrankenCAPTBridge.test.ts \
  src/protocols/specs/sufferingReduction/suffering-reduction.spec.ts \
  src/protocols/specs/sleep/sleep-recovery.spec.ts \
  src/protocols/specs/cognitive/performance-focus.spec.ts \
  src/audio/NoiseGenerator.ts \
  src/modules/TransauralCrosstalkCancellation.ts \
  src/modules/SpatialAudioSceneDesigner.ts \
  src/modules/BinauralBeatStereoWidthAnimator.ts

npm test -- --run --reporter=dot
npm run type-check -- --pretty false
npm run build
```

## External Witnesses

Fill these after the final release tree is frozen:

```text
IPFS CID: pending
Arweave TX: pending
OpenTimestamps proof: pending
Blockchain transaction: pending
Zenodo DOI: pending
Software Heritage SWHID: pending
Internet Archive snapshot: pending
PGP fingerprint: pending
PGP-signed commit: pending
PGP-signed tag: pending
```

## Release Notes

- Public release access uses a local preview session by default.
- Public preview `.syns` files round-trip only into local preview sessions and do not represent paid entitlement authority.
- Client-side admin generation is disabled in public builds unless explicitly enabled in private development.
- Portable export no longer bundles source files or LAN server scripts.
- Stale codewiki ingestion payload containing private source snapshots was removed from the release candidate tree.
- The final legal license still controls once approved and signed.
