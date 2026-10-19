# SynSync Pro — Project Instructions

## Project Overview
Pre-release neuroacoustic research/wellness application. TypeScript + React + Web Audio API. Clinical efficacy, medical-device status, and hearing-level certification are NOT established by this repository.
This software generates audio that directly affects neurological states. Correctness is not optional — bugs in the audio pipeline can cause adverse physiological responses.

## Architecture
- Pipeline: ProtocolSpec → AudioGraphPlan → AudioGraphRuntime
- Multi-modal entrainment: binaural beats, isochronic tones, amplitude modulation, spatial audio
- A broad mixed-evidence protocol library across sleep, cognition, and exploratory applications; inclusion is NOT proof that a specific audio protocol has clinical evidence
- Clinical safety layer with parameter validation, seizure safety protocols, and graceful degradation

## Stack
- TypeScript (strict), React, Vite
- Web Audio API (AudioContext, AudioWorklet, OfflineAudioContext)
- Tailwind CSS
- Deployment: Netlify

## Critical Safety Constraints
- **Seizure safety**: All frequency transitions must respect ramp rate limits. No instantaneous frequency jumps >2Hz in the 3-30Hz range. Validate in ProtocolSpec before reaching AudioGraph.
- **Master-gain safety**: Normalize ALL live/UI/bridge/offline master-gain requests to 0.0–0.7 using `src/audio/safetyLimits.ts`; nonfinite values fail closed to silence. This is NOT a calibrated 0.7 output peak, physical dB SPL ceiling, or hearing-safety certification. Independently monitor/export-check DSP peak/clipping and acoustic exposure; never increase volume to compensate for a software limit.
- **Parameter validation**: Every protocol parameter must be validated at the ProtocolSpec layer. Invalid parameters fail loudly at build time, not silently at runtime.
- **Graceful degradation**: If any audio node fails, the entire graph must tear down cleanly. No orphaned oscillators. No dangling connections. Silence is always the safe fallback.

## Audio Pipeline Rules
- All frequency values in Hz. All time values in seconds. All amplitude values 0.0-1.0. No implicit conversions.
- AudioWorklet processors must be side-effect-free and deterministic.
- Never create AudioContext outside of user gesture handlers.
- Sample rate: always use AudioContext.sampleRate, never hardcode.
- Ramp methods: use exponentialRampToValueAtTime for frequency, linearRampToValueAtTime for gain. Never setValueAtTime for transitions.

## File Conventions
- Components: `components/ComponentName.tsx` — PascalCase
- Hooks: `hooks/useHookName.ts` — camelCase with use prefix
- Utils: `utils/utilName.ts` — camelCase
- Types: `types/domainName.ts` — co-located or in types directory
- Constants: `constants.ts`, `constants-evidence.ts` — protocol definitions live here
- Audio DSP: `audio/` — AudioWorklet processors and graph builders

## Protocol Data Integrity
- Every marketed evidence-based outcome requires traceable, intervention-equivalent primary sources. No unverified efficacy claims or cross-modality percentage transfer. No "studies suggest" without specific citations in user-facing content.
- Evidence levels (I-V) must be assigned per protocol and backed by traceable references.
- New protocols require: citation validation, parameter safety check, and integration test with the audio pipeline.

## Common Tasks
- Adding a protocol: Edit `constants.ts` → add ProtocolSpec → verify AudioGraphPlan handles it → test AudioGraphRuntime output
- Modifying DSP: Always test with OfflineAudioContext first. Validate output waveform before connecting to speakers.
- UI changes: Follow existing Tailwind patterns. Mobile-first. Dark theme is primary.
- Patches: The project uses a patch-based workflow for batched changes. See patch files in repo root when present.

## What NOT To Do
- Never skip parameter validation "for simplicity."
- Never use setTimeout/setInterval for audio timing. Use AudioContext.currentTime and scheduling methods.
- Never create unbounded arrays in audio processing callbacks.
- Never assume AudioContext state. Always check and handle suspended/closed states.
