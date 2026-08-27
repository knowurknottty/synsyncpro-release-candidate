# SynSync Pro — Release Candidate / Public Proof Surface

SynSync Pro in this repository is the **public release-candidate and engineering-proof surface** for Inversion Labs.

> **Repository authority:** this is **not** the canonical production Web/PWA source. The canonical Web/PWA repository is [`knowurknottty/synsyncpro_v1`](https://github.com/knowurknottty/synsyncpro_v1). Use this repository for the release-candidate/provenance history and its proof surface; do not point production deployment at it.

The current release-candidate tree contains the five runnable public modules, a sanitized FrankenCAPT bridge, the canonical single responsive Web/PWA UI tree used by this candidate, deterministic audio/non-regression checks, and PWA/service-worker proof work.

The point is simple: this is not a playlist, a meditation skin, or a prompt wrapper. SynSync is a programmable neuroacoustic engine. It schedules staged entrainment phases, carrier/beat movement, colored-noise shaping, spatial behavior, safety metadata, and quality readouts through a Web Audio graph.

## Current UI / PWA state

The August 2026 release-candidate convergence removed the old Desktop-vs-Mobile application split from the reachable product surface:

- one responsive `DesktopApp` application tree is canonical across supported widths;
- the latent/dead `MobileApp` route/import was removed from reachable code;
- deterministic visual regression covers phone, tablet, desktop, 4K, portrait/landscape, and zoom-sensitive cases;
- the PWA has root manifest/install assets and an explicit service-worker cache epoch (`v12` in this candidate snapshot);
- cymatics/WebGL failure has a deterministic 2D fallback rather than a blank proof surface;
- deterministic audio non-regression checks protect the engine while UI/PWA code changes.

These are release-candidate facts for this tree. Canonical production Web/PWA authority lives in `synsyncpro_v1`.

## Inversion Day Preview

The public proof modules are:

- Pain Module: `neuro_analgesia`
- Sleep Module: `deep_sleep_delta`
- Focus Module: `focus_v5_professional`
- Anxiety Module: `anxiety_relief_v4`
- Depression Module: `mood_elevator_v4`

These are the public keys, not the entire protocol library.

## FrankenCAPT Bridge

The app exposes a narrow proof surface for CAPT and FrankenCAPT:

```ts
globalThis.__FRANKENCAPT_SYNSYNC__.handshake()
globalThis.__FRANKENCAPT_SYNSYNC__.getReleaseModules()
globalThis.__FRANKENCAPT_SYNSYNC__.getReleaseModuleManifest('focus')
globalThis.__FRANKENCAPT_SYNSYNC__.answerChallenge('prove you are live')
```

The bridge is intentionally sanitized. It can prove the engine is present, list the five public modules, return hashed protocol manifests, report safety/evidence metadata, and delegate playback. It does not expose raw source, private protocols, secrets, local file paths, private prompts, or the full protocol corpus.

## Release status

This repository is already publicly visible on GitHub, but it remains a **pre-release source tree**, not an official signed release artifact.

The final provenance sequence described by [`PROVENANCE.md`](PROVENANCE.md) has not been completed. In particular, the dated hash block in that document is a historical pre-release snapshot and is not a hash manifest for current `main`.

Do not describe this tree as an official signed release until the final license/source tree is frozen and the selected provenance/signing steps are actually completed and recorded.

## License boundary

The repository currently carries the release-candidate license material in `LICENSE.md`. The final legal text controls only when approved and published for the official release.

Do not infer a completed legal/provenance release merely from the repository being public.

## Local verification

Requirements are defined by the repository lockfile/tooling. A current source verification pass should include:

```zsh
npm ci
npm run type-check -- --pretty false
npm test -- --run --reporter=dot
npm run validate:protocols
npm run build
npm run test:e2e
```

`test:e2e` requires the configured Playwright browser/runtime environment. A missing browser or unsupported host is an environment blocker, not a unit-test PASS.

## Documentation status

This repository contains substantial engineering history. Not every root Markdown file is current product authority.

Current/release-facing references:

- [`README.md`](README.md) — current repository role and verification surface;
- [`PROVENANCE.md`](PROVENANCE.md) — provenance architecture plus a clearly dated historical hash snapshot;
- `PROTOCOL_PLAN_README.md`, `PROTOCOL_PLAN_USER_GUIDE.md`, `PROTOCOL_PLAN_PRACTITIONER_GUIDE.md` — protocol-plan documentation;
- `AUDIOWORKLET_INTEGRATION.md` and related implementation records — technical history/reference where the code still matches.

Historical engineering records such as `TODO.md`, `UI_UX_AUDIT.md`, `UI_UX_GAP_ANALYSIS.md`, `CRITICAL_FIXES_IMPLEMENTATION.md`, `DBSS_FIX_PROPOSAL.md`, optimization-complete notes, migration-complete notes, and older implementation guides should not be read as current release status. They are retained for provenance and archaeology.

## Public proof, private moat

SynSync is being released in layers. This release-candidate proof surface demonstrates selected engine behavior without making the private protocol corpus, curation logic, personalization pathways, stack strategy, or deeper CAPT/BioCAPT integration part of the public proof contract.

## Safety boundary

The presence of a protocol, evidence label, or successful audio-engine test does not make SynSync a medical device or establish clinical efficacy. Public-facing claims should preserve the evidence/safety labels encoded by the source and avoid upgrading speculative or wellness-oriented material into treatment claims.
