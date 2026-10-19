# OMEGA source and documentation audit — 2026-10-19

**Repo:** `knowurknottty/synsyncpro-release-candidate`. **Baseline:** `dcc5f0b5ceeb2d581271b561fbc1d509ae3bf4d1` (2026-08-27). **Authority:** public pre-release proof tree, not `synsyncpro_v1` production. **Method:** GitHub source and repository tree reads, no fresh compilation/browser tests. **Status: PARTIAL** — exact source anchors below, hypotheses explicitly labeled, no invented operational receipts.

## Source inventory and exclusions

GitHub's recursive tree response enumerated **414 blob paths** and reported `truncated=false` (approximately 5.0 MB in declared blob sizes). The survey covered file/path-level taxonomy across React UI, engine/DSP, audio worklets, protocol specs, safety, local persistence, bridge, PWA, workflow tests and historical Markdown. **Not all 414 file contents were deeply read**: focused source reads sampled material public interfaces, configurations, tests, and relevant runtime code. Binary assets, generated/UI design archives, bulk protocol suites, large historical reports and dependency lockfile bodies were not audited line by line.

Repo-local `CLAUDE.md` was inspected. No `AGENTS.md` appeared in the reported tracked file tree. An independent local checkout, `git status`, executable tests and UI/hardware behavior could not be inspected after the CAPT Node capability expired. GitHub writes are limited to a new docs branch.

## Material findings (severity denotes review priority, not proven exploitability)

### SYN-DOC-P0-01 — normalized gain ceiling conflict (OBSERVED, HIGH confidence)

- **Evidence:** `CLAUDE.md` explicitly says hard ceiling 0.7; `services/AudioEngine.ts:136-138` initially sets `masterGain.gain.value = 0.7`, but `services/AudioEngine.ts:970-974` later clamps `setVolume` to 0–1. `src/frankencapt/FrankenCAPTBridge.ts:203-209` also clamps 0–1. `components/SettingsPanel.tsx:227-249` tells users the 0.7 limit is enforced.
- **Impact:** inaccurate user-facing safety invariant; potential louder-than-described output. Software gain does not define calibrated acoustic SPL.
- **Action:** choose a clearly justified normalized gain invariant, enforce at every public/engine API boundary and test it; independently define dB SPL policy with device measurement caveats. Until fixed, remove hard-ceiling claims.
- **Status:** discrepancy confirmed in source; physiological outcome **not assessed**. Product code change outside docs scope.

### SYN-DOC-P1-02 — evidence extrapolation across stimulus modalities (OBSERVED source, inference on claims)

- **Evidence:** `src/specs/protocol-evidence-registry.ts` cites slow-oscillation electrical stimulation and neurofeedback studies while interpreting effects for auditory protocols. It includes numerical estimates described as protocol-facing effect sizes and claims of comparable mechanisms.
- **Risk:** presenting EEG neurofeedback, electrical stimulation, or other modalities as direct evidence for specific synthesized audio sessions can mislead users, practitioners and marketers.
- **Action:** perform a primary-literature and protocol-equivalence review. Attach exact acoustic stimulus, sample, outcome, counterfactual, study design and DOI to every public claim; prohibit transferring percentages between different interventions.
- **Status:** source wording confirmed; cited studies, effect sizes and downstream marketing **not independently checked**.

### SYN-DOC-P1-03 — premature clinical-grade characterization (OBSERVED)

- **Evidence:** `CLAUDE.md` describes the application as “Clinical-grade” and refers to “81+ evidence-based protocols”; repo `README.md` separately states medical efficacy is not established.
- **Risk:** readers and agents overstate medical clearance or treat code annotations as validation.
- **Action:** amend development-language policy after owner review; maintain nonmedical release messaging until independent clinical, acoustic and regulatory gates exist.
- **Status:** contradictory messaging observed; number and evidence classification not independently enumerated.

### SYN-DOC-P1-04 — bridge side-effect path bypasses UI clearance (OBSERVED, HIGH confidence)

- **Evidence:** `App.tsx:146-164` opens a Safety Gate for UI playback; `src/frankencapt/FrankenCAPTBridge.ts:191-195` accepts a runtime Protocol and calls `audioEngine.playProtocol` after basic completeness checks.
- **Risk:** public in-page callers can play without the UI's Medical/Safety/Consent interaction; the bridge is not an authority layer. It is unclear which engine-level safety gates also apply.
- **Action:** harden an engine-central safety preflight, or limit the public bridge to a curated-module and user-consent-controlled playback API. Add direct-bridge abuse and invalid-protocol tests.
- **Status:** code-path difference observed; no live exploit/unsafe playback test run.

