# Troubleshooting

**Audience:** users, QA and maintainers. These are diagnostic hypotheses grounded in code paths; individual fixes are not guaranteed without reproduction.

## Silent playback or no Play response

1. Confirm operating-system output device and speaker/headphone volume.
2. Start playback from a real click/tap. Browser policies may suspend AudioContext without a user gesture.
3. Confirm you selected a protocol and reviewed the Safety Gate. A selection change resets the UI clearance flag.
4. Stop, then start the session anew if the graph is stale. Do not rapidly retry at high volume.
5. If developer tools are available, examine console errors from `useAudioPlayback.ts` and AudioContext state; do not share personal data or secrets from logs.
6. Check whether the expected stereo channels exist and are audible at conservative volume.

Note: `src/context/AudioEngineContext.tsx` constructs the engine in a provider; `services/AudioEngine.ts` initializes its AudioContext in the constructor path. This can interact with browser autoplay restrictions and is separately flagged for testing.

## Sound starts but sounds wrong

Check whether the protocol specifies binaural, isochronic, monaural or other layers. Binaural separation generally requires headphones and working left/right channels. Disable system spatialization/crossfeed/equalization temporarily for controlled diagnostics, but do not increase volume to compensate.

Do **not** infer a broken biological response from a waveform visualizer. Measure audio properties with a proper offline render and analysis if engineering verification is needed.

## Volume or comfort issues

Stop playback if sound is uncomfortable. The 0.7 cap described by project instructions is inconsistent with current `setVolume(0–1)` paths; do not use the slider as a calibrated SPL meter. Lower operating-system gain first. See [Safety](SAFETY_AND_EVIDENCE.md).

## Visualizer blank or laggy

Switch to a simpler visualization; test with reduced motion; ensure the browser supports WebGL for advanced modes. A source-level 2D fallback exists for certain WebGL failures, but this documentation mission did not execute it in a live browser.

## Old UI after a deployment

Try a normal reload; inspect registered service worker and cache entries in developer tools. An old `synsync-v12-canonical-ui` cache epoch may affect what loads. **Before clearing site storage**, export personal records and note the current origin. Clearing cache or worker storage may delete local data or offline assets.

## `.syns` import error

Verify the file is a genuine `.syns` JSON-format export and was not truncated or modified. Invalid format, HMAC verification failure or incompatible record may yield a client error. The public preview session does not require a purchased entitlement. Never post a user's file publicly to diagnose it.

## Plan import issue

`src/services/PlanValidator.ts` attempts to fetch `/PROTOCOL_PLAN_SCHEMA.json`. The schema is stored at repository root, and the Vite production asset-copy behavior for that path has **not** been verified. A fetch failure can prevent validation; also verify that the importer is reachable from current UI before diagnosing it as a shipping feature.

## Test or build failure

~~~zsh
npm ci
npm run type-check
npm test -- --run
npm run validate:protocols
npm run build
~~~

For E2E, install the configured Playwright Chromium browser. Distinguish code failures from missing executable/browser dependencies, unsupported host conditions and filesystem permissions. Capture error, command, Node version, OS, branch and commit SHA before filing an issue.

**Next:** [FAQ](FAQ.md), [Developer onboarding](DEVELOPER_ONBOARDING.md), [Verification](VERIFICATION_MATRIX.md).
