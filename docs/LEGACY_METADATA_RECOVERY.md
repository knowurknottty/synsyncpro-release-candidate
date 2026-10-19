# Recovery of historical SynSync protocol classifications (2026-10-19)

## Reconciliation result

- Target: SynSync Pro public release-candidate PR #5, 101 normalized protocol IDs.
- Recovered from: private `knowurknottty/synsyncpro` and `knowurknottty/synsync-studio-macos-source`.
- Original shared artifact: `macos/Sources/SynSyncCore/Resources/protocols.json` (SHA `e87d97924a2879391c4511b8e7bdf4824b64a0f4`, snapshot `2026-06-11T20:46:50.661Z`). Its 101 IDs have non-null evidence grade and contraindications severity.
- Restore **only ID, evidence level, grade, severity**, not private source code, unpublished user data or internal full citations.
- The previous adapter (`synsyncpro/src/audio/specAdapter.ts`) inferred **I → A, II → B, III → C, IV/V → D** and **absolute caution → severe, relative caution → moderate, no listed caution → mild**. Consequently the snapshot represents historical *classifications* and cannot independently establish efficacy, clinical grade, safe use, or a product-specific trial.
- New adapter matches by exact protocol ID and evidence level, respects five existing curated overrides, never reduces current explicit precaution severity, and emits an uncertainty notice for protocols with no listed cautions. **Historical entries remain tagged `legacy-restored-unverified`**. No autopromotion to clinically validated.
- Validation distinguishes **actual missing data** from **recovered-but-unverified metadata**. The latter must still be reviewed against primary scientific evidence before official release; CI warnings are not zeroed by pretending every historical grade is established fact.

## Remaining review requirements

1. Confirm all 101 runtime IDs match the exact historical manifest; tests hard-fail on drift.
2. Verify each protocol's clinical grade against direct studies of equivalent auditory stimulus, population and outcome. Historical grade alone is inadequate.
3. Evaluate contraindication claims by actual stimulus modality and medically supported safety data. Existing alpha-band seizure advisories are not proof of audio-induced seizure risk.
4. Audit UI labels and marketing claims; a restored letter grade must show its unverified source and not imply regulatory clearance.
5. No new DSP parameters, published private source, product deployment, signed release, or permission changes in this recovery.

Related: [engineering PR #5](https://github.com/knowurknottty/synsyncpro-release-candidate/pull/5) · [issue #6](https://github.com/knowurknottty/synsyncpro-release-candidate/issues/6).
