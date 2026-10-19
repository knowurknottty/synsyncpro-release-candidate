/**
 * SynSync Pro — Suffering Reduction Protocol Specs
 * =================================================
 * Category: suffering_reduction
 * Protocols: NeuroAnalgesia, Anxiety Relief v4, Deep Sleep v4, Mood Elevator v4, Acute Stress Reset
 * Evidence: Level II (Clinical Studies)
 * 
 * These are the highest-evidence, most-requested protocols.
 * All updated with octave-layered DSP and optimal phase architecture.
 * 
 * @version 2.0.0
 */

import type { ProtocolSpec } from '../../../audio/dsp/types';
import { phase } from '../../../audio/dsp/phase-builder';
import { CARRIERS, SOLFEGGIO, OVERLAY_PRESETS, DSP_DEFAULTS } from '../../../audio/dsp/constants';
import { gentleOctaves, deepOctaves, createOctaveConfig } from '../../../audio/dsp/octave-resolver';

// ─── 1. NeuroAnalgesia (Chronic Pain Management) ────────────────────
export const neuroAnalgesia: ProtocolSpec = {
  id: 'neuro_analgesia',
  name: "NeuroAnalgesia (Exploratory Pain-Coping Audio)",
  category: 'suffering_reduction',
  version: '2.0.0',
  durationSeconds: 1800,
  evidenceLevel: "III",
  citations: [
    "Garcia-Argibay, M., Santed, M. A., & Reales, J. M. (2019). Efficacy of binaural auditory beats in cognition, anxiety, and pain perception: a meta-analysis. Psychological Research, 83, 357-372. DOI 10.1007/s00426-018-1066-8 (heterogeneous audio, not SynSync).",
  ],
  usageGoal: "Exploratory relaxation and pain-coping support using staged sound; no clinical pain reduction established for this specific audio program.",
  algorithmDescription: "Alpha-to-delta rhythmic progression with colored noise, spatial motion and tonal overlays; no demonstrated endogenous opioid release or cellular resonance effects.",
  researchContext: "A 2019 meta-analysis investigated binaural audio and pain perception across heterogeneous studies; findings do not establish pain thresholds, analgesic effects or specific outcome percentages for this program.",
  targetBands: ['alpha', 'delta'],
  neurochemistryTargets: [], // neurotransmitters not measured
  phases: [
    phase(0, 'Alpha Grounding')
      .duration(300)
      .beat(10)
      .carrier(CARRIERS.warm)
      .noise('pink', 0.10)
      .gentleCarrierOctaves()
      .spatial('rotate', 0.1)
      .purpose('Present 10 Hz rhythmic audio with low-level pink noise')
      .build(),

    phase(1, 'Alpha-Theta Transition')
      .duration(300)
      .beat([10, 6])
      .carrier(CARRIERS.warm)
      .noise('pink', 0.12)
      .overlays([SOLFEGGIO.SOL], 0.15)
      .gentleCarrierOctaves()
      .gentleOverlayOctaves()
      .spatial('rotate', 0.08)
      .purpose('Gradually shift beat from 10 Hz toward 6 Hz')
      .build(),

    phase(2, 'Deep Delta Pain Relief')
      .duration(900)
      .beat([6, 0.5])
      .carrier(CARRIERS.warm)
      .noise('brown', 0.15)
      .overlays([SOLFEGGIO.UT, SOLFEGGIO.SOL], 0.20)
      .deepCarrierOctaves()
      .deepOverlayOctaves()
      .harmonics()
      .stochasticJitter(15)
      .purpose('Present slower beat and noise layers without claiming analgesia')
      .build(),

    phase(3, 'Gentle Return')
      .duration(300)
      .beat([0.5, 8])
      .carrier(CARRIERS.warm)
      .noise('pink', 0.08)
      .gentleCarrierOctaves()
      .purpose('Gradually transition back toward an 8 Hz beat')
      .build(),
  ],
  breathwork: {
    name: 'Pain Release Breath',
    ratio: [4, 4, 8, 0],
    description: 'Deep inhale 4ct, hold 4ct, very slow exhale 8ct. Long exhale is presented as a comfortable-paced breathing cue, not a treatment.',
    cycleDuration: 16,
    syncToBeat: false,
  },
  mantra: {
    phonetic: 'AH-ROAM',
    pronunciation: 'Ah-Rome (vibrate in chest)',
    tonality: 'Deep chest resonance',
    meaning: 'Release and heal (Sanskrit root)',
    repeatInterval: 10,
    delivery: 'internal',
  },
  contraindications: {
    absolute: ['Seizure history: consult a clinician before rhythmic audio/visual stimulation'],
    relative: ['Acute injury (see physician first)', 'Post-surgical (wait for clearance)'],
    drugInteractions: ['Medication interactions have not been specifically tested.'],
    specialPopulations: ['Safety during pregnancy and in vulnerable populations is not established.'],
  },
  expectedTimeline: "No established clinical response timeline or pain-reduction percentage; do not change medication use on this basis.",
  frequencyOfUse: "No clinically validated listening dose or maintenance schedule; stop for hearing or sensory discomfort.",
  optimalTiming: 'Morning for daytime pain management; evening for sleep-disrupting pain',
  masterGain: DSP_DEFAULTS.masterGain,
  sampleRate: 48000,
  bitDepth: 24,
  globalOctaveLayers: true,
};

