# Glossary

**Audience:** users, contributors and integrators. Definitions describe the technology, not demonstrated clinical outcomes.

| Term | Meaning |
| --- | --- |
| **Amplitude** | Relative signal magnitude, represented in code as a normalized number; **not** a direct calibrated dB SPL reading. |
| **AudioContext** | Browser Web Audio graph, clock and audio-device interface. |
| **AudioWorklet** | Browser audio-processing execution mechanism; the source contains multiple custom processors. |
| **Binaural beat** | Difference in frequencies presented separately to left/right ears; requires stereo separation to present as intended. |
| **Carrier** | Audible oscillator frequency in Hz that carries modulation or binaural differences. |
| **Chromium E2E** | Browser integration tests using Playwright's configured Chromium project. |
| **Contraindication** | A condition or scenario in which a protocol may not be appropriate; not a replacement for clinician screening. |
| **dB SPL** | Sound pressure level; cannot be derived reliably from normalized browser gain without an acoustic measurement of the actual device. |
| **DSP** | Digital signal processing—algorithmic creation and transformation of signals. |
| **Entrainment** | Attempted rhythmic response to a periodic stimulus; actual biological effects require independent measurement. |
| **Evidence level** | Internal protocol metadata grade (for example I–V); not independent proof of this app's efficacy. |
| **FrankenCAPT bridge** | Browser-global inspection/control interface for the constrained release proof. |
| **FNV-1a** | Fast non-cryptographic hash; `fnv1a32` values in the bridge are **not digital signatures**. |
| **Guided / Expert** | Two UI presentation modes; neither removes safety responsibilities. |
| **Isochronic tone** | Tone rhythmically gated or pulsed at a target modulation frequency. |
| **Limiter** | Dynamic-range component intended to restrain signal level; it does not enforce an absolute acoustic exposure level. |
| **Local preview** | Client-generated public-release session; not externally verified subscription entitlement. |
| **OPFS** | Origin Private File System, browser-managed origin storage. |
| **Phase** | Scheduled segment of a protocol with its own durations and audio parameters. |
| **Protocol** | Configuration describing an entire multi-phase session. |
| **PWA** | Progressive Web App using a manifest and service worker; exact offline coverage depends on assets previously cached. |
| **QA metrics** | Engine-level estimated/derived quality readouts; not independent measurement of EEG or hearing safety. |
| **Sample rate** | Samples per second (Hz) of digital audio; use the live AudioContext rate for playback reasoning. |
| **SMR** | Sensorimotor rhythm, commonly referring to EEG around 12–15 Hz; audio stimulus at such rates is not equivalent to EEG neurofeedback. |
| **`.syns`** | SynSync portable access/user-data file; public-client compatibility signing is **not** a paid-entitlement trust boundary. |
| **WAV render** | Offline rendering and encoding of a protocol to an audio file for personal use subject to license terms. |

**Related:** [Technical manual](TECHNICAL_MANUAL.md), [Privacy](PRIVACY_AND_ACCESS.md), [Safety](SAFETY_AND_EVIDENCE.md).
