# SynSync Pro - Development TODO

## 🛠️ Critical Fixes
- [x] **AudioEngine Core Methods**: Implemented `updateBiofeedback`, `setBalance`, `updateManualOverrides`, etc. in `services/AudioEngine.ts`.
- [x] **Adaptive Audio Logic**: Implemented real-time modulation using biofeedback data.
- [x] **DownloadPortal Trigger**: Integrated "Provision" buttons in sidebar and Technical tab.

## 🔄 Component Integrations
- [x] **BiofeedbackPanel**: Integrated into Technical tab (Desktop/Mobile).
- [ ] **WearableConnect**: Integrate into the UI to allow real sensor input instead of just simulation.
- [ ] **CymaticsVisualizer**: Ensure the existing `cymatics` mode in `Visualizer.tsx` is fully optimized and uses the new `CymaticsSafetyConfig`.
- [x] **ComparisonChart**: Integrated into `SourcesModal` under Protocol Matrix category.
- [ ] **UpsellModal**: Implement triggers for the `UpsellModal` (e.g., after a certain time or when trying to access locked protocols).

## 🚀 Enhancements
- [ ] **Muse EEG Integration**: Fully implement `MuseEEGService.ts` and connect it to the `AudioEngine`.
- [ ] **Wav Export**: Ensure `WavExporter.tsx` is fully functional and integrated with the protocol sessions.
- [ ] **Protocol Search/Filter**: Add search and category filtering to the `ProtocolList`.
- [ ] **Session History**: Add a local storage based session history to track completed entrainment sessions.
- [ ] **Advanced Spatial Audio**: Implement more complex spatial patterns (lissajous, etc.) in `AudioEngine`.

## 🧪 Testing & Validation
- [ ] **Protocol Validation**: Run `npm run validate:protocols` regularly to ensure data integrity.
- [ ] **Cross-browser Audio Testing**: Verify `AudioContext` performance and latency across Chrome, Safari, and Firefox.
- [ ] **Mobile Responsive Pass**: Refine the mobile UI, especially the Technical tab and session progress.

## ⚕️ Clinical & Safety (High Priority)
- [x] **Safety Contraindications**: Fill in missing `contraindications` for all protocols in `spec-*` files (currently marked as empty in audit).
- [x] **Carrier Frequency Audit**: Fix 0Hz carrier warnings in `Circuit Pruning & Renewal v5.0`.
- [ ] **Evidence Grade Calibration**: Review speculative protocols (Evidence Grade D/Speculative) and ensure UI displays appropriate warnings.
