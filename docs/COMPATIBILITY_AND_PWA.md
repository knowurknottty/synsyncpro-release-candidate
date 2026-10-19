# Compatibility, responsiveness and PWA behavior

**Audience:** testers and deployers. **Status:** source-supported architecture with **browser/platform matrix unverified in this mission**.

## Responsive UI

`App.tsx` imports the shared `components/DesktopApp.tsx` for the principal reachable UI across widths. `components/MobileApp.tsx` remains in the tree but its existence does not mean a separate mobile app is launched.

The test suite contains responsive and visual E2E specs covering canonical UI, visual regression, PWA, visualizer and adversarial workflows (`tests/e2e/*.spec.ts`). The configured Playwright project is **Chromium**, not Safari and Firefox; test cases mentioning a viewport are not equivalent to physical-device certification.

## Browser requirements

- JavaScript, Web Audio API, user-gesture audio unlock and sufficiently modern browser engine.
- Stereo-capable output for binaural presentation.
- WebGL only for compatible visualization modes; the source has a deterministic 2D fallback test.
- Storage permissions and quota for local records, and OPFS or IndexedDB for profile fallback.
- Offline capability depends on previously cached assets and browser storage retention.

No reliable min-version matrix for Chrome, Safari, Firefox, iOS or Android was derived from a release certification suite. Treat such combinations as **test targets**, not certified support.

## PWA/cache behavior

The inspected manifest names SynSync Professional, with standalone display and start path `/index.html`. `sw.js` caches a basic application shell, serves same-origin GET resources cache-first, and uses network-first navigation with fallback to the cached `/index.html`. Activation deletes older worker caches not matching its single cache epoch.

Consequences:
- The first visit generally requires a live network request.
- Cached versions may differ from the latest published asset if the service worker has not activated or storage survives an upgrade.
- Offline navigation may recover the shell but fail for uncached chunks, fonts, worklets or externally fetched resources.
- “Installs” describes browser installation metadata, not App Store review or native-package status.

## Test checklist

| Test | Evidence requirement |
| --- | --- |
| Width/responsiveness | phone portrait/landscape, tablet, desktop, 4K, text zoom; screenshots and accessibility review |
| Audio | real user-gesture unlock, play/pause/resume/stop, headphones, interrupt/resume |
| Browser | Chromium, Firefox, WebKit/Safari desktop and mobile tested independently |
| Visual fallback | disable WebGL; ensure deterministic 2D visualization and no audio interruption |
| Update | first visit, cache epoch update, offline reopen, missing/unavailable asset |
| Persistence | reload, private browsing, storage denial, quota exhaustion, export then clear |

Browser tests were **not executed** in this documentation mission. See [Verification](VERIFICATION_MATRIX.md).
