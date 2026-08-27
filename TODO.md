# SynSync Pro — Historical Development TODO

> **Historical engineering record — not current release status.** This checklist predates the August 2026 canonical single-UI/PWA convergence and is retained for provenance/archaeology. Some unchecked items may now be implemented, intentionally dropped, moved to another repository, or superseded. Use [`README.md`](README.md), current source/tests, and the canonical Web/PWA repository `knowurknottty/synsyncpro_v1` for present-tense claims.

## 🛠️ Critical Fixes
- [x] **AudioEngine Core Methods**: Implemented `updateBiofeedback`, `setBalance`, `updateManualOverrides`, etc. in `services/AudioEngine.ts`.
- [x] **Adaptive Audio Logic**: Implemented real-time modulation using biofeedback data.
- [x] **DownloadPortal Trigger**: Integrated "Provision" buttons in sidebar and Technical tab.

## 🔄 Component Integrations
- [x] **BiofeedbackPanel**: Integrated into Technical tab (Desktop/Mobile at the time this checklist was written).
- [ ] **WearableConnect**: Historical item — integrate real sensor input instead of simulation.
- [ ] **CymaticsVisualizer**: Historical item — optimize the then-existing `cymatics` mode and `CymaticsSafetyConfig`. Later source added deterministic WebGL/cymatics fallback behavior; re-audit current source before treating this box as current work.
- [x] **ComparisonChart**: Integrated into `SourcesModal` under Protocol Matrix category.
- [ ] **UpsellModal**: Historical item — implement triggers for the then-planned upsell flow.

## 🚀 Enhancements
- [ ] **Muse EEG Integration**: Historical item — connect the service to the audio engine if still in current product scope.
- [ ] **Wav Export**: Historical item — verify current source before carrying forward.
- [ ] **Protocol Search/Filter**: Historical item — verify current source before carrying forward.
- [ ] **Session History**: Historical item — verify current source before carrying forward.
- [ ] **Advanced Spatial Audio**: Historical item — verify current source before carrying forward.

## 🧪 Testing & Validation
- [ ] **Protocol Validation**: Current package scripts include `npm run validate:protocols`; run it as a gate rather than treating this unchecked box as evidence it has never been run.
- [ ] **Cross-browser Audio Testing**: Physical/browser acceptance remains environment-specific evidence.
- [ ] **Mobile Responsive Pass**: Superseded as phrased by the single responsive application-tree convergence; current viewport/zoom evidence lives in the later visual regression work.

## ⚕️ Clinical & Safety
- [x] **Safety Contraindications**: Filled missing contraindication metadata in the source lineage represented by this checklist.
- [x] **Carrier Frequency Audit**: Addressed the recorded 0 Hz carrier warnings in the named protocol lineage.
- [ ] **Evidence Grade Calibration**: Safety/evidence labeling remains an ongoing review obligation; do not infer clinical efficacy from protocol presence or a checked engineering task.

## Carry-forward rule

Do not reactivate an unchecked item mechanically. First confirm that the feature still belongs in the canonical product, inspect `synsyncpro_v1` and current release-candidate source, and create a fresh issue/plan with current acceptance criteria if work is still needed.
