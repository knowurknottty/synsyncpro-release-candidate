# OMEGA verification, claims and triple-review ledger

**Pinned source baseline:** `dcc5f0b5ceeb2d581271b561fbc1d509ae3bf4d1` (2026-08-27). **Docs branch:** `docs/omega-synsync-20261019`. **Audit date:** 2026-10-19. **Source inspector:** GitHub connector; CAPT Node initial connection verified, clone attempt blocked after execution capability expired.

## Proof vocabulary

- **SOURCE PRESENT:** inspected source contains a named interface or path.
- **NOT RUN:** command, live integration or experiment not performed in this mission.
- **PARTIAL:** bounded inspection or limited automated check, with omissions.
- **PASS / FAIL:** reserved for genuinely executed checks tied to a revision, invocation, environment and receipt.
- **BLOCKED:** no current authorized execution capability or target availability.

Source inspection **does not** imply the feature was successfully installed, played, deployed or independently measured.

## Commands: recommended, not executed

| Check | Exact proposed invocation | This mission |
| --- | --- | --- |
| Install | `npm ci` | **NOT RUN** |
| Static TS | `npm run type-check -- --pretty false` | **NOT RUN** |
| Vitest | `npm test -- --run --reporter=dot` | **NOT RUN** |
| Protocol validator | `npm run validate:protocols` | **NOT RUN** |
| Vite build | `npm run build` | **NOT RUN** |
| Chromium E2E | `npm run test:e2e` | **NOT RUN** |
| Hardware/stereo/acoustic measurements | independent test protocol not yet supplied | **NOT RUN** |
| Safari/Firefox/iOS/Android certification | device matrix not yet supplied | **NOT RUN** |
| Production site equivalence | separate repository inspection needed | **NOT RUN** |
| License, freeze, signing and external provenance | owner-controlled process | **NOT RUN / PENDING** |

## Source claim matrix

| ID | Assertion and boundary | Source anchor | Status |
| --- | --- | --- | --- |
| C01 | Candidate is not canonical production source | `README.md:1-7`, `PROVENANCE.md` | SOURCE PRESENT |
| C02 | React/Vite commands are defined | `package.json` | SOURCE PRESENT |
| C03 | One shared responsive DesktopApp is imported | `App.tsx:1-9` | SOURCE PRESENT |
| C04 | Five named bridge release modules exist | `src/frankencapt/publicRelease.ts` | SOURCE PRESENT |
| C05 | Bridge exposes methods, selected metadata and FNV-1a hashes | `src/frankencapt/FrankenCAPTBridge.ts:90-106, 276-292, 355-402` | SOURCE PRESENT |
| C06 | UI gating flow exists | `App.tsx:146-165`, `components/SafetyGateModal.tsx:92-147` | SOURCE PRESENT |
| C07 | Different paths allow normalized gain 1.0 vs stated ceiling 0.7 | `CLAUDE.md`, `services/AudioEngine.ts:970-974`, `FrankenCAPTBridge.ts:203-209` | SOURCE PRESENT; OPEN RISK |
| C08 | Public local preview exists | `services/AccessKeyService.ts`, `App.tsx:30-31` | SOURCE PRESENT |
| C09 | Browser storage uses localStorage and OPFS/IndexedDB fallback | `src/utils/profileStorage.ts`, `src/utils/local-storage-manager.ts` | SOURCE PRESENT |
| C10 | WAV exporter calls offline render/encode | `components/WavExporter.tsx:27-56` | SOURCE PRESENT |
| C11 | PWA manifest and v12 cache logic present | `public/manifest.json`, `sw.js` | SOURCE PRESENT |
| C12 | Source has protocol plans and a validator | `src/services/PlanValidator.ts`, `src/services/PlanDatabase.ts` | SOURCE PRESENT; MAIN UI REACHABILITY UNVERIFIED |
| C13 | Evidence registry includes modalities requiring extrapolation review | `src/specs/protocol-evidence-registry.ts` | SOURCE PRESENT; INDEPENDENT STUDY REVIEW NOT RUN |
| C14 | Signed release not completed in provenance file | `PROVENANCE.md`, `LICENSE.md` | SOURCE PRESENT |
| C15 | No claim of clinical outcome verified by this mission | scope of executed evidence | NOT RUN |

## Documentation work ledger

| Pass | Applied change | Check performed | Residual |
| --- | --- | --- | --- |
| 1. Structure/coverage | New indexed public docs; README paths and audience paths; historical references retained | Source-tree census and docs taxonomy | Root README linking and link audit depend on branch finalization |
| 2. Adversarial truth/safety | Qualified clinical evidence, licence, preview entitlements, PWA and browser support; gain/bridge contradiction exposed | Cross-check against inspected source excerpts | Primary literature, browser behavior and hard 0.7 ceiling unresolved |
| 3. Reader/execution | Step-by-step quickstart, task user guide, compact cheatsheet, FAQ and troubleshooting routes | Command spellings compared with `package.json` | Commands not independently executed; clean-room reader test not run |

Three passes above describe **actual revisions of the documentation concepts**, not independent full-repository test execution. This ledger must be updated after a real documentation CI, build or user trial runs.

## Document acceptance gates still needed

- [ ] Check **every relative link and anchor** in a current checkout or static parser.
- [ ] Run prose Markdown lint or an approved house style checker.
- [ ] Execute install, type-check, tests, protocol check, build and browser E2E at the final docs SHA.
- [ ] Review medical/clinical claims against primary studies and exact stimulus types.
- [ ] Confirm mobile and PWA cross-browser support with device receipts.
- [ ] Resolve P0-01 gain discrepancy and P1-04 bridge safety gap in product code.
- [ ] Run privacy/network trace and confirm deletion/export across all browser stores.
- [ ] Review licensing and actual release-signing gates with the maintainer.

**Definition of complete:** reader paths, verified commands, safety claims and test receipts agree with the *same exact revision*. Until then this mission is **PARTIAL**, even though the documents themselves are committed.
