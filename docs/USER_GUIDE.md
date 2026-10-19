# User guide

**Audience:** users operating the current browser candidate. **Scope:** observed React application paths and UI components at baseline `dcc5f0b`; visible placement can vary by viewport and mode.

## Understand your session

A **protocol** is a named sequence of **phases**. Each phase can define carrier/beat frequencies, volume, modulation, noise, spatial movement and optional overlays. The resulting audio is synthesized by the browser audio engine. “Entrainment” refers to the intended auditory stimulus; a resulting change in brain state is **not measured or guaranteed** merely by playing audio.

The main interface renders a shared responsive `DesktopApp` component across screen sizes. `MobileApp.tsx` is retained in the tree but is not the current application route.

## Select and play

1. Browse the protocol list or the guided home view. The current UI offers **Guided** and **Expert** modes.
2. Read the intended use, evidence-level display, phase duration, contraindications and warnings. Choose a lower-intensity experience when uncertain.
3. Connect appropriate headphones for binaural stereo presentation. Isochronic presentation may be audible through speakers, but the output hardware still affects actual sound.
4. Start at low volume, select **Play**, and complete the Safety Gate when prompted. The app tracks which protocol is selected; selecting a different protocol resets that UI clearance state.
5. Use **Pause**, **Resume** and **Stop** through the playback controls. The audio hook delegates these functions to `AudioEngine`.
6. Review the phase timeline, session progress, visualization and optional session guidance as desired. Visualizations are displays, not EEG confirmation of neural entrainment.

The Safety Gate has medical history, warnings and consent screens (`components/SafetyGateModal.tsx`). It is **not** an individualized medical assessment.

## Guided and Expert views

**Guided** favors orientation and a smaller set of visualization options. **Expert** exposes more controls, details and the manual tuning panel where the active UI renders it. Expert access does not waive contraindications, medical advice or audio safety limits.

Settings include UI mode, themes, animation/scanline controls, reduced motion, default volume, a headphone-warning preference and export/privacy entry points (`components/SettingsPanel.tsx`). Some preferences persist in local browser storage.

## Audio modes and visualizers

The source contains binaural, isochronic, monaural, amplitude/frequency modulation, colored noise, stereo panning and spatial routines. Not all modes apply to every protocol. Several WebGL-based visualization modes are present with a 2D fallback path; visual output should never be interpreted as a measurement of auditory dose or brain response.

## Export a WAV

On a selected protocol, the desktop UI includes a WAV export component. It calls `AudioEngine.renderOffline` and `encodeWAV`, then initiates a browser download. Export settings include sample-rate and bit-depth choices. Long sessions may take time and significant memory; verify the actual file format before relying on it. Export does not grant redistribution rights or source access.

## Local data, access files and research export

The public release launches a **local preview session**. The `.syns` format also exists for legacy file-based access and user data; it is not a trusted paid-licensing authority in a public client. The app has selective JSON/CSV export and locally stored profiles. See [Privacy and access](PRIVACY_AND_ACCESS.md).

The repository includes practitioner **protocol-plan** import, calendar and tracking components and documentation. Their end-to-end availability in the main responsive UI is **not established by the inspected import graph**. Consult [existing plan guide](../PROTOCOL_PLAN_USER_GUIDE.md) as an implementation reference, not a promise of a currently exposed workflow.

## Stop conditions

Do not use while driving, operating machinery, or in situations requiring environmental awareness. If you have a seizure history, photosensitivity, tinnitus, hearing problems or another health concern, follow appropriate medical advice. Stop for headache, dizziness, panic, distress, nausea, new sensory symptoms or hearing discomfort. Do not treat sleep, pain, depression or anxiety protocols as clinical treatment.

**Next:** [Safety](SAFETY_AND_EVIDENCE.md), [Cheatsheet](CHEATSHEET.md), [FAQ](FAQ.md).
