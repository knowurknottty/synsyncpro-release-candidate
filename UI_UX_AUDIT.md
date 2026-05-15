# SynSync Pro — UI/UX Audit & Improvement Roadmap

> Branch: `claude/review-ui-ux-cOhQL`
> Audited: 2026-02-20

---

## EXECUTIVE SUMMARY

The current UI is technically impressive but built like a cockpit — dense, jargon-heavy, and intimidating to newcomers. The core aesthetic (cyberpunk/neuro-dark) is a genuine strength and should be preserved. The goal of this audit is to create two modes:

- **Guided Mode** — warm onboarding, plain language, goal-based navigation, beginner-safe
- **Expert Mode** — current layout with technical labels, DSP controls, raw data visible

Think of it like this: Spotify's homepage vs. a DJ's mixing board. Both play music; they serve different users.

---

## 1. BRANDING & NAMING INCONSISTENCIES

| Location | Current | Problem | Fix |
|---|---|---|---|
| `LandingPage.tsx:22` | `NEUROMAX` | Landing page has a different brand name than the app | Change to `SynSync Pro` |
| `LandingPage.tsx:130` | `NEUROMAX © 2025` | Footer wrong brand + outdated year | `SynSync Pro © 2026` |
| `DesktopApp.tsx:74` | `SYN·SYNC` | Inconsistent with brand | Standardize to `SynSync Pro` with consistent mark |
| `MobileApp.tsx:68` | `SYNSYNC` (no space) | Different styling from desktop | Unify logo treatment |

**Checklist:**
- [ ] Decide on one canonical brand name display (`SynSync Pro`) and apply everywhere
- [ ] Fix copyright year in footer (2025 → 2026)
- [ ] Create a shared `<Logo />` component so it's always consistent

---

## 2. MODE TOGGLE LABELS — "WOO WOO" vs "SCIENCE"

**File:** `DesktopApp.tsx:83-94`, `MobileApp.tsx:91-108`

**Current:**
```
[ SCIENCE ]  [ WOO WOO ]
```

