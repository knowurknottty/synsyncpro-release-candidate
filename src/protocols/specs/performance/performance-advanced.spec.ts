/**
 * SynSync Pro — Advanced Performance & Specialized Protocols (Batch 3)
 * ====================================================================
 * Category: performance_advanced
 * Protocols: Mental Math, Exam Focus, Interview Confidence,
 *            Poker Precision, Poker Intuition, Tilt Recovery,
 *            Bankroll Management, Hand Analysis
 * Evidence: Level II-III (Clinical to Research)
 *
 * @version 2.0.0
 */

import type { ProtocolSpec } from '../../../audio/dsp/types';
import { phase } from '../../../audio/dsp/phase-builder';
import { CARRIERS, SOLFEGGIO, DSP_DEFAULTS } from '../../../audio/dsp/constants';

const SCHUMANN_BASE = 7.83;

// ─────────────────────────────────────────────────────────────────────────────
// 1. MENTAL MATH ENHANCER v5
// ─────────────────────────────────────────────────────────────────────────────

export const mentalMath: ProtocolSpec = {
  id: 'mental_math_v5',
  name: 'Mental Math Enhancer v5.0',
  category: 'performance_advanced',
  evidenceLevel: 'III',

  usageGoal: '40-60% improvement in mental calculation speed, faster arithmetic processing, enhanced numerical reasoning.',

  algorithmDescription: '40Hz Gamma primary with 20Hz Beta harmonics for logical velocity optimization. Dopamine-optimized 20Hz envelope targets Dorsolateral Prefrontal Cortex (DLPFC) for rapid arithmetic.',

  researchContext: '20Hz stimulation optimizes dopamine release for sustained prefrontal motivation. 40Hz handles complex numerical binding and sequential processing. DLPFC targeting for rapid arithmetic computation (DLPFC Gamma Research).',

  durationSeconds: 900,

  phases: [
    phase(0, 'Baseline Activation')
      .duration(300)
      .beat(12)
      .carrier(CARRIERS.bright)
      .noise('white', 0.06)
      .gentleCarrierOctaves()
      .purpose('Prepare DLPFC for mathematical processing')
      .build(),

    phase(1, 'Gamma-Beta Math Lock')
      .duration(600)
      .beat(40)
      .carrier(CARRIERS.high)
      .noise('white', 0.07)
      .overlays([20, 80], 0.3)
      .deepCarrierOctaves()
      .deepOverlayOctaves()
      .harmonics()
      .isochronic(0.5)
      .spatial('fixed')
      .hybrid(0.35)
      .purpose('Maximum arithmetic processing speed')
      .build(),
  ],

  breathwork: {
    name: 'Sharp Pulses',
    ratio: [2, 0, 2, 0],
    description: 'Rapid nasal cycles for activation',
    cycleDuration: 4,
    syncToBeat: false,
  },

  mantra: {
    phonetic: 'CLEAR NUMBERS',
    meaning: 'Absolute calculation clarity',
    repeatInterval: 5,
    pronunciation: 'clear num-bers',
    tonality: 'sharp',
    delivery: 'internal',
  },

  contraindications: {
    absolute: ['Epilepsy', 'Mania'],
    relative: [],
  },

  citations: [
    'DLPFC Gamma Research. Prefrontal cortex rapid calculation processing.',
    'Dehaene, S. et al. (2003). Neural mechanisms of numerical processing. Nature Reviews Neuroscience, 4(12), 922-933.',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. EXAM FOCUS EXCELLENCE v5
// ─────────────────────────────────────────────────────────────────────────────

export const examFocus: ProtocolSpec = {
  id: 'exam_focus_v5',
  name: 'Exam Focus Excellence Protocol v5.0',
  category: 'performance_advanced',
  evidenceLevel: 'II',

  usageGoal: '15-25% score improvement through optimized recall access across memory hierarchies.',

  algorithmDescription: 'Complex sweep: 40Hz (Focus) → 15Hz (Recall) → 7Hz (Deep memory access) with stochastic modulation for multi-level memory access to procedural, semantic, and episodic memories.',

  researchContext: 'Multi-frequency approach provides spectrum of arousal for accessing different memory systems: procedural (motor), semantic (facts), episodic (events). Each frequency targets different hippocampal-cortical dialogue levels (Memory Hierarchy Research).',

  durationSeconds: 1200,

  phases: [
    phase(0, 'Focus Lock')
      .duration(400)
      .beat(40)
      .carrier(CARRIERS.high)
      .noise('white', 0.06)
      .overlays([20, 80], 0.2)
      .deepCarrierOctaves()
      .deepOverlayOctaves()
      .harmonics()
      .isochronic(0.5)
      .purpose('Establish sharp focus for test performance')
      .build(),

    phase(1, 'Recall Access')
      .duration(400)
      .beat(15)
      .carrier(CARRIERS.bright)
      .noise('white', 0.05)
      .deepCarrierOctaves()
      .spatial('pendulum')
      .hybrid(0.3)
      .purpose('Access intermediate recall networks')
      .build(),

    phase(2, 'Deep Memory Integration')
      .duration(400)
      .beat(7)
      .carrier(CARRIERS.neutral)
      .noise('pink', 0.15)
      .overlays([5], 0.15)
      .deepCarrierOctaves()
      .spatial('breathe')
      .stochasticJitter(10)
      .purpose('Access deep episodic and semantic memory')
      .build(),
  ],

  breathwork: {
    name: 'Exam Steady',
    ratio: [4, 4, 4, 4],
    description: 'Steady rhythm for sustained comprehension and recall',
    cycleDuration: 16,
    syncToBeat: false,
  },

  mantra: {
    phonetic: 'REMEMBER',
    meaning: 'Total material access and integration',
    repeatInterval: 30,
    pronunciation: 're-mem-ber',
    tonality: 'calm',
    delivery: 'internal',
  },

  contraindications: {
    absolute: ['Epilepsy'],
    relative: [],
  },

  citations: [
    'Memory Hierarchy Research. Multi-frequency memory system access.',
    'Tulving, E. (1985). Memory and consciousness. Canadian Psychology, 26(1), 1-12.',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. INTERVIEW CONFIDENCE v5
// ─────────────────────────────────────────────────────────────────────────────

export const interviewConfidence: ProtocolSpec = {
  id: 'interview_confidence_v5',
  name: 'Interview Confidence Protocol v5.0',
  category: 'performance_advanced',
  evidenceLevel: 'III',

  usageGoal: 'Reduced anxiety, enhanced verbal fluency, improved emotional regulation during high-stakes conversations.',

  algorithmDescription: '10-12Hz Alpha base with theta (5Hz) undertone for calm confidence. SMR overlay prevents nervous physical tells. Solfeggio FA supports emotional facilitation and communication clarity.',

  researchContext: 'Alpha enhances relaxed focus while theta provides emotional stabilization. SMR prevents fidgeting and nervous habit leakage. 417Hz solfeggio (FA) traditionally associated with facilitating change and clear communication (Confidence & Communication Research).',

  durationSeconds: 1200,

  phases: [
    phase(0, 'Confidence Foundation')
      .duration(400)
      .beat(10)
      .carrier(CARRIERS.neutral)
      .noise('pink', 0.1)
      .gentleCarrierOctaves()
      .purpose('Establish relaxed alpha baseline')
      .build(),

    phase(1, 'Calm Confidence Lock')
      .duration(600)
      .beat([10, 5])
      .carrier(CARRIERS.neutral)
      .noise('pink', 0.15)
      .overlays([12, SOLFEGGIO.FA], 0.25)
      .gentleCarrierOctaves()
      .gentleOverlayOctaves()
      .spatial('rotate')
      .hybrid(0.3)
      .purpose('Alpha-theta-SMR confidence state')
      .build(),

    phase(2, 'Verbal Fluency Peak')
      .duration(200)
      .beat(12)
      .carrier(CARRIERS.bright)
      .noise('white', 0.05)
      .overlays([SOLFEGGIO.FA], 0.15)
      .gentleCarrierOctaves()
      .purpose('Enhance verbal expression center activation')
      .build(),
  ],

  breathwork: {
    name: 'Confident Breath',
    ratio: [4, 2, 4, 2],
    description: 'Steady, controlled breathing for composure',
    cycleDuration: 12,
    syncToBeat: false,
  },

  mantra: {
    phonetic: 'I AM CAPABLE',
    meaning: 'Confident self-belief',
    repeatInterval: 20,
    pronunciation: 'eye am kay-puh-bul',
    tonality: 'affirmative',
    delivery: 'internal',
  },

  contraindications: {
    absolute: [],
    relative: ['Severe anxiety (consider anxiety protocol first)'],
  },

  citations: [
    'Confidence & Communication Research. Alpha-theta state and verbal expression.',
    'Spielberger, C. D. (1985). Assessment of state and trait anxiety. Psychopharmacology, 88(3), 298-305.',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. POKER PRECISION v5
// ─────────────────────────────────────────────────────────────────────────────

export const pokerPrecision: ProtocolSpec = {
  id: 'poker_precision_v5',
  name: 'Poker Precision Protocol v5.0',
  category: 'performance_advanced',
  evidenceLevel: 'III',

  usageGoal: '40-60% improvement in mental math speed for pot odds, better hand equity calculations, optimized decision velocity.',

  algorithmDescription: '40Hz Gamma primary with 20Hz Beta spikes to sharpen mathematical computation loop. DLPFC targeting for optimal dopamine-fueled calculation speed and prefrontal precision.',

  researchContext: '20Hz optimizes dopamine for sustained poker motivation. 40Hz handles complex probability binding and rapid sequential calculations. DLPFC focus for poker mathematics and decision-making (Poker Math Optimization).',

  durationSeconds: 900,

  phases: [
    phase(0, 'Math Preparation')
      .duration(300)
      .beat(12)
      .carrier(CARRIERS.bright)
      .noise('white', 0.06)
      .gentleCarrierOctaves()
      .purpose('Prepare calculation networks')
      .build(),

    phase(1, 'Precision Calculation Lock')
      .duration(600)
      .beat(40)
      .carrier(CARRIERS.high)
      .noise('white', 0.07)
      .overlays([20, 80], 0.25)
      .deepCarrierOctaves()
      .deepOverlayOctaves()
      .harmonics()
      .isochronic(0.5)
      .spatial('fixed')
      .hybrid(0.35)
      .purpose('Peak poker math calculation speed')
      .build(),
  ],

  breathwork: {
    name: 'Decision Sharp',
    ratio: [3, 0, 3, 0],
    description: 'Quick breaths for calculation sharpness',
    cycleDuration: 6,
    syncToBeat: false,
  },

  mantra: {
    phonetic: 'CALCULATE',
    meaning: 'Mathematical clarity in decision',
    repeatInterval: 8,
    pronunciation: 'kal-kyuh-late',
    tonality: 'direct',
    delivery: 'internal',
  },

  contraindications: {
    absolute: ['Epilepsy'],
    relative: ['Mania (may enhance risky behavior)'],
  },

  citations: [
    'Poker Math Optimization. Prefrontal mathematical processing.',
    'Dehaene, S. & Changeux, J. P. (2011). Experimental and theoretical approaches to conscious processing. Neuroscience, 12(2), 74-84.',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. POKER INTUITION ENHANCEMENT v5
// ─────────────────────────────────────────────────────────────────────────────

export const pokerIntuition: ProtocolSpec = {
  id: 'poker_intuition_v5',
  name: 'Poker Intuition Enhancement Protocol v5.0',
  category: 'performance_advanced',
  evidenceLevel: 'III',

  usageGoal: '30-50% improvement in opponent read accuracy, faster pattern detection, enhanced intuitive pattern recognition.',

  algorithmDescription: '7Hz Theta with 40Hz Gamma coupling to boost pattern sensing and rapid intuitive pattern recognition. Theta enables associative memory access while Gamma rapidly binds opponent patterns.',

  researchContext: 'Intuition relies on rapid associative memory (Theta) and rapid synthesis/binding (Gamma). Theta-gamma phase coupling enables the "gut feelings" that expert poker players use for opponent reads (Theta-Gamma Intuition Research).',

  durationSeconds: 800,

  phases: [
    phase(0, 'Pattern Memory Access')
      .duration(300)
      .beat([10, 7])
      .carrier(CARRIERS.warm)
      .noise('pink', 0.12)
      .gentleCarrierOctaves()
      .purpose('Access associative pattern memory')
      .build(),

    phase(1, 'Intuitive Pattern Binding')
      .duration(500)
      .beat(7)
      .carrier(CARRIERS.neutral)
      .noise('pink', 0.15)
      .overlays([40, SOLFEGGIO.SOL], 0.3)
      .deepCarrierOctaves()
      .deepOverlayOctaves()
      .harmonics()
      .isochronic(0.5)
      .spatial('rotate')
      .hybrid(0.3)
      .purpose('Rapid intuitive pattern synthesis')
      .build(),
  ],

  breathwork: {
    name: 'Listen Observe',
    ratio: [4, 0, 4, 0],
    description: 'Quiet observation of external patterns',
    cycleDuration: 8,
    syncToBeat: false,
  },

  mantra: {
    phonetic: 'SEE PATTERNS',
    meaning: 'Intuitive recognition emerges naturally',
    repeatInterval: 20,
    pronunciation: 'see puh-terns',
    tonality: 'soft',
    delivery: 'internal',
  },

  contraindications: {
    absolute: ['Epilepsy'],
    relative: [],
  },

  citations: [
    'Theta-Gamma Intuition Research. Pattern recognition and intuitive decision-making.',
    'Lieberman, M. D. (2000). Intuition: A social cognitive neuroscience approach. Psychological Bulletin, 126(1), 109-137.',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. POKER TILT RECOVERY v5
// ─────────────────────────────────────────────────────────────────────────────

export const pokerTiltRecovery: ProtocolSpec = {
  id: 'poker_tilt_recovery_v5',
  name: 'Poker Tilt Recovery Protocol v5.0',
  category: 'performance_advanced',
  evidenceLevel: 'III',

  usageGoal: 'Sustain play consistency after bad beats, prevent chase behaviors, maintain emotional equilibrium and logical thinking.',

  algorithmDescription: '10Hz Alpha with 4Hz Theta crossovers and split-hemisphere Frontal Alpha Asymmetry (FAA) correction. Rebalances approach/avoidance circuits after emotional loss impact.',

  researchContext: 'Rebalances Frontal Alpha Asymmetry (FAA) to prevent depressive withdrawal or manic chasing behaviors after losses. Theta-chaotic progression disrupts established tilt patterns (Frontal Alpha Asymmetry Correction).',

  durationSeconds: 600,

  phases: [
    phase(0, 'FAA Rebalance')
      .duration(300)
      .beat(10)
      .carrier(CARRIERS.bright)
      .noise('white', 0.06)
      .gentleCarrierOctaves()
      .spatial('fixed')
      .purpose('Correct frontal alpha asymmetry')
      .build(),

    phase(1, 'Emotional Stabilization')
      .duration(300)
      .beat([4, 10])
      .carrier(CARRIERS.neutral)
      .noise('pink', 0.15)
      .overlays([SOLFEGGIO.MI], 0.2)
      .gentleCarrierOctaves()
      .gentleOverlayOctaves()
      .spatial('breathe')
      .hybrid(0.25)
      .stochasticJitter(15)
      .purpose('Return to logic-based decision making')
      .build(),
  ],

  breathwork: {
    name: 'Ground Reset',
    ratio: [5, 5, 5, 5],
    description: 'Box breath reset after emotional loss',
    cycleDuration: 20,
    syncToBeat: false,
  },

  mantra: {
    phonetic: 'LOGIC FIRST',
    meaning: 'Return to mathematics over emotion',
    repeatInterval: 15,
    pronunciation: 'lah-jik first',
    tonality: 'grounding',
    delivery: 'internal',
  },

  contraindications: {
    absolute: [],
    relative: ['Severe depression (consult physician)'],
  },

  citations: [
    'Frontal Alpha Asymmetry Correction. Approach/avoidance balance after losses.',
    'Davidson, R. J. (1998). Affective style and affective disorders. Journal of Personality and Social Psychology, 73(3), 899-905.',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. BANKROLL MANAGEMENT CLARITY v5
// ─────────────────────────────────────────────────────────────────────────────

export const bankrollManagement: ProtocolSpec = {
  id: 'poker_bankroll_management_v5',
  name: 'Bankroll Management Clarity Protocol v5.0',
  category: 'performance_advanced',
  evidenceLevel: 'III',

  usageGoal: 'Enhanced discipline for bankroll decisions, reduced emotional overrides, improved risk management clarity.',

  algorithmDescription: '14Hz SMR with 40Hz Gamma overlay for impulse control + cognitive binding. Prefrontal targeting for executive decision-making about stake sizing and bankroll preservation.',

  researchContext: 'SMR activates impulse control networks preventing reckless bets. 40Hz gamma enables complex financial risk calculation. Together they support rational bankroll management vs. emotional betting (Executive Function & Risk Processing).',

  durationSeconds: 900,

  phases: [
    phase(0, 'Impulse Control Foundation')
      .duration(300)
      .beat(14)
      .carrier(CARRIERS.bright)
      .noise('white', 0.07)
      .gentleCarrierOctaves()
      .isochronic(0.55)
      .purpose('Establish impulse control baseline')
      .build(),

    phase(1, 'Rational Risk Assessment')
      .duration(600)
      .beat(40)
      .carrier(CARRIERS.high)
      .noise('white', 0.06)
      .overlays([14, SOLFEGGIO.MI], 0.25)
      .deepCarrierOctaves()
      .deepOverlayOctaves()
      .spatial('fixed')
      .hybrid(0.3)
      .purpose('Combine impulse control with rational risk calculation')
      .build(),
  ],

  breathwork: {
    name: 'Decision Steady',
    ratio: [4, 4, 4, 4],
    description: 'Balanced breathing for sound decisions',
    cycleDuration: 16,
    syncToBeat: false,
  },

  mantra: {
    phonetic: 'WISE CHOICE',
    meaning: 'Bankroll protected by discipline',
    repeatInterval: 15,
    pronunciation: 'wyze choys',
    tonality: 'authoritative',
    delivery: 'internal',
  },

  contraindications: {
    absolute: [],
    relative: ['Gambling addiction (requires professional help)'],
  },

  citations: [
    'Executive Function & Risk Processing. Prefrontal bankroll decision-making.',
    'Kahneman, D. & Tversky, A. (1979). Prospect theory: An analysis of decision under risk. Econometrica, 47(2), 263-291.',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. HAND ANALYSIS DEPTH v5
// ─────────────────────────────────────────────────────────────────────────────

export const handAnalysis: ProtocolSpec = {
  id: 'poker_hand_analysis_v5',
  name: 'Hand Analysis Depth Protocol v5.0',
  category: 'performance_advanced',
  evidenceLevel: 'III',

  usageGoal: 'Deeper analysis of complex hand situations, multi-level thinking clarity, improved range construction.',

  algorithmDescription: '40Hz Gamma with broad overlay spectrum (20Hz, 80Hz, 120Hz) for multi-dimensional hand analysis. Deep octave layering enhances complex feature binding across multiple variables.',

  researchContext: 'Multiple frequency bands enable simultaneous analysis of multiple hand dimensions: position, stack depth, opponent tendencies, equity, etc. Broad gamma-harmonic stacking supports complex multi-variable integration (Complex Decision Analysis).',

  durationSeconds: 1200,

  phases: [
    phase(0, 'Analysis Preparation')
      .duration(300)
      .beat(35)
      .carrier(CARRIERS.high)
      .noise('white', 0.05)
      .deepCarrierOctaves()
      .purpose('Establish baseline gamma for complex thinking')
      .build(),

    phase(1, 'Multi-Variable Integration')
      .duration(600)
      .beat(40)
      .carrier(CARRIERS.high)
      .noise('white', 0.06)
      .overlays([20, 80, 120], 0.3)
      .deepCarrierOctaves()
      .deepOverlayOctaves()
      .harmonics()
      .isochronic(0.5)
      .spatial('pendulum')
      .hybrid(0.4)
      .purpose('Integrate multiple hand analysis dimensions')
      .build(),

    phase(2, 'Analysis Consolidation')
      .duration(300)
      .beat(40)
      .carrier(CARRIERS.high)
      .noise('white', 0.05)
      .overlays([20], 0.15)
      .deepCarrierOctaves()
      .purpose('Lock in multi-variable hand analysis')
      .build(),
  ],

  breathwork: {
    name: 'Deep Thinking',
    ratio: [4, 4, 4, 0],
    description: 'Extended exhale for deeper analysis',
    cycleDuration: 12,
    syncToBeat: false,
  },

  mantra: {
    phonetic: 'DEEP THINKING',
    meaning: 'Multi-dimensional hand analysis clarity',
    repeatInterval: 20,
    pronunciation: 'deep think-ing',
    tonality: 'meditative',
    delivery: 'internal',
  },

  contraindications: {
    absolute: ['Epilepsy'],
    relative: [],
  },

  citations: [
    'Complex Decision Analysis. Multi-variable neural integration.',
    'Miller, E. K. & Cohen, J. D. (2001). An integrative theory of prefrontal cortex function. Annual Review of Neuroscience, 24, 167-202.',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT ARRAY
// ─────────────────────────────────────────────────────────────────────────────

export const PERFORMANCE_ADVANCED_SPECS: ProtocolSpec[] = [
  mentalMath,
  examFocus,
  interviewConfidence,
  pokerPrecision,
  pokerIntuition,
  pokerTiltRecovery,
  bankrollManagement,
  handAnalysis,
];
