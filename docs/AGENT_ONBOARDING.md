# AI coding agent onboarding

**Audience:** coding agents working with authorized access to SynSync Pro's release-candidate source. This file is guidance, not a bypass of higher-priority instructions or repository access controls.

## Mission handshake

Before writing: check exact repository (candidate versus `synsyncpro_v1` production), `git status --short`, current branch/HEAD, configured remotes, permissions, `CLAUDE.md`, license and provenance status. Read the current package scripts and product entrypoint. Stop if authorization is missing or ambiguous for risky actions.

**Never turn a user-facing health claim into “verified” based solely on a study title, model assertion, protocol name or prior CI status.**

## Working method

- **Inventory:** identify source, tests, historical docs and reachable routes.
- **Trace:** public claim → current source symbol → available tests → actual execution receipts.
- **Change:** edit minimum necessary files in a reviewable branch; preserve user changes.
- **Validate:** type-check, unit, protocol, build, browser tests and relevant acoustic measurements where authorized.
- **Review:** adversarially test safety, boundary conditions, privacy, release and scientific-equivalence assertions.
- **Report:** paths changed, exact commit SHA, executed commands/exit codes, NOT RUN checks and unresolved risks.

## Forbidden shortcuts

Do not fabricate tests or screenshots; do not silently fix product code just to satisfy documentation; do not use raw desktop recovery to override CAPT refusal; do not convert client-local preview into paid authority; do not disclose private protocols or user files; do not publish or merge to production without approvals; do not call an FNV hash a signed cryptographic attestation.

## What counts as a strong receipt

A receipt identifies **exact SHA**, toolchain/OS, command or test, output, exit state, affected feature and limitation. A unit-test name or stale report alone is not a receipt.

## Documentation owner mapping

See [Feature coverage](FEATURE_COVERAGE.md) and [Verification matrix](VERIFICATION_MATRIX.md). Preserve the dated [PROVENANCE](../PROVENANCE.md) historical hash block unchanged unless maintainer creates a separate frozen release snapshot.

**Priority open issues:** gain invariant `SYN-DOC-P0-01`, bridge playback authorization/gating `SYN-DOC-P1-04`, evidence transfer `SYN-DOC-P1-02`; see [Audit](REPOSITORY_AUDIT_2026-10-19.md).