**Problems:**
- "WOO Woo" is dismissive and could alienate users who came for spiritual/consciousness protocols
- "SCIENCE" is exclusionary (implies the other side isn't science)
- Both are 10px ALL CAPS mono font — nearly illegible on mobile

**Fix options (pick one):**
```
Option A:  [ Research-Backed ]  [ Exploratory ]
Option B:  [ Evidence-Based  ]  [ Intuitive   ]
Option C:  [ Grounded        ]  [ Open-Minded ]
```

**Checklist:**
- [ ] Replace "SCIENCE" label with `Research-Backed` (or agreed alternative)
- [ ] Replace "WOO WOO" label with `Exploratory` (or agreed alternative)
- [ ] Increase button text size from `text-[10px]` to `text-xs` minimum
- [ ] Add a tooltip/info icon explaining what each mode filters

---

## 3. PROTOCOL CATEGORY / SECTION NAMES

**File:** `ProtocolList.tsx:13-36`

Several category names are needlessly clinical, scary, or confusing to newcomers:

| Current Name | Problem | Proposed Friendly Name | Expert Name (kept in expert mode) |
|---|---|---|---|
| `Mimic: Cannabis` | Alarm for medical/workplace users | `Deep Relaxation & Creative Flow` | Keep as-is |
| `Mimic: MDMA` | Legally alarming, misunderstood | `Heart-Opening: Connection States` | Keep as-is |
| `Mimic: Stimulants` | Alarm for addiction-sensitive users | `Energy & Alert Focus` | Keep as-is |
| `Mimic: Psychedelics` | Alarm for many users | `Expanded Perception States` | Keep as-is |
| `Neural Rewiring` | Vague, slightly unsettling | `Mindset Transformation` | `Neural Rewiring` |
| `Autonomic Mastery` | Medical jargon | `Nervous System Balance` | `Autonomic Regulation` |
| `Biohacking & Longevity` | Niche buzzword | `Optimization & Vitality` | Keep as-is |
| `Advanced Research` | Implies beta/risky | `Experimental Protocols` | `Advanced Research` |
| `Consciousness Expansion` | Polarizing term | `Deep Awareness` | `Consciousness Expansion` |
| `Spiritual Integration` | Alienating to secular users | `Inner Peace & Reflection` | `Spiritual Integration` |
| `Suffering Reduction` | Clinical, heavy | `Relief & Comfort` | `Suffering Reduction` |
| `Calibration` | Tech jargon for a first step | `Getting Started` | `Calibration & Setup` |

**Checklist:**
- [ ] Create a `SECTIONS_CONFIG_FRIENDLY` map for Guided Mode labels
- [ ] Create a `SECTIONS_CONFIG_EXPERT` map for Expert Mode (current labels)
- [ ] Switch between them based on `appMode` or a new `uiMode: 'guided' | 'expert'` setting
- [ ] Add short one-line descriptions under each category header when expanded in Guided mode

---

## 4. INDIVIDUAL PROTOCOL NAMES — TECHNICAL CODES

The app shows protocol IDs like `TG-CFC`, `TI-PBM`, `SMR-Mu` as user-facing titles.

**File:** Protocol spec files in `src/protocols/specs/`

**Checklist:**
- [ ] Audit all 118+ protocols — every protocol needs a `friendlyName` field
- [ ] In Guided Mode, show friendly name as primary, code as subtle subtitle
- [ ] In Expert Mode, show code prominently, friendly name as subtitle
- [ ] Prioritize the 9 recently added protocols: `TG-CFC`, `TI-PBM`, `MGS-40`, `SMR-Mu`, `RF-HRV`, `ACSW`, `HCI-639`, `ATB-10`, `GMU-1.5`

**Examples of friendly name mapping:**
| Code | Current Display | Friendly Name |
|---|---|---|
| `TG-CFC` | TG-CFC | Memory-Boost Theta Sync |
| `TI-PBM` | TI-PBM | Deep Theta Journey |
| `MGS-40` | MGS-40 | Gamma Focus Sweep |
| `SMR-Mu` | SMR-Mu | Calm Body, Alert Mind |
| `RF-HRV` | RF-HRV | Heart-Breath Harmony |
| `ACSW` | ACSW | Slow-Wave Sleep Optimizer |
| `HCI-639` | HCI-639 | Heart Coherence 639 |
| `ATB-10` | ATB-10 | Creative Heart Flow |
| `GMU-1.5` | GMU-1.5 | Manifestation Resonance |

---

## 5. IN-APP TECHNICAL JARGON IN LABELS

**Files:** `DesktopApp.tsx`, `MobileApp.tsx`, `ManualTuningPanel.tsx`

| Location | Current Label | Problem | Friendly Label | Expert Label |
|---|---|---|---|---|
| `DesktopApp.tsx:137` | `Neural Interface Active` | Sci-fi jargon, unclear | `Session Ready` | Keep |
| `DesktopApp.tsx:142` | `Master Gain` | Audio engineer term | `Volume` | `Master Gain` |
| `DesktopApp.tsx:246` | `DSP Algorithm` | Means nothing to 95% | `How It Works` | `DSP Algorithm` |
| `DesktopApp.tsx:258` | `Neuro Context` | Vague | `Research Background` | `Neuro Context` |
| `DesktopApp.tsx:187` | `LEVEL I` (evidence) | No explanation of scale | `Highest Evidence ★★★★★` | `Evidence Level I` |
| `MobileApp.tsx:221` | `Archive` (tab) | Sounds like history/trash | `Explore` | `Protocol Archive` |
| `MobileApp.tsx:229` | `Session` (tab) | OK but generic | `Play` or `Now Playing` | `Session` |
| `MobileApp.tsx:237` | `Technical` (tab) | Generic | `Fine-Tune` | `Technical` |
| `MobileApp.tsx:174` | `Metadata Locked` | Bizarre empty state | `Select a session first` | Keep |
| `ManualTuningPanel.tsx:46` | `Tactical Tuning` | Military jargon | `Fine Tuning` | `Tactical Tuning` |
| `ManualTuningPanel.tsx:47` | `Real-time Parameter Overrides` | Dev speak | `Personalize your session` | Keep |
| `ManualTuningPanel.tsx:84` | `Carrier Pitch` | DSP jargon | `Base Tone` | `Carrier Frequency` |
| `ManualTuningPanel.tsx:98` | `Beat Offset` | Jargon | `Rhythm Shift` | `Beat Offset (cents)` |
| `ManualTuningPanel.tsx:113` | `Noise Floor` | Engineering term | `Background Noise Level` | `Noise Floor` |
| `ManualTuningPanel.tsx:124` | `Overlay Intensity` | Ambiguous | `Harmonic Blend` | `Overlay Intensity` |
| `DesktopApp.tsx:282` | `Select Protocol to Begin` (empty state) | OK but cold | `Choose a session from the list →` | Keep |

**Checklist:**
- [ ] Create a centralized `strings.ts` / `labels.ts` file with all UI strings in both modes
- [ ] Replace all hardcoded text strings with references to the labels object
- [ ] Apply label switching based on `uiMode` context
- [ ] Fix empty state messages to be warm and directive

---

## 6. TYPOGRAPHY & READABILITY

**Critical Issues:**

| Location | Current Size | Problem | Fix |
|---|---|---|---|
| `ProtocolList.tsx:80` | `text-[9px]` description | Illegible at any zoom level | Minimum `text-xs` (12px) |
| `ProtocolList.tsx:78` | `text-xs` (12px) protocol title | Too small for a tappable item | `text-sm` (14px) |
| `ProtocolList.tsx:78` | `text-[8px]` category badge | Completely unreadable | Minimum `text-[10px]` or remove |
| `DesktopApp.tsx:109` | `text-[9px]` sidebar buttons | Barely visible | `text-xs` min |
| `MobileApp.tsx:221` | `text-[9px]` nav labels | Below accessibility threshold | `text-[10px]` min |
| `ManualTuningPanel.tsx:120` | `text-[9px]` value displays | Illegible | `text-xs` |

**WCAG Compliance:**
- [ ] Minimum body text: `text-xs` (12px) for low-priority content, `text-sm` for primary content
- [ ] Remove all `text-[8px]` and `text-[9px]` uses — replace with at least `text-[10px]`
- [ ] Ensure all interactive elements (buttons, tappable items) meet 44×44px minimum tap target
- [ ] Protocol list items (`p-3`) are borderline — expand to `p-4` for mobile
- [ ] Add `hover:` and `focus-visible:` ring states to all interactive elements for keyboard nav

---

## 7. INFORMATION ARCHITECTURE — NEW UI STRUCTURE

### Proposed Dual-Mode Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    SynSync Pro                          │
│              [ Guided ◄──────────► Expert ]             │  ← Global toggle, persistent
└─────────────────────────────────────────────────────────┘

GUIDED MODE (new users, casual users, mobile-first):
┌────────────────────────────────────────────────────────────────────┐
│  "What do you want to feel?"                                       │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │
│  │Sleep │ │Focus │ │Calm  │ │Energy│ │Mood  │ │Explore│          │  ← Goal tiles
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘          │
│                                                                    │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  ▶ Deep Sleep Delta    [Easy] [90min] ★★★★★ Evidence       │  │  ← Card with plain info
│  │    "Fall asleep faster and wake restored"                    │  │
│  └─────────────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  ▶ REM Dream Enhancer  [Moderate] [60min] ★★★★ Evidence     │  │
│  │    "Vivid dreams and memory consolidation"                   │  │
│  └─────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────┘

EXPERT MODE (current users, researchers, tinkerers):
→ Current 3-column desktop layout (nearly as-is)
→ Technical labels restored
→ DSP controls visible by default
→ Protocol codes shown prominently
```

**Checklist — Guided Mode:**
- [ ] Add `uiMode: 'guided' | 'expert'` to app state (persisted to localStorage)
- [ ] Create `GuidedHome.tsx` — goal-based landing tiles replacing the protocol list
- [ ] Goal tiles: Sleep, Focus, Calm, Energy, Mood, Creativity, Explore All
- [ ] Each goal tile maps to a filtered, sorted protocol list
- [ ] Replace accordion category list with simple flat card list in guided mode
- [ ] Add friendly duration display ("90 min", "20 min") to each protocol card
- [ ] Add difficulty/intensity indicator ("Gentle", "Moderate", "Intense") per protocol
- [ ] Show evidence stars (★★★★★) instead of "LEVEL I" nomenclature in guided mode
- [ ] Add "Start Here" or "Recommended for Beginners" badge to entry-level protocols

**Checklist — Expert Mode:**
- [ ] Keep all current layout and labels for expert mode
- [ ] Add "Advanced" badge to ManualTuningPanel in expert mode
- [ ] Show raw protocol IDs prominently
- [ ] Expose DSP algorithm panel by default

---

## 8. ONBOARDING & FIRST-RUN EXPERIENCE

**Current state:** App loads directly into protocol list with no context.

**Checklist:**
- [ ] Add a first-run splash/welcome screen (shows once, stored in localStorage)
- [ ] Welcome screen explains: what brainwave entrainment is in 2 sentences
- [ ] Mode picker on welcome: "I'm new here" → Guided, "I know what I'm doing" → Expert
- [ ] Safety notice integrated into first-run (not a scary red wall of text)
- [ ] "Start Here" recommended protocol for first-timers (suggest: `Schumann Grounding` or `Deep Relaxation` — something gentle)
- [ ] Headphone reminder during onboarding (binaural beats require headphones)

---

## 9. MOBILE UX IMPROVEMENTS

**File:** `MobileApp.tsx`

**Current issues:**
- Bottom nav icons are small with near-invisible 9px labels
- "Archive" is a confusing tab name for "browse protocols"
- No current protocol indicator in header (user can't see what's loaded)
- Volume slider in header is too small for touch

**Checklist:**
- [ ] Rename tabs: `Archive` → `Explore`, `Session` → `Play`, `Technical` → `Tune`
- [ ] Show active protocol name in mobile header when one is loaded
- [ ] Move volume slider to a more accessible spot (e.g., inside Session/Play tab)
- [ ] Increase bottom nav height to 64px+, icons to 24px, labels to 11px min
- [ ] Add active tab indicator (highlight, not just color change — add underline or pill)
- [ ] Show a "No protocol selected" mini-banner in Play tab when nothing is loaded, with a CTA to Explore tab
- [ ] Add haptic feedback hint comment for future native wrapper

---

## 10. PROTOCOL CARD / LIST ITEM DESIGN

**File:** `ProtocolList.tsx`

**Current issues:**
- Text sizes below 10px (`text-[9px]`, `text-[8px]`)
- Category badge is unreadable
- Description truncated after about 50 characters
- No visual differentiation between difficulty levels
- No duration displayed

**Checklist:**
- [ ] Increase protocol item padding from `p-3` to `p-4`
- [ ] Increase title from `text-xs` to `text-sm`
- [ ] Replace `text-[9px]` description with `text-xs` and 2-line clamp
- [ ] Replace `text-[8px]` category badge with a colored dot indicator or remove it
- [ ] Add duration badge to each protocol item (pull from `durationSeconds`)
- [ ] Add evidence strength indicator (stars or dots) to each item
- [ ] Add a subtle "New" badge to recently added protocols (`TG-CFC` etc.)
- [ ] Add search/filter input at top of protocol list
- [ ] Consider adding keyboard shortcut (↑↓ arrow keys) for protocol navigation in desktop mode

---

## 11. SESSION / PLAYER SCREEN

**Files:** `DesktopApp.tsx`, `MobileApp.tsx`

**Checklist:**
- [ ] Add a visible countdown timer to the main play screen (duration remaining, not just progress bar)
- [ ] Add "What you should feel" guidance text during playback (pull from `usageGoal`)
- [ ] Add a "pause and breathe" reminder at natural breakpoints between phases
- [ ] Make the play/pause button larger on mobile (current: 56px — increase to 64px min)
- [ ] Add a keyboard shortcut: Spacebar to play/pause (currently missing)
- [ ] Show phase name during playback (e.g., "Phase 2 of 3: Deep Delta Sustain")
- [ ] Add subtle visual pulse synced to beat frequency for visual reinforcement

---

## 12. EVIDENCE LEVEL DISPLAY

**Current:** `LEVEL I`, `LEVEL II`, `LEVEL III`, `LEVEL IV`, `LEVEL V`

No explanation of what these levels mean anywhere visible.

**Checklist:**
- [ ] Add an info tooltip explaining the evidence scale when user taps/hovers the badge
- [ ] Guided Mode: Show star ratings instead (Level I = ★★★★★, Level V = ★☆☆☆☆)
- [ ] Expert Mode: Keep "Level I" technical label, add tooltip
- [ ] Add a "What does this mean?" link in Guided Mode that opens a simple explanation modal

---

## 13. EMPTY STATES

| Screen | Current Empty State | Proposed |
|---|---|---|
| Desktop — no protocol | `Select Protocol to Begin` + CPU icon | `← Choose a session from the panel` with a pointing arrow |
| Mobile Play tab — no protocol | `Load Protocol to Begin` + CPU icon | `Tap Explore to browse sessions →` with a warm prompt |
| Mobile Tune tab — no protocol | `Metadata Locked` | `Select a session first to access tuning controls` |

**Checklist:**
- [ ] Replace all CPU-icon empty states with more welcoming iconography (Brain, Headphones, or custom)
- [ ] Empty state text should tell the user exactly what to do next
- [ ] On mobile, Tune tab empty state should have a button linking to the Explore tab

---

## 14. SAFETY & DISCLAIMER FLOW

**Current:** Safety gate modal blocks playback with a wall of text.

**Checklist:**
- [ ] Redesign safety gate to be a 3-step wizard (not a single scroll of disclaimers)
  - Step 1: "A few quick safety checks" (simple yes/no for each contraindication)
  - Step 2: Headphone/volume check
  - Step 3: "You're good to go" with context for the protocol
- [ ] Remember safety clearance per session (don't re-ask every protocol switch)
- [ ] Show safety indicators on protocol cards (e.g., "⚠ Headphones required" badge)

---

## 15. VISUAL POLISH & CONSISTENCY

**Checklist:**
- [ ] Scanlines overlay: reduce from `opacity-20` (desktop) to `opacity-10` or make optional in settings
- [ ] Ensure all `rounded-*` values are consistent (mix of `rounded`, `rounded-xl`, `rounded-2xl`)
- [ ] Standardize border radius: suggest `rounded-xl` for cards, `rounded-lg` for buttons
- [ ] Ensure all section headings are at least `text-sm` and not font-mono unless intentional
- [ ] Add a subtle background pattern variation for Guided vs Expert mode to reinforce the switch
- [ ] Loading states: Add skeleton loaders for protocol list (currently none)
- [ ] Hover states: All clickable items need consistent hover feedback (some missing)

---

## 16. SETTINGS & PREFERENCES (Currently Missing)

**Checklist:**
- [ ] Add a Settings panel (gear icon in header)
- [ ] Settings: UI Mode (Guided / Expert) — persisted
- [ ] Settings: Scanlines toggle (some find it headache-inducing)
- [ ] Settings: Reduce motion toggle (for accessibility)
- [ ] Settings: Default playback volume
- [ ] Settings: Theme (keep current Neuro as default, but expose alternatives)
- [ ] Settings: Headphone warning (enable/disable)

---

## PRIORITY ORDER — WHAT TO BUILD FIRST

### Phase 1 — Quick Wins (Language & Readability) — High Impact, Low Effort
1. Fix "WOO WOO" → "Exploratory" / "SCIENCE" → "Research-Backed"
2. Fix NEUROMAX → SynSync Pro in `LandingPage.tsx`
3. Bump all `text-[8px]` and `text-[9px]` to minimum `text-[10px]`/`text-xs`
4. Fix tab labels: Archive→Explore, Technical→Tune
5. Fix empty state messages
6. Rename scary section names (Mimicry categories, Autonomic Mastery, etc.)
7. Add evidence tooltips

### Phase 2 — Guided Mode Foundation — Medium Effort, Huge Impact
8. Add `uiMode` state + localStorage persistence
9. Build goal-based home tiles for Guided Mode
10. Friendly protocol card design (duration, stars, description)
11. Add search input to protocol list
12. Centralized `labels.ts` for all UI strings

### Phase 3 — Session & Onboarding Experience
13. First-run welcome screen
14. Redesign safety gate as wizard
15. Phase display during playback
16. Countdown timer in player
17. Spacebar keyboard shortcut

### Phase 4 — Expert Mode Enhancements
18. Keep current layout, add new Expert-specific features
19. Advanced DSP visualization
20. Protocol stacking interface

### Phase 5 — Settings & Polish
21. Settings panel
22. Scanlines toggle
23. Skeleton loaders
24. Animation consistency pass

---

## FILES TO TOUCH

| File | Changes Needed |
|---|---|
| `components/DesktopApp.tsx` | Label changes, mode toggle text, empty state |
| `components/MobileApp.tsx` | Tab labels, empty states, header improvements |
| `components/ProtocolList.tsx` | Font sizes, section names, search, friendly names |
| `components/ManualTuningPanel.tsx` | All label text changes |
| `components/LandingPage.tsx` | Brand name fix |
| `App.tsx` | Add `uiMode` state |
| `contexts/ThemeContext.tsx` | Add `uiMode` context |
| `NEW: components/GuidedHome.tsx` | Goal-based protocol browser |
| `NEW: src/labels.ts` | Centralized UI strings in both modes |
| `NEW: components/WelcomeScreen.tsx` | First-run onboarding |
| `NEW: components/SettingsPanel.tsx` | User preferences |

---

*This checklist was generated from a full audit of the codebase on 2026-02-20. All file:line references are from the current `claude/review-ui-ux-cOhQL` branch.*
