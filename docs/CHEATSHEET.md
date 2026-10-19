# SynSync Pro cheatsheet

**Scope:** candidate branch at `dcc5f0b`. **Commands are extracted from `package.json` and have not been run in this mission.**

| Task | Command |
| --- | --- |
| Install locked dependencies | `npm ci` |
| Start Vite dev server | `npm run dev` |
| Type-check | `npm run type-check -- --pretty false` |
| Unit/integration tests once | `npm test -- --run --reporter=dot` |
| Protocol validation | `npm run validate:protocols` |
| Production-style candidate build | `npm run build` |
| Preview built files | `npm run preview` |
| Chromium E2E | `npm run test:e2e` |
| Coverage instrumentation | `npm run test:coverage` |
| Update visual E2E baselines (review changes!) | `npm run test:e2e:update` |

## Reader shortcuts

| Question | Where |
| --- | --- |
| Play, pause, stop | [User guide](USER_GUIDE.md) |
| Why headphones? | [Glossary](GLOSSARY.md) |
| Audio pipeline | [Technical manual](TECHNICAL_MANUAL.md) |
| Browser storage and `.syns` | [Privacy](PRIVACY_AND_ACCESS.md) |
| Five public release protocols | [Bridge reference](FRANKENCAPT_BRIDGE_REFERENCE.md) |
| No audio / stale PWA | [Troubleshooting](TROUBLESHOOTING.md) |
| What is clinically proven? | [Safety and evidence](SAFETY_AND_EVIDENCE.md) |

## Bridge inspection (development console, React application loaded)

~~~js
const bridge = globalThis.__FRANKENCAPT_SYNSYNC__;
bridge?.handshake();
bridge?.getReleaseModules();
bridge?.getReleaseModuleManifest('focus');
bridge?.getState();
bridge?.answerChallenge('prove you are live');
~~~

Reading does not trigger playback. `play`, `stop` and `setVolume` **do** alter the engine and must not be treated as safe read-only diagnostics.

## Risk reminders

Use the lowest comfortable output level; browser gain is not a measured sound-pressure-level ceiling. Do not use potentially photosensitive flashing visuals if susceptible. Protocol evidence labels are metadata, not outcome guarantees. See [Audit](REPOSITORY_AUDIT_2026-10-19.md).