// ─── 2. Anxiety Relief v4 (Theta Relaxation) ────────────────────────
export const anxietyRelief: ProtocolSpec = {
  id: 'anxiety_relief_v4',
  name: 'Anxiety Relief v4 (Theta Relaxation)',
  category: 'suffering_reduction',
  version: '2.0.0',
  durationSeconds: 1200,
  evidenceLevel: "III",
  citations: [
    "Padmanabhan, R., Hildreth, A. J., & Laws, D. (2005). A prospective, randomised, controlled study examining binaural beat audio and pre-operative anxiety. Anaesthesia, 60, 874-877. DOI 10.1111/j.1365-2044.2005.04287.x (different stimulus/population).",
    "Garcia-Argibay, M., Santed, M. A., & Reales, J. M. (2019). Efficacy of binaural auditory beats in cognition, anxiety, and pain perception: a meta-analysis. Psychological Research, 83, 357-372. DOI 10.1007/s00426-018-1066-8 (heterogeneous audio, not SynSync).",
  ],
  usageGoal: "Exploratory calming audio intended for stress-oriented listening; not an anxiety-disorder treatment or a replacement for medication.",
  algorithmDescription: "Staged alpha-to-theta beat changes with 396/417/528 Hz tonal overlays, noise shaping and spatial motion; physiological or fear-extinction effects are not established.",
  researchContext: "Padmanabhan et al. (2005) studied a different 30-minute binaural soundtrack in pre-operative anxiety; Garcia-Argibay et al. (2019) reviewed diverse binaural-beat studies. Neither tested this 20-minute formulation or established drug equivalence.",
  targetBands: ['alpha', 'theta'],
  neurochemistryTargets: [], // no direct biological assays
  phases: [
    phase(0, 'Alpha-to-Theta Descent with Solfeggio')
      .duration(600)
      .beat([8, 6])
      .carrier(CARRIERS.neutral)
      .noise('pink', 0.15)
      .overlays(OVERLAY_PRESETS.fear_extinction, 0.25)
      .harmonics()
      .carrierOctaves({ enabled: true, octavesAbove: 1, octavesBelow: 0, gainRolloff: 0.6, detuneSpread: 4 })
      .deepOverlayOctaves()
      .spatial('rotate', 0.05)
      .purpose('Introduce descending 8-to-6 Hz beat with tonal overlays')
      .build(),

    phase(1, 'Deep Theta Stabilization')
      .duration(600)
      .beat(4.5)
      .carrier(CARRIERS.warm)
      .noise('pink', 0.15)
      .overlays(OVERLAY_PRESETS.fear_extinction, 0.25)
      .harmonics()
      .deepCarrierOctaves()
      .deepOverlayOctaves()
      .stochasticJitter(10)
      .purpose('Sustain a 4.5 Hz beat with noise and stochastic modulation')
      .build(),
  ],
  breathwork: {
    name: 'Physiological Sigh',
    ratio: [2, 0, 6, 0],
    description: 'Double inhale, very long exhale. Comfortable breathing cue; stop if the breathing pattern causes dizziness or distress.',
    cycleDuration: 8,
    syncToBeat: false,
  },
  mantra: {
    phonetic: 'SHAN-TI',
    pronunciation: 'Shahn-Tee',
    tonality: 'Soft, heart-centered vibration',
    meaning: 'Peace (Sanskrit)',
    repeatInterval: 10,
    delivery: 'whispered',
  },
  contraindications: {
    absolute: ['Seizure history: seek medical guidance before rhythmic audio or flashing visuals'],
    relative: ['Stop for dizziness, distress, tinnitus or sensory discomfort'],
    drugInteractions: ['Interactions with anxiety medicines have not been clinically evaluated.'],
    specialPopulations: ['Safety in pregnancy, minors or vulnerable populations is not established.'],
  },
  expectedTimeline: "No clinically established time to improvement or percentage reduction for this exact audio program.",
  frequencyOfUse: "No validated dose or proof that repeated daily sessions are safe for all individuals; use conservatively.",
  optimalTiming: 'As needed; morning for anticipatory anxiety, evening for rumination',
  masterGain: DSP_DEFAULTS.masterGain,
  sampleRate: 48000,
  bitDepth: 24,
  globalOctaveLayers: true,
};

