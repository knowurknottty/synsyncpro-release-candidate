# SynSync Pro documentation

**Scope:** the public release-candidate and engineering-proof tree at `knowurknottty/synsyncpro-release-candidate` (baseline `dcc5f0b5ceeb2d581271b561fbc1d509ae3bf4d1`, 2026-08-27). **Status:** pre-release, not signed or release-certified. **Production authority:** [`synsyncpro_v1`](https://github.com/knowurknottty/synsyncpro_v1), not this repository.

SynSync Pro is a browser-based, programmable neuroacoustic engine. A session executes a structured sequence of audio phases rather than playing a fixed media track. This repository demonstrates the audio, UI, safety metadata, PWA and narrow FrankenCAPT proof surface. It does **not** establish clinical treatment efficacy or a completed commercial release.

## Choose your path

| You want to… | Start here |
| --- | --- |
| Try the candidate locally | [Quickstart](QUICKSTART.md) |
| Understand it in plain English | [ELI5 guide](ELI5_GUIDE.md) |
| Operate sessions, settings and export | [User guide](USER_GUIDE.md) |
| Look up commands quickly | [Cheatsheet](CHEATSHEET.md) |
| Investigate common problems | [Troubleshooting](TROUBLESHOOTING.md) |
| Understand scientific claims and safety | [Safety and evidence](SAFETY_AND_EVIDENCE.md) |
| Understand browser storage and access | [Privacy and access](PRIVACY_AND_ACCESS.md) |
| Inspect technical architecture | [Technical manual](TECHNICAL_MANUAL.md) |
| Integrate with the proof bridge | [FrankenCAPT API](FRANKENCAPT_BRIDGE_REFERENCE.md) |
| Configure or deploy a **candidate** | [Configuration and deployment](CONFIGURATION_AND_DEPLOYMENT.md) |
| Understand browser and PWA caveats | [Compatibility](COMPATIBILITY_AND_PWA.md) |
| Build or contribute | [Developer onboarding](DEVELOPER_ONBOARDING.md) |
| Understand release status and licensing | [Release and provenance](RELEASE_AND_PROVENANCE.md) |
| Review discovered risks | [Audit](REPOSITORY_AUDIT_2026-10-19.md) and [verification ledger](VERIFICATION_MATRIX.md) |
| Decode terminology | [Glossary](GLOSSARY.md) and [FAQ](FAQ.md) |

## Source documentation worth preserving

The pre-existing [protocol-plan overview](../PROTOCOL_PLAN_README.md), [user guide](../PROTOCOL_PLAN_USER_GUIDE.md), [practitioner guide](../PROTOCOL_PLAN_PRACTITIONER_GUIDE.md), [AudioWorklet integration notes](../AUDIOWORKLET_INTEGRATION.md), [provenance record](../PROVENANCE.md), and [research-language policy draft](PROTOCOL_LANGUAGE_COMPLIANCE.md) are retained. Plan-system source exists, but inclusion of source files does not guarantee a route to the feature in the current canonical UI.

Historical records under the repository root, `docs/` and `fixes*/` describe prior proposals, patches and work. Treat them as historical until reconciled with current source.

## What this documentation proves—and does not

The instructions and interface descriptions are grounded in inspected source at the pinned revision above. **No fresh `npm ci`, test-suite, browser E2E, acoustic calibration or deployment execution was completed for this documentation mission.** See [verification ledger](VERIFICATION_MATRIX.md) for precisely what remains unverified.

The term “evidence level” is an application metadata label, **not** independent validation of a particular protocol, outcome, diagnosis or treatment.
