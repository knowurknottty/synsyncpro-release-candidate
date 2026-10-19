# Safety, evidence and responsible claims

**Scope:** what can be concluded from the inspected candidate source. This is a software safety and evidence note, **not medical advice or clinical certification**.

## What is implemented

The UI contains a three-step Medical → Safety → Consent gate (`components/SafetyGateModal.tsx`) and source modules for protocol safety classification, auditory monitoring, photosensitivity screening and metadata. Protocol descriptions can include contraindications, severity and evidence labels. A limiter is wired after master gain in `services/AudioEngine.ts`.

These are controls and source implementations—not proof that all hazards are eliminated across all browsers, hardware and output levels.

## Output level: a material unresolved discrepancy

`CLAUDE.md` specifies a **hard ceiling of 0.7 normalized amplitude**. `services/AudioEngine.ts` initializes master gain to 0.7 but its `setVolume` function clamps to **0–1**, and the FrankenCAPT bridge clamps to **0–1**. The settings UI describes “0.7 safety limit enforced.” These assertions **do not agree**. There is no evidence from this audit of a calibrated dB SPL ceiling. See [audit issue SYN-DOC-P0-01](REPOSITORY_AUDIT_2026-10-19.md).

**Conservative user practice:** lower output system volume before starting; increase only to the minimum comfortable level; never equate slider percentages with safe acoustic exposure. A maintainer must reconcile the invariant in code and tests before describing a hard limit as enforced.

## Seizure/photosensitivity and hearing cautions

The app may produce strong auditory modulation and animated visual stimuli. People with epilepsy, seizure history, photosensitivity or related neurologic sensitivities should avoid use pending medical guidance. Turn off or avoid visuals that cause symptoms. Stop if dizziness, headache, panic, sensory distress, tinnitus or ear discomfort occurs. Do not use while driving, operating machinery or when environmental awareness is important.

A screening dialog and saved acknowledgement do not diagnose risk, prove suitability or replace medical evaluation. Software gain reduction cannot substitute for measuring actual ear-level exposure.

## Evidence tiers are metadata, not validated outcomes

`types.ts` permits evidence labels I, II, III, III-IV, IV, V, Custom and numeric. `src/specs/protocol-evidence-registry.ts` contains citations and effect-size interpretations. They require **study-by-study independent review** before reuse in marketing or medical contexts.

Examples of scientifically material **non-equivalences**:
- EEG slow-wave *electrical* stimulation in a sleep study is not automatically evidence for *audio binaural* stimulation at the same nominal frequency.
- SMR EEG neurofeedback outcomes are not transferable percentages for an audio-frequency analogue.
- A frequency-following or auditory steady-state response is not proof that this specific protocol produces a subjective, cognitive or clinical outcome.
- A cited study can support a narrow stimulus/endpoint combination while leaving dose, population, frequency and delivery method uncertain.

The supplied evidence registry includes effect-size claims and mechanistic generalizations that should not be published as verified effect sizes for SynSync without primary-source verification.

## What may safely be said now

- **Source-supported:** the engine implements scheduled tone/noise/spatial signal generation, protocol metadata and safety UI.
- **Unverified:** its signals achieve independent spectral/acoustic benchmarks on a real listening device.
- **Not demonstrated here:** universal safety, medical-device clearance, treatment efficacy, population-wide response rates, effects on anxiety/insomnia/ADHD or named disorders.

For public copy, prefer “designed for,” “exploratory listening protocol,” or “may support” *only where contextual evidence supports that degree of uncertainty*. Never present as “guaranteed,” “clinically proven by this app,” or “replaces treatment.”

## Research and ethics requirements

A genuine prospective efficacy study should pre-register target protocol version, acoustic dose and hardware, randomization, sham/control condition, blindable endpoints, adverse-event handling, recruitment exclusions, consent, attrition, effect-size plan and data privacy. Observational user feedback is valuable design feedback but cannot establish causality.

**See:** [Verification ledger](VERIFICATION_MATRIX.md), [Audit](REPOSITORY_AUDIT_2026-10-19.md), source `CLAUDE.md`, `services/AudioEngine.ts`, `src/specs/protocol-evidence-registry.ts`.