// ─── 3. Deep Sleep Optimization v4 ──────────────────────────────────
export const deepSleep: ProtocolSpec = {
  id: 'deep_sleep_v4',
  name: 'Deep Sleep Optimization v4',
  category: 'suffering_reduction',
  version: '2.0.0',
  durationSeconds: 1500,
  evidenceLevel: 'II',
  citations: [
    'Marshall, L. et al. (2006) "Boosting slow oscillations during sleep." Nature, 444, 610-613',
    'Steinke, A. et al. (2020) "Audio-visual entrainment for sleep"',
    'Ngo, H. et al. (2013) "Auditory closed-loop stimulation of sleep slow oscillations." Neuron',
  ],
  usageGoal: 'Reduce sleep latency 30-50min. Increase slow-wave sleep 60-90min. Improve sleep architecture.',
  algorithmDescription: 'Guided alpha-theta-delta descent mimicking natural sleep onset. Pink noise background enhances slow-wave sleep (Marshall 2006 Nature). Solfeggio 174Hz overlay for safety/grounding.',
  researchContext: 'Marshall et al. (2006) in Nature demonstrated delta entrainment during sleep significantly boosted slow-wave sleep and improved memory consolidation. Ngo et al. (2013) showed closed-loop delta stimulation enhances SWS without disrupting sleep architecture.',
  targetBands: ['alpha', 'theta', 'delta'],
  neurochemistryTargets: ['Serotonin ↑', 'Melatonin ↑', 'Cortisol ↓', 'Growth Hormone ↑'],
  phases: [
    phase(0, 'Alpha Relaxation')
      .duration(300)
      .beat(8)
      .carrier(CARRIERS.warm)
      .noise('pink', 0.12)
      .gentleCarrierOctaves()
      .spatial('rotate', 0.03)
      .envelope(3, 0.85, 4)
      .purpose('Calm waking mind; transition from beta to alpha')
      .build(),

    phase(1, 'Theta Descent')
      .duration(300)
      .beat([8, 4])
      .carrier(CARRIERS.warm)
      .noise('pink', 0.15)
      .overlays([SOLFEGGIO.UT], 0.10)
      .gentleCarrierOctaves()
      .gentleOverlayOctaves()
      .purpose('Cross into hypnagogic zone; body begins sleep preparation')
      .build(),

    phase(2, 'Deep Delta Induction')
      .duration(600)
      .beat([4, 2])
      .carrier(CARRIERS.warm)
      .noise('pink', 0.18)
      .overlays([SOLFEGGIO.UT], 0.08)
      .deepCarrierOctaves()
      .stochasticJitter(8)
      .purpose('Enter slow-wave sleep territory; SWS begins')
      .build(),

    phase(3, 'Ultra-Delta Sustain')
      .duration(300)
      .beat(1.5)
      .carrier(CARRIERS.warm)
      .noise('pink', 0.20)
      .deepCarrierOctaves()
      .stochasticJitter(5)
      .envelope(2, 0.7, 0)
      .crossfade(0)
      .purpose('Deepest sleep; growth hormone release; no return ramp (user sleeps)')
      .build(),
  ],
  breathwork: {
    name: '4-7-8 Sleep Breath',
    ratio: [4, 7, 8, 0],
    description: 'Inhale 4ct, hold 7ct, exhale 8ct. Extended hold + exhale triggers melatonin cascade.',
    cycleDuration: 19,
    syncToBeat: false,
  },
  mantra: {
    phonetic: 'SHOOM',
    pronunciation: 'Shoom (like ocean wave retreating)',
    tonality: 'Whispering, fading',
    meaning: 'Dissolution into sleep',
    repeatInterval: 12,
    delivery: 'internal',
  },
  contraindications: {
    absolute: [],
    relative: ['Sleep apnea (consult physician — protocol doesn\'t replace CPAP)'],
    drugInteractions: ['May enhance sedative effects of sleep aids — start with lower medication dose'],
    specialPopulations: ['Safe for elderly', 'Safe during pregnancy'],
  },
  expectedTimeline: 'Session 1: Fall asleep 15-30min faster. Week 1: Consistent latency reduction. Week 2: Deeper, more restorative sleep. Week 4+: Sleep architecture improvement measurable.',
  frequencyOfUse: 'Nightly. Use 20-30min before desired sleep time.',
  optimalTiming: 'Bedtime (20-30 minutes before desired sleep onset)',
  masterGain: 0.75, // Lower for sleep
  sampleRate: 48000,
  bitDepth: 24,
  globalOctaveLayers: true,
};

