# Accessibility and inclusive use

**Audience:** product, UX, QA and accessibility reviewers. **Status:** source components exist, conformance testing not performed in this mission.

## Current source affordances

The app has explicit controls for reduced motion and UI settings (`contexts/MotionContext.tsx`, `components/SettingsPanel.tsx`), accessible-control helpers (`components/AccessibleControls.tsx`), Safety Gate form controls, responsive layout and visualizer fallback code. A `src/safety/WCAGCompliance.tsx` module and CSS exist but file names do not establish conformance.

## Required review matrix

| Area | Checks |
| --- | --- |
| Audio | Stop/pause always accessible; autoplay off until consent; no unexpected high-level output |
| Motion | OS reduced-motion preference respected, visualizer/scanline disable path, no flashing hazardous patterns |
| Keyboard | Tab sequence, visible focus, Enter/Space activation, Esc close, modal focus trap and restoration |
| Semantics | Control labels, status announcements, heading hierarchy, landmarks, instructions not color-only |
| Contrast | Guided/Expert, all themes and overlay states tested with actual ratios |
| Screen readers | VoiceOver+Safari, NVDA+Chromium and major mobile assistive tech assessed independently |
| Responsive zoom | 200–400% text/viewport zoom, portrait and small screens without hidden critical buttons |
| Safety | Contraindication text and Stop control remain reachable with visualizations disabled |

No WCAG 2.2 AA (or other) conformance is claimed without actual audits. The application can stimulate both visual and auditory systems; accessibility includes **safety and user choice**, not just ARIA labels.

**See:** [Compatibility](COMPATIBILITY_AND_PWA.md), [Safety](SAFETY_AND_EVIDENCE.md), [User guide](USER_GUIDE.md).
