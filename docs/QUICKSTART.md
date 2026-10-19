# Quickstart — run the release candidate locally

**Audience:** technically comfortable first-time users and evaluators. **Scope:** the public candidate, not production. Commands below are source-derived, **not executed** in this documentation mission.

## Prerequisites

Install Git and Node.js with npm. The GitHub Actions workflows use **Node 20**; the package file does not declare an `engines` minimum. Use Node 20 as the CI-aligned starting point, not as a certified compatibility matrix. A recent browser supporting Web Audio is required for real playback; Chromium is configured for automated E2E.

## Get started

~~~zsh
git clone https://github.com/knowurknottty/synsyncpro-release-candidate.git
cd synsyncpro-release-candidate
npm ci
npm run dev
~~~

Open the **local URL actually printed by Vite**. Do not assume a hard-coded port. The root Netlify route redirects to `main.html`, while `/demo` and `/free-demo` direct to the React app; Vite and hosted routing are not identical.

1. Enter the React application via its `index.html` entry if the landing page appears first.
2. Explore a listed protocol in **Guided** mode, or switch to **Expert** from the interface for additional controls.
3. Review the protocol's description, duration, contraindications and evidence metadata before playback.
4. Start playback using a user interaction and complete the **Medical → Safety → Consent** flow if shown.
5. Set system/headphone volume conservatively before listening. Stop immediately if uncomfortable.

The application uses a local public preview session by default (`App.tsx` and `AccessKeyService.ts`). A paid license or entitlement should not be inferred from the presence of this preview.

## Source checks (separate from listening)

~~~zsh
npm run type-check -- --pretty false
npm test -- --run --reporter=dot
npm run validate:protocols
npm run build
~~~

For browser tests:

~~~zsh
npx playwright install chromium
npm run test:e2e
~~~

The source Playwright project targets Chromium. Browser installation and some host dependencies may be required. These are **recommended commands**, not PASS receipts.

## Expected artifacts

`npm run build` is configured to run Vite and copy `main.html` plus `sw.js` into `dist/`. An available source tree and compiled output are not equivalent to a signed public release.

## Stop or clean up

Use the in-app Stop control before closing the tab; stop Vite with Ctrl+C in the terminal. Keep `.syns` and exported progress/WAV files in a location you control. Do not delete browser origin storage until exporting any personal records you intend to keep.

**Next:** [User guide](USER_GUIDE.md), [Safety and evidence](SAFETY_AND_EVIDENCE.md), [Troubleshooting](TROUBLESHOOTING.md).