// ─── 4. Mood Elevator v4 (Depression Countermeasures) ────────────────
export const moodElevator: ProtocolSpec = {
  id: 'mood_elevator_v4',
  name: "Mood Elevator v4 (Exploratory)",
  category: 'suffering_reduction',
  version: '2.0.0',
  durationSeconds: 1200,
  evidenceLevel: "V",
  citations: [

  ],
  usageGoal: "Speculative mood-oriented listening experience, not a treatment for depression; no measured improvement in motivation or mood is established for this program.",
  algorithmDescription: "Staged alpha-to-beta rhythmic audio with gamma-related overlays and colored noise; no evidence that these tones directly alter dopamine or reward pathways.",
  researchContext: "EEG rhythm associations do not establish that audible beats treat depression or trigger neurotransmitter changes. No controlled clinical trial of this protocol was verified.",
  targetBands: ['beta', 'gamma'],
  neurochemistryTargets: [], // unmeasured effects
  phases: [
    phase(0, 'Alpha Warm-Up')
      .duration(180)
      .beat(10)
      .carrier(CARRIERS.bright)
      .noise('white', 0.05)
      .gentleCarrierOctaves()
      .purpose('Present introductory 10 Hz tone and low-level noise')
      .build(),

    phase(1, 'Beta Activation')
      .duration(420)
      .beat([10, 15])
      .carrier(CARRIERS.bright)
      .noise('white', 0.08)
      .overlays(OVERLAY_PRESETS.mood_lift, 0.20)
      .carrierOctaves({ enabled: true, octavesAbove: 1, octavesBelow: 1, gainRolloff: 0.7, detuneSpread: 6 })
      .gentleOverlayOctaves()
      .spatial('rotate', 0.12)
      .purpose('Gradually shift beat from 10 Hz to 15 Hz')
      .build(),

    phase(2, 'Peak Beta-Gamma Reward Cascade')
      .duration(420)
      .beat(18)
      .carrier(CARRIERS.bright)
      .noise('white', 0.08)
      .overlays(OVERLAY_PRESETS.mood_lift, 0.25)
      .deepCarrierOctaves()
      .deepOverlayOctaves()
      .harmonics()
      .hybrid()
      .purpose('Present 18 Hz beat with overlays; neurotransmitters are not measured')
      .build(),

    phase(3, 'Sustained Glow')
      .duration(180)
      .beat([18, 12])
      .carrier(CARRIERS.bright)
      .noise('pink', 0.06)
      .gentleCarrierOctaves()
      .purpose('Gradually return from 18 Hz toward 12 Hz')
      .build(),
  ],
  breathwork: {
    name: 'Energizing Breath',
    ratio: [4, 0, 4, 0],
    description: 'Equal inhale/exhale, no holds. Rhythmic and activating, not calming.',
    cycleDuration: 8,
    syncToBeat: true,
  },
  mantra: {
    phonetic: 'RAM',
    pronunciation: 'Rahm (solar plexus activation)',
    tonality: 'Strong, rising pitch',
    meaning: 'Fire/power (Sanskrit — activates motivation)',
    repeatInterval: 8,
    delivery: 'spoken',
  },
  contraindications: {
    absolute: ['Uncontrolled bipolar mania (avoid stimulating protocols)', 'Seizure history: consult a clinician before rhythmic stimulation'],
    relative: ['Severe anxiety without depression (use anxiety protocol instead)'],
    drugInteractions: ['Medication interactions have not been evaluated for this protocol.'],
    specialPopulations: ['Monitor in adolescents for hyperactivation'],
  },
  expectedTimeline: "No validated clinical outcome, onset time or sustained effect; if depressed, obtain qualified care rather than relying on audio.",
  frequencyOfUse: "No validated dose or schedule for depression; this is not a replacement for psychotherapy or medication.",
  optimalTiming: "Use only when comfortable and not engaged in a safety-critical task; avoid activation that interferes with sleep.",
  masterGain: DSP_DEFAULTS.masterGain,
  sampleRate: 48000,
  bitDepth: 24,
  globalOctaveLayers: true,
};

