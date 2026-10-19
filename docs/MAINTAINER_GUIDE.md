# Maintainer operations and documentation lifecycle

**Audience:** maintainers of this release-candidate repository. **Boundary:** this is documentation maintenance guidance; it does not authorize release signing, destructive ref changes or production deployment.

## Source of truth order

1. Git checkout at exact SHA, applicable repo instructions, source and tests.
2. Fresh receipts from execution at that SHA.
3. Current-facing [docs index](README.md), root README and release provenance file.
4. Historical engineering reports and proposals, labeled historical.
5. External studies, issues and marketing context—with provenance and applicability assessed.

Re-read `CLAUDE.md` before software changes. The documentation mission is subordinate to any later valid repo-local safety rule and cannot silently amend code-level safety requirements.

## On every code change

1. Identify changed public user tasks, safety invariants and interface contracts.
2. Update the one canonical document specified by [Feature coverage](FEATURE_COVERAGE.md); do not fork new competing documentation pages.
3. Add or update source-line claims and a command/test receipt in [Verification matrix](VERIFICATION_MATRIX.md).
4. Ensure user guide/quickstart examples match real labels, flags and build outputs.
5. Review license, research language, export/privacy and healthcare claims if touched.
6. Run Markdown links and anchors; inspect omitted relative navigation links.
7. Run CI and record target revision plus exact results, including failures.

## Minimal docs CI proposal (not installed by this mission)

A dedicated workflow triggered by `README.md`, `docs/**`, `PROTOCOL_PLAN_*.md`, `package.json` and public API/audio paths should:
- validate relative Markdown links and anchors;
- detect unreachable/orphaned docs and broken references;
- check heading hierarchy, duplicate anchors and code-fence syntax;
- scan new health claims for prohibited absolute medical wording as a **review aid**, not sole gate;
- compare public method names and scripts in docs to current TS source/`package.json`;
- upload a machine-readable report without uploading user/private data.

Pin approved tooling and use a low-noise policy for external URLs. Never make unrelated product CI mandatory without reviewing repository expectations.

## Release and incident handling

The canonical Web/PWA site uses a different repository. Releasing, merging, licensing, editing payment settings or updating a production tunnel must be performed through independently authorized operations.

For an audio-safety incident, prioritize stopping affected distribution, preserving exact revision/hardware/audio settings and reporting the reproducible event. Do not label a test PASS if it was run on a different commit. Keep relevant evidence redacted and limit personal data.

## Documentation change log

| Date | Scope | Verification |
| --- | --- | --- |
| 2026-10-19 | OMEGA docs index, guides, technical references, audit, coverage and verification ledger | Source inspection; fresh runtime/test commands NOT RUN |

**Related:** [Release](RELEASE_AND_PROVENANCE.md), [Developer onboarding](DEVELOPER_ONBOARDING.md), [Audit](REPOSITORY_AUDIT_2026-10-19.md).
