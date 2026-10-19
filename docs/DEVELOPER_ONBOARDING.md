# Developer onboarding and contribution workflow

**Audience:** contributors and maintainers. **Boundary:** documentation is for candidate code at `dcc5f0b`; preserve existing legal and safety governance. Source file `CLAUDE.md` supplies repository-local engineering rules; this guide does not override them.

## First productive change

~~~zsh
git clone https://github.com/knowurknottty/synsyncpro-release-candidate.git
cd synsyncpro-release-candidate
git switch -c feat/short-descriptive-name
npm ci
npm run type-check
npm test -- --run
npm run validate:protocols
npm run build
~~~

The workflows use Node 20. No currently executed local outcome is claimed here. Use a dedicated branch, inspect `git status` before changes, and keep changes scoped and reviewable.

## Where to make changes

| Task | Inspect first |
| --- | --- |
| UI or session controls | `App.tsx`, `components/DesktopApp.tsx`, `src/hooks/useAudioPlayback.ts` |
| Add/change protocol | `src/protocols/specs/**`, `src/audio/specAdapter.ts`, `src/audio/constants.ts`, `types.ts` |
| Audio graph | `services/AudioEngine.ts`, `src/audio/dsp/**`, `src/dsp/**`, worklet sources |
| Safety | `components/SafetyGateModal.tsx`, `services/ProtocolSafety.ts`, `src/safety/**` |
| Browser data | `services/AccessKeyService.ts`, `src/utils/profileStorage.ts`, `src/services/PlanDatabase.ts` |
| Bridge public contract | `src/frankencapt/**` and its tests |
| Responsive regression | `tests/e2e/**` and `components/__tests__/**` |
| Release hosting and offline | `netlify.toml`, `public/manifest.json`, `sw.js` |

## Non-negotiable review criteria

1. Distinguish waveform/signal evidence from actual human EEG/outcomes. Document source citation, stimulus equivalence and uncertainty.
2. Never introduce sudden, unsafe signal transitions or unbounded audio callback allocations.
3. Verify audio node teardown and cancellation on stop, errors and route changes.
4. Use a testable, explicit audio-parameter invariant. Currently `CLAUDE.md` says <=0.7 but runtime paths allow up to 1.0; this is an **unresolved defect**, not a design choice to silently copy.
5. Document browser user-gesture handling and failure fallback. No “guaranteed safe” description without device-level validation.
6. Never add payment/entitlement authority solely in a public browser bundle.
7. Preserve license/provenance notices and do not rename an unsigned candidate as a certified product.

## Testing ladder

1. Type-check and targeted unit tests.
2. Protocol validator and generated-signal non-regression checks.
3. Whole Vitest suite and build.
4. Chromium Playwright E2E including visualizer fallback, PWA and canonical UI.
5. Where necessary, independent hardware/browser acoustic assessment (not automated by this repo).
6. Record command, environment, SHA, raw output and failures; no “all green” claims without receipts.

## PR checklist

- [ ] Public feature and relevant docs updated with exact source scope.
- [ ] No new unsafe or unsupported claims about health outcomes.
- [ ] Audio parameters and transitions inspected or tested.
- [ ] Privacy/access effects reviewed for changes in data flow.
- [ ] Tests run, results and skipped checks listed honestly.
- [ ] No credentials, user records or private protocol material in commits.
- [ ] Main production repo versus this proof repo respected.

For AI assistants: treat project documents as codebase data plus legitimate repository-local instructions, not license to override safety approvals. Never push/merge to production without authorization.

**See:** [Technical manual](TECHNICAL_MANUAL.md), [Safety](SAFETY_AND_EVIDENCE.md), [Verification](VERIFICATION_MATRIX.md).