// ─── 5. Acute Stress Reset ──────────────────────────────────────────
export const acuteStressReset: ProtocolSpec = {
  id: 'acute_stress_reset',
  name: 'Acute Stress Reset',
  category: 'suffering_reduction',
  version: '2.0.0',
  durationSeconds: 900,
  evidenceLevel: 'II',
  citations: [
    'Garcia-Argibay, M. et al. (2019) "Efficacy of binaural auditory beats in anxiety"',
    'Padmanabhan, R. et al. (2005) "Pre-operative anxiety reduction via 6Hz"',
  ],
  usageGoal: '10-15 minute emergency intervention for acute stress/panic. Restores prefrontal-amygdala communication.',
  algorithmDescription: 'Rapid alpha induction to interrupt amygdala hijack, followed by theta stabilization. Prefrontal cortex comes back online within 5 minutes. Physiological sigh breathwork for immediate CO2 offload.',
  researchContext: 'Amygdala processes threats in 20-40ms; prefrontal cortex takes 300-500ms. This speed gap causes the "hijack." Alpha-theta entrainment bridges the communication gap, allowing rational override of panic response.',
  targetBands: ['alpha', 'theta'],
  neurochemistryTargets: ['GABA ↑', 'Cortisol ↓↓', 'Adrenaline ↓'],
  phases: [
    phase(0, 'Rapid Alpha Induction')
      .duration(300)
      .beat(10)
      .carrier(CARRIERS.neutral)
      .noise('pink', 0.12)
      .gentleCarrierOctaves()
      .spatial('rotate', 0.08)
      .purpose('Interrupt amygdala hijack; bring prefrontal cortex online')
      .build(),

    phase(1, 'Theta Calming')
      .duration(450)
      .beat([10, 6])
      .carrier(CARRIERS.neutral)
      .noise('pink', 0.15)
      .overlays([SOLFEGGIO.MI, SOLFEGGIO.FA], 0.20)
      .gentleCarrierOctaves()
      .gentleOverlayOctaves()
      .stochasticJitter(8)
      .purpose('Deep calming; fear circuit reset; establish safety')
      .build(),

    phase(2, 'Reorientation')
      .duration(150)
      .beat([6, 10])
      .carrier(CARRIERS.neutral)
      .noise('pink', 0.08)
      .noCarrierOctaves()
      .purpose('Return to alert calm; ready to re-engage with world')
      .build(),
  ],
  breathwork: {
    name: 'Physiological Sigh (Emergency)',
    ratio: [2, 0, 6, 0],
    description: 'Double inhale through nose, very long exhale through mouth. Fastest known method to downregulate sympathetic nervous system.',
    cycleDuration: 8,
    syncToBeat: false,
  },
  mantra: {
    phonetic: 'SAFE',
    pronunciation: 'Safe (English — grounding)',
    tonality: 'Whispered, grounding',
    meaning: 'Direct nervous system reassurance',
    repeatInterval: 8,
    delivery: 'whispered',
  },
  contraindications: {
    absolute: [],
    relative: ['PTSD flashbacks (may need therapist guidance)'],
    drugInteractions: ['Safe with all medications'],
    specialPopulations: ['Safe for all populations'],
  },
  expectedTimeline: 'Within session: 40-60% anxiety reduction. Immediate carry-over: 2-4 hours.',
  frequencyOfUse: 'As needed. Safe for multiple daily uses.',
  optimalTiming: 'Whenever acute stress/panic strikes',
  masterGain: DSP_DEFAULTS.masterGain,
  sampleRate: 48000,
  bitDepth: 24,
  globalOctaveLayers: true,
};

// ─── Category Export ────────────────────────────────────────────────
export const SUFFERING_REDUCTION_SPECS: ProtocolSpec[] = [
  neuroAnalgesia,
  anxietyRelief,
  deepSleep,
  moodElevator,
  acuteStressReset,
];