### SYN-DOC-P1-05 — public-client access files are not entitlement authority (OBSERVED, mitigated by existing notes)

- **Evidence:** `services/AccessKeyService.ts` derives a client-side HMAC key from a shipped compatibility context; comments explicitly disclaim paid authority. `App.tsx:30-31` defaults to local public preview.
- **Risk:** external instructions could conflate portable file verification with payment authorization.
- **Action:** retain current caveats, enforce subscription rights server-side if commercialization requires it, and audit any production backend separately.
- **Status:** code limitation documented; no new entitlement implementation proposed.

### SYN-DOC-P2-06 — AudioContext init versus user gesture policy (OBSERVED + browser-dependent hypothesis)

- **Evidence:** `src/context/AudioEngineContext.tsx:23` creates an AudioEngine, and `services/AudioEngine.ts:121-130` initializes AudioContext via constructor path. `CLAUDE.md` instructs never to create AudioContext outside gesture handlers.
- **Risk:** autoplay/suspension inconsistencies across Safari/iOS and Chromium, and instruction-code drift.
- **Action:** test autoplay/gesture state transitions on supported devices, and reconcile the rule with implementation.
- **Status:** code/instruction mismatch confirmed; user-visible failure **not reproduced**.

### SYN-DOC-P2-07 — protocol-plan schema URL packaging risk (HYPOTHESIS)

- **Evidence:** `src/services/PlanValidator.ts:29` fetches `/PROTOCOL_PLAN_SCHEMA.json`; the schema resides in repo root. Vite normally copies static files from `public/` while non-imported root files are not automatically served in builds.
- **Risk:** validation fails on deployed static candidate; the plan importer is also not confirmed reachable from `App.tsx`/`DesktopApp.tsx`.
- **Action:** verify built `dist` and the actual route; adjust packaging only after reproducing.
- **Status:** suspected integration gap, **not verified**.

### SYN-DOC-P2-08 — docs-only changes may avoid CI paths (OBSERVED)

- **Evidence:** `.github/workflows/web-ui-validation.yml` and `validate-protocols.yml` define code-oriented path filters, with no general documentation-link/check job.
- **Risk:** new/changed docs receive no CI gate, even if direct source contracts drift.
- **Action:** add narrow documentation lint/link/anchor validation with sensible external URL handling and a source-contract review rule.
- **Status:** workflow config inspected; actual PR trigger outcomes not yet observed.

### SYN-DOC-P2-09 — privacy guarantees need actual network tracing (LIMITATION)

- **Evidence:** browser-local storage and `LocalAnalytics` are implemented; `config.ts` contains external checkout URLs and optional research/wearable components exist.
- **Risk:** strong “zero network, zero extraction, guaranteed private” promises may exceed verified reality.
- **Action:** inspect built bundle, runtime network requests, analytics opt-in, storage cleanup and hosted configuration per release.
- **Status:** not an asserted leak; verification gap.

### SYN-DOC-P2-10 — branch, documentation and identity drift (OBSERVED)

- **Evidence:** public README says candidate vs canonical production; `package.json` uses internal name `neurosyncpro` and version `0.0.0`; root contains many dated completed/implementation docs.
- **Risk:** newcomers cannot distinguish current feature authority, history and actual release maturity.
- **Action:** docs index, current README navigation, historical cross-links, explicit release scope and maintenance rule.
- **Status:** addressed in this documentation branch, subject to review.

## Recommendations ranked by leverage

1. **Safety gate** — resolve gain invariant and direct bridge safety path before stronger safety claims or more promotion.
2. **Evidence gate** — separate actual audio-stimulus RCTs from EEG/neurofeedback and other stimulation modalities; remove unsupported transfer of effect sizes.
3. **Production boundary** — keep candidate proof vs production Web/PWA repository unmistakable in every public-facing page.
4. **Verification gate** — rerun type checks, protocol validator, unit tests, E2E and browser acoustic sampling at an exact SHA.
5. **Drift gate** — introduce documentation CI and a source-to-doc ownership matrix.

## What has *not* been proven

No full static/dynamic security penetration test, exhaustive source-line review, npm dependency audit, live audio measurements, multi-browser device lab, remote deployment review, independent clinical evidence review, license approval or production release validation was performed. No tests in this document are marked PASS.

**Related:** [Evidence and verification ledger](VERIFICATION_MATRIX.md), [Safety](SAFETY_AND_EVIDENCE.md), [Technical manual](TECHNICAL_MANUAL.md).
