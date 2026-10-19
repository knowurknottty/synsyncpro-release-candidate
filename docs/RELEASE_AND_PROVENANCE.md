# Release, licensing and provenance

**Source of authority:** root [README](../README.md), [LICENSE.md](../LICENSE.md) and [PROVENANCE.md](../PROVENANCE.md). **Status at inspected baseline:** *public source, pre-release and unsigned.*

## Two repositories with different purposes

- `knowurknottty/synsyncpro-release-candidate` — public engineering/release-candidate proof source; documented here.
- `knowurknottty/synsyncpro_v1` — canonical production Web/PWA source **according to this repo's README**. That separate repo was not audited in this mission.

Do not deploy candidate commits over production, infer parity with production, or represent this source as an official app release.

## Licensing boundary

Root `LICENSE.md` explicitly says **final signed license pending** and outlines intended individual/non-commercial versus organizational/commercial permissions. The actual final legal terms have **not** been approved and attached here, and this document cannot grant rights or resolve legal ambiguity. Contributors and distributors should obtain license clarification rather than presuming an OSI license or interpreting intent notes as finalized permission.

## Provenance that is and is not established

`PROVENANCE.md` contains a **historical SHA-256 snapshot dated 2026-05-15**. The tree advanced afterwards; that snapshot is **not a manifest of current main**. The relevant baseline for this documentation audit is `dcc5f0b5ceeb2d581271b561fbc1d509ae3bf4d1` (GitHub commit date 2026-08-27).

The source reports external CID, archival, timestamp and PGP witness identifiers as **pending**. Do not make up IDs, reinterpret a missing receipt as confirmation or retroactively rewrite historical hashes.

## Release gate

Only describe an official signed release after maintainers:
1. Approve and publish final legal text.
2. Freeze an exact code/artifact tree and recompute its hashes.
3. Complete chosen archival/anchoring steps where applicable.
4. Apply and verify any selected owner signatures/tags.
5. Run candidate validation against the frozen SHA (type-check, protocol tests, build, browser E2E and safety-critical tests).
6. Reconcile known audio gain and health-claim discrepancies.
7. Publish a signed release record with authentic artifact identifiers.

This documentation PR does **not** satisfy those release gates by itself.

## Historic engineering artifacts

Keep former implementation reports, proposals, completed-task summaries and old protocol-plan docs for archaeology; distinguish them from present-tense status. The README and current indexed docs should be maintained as current-facing truth.

**Next:** [Audit and open findings](REPOSITORY_AUDIT_2026-10-19.md), [Verification](VERIFICATION_MATRIX.md).
