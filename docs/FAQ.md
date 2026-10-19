# Frequently asked questions

**Is SynSync a playlist?** No. The candidate source synthesizes multi-phase audio using a Web Audio engine, DSP helpers and protocol specs.

**Is this a downloadable official release?** Not yet according to the repository's `README.md`, `LICENSE.md` and `PROVENANCE.md`. It is a public **pre-release** source and proof surface. Final license, source freeze, updated hashes and signing remain pending.

**Is this the production website repository?** No. The README names `knowurknottty/synsyncpro_v1` as canonical production Web/PWA source.

**Does it treat pain, depression, anxiety, ADHD or insomnia?** It contains protocols named for those objectives. Their names, internal evidence grades and cited upstream research are **not validation of clinical treatment efficacy** for this software. Seek licensed healthcare where appropriate.

**Why do binaural beats need headphones?** Separate left/right signals are necessary for the intended binaural frequency-difference experience. Mixed speakers generally alter that presentation.

**Can isochronic tones play through speakers?** Yes in principle, because a pulsing waveform need not be separated between ears; actual audio hardware, room acoustics and level matter.

**Why might sound not start immediately?** Browser autoplay/user-gesture restrictions, suspended AudioContext, muted output, device selection, protocol validation or initialization failure may be involved. See [Troubleshooting](TROUBLESHOOTING.md).

**Does a volume slider set a safe dB SPL?** No. It adjusts software gain; real sound exposure depends on system/device gain and headphones or speakers. The source's `0.7` safety rule is not fully enforced by all code paths at the reviewed baseline.

**Are my sessions uploaded by default?** The inspected client has localStorage, IndexedDB/OPFS and local analytics paths. This audit did not conduct a full network/privacy trace; do **not** infer “no external transmission ever.” See [Privacy](PRIVACY_AND_ACCESS.md).

**Does an imported `.syns` file prove a paid subscription?** No. The client itself says its legacy file format and public preview are not a paid-entitlement security boundary.

**Can I program against the app?** A narrow browser-global FrankenCAPT interface is present, documented in [Bridge reference](FRANKENCAPT_BRIDGE_REFERENCE.md). It is not a documented stable server API.

**Are practitioner plans exposed in this interface?** Plan components, schema and documentation exist, but the inspected main UI import graph did not establish a reachable workflow. Treat it as a source capability under integration review.

**Can I contribute?** Start with [Developer onboarding](DEVELOPER_ONBOARDING.md), inspect repo-local `CLAUDE.md`, preserve safety constraints and use a PR.

**What if I feel unwell?** Stop playback. For significant symptoms or ongoing concerns, seek medical advice; for emergencies seek urgent care.
