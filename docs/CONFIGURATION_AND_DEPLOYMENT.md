# Configuration and candidate deployment

**Audience:** contributors/deployers. **Warning:** this repo is not canonical production Web/PWA authority. This is a **candidate inspection/build reference**, not permission or instructions to replace production.

## Build toolchain

`package.json` defines Vite for dev/preview/build, TypeScript type checking, Vitest and Playwright. CI uses Node 20. Pin exact package versions with `package-lock.json` via `npm ci`. There is no `engines` declaration in the inspected package; test other runtime versions rather than assuming support.

~~~zsh
npm ci
npm run type-check
npm test -- --run
npm run validate:protocols
npm run build
~~~

Build script: `vite build && cp main.html sw.js dist/`. Netlify config publishes `dist`. Validate output contents and metadata before hosting publicly.

## Routing from `netlify.toml`

| Request | Candidate behavior |
| --- | --- |
| `/` | rewrite (HTTP 200) to `/main.html` landing |
| `/demo` | rewrite to `/index.html` |
| `/free-demo` | rewrite to `/index.html` |
| Unmatched SPA paths | fallback rewrite to `/index.html` |
| `/assets/*` | cache immutable hashed asset paths |
| `/index.html`, `/main.html`, `/sw.js` | no-cache/no-store headers |

The PWA manifest is `public/manifest.json` with `start_url` set to `/index.html`. The worker uses cache epoch `synsync-v12-canonical-ui` in `sw.js`. **Cache epoch alone does not guarantee offline playback or safe update behavior**; test fresh and upgraded clients separately.

## Configuration inventory

| Source | Purpose | Notes |
| --- | --- | --- |
| `config.ts` | Stripe monthly/yearly checkout URLs | Client-visible links, **not secret API keys or proof of server verification** |
| `netlify.toml` | build/publish, redirects, cache headers | Candidate configuration only |
| `vite.config.ts` | build/dev Vite configuration | Inspect on any deployment change |
| `playwright.config.ts` | E2E web server, Chromium project | Test-specific |
| `public/manifest.json` | PWA name, start path, icons | Not evidence of native app certification |
| `sw.js` | install/activate/fetch caching | Cross-version update needs verification |
| `constants*.ts` and `src/audio/constants.ts` | audio/protocol definitions and safety/evidence data | Sensitive to behavioral drift |

Environment-variable contracts were **not enumerated exhaustively** in this mission. Do not invent `.env` entries or rely on variables not traced to implementation. Treat all browser bundle configuration as inspectable by users.

## Candidate preflight before any public deployment

1. Confirm you have permission and have selected the correct **production** repository/branch.
2. Verify legal license text and provenance status (currently pending here).
3. Validate `npm ci`, type-check, unit/integration tests, protocol validator, build, and Playwright.
4. Address safety/claim discrepancies, especially the 0.7 gain limit.
5. Test landing, SPA, `/demo`, install/update/offline behavior, export, audio resume/interruption and narrow bridge exposure.
6. Capture commit SHA, build logs, target URL, asset hashes and the release approver's decision.

Do not infer “deployed” from a generated `dist` directory, GitHub visibility or green tests alone.

**Related:** [Quickstart](QUICKSTART.md), [Compatibility](COMPATIBILITY_AND_PWA.md), [Release](RELEASE_AND_PROVENANCE.md).
