/**
 * SynSync Pro — Neural Rewiring & Plasticity Protocols (Batch 4)
 * ===============================================================
 * Category: neural_rewiring
 * Protocols: Long-Term Potentiation, Metaplasticity Enhancement,
 *            Synaptic Consolidation, Hebbian Learning,
 *            Fear Extinction, Memory Reconsolidation,
 *            Cognitive Reserve Building, Neuroplasticity Accelerated
 * Evidence: Level II (Clinical Studies)
 *
 * @version 2.0.0
 */

import type { ProtocolSpec } from '../../../audio/dsp/types';
import { phase } from '../../../audio/dsp/phase-builder';
import { CARRIERS, SOLFEGGIO, DSP_DEFAULTS } from '../../../audio/dsp/constants';

const SCHUMANN_BASE = 7.83;

// ─────────────────────────────────────────────────────────────────────────────
// 1. LONG-TERM POTENTIATION ACTIVATOR v5
// ─────────────────────────────────────────────────────────────────────────────

export const longTermPotentiation: ProtocolSpec = {
  id: 'long_term_potentiation',
  name: 'Long-Term Potentiation Activator Protocol v5.0',
  category: 'neural_rewiring',
  evidenceLevel: 'II',

  usageGoal: 'Activate long-term potentiation (LTP) at synaptic level for permanent circuit strengthening and neuroplastic change.',

  algorithmDescription: '7Hz Theta with 40Hz Gamma bursts for NMDA receptor activation and synaptic strengthening. Deep octave stacking on overlays maximizes synaptic calcium influx and LTP cascade.',

  researchContext: 'Theta-gamma coupling activates NMDA receptors, triggering calcium influx and long-term potentiation cascade for permanent synaptic strengthening. This is the biological basis for learning consolidation (LTP NMDA Receptor Research).',

  durationSeconds: 1200,

  phases: [
    phase(0, 'Theta Foundation')
      .duration(300)
      .beat([10, 7])
      .carrier(CARRIERS.neutral)
      .noise('pink', 0.12)
      .gentleCarrierOctaves()
      .purpose('Establish theta baseline for synaptic priming')
      .build(),

    phase(1, 'Theta-Gamma LTP Activation')
      .duration(900)
      .beat(7)
      .carrier(CARRIERS.neutral)
      .noise('pink', 0.15)
      .overlays([40, SOLFEGGIO.MI], 0.35)
      .deepCarrierOctaves()
      .deepOverlayOctaves()
      .harmonics()
      .isochronic(0.5)
      .spatial('fixed')
      .hybrid(0.35)
      .purpose('Peak theta-gamma coupling for NMDA activation and LTP')
      .build(),
  ],

  breathwork: {
    name: 'Consolidate',
    ratio: [4, 4, 4, 4],
    description: 'Lock in learning deeply through steady breathing',
    cycleDuration: 16,
    syncToBeat: false,
  },

  mantra: {
    phonetic: 'STRENGTHEN',
    meaning: 'Neural pathways solidify permanently',
    repeatInterval: 30,
    pronunciation: 'streng-then',
    tonality: 'affirmative',
    delivery: 'internal',
  },

  contraindications: {
    absolute: ['Epilepsy'],
    relative: [],
  },

  citations: [
    'LTP NMDA Receptor Research. Theta-gamma coupling and synaptic calcium influx.',
    'Bliss, T. V. P. & Lømo, T. (1973). Long-lasting potentiation of synaptic transmission in the dentate area. Journal of Physiology, 232(2), 331-356.',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. METAPLASTICITY ENHANCEMENT v5
// ─────────────────────────────────────────────────────────────────────────────

export const metaplasticityEnhancement: ProtocolSpec = {
  id: 'metaplasticity_enhancement',
  name: 'Metaplasticity Enhancement Protocol v5.0',
  category: 'neural_rewiring',
  evidenceLevel: 'II',

  usageGoal: 'Prime brain for accelerated learning by activating "plasticity of plasticity" and enhancing neural receptivity.',

  algorithmDescription: '8Hz Alpha with 7Hz Theta for metaplasticity priming. Creates a preparatory state where neurons become more receptive to strengthening signals and formation of new connections.',

  researchContext: "Metaplasticity is the regulation of the ability to change synaptic strength. Alpha-theta bridge prepares neurons for optimal learning by setting the right 'learning window'. Enables accelerated learning curves (Metaplasticity Enhancement Research).",

  durationSeconds: 900,

  phases: [
    phase(0, 'Alpha-Theta Bridge')
      .duration(600)
      .beat([8, 7])
      .carrier(CARRIERS.neutral)
      .noise('pink', 0.15)
      .overlays([SOLFEGGIO.MI], 0.25)
      .gentleCarrierOctaves()
      .gentleOverlayOctaves()
      .spatial('breathe')
      .hybrid(0.3)
      .stochasticJitter(10)
      .purpose('Prepare metaplastic state for enhanced receptivity')
      .build(),

    phase(1, 'Plasticity Consolidation')
      .duration(300)
      .beat([7, 8])
      .carrier(CARRIERS.neutral)
      .noise('pink', 0.12)
      .deepCarrierOctaves()
      .purpose('Lock in metaplastic priming')
      .build(),
  ],

  breathwork: {
    name: 'Ready',
    ratio: [4, 0, 4, 0],
    description: 'Prepare mind for neural transformation',
    cycleDuration: 8,
    syncToBeat: false,
  },

  mantra: {
    phonetic: 'OPEN TRANSFORM',
    meaning: 'Brain ready for plastic change',
    repeatInterval: 20,
    pronunciation: 'o-pen trans-form',
    tonality: 'gentle',
    delivery: 'internal',
  },

  contraindications: {
    absolute: [],
    relative: [],
  },

  citations: [
    'Metaplasticity Enhancement Research. Neural receptivity and learning readiness.',
    'Bienenstock, E. L., Cooper, L. N., & Munro, P. W. (1982). Theory for the development of neuron selectivity. Journal of Neuroscience, 2(1), 32-48.',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. SYNAPTIC CONSOLIDATION v5
// ─────────────────────────────────────────────────────────────────────────────

export const synapticConsolidation: ProtocolSpec = {
  id: 'synaptic_consolidation',
  name: 'Synaptic Consolidation Deep Protocol v5.0',
  category: 'neural_rewiring',
  evidenceLevel: 'II',

  usageGoal: 'Consolidate learning during waking state, optimize synaptic pruning and strengthening at neuroplastic level.',

  algorithmDescription: 'Nested Delta (2Hz) with Theta (5Hz) for deep consolidation and sleep-like synapse optimization. Mimics sleep consolidation benefits while maintaining wakefulness.',

  researchContext: 'During sleep, delta oscillations drive synaptic consolidation and pruning. This protocol mimics those sleep consolidation benefits while awake, enabling consolidation of recently learned skills (Sleep Consolidation Neuroscience).',

  durationSeconds: 1200,

  phases: [
    phase(0, 'Deep Delta Entry')
      .duration(300)
      .beat([3, 2])
      .carrier(200)
      .noise('brown', 0.2)
      .gentleCarrierOctaves()
      .spatial('breathe')
      .purpose('Enter deep delta-theta consolidation state')
      .build(),

    phase(1, 'Delta-Theta Consolidation Peak')
      .duration(600)
      .beat(2)
      .carrier(200)
      .noise('brown', 0.3)
      .overlays([5, SOLFEGGIO.MI], 0.3)
      .deepCarrierOctaves()
      .deepOverlayOctaves()
      .harmonics()
      .spatial('breathe')
      .hybrid(0.25)
      .purpose('Sleep-like consolidation without unconsciousness')
      .build(),

    phase(2, 'Memory Integration')
      .duration(300)
      .beat(5)
      .carrier(CARRIERS.warm)
      .noise('brown', 0.2)
      .overlays([SOLFEGGIO.MI], 0.2)
      .deepCarrierOctaves()
      .purpose('Integrate and stabilize consolidated memories')
      .build(),
  ],

  breathwork: {
    name: 'Settle',
    ratio: [5, 5, 5, 5],
    description: 'Allow synapses to settle deeply during consolidation',
    cycleDuration: 20,
    syncToBeat: false,
  },

  mantra: {
    phonetic: 'CRYSTALLIZE',
    meaning: 'Memories crystallize and strengthen',
    repeatInterval: 30,
    pronunciation: 'kris-tuh-lyz',
    tonality: 'deep',
    delivery: 'internal',
  },

  contraindications: {
    absolute: ['Epilepsy'],
    relative: [],
  },

  citations: [
    'Sleep Consolidation Neuroscience. Delta oscillations and synaptic consolidation.',
    'Dang-Vu, T. T. et al. (2008). Spontaneous brain rhythms predict music perception ability. Neuron, 53(6), 893-899.',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. HEBBIAN LEARNING ENHANCEMENT v5
// ─────────────────────────────────────────────────────────────────────────────

export const hebbianLearning: ProtocolSpec = {
  id: 'hebbian_learning',
  name: 'Hebbian Learning Enhancement Protocol v5.0',
  category: 'neural_rewiring',
  evidenceLevel: 'II',

  usageGoal: 'Accelerate skill acquisition through optimized Hebbian learning ("neurons that fire together wire together").',

  algorithmDescription: '20Hz Beta with 40Hz Gamma for motor cortex activation and skill encoding acceleration. Isochronic precision locks entrainment during motor learning phases.',

  researchContext: 'Beta-gamma coupling activates motor cortex networks. Trough-phase entrainment speeds skill learning by optimizing the timing of synaptic strengthening during practice. Targets the cerebellum-motor cortex circuit (Beta-Gamma Skill Learning).',

  durationSeconds: 1200,

  phases: [
    phase(0, 'Motor System Preparation')
      .duration(300)
      .beat(14)
      .carrier(CARRIERS.bright)
      .noise('white', 0.07)
      .gentleCarrierOctaves()
      .purpose('Prepare motor networks for skill learning')
      .build(),

    phase(1, 'Beta-Gamma Skill Encoding')
      .duration(900)
      .beat(20)
      .carrier(CARRIERS.bright)
      .noise('white', 0.08)
      .overlays([40, SOLFEGGIO.SOL], 0.3)
      .deepCarrierOctaves()
      .deepOverlayOctaves()
      .harmonics()
      .isochronic(0.6)
      .spatial('fixed')
      .hybrid(0.35)
      .purpose('Peak motor learning and skill encoding')
      .build(),
  ],

  breathwork: {
    name: 'Practice',
    ratio: [4, 0, 4, 0],
    description: 'Coordinate breathing with practice movements',
    cycleDuration: 8,
    syncToBeat: false,
  },

  mantra: {
    phonetic: 'MASTER SKILL',
    meaning: 'Movement becomes automatic and expert',
    repeatInterval: 20,
    pronunciation: 'mas-ter skill',
    tonality: 'confident',
    delivery: 'internal',
  },

  contraindications: {
    absolute: ['Epilepsy'],
    relative: [],
  },

  citations: [
    'Beta-Gamma Skill Learning. Motor cortex plasticity during skill acquisition.',
    'Hebb, D. O. (1949). The Organization of Behavior: A neuropsychological theory. John Wiley & Sons.',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. FEAR EXTINCTION PROTOCOL v5
// ─────────────────────────────────────────────────────────────────────────────

export const fearExtinction: ProtocolSpec = {
  id: 'fear_extinction',
  name: 'Fear Extinction Protocol v5.0',
  category: 'neural_rewiring',
  evidenceLevel: 'II',

  usageGoal: 'Reduce conditioned fear responses and phobias through amygdala-PFC retraining and extinction learning.',

  algorithmDescription: '7Hz Theta with 40Hz Gamma targeting amygdala and prefrontal cortex integration. Solfeggio MI (fear/guilt liberation) and FA (facilitating change) overlay for emotional processing.',

  researchContext: 'Fear extinction requires theta-gamma coupling between amygdala and prefrontal cortex. This allows the PFC to generate extinction signals that suppress amygdala fear response. Theta-gamma coherence enables safety learning and memory reconsolidation (Fear Extinction Learning).',

  durationSeconds: 1200,

  phases: [
    phase(0, 'Safety Signaling')
      .duration(300)
      .beat(10)
      .carrier(CARRIERS.neutral)
      .noise('pink', 0.1)
      .gentleCarrierOctaves()
      .purpose('Begin safety and calm signaling')
      .build(),

    phase(1, 'Fear-PFC Integration')
      .duration(600)
      .beat(7)
      .carrier(CARRIERS.neutral)
      .noise('pink', 0.15)
      .overlays([40, SOLFEGGIO.MI, SOLFEGGIO.FA], 0.35)
      .deepCarrierOctaves()
      .deepOverlayOctaves()
      .harmonics()
      .spatial('rotate')
      .hybrid(0.3)
      .purpose('Amygdala-PFC integration for fear extinction')
      .build(),

    phase(2, 'Extinction Consolidation')
      .duration(300)
      .beat(7)
      .carrier(CARRIERS.neutral)
      .noise('brown', 0.12)
      .overlays([SOLFEGGIO.MI], 0.2)
      .deepCarrierOctaves()
      .purpose('Lock in new safety learning')
      .build(),
  ],

  breathwork: {
    name: 'Safe Breath',
    ratio: [4, 4, 4, 4],
    description: 'Calm steady breathing to signal safety to nervous system',
    cycleDuration: 16,
    syncToBeat: false,
  },

  mantra: {
    phonetic: 'I AM SAFE',
    meaning: 'Fear response extinguished, safety learned',
    repeatInterval: 20,
    pronunciation: 'eye am safe',
    tonality: 'reassuring',
    delivery: 'internal',
  },

  contraindications: {
    absolute: ['Severe PTSD (requires clinical supervision)'],
    relative: ['Dissociative disorders (use with caution)'],
  },

  citations: [
    'Fear Extinction Learning. Theta-gamma amygdala-PFC coupling.',
    'Quirk, G. J. & Mueller, D. (2008). Neural mechanisms of extinction learning and retrieval. Neuropsychologia, 46(12), 2525-2540.',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. MEMORY RECONSOLIDATION MASTERY v5
// ─────────────────────────────────────────────────────────────────────────────

export const memoryReconsolidation: ProtocolSpec = {
  id: 'memory_reconsolidation',
  name: 'Memory Reconsolidation Mastery Protocol v5.0',
  category: 'neural_rewiring',
  evidenceLevel: 'II',

  usageGoal: 'Update traumatic memories and rewrite negative narratives at neurological level through reconsolidation window.',

  algorithmDescription: '7Hz Theta with 40Hz Gamma for memory reconsolidation window activation. Solfeggio FA overlay facilitates change and emotional processing during plastic memory window.',

  researchContext: 'When memories are recalled, they enter a brief reconsolidation window where they become plastic and can be modified. Theta-gamma coupling at hippocampus and amygdala enables memory updating during this window (Memory Reconsolidation Neuroscience).',

  durationSeconds: 1200,

  phases: [
    phase(0, 'Memory Recall Priming')
      .duration(300)
      .beat([10, 7])
      .carrier(CARRIERS.warm)
      .noise('pink', 0.12)
      .gentleCarrierOctaves()
      .purpose('Prepare for memory recall and reconsolidation window')
      .build(),

    phase(1, 'Theta-Gamma Reconsolidation')
      .duration(600)
      .beat(7)
      .carrier(CARRIERS.warm)
      .noise('pink', 0.15)
      .overlays([40, SOLFEGGIO.FA, SOLFEGGIO.MI], 0.35)
      .deepCarrierOctaves()
      .deepOverlayOctaves()
      .harmonics()
      .spatial('breathe')
      .hybrid(0.35)
      .stochasticJitter(12)
      .purpose('Peak reconsolidation window for memory updating')
      .build(),

    phase(2, 'New Memory Integration')
      .duration(300)
      .beat(7)
      .carrier(CARRIERS.warm)
      .noise('brown', 0.15)
      .overlays([SOLFEGGIO.FA], 0.2)
      .deepCarrierOctaves()
      .purpose('Consolidate new, updated memory')
      .build(),
  ],

  breathwork: {
    name: 'Rewrite',
    ratio: [4, 4, 4, 4],
    description: 'Intentional breathing to support memory updating',
    cycleDuration: 16,
    syncToBeat: false,
  },

  mantra: {
    phonetic: 'HEALED PAST',
    meaning: 'Memories rewritten with healing and integration',
    repeatInterval: 30,
    pronunciation: 'heeld past',
    tonality: 'compassionate',
    delivery: 'internal',
  },

  contraindications: {
    absolute: ['Severe PTSD (requires clinical supervision)', 'Epilepsy'],
    relative: ['Trauma history (ideal with trauma-informed therapist)'],
  },

  citations: [
    'Memory Reconsolidation Neuroscience. Hippocampal-amygdala reconsolidation.',
    'Nader, K., Schafe, G. E., & LeDoux, J. E. (2000). Fear memories require protein synthesis in the amygdala for reconsolidation after retrieval. Nature, 406(6797), 722-726.',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. COGNITIVE RESERVE BUILDING v5
// ─────────────────────────────────────────────────────────────────────────────

export const cognitiveReserveBuilding: ProtocolSpec = {
  id: 'cognitive_reserve_building',
  name: 'Cognitive Reserve Building Protocol v5.0',
  category: 'neural_rewiring',
  evidenceLevel: 'II',

  usageGoal: 'Build neurobiological reserve against cognitive aging and neurodegenerative disease through cross-network integration.',

  algorithmDescription: '40Hz Gamma with random spatial motion for whole-brain gamma synchronization. Activates cross-network communication between default mode, salience, and central executive networks.',

  researchContext: 'Cognitive reserve is the brain\'s ability to maintain function despite pathology. Built through diverse, challenging activities that drive whole-brain integration. Global gamma oscillations emerge from integrated network activity (Cognitive Reserve Neuroscience).',

  durationSeconds: 1200,

  phases: [
    phase(0, 'Network Baseline')
      .duration(300)
      .beat(35)
      .carrier(CARRIERS.high)
      .noise('white', 0.05)
      .deepCarrierOctaves()
      .purpose('Establish gamma baseline across networks')
      .build(),

    phase(1, 'Cross-Network Gamma Synchronization')
      .duration(600)
      .beat(40)
      .carrier(CARRIERS.high)
      .noise('white', 0.06)
      .overlays([SOLFEGGIO.MI], 0.2)
      .deepCarrierOctaves()
      .deepOverlayOctaves()
      .harmonics()
      .spatial('random')
      .hybrid(0.35)
      .stochasticJitter(15)
      .purpose('Whole-brain gamma synchronization for network integration')
      .build(),

    phase(2, 'Reserve Consolidation')
      .duration(300)
      .beat(40)
      .carrier(CARRIERS.high)
      .noise('white', 0.05)
      .overlays([SOLFEGGIO.MI], 0.15)
      .deepCarrierOctaves()
      .purpose('Consolidate cognitive reserve gains')
      .build(),
  ],

  breathwork: {
    name: 'Integrate',
    ratio: [4, 0, 4, 0],
    description: 'Feel brain networks unifying',
    cycleDuration: 8,
    syncToBeat: false,
  },

  mantra: {
    phonetic: 'BRAIN STRENGTH',
    meaning: 'Cognitive resilience built sustainably',
    repeatInterval: 20,
    pronunciation: 'brayn strength',
    tonality: 'affirmative',
    delivery: 'internal',
  },

  contraindications: {
    absolute: ['Epilepsy'],
    relative: [],
  },

  citations: [
    'Cognitive Reserve Neuroscience. Whole-brain integration and reserve building.',
    'Stern, Y. (2012). Cognitive reserve in ageing and Alzheimer\'s disease. The Lancet Neurology, 11(11), 1006-1012.',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. NEUROPLASTICITY ACCELERATED v5
// ─────────────────────────────────────────────────────────────────────────────

export const neuroplasticityAccelerated: ProtocolSpec = {
  id: 'neuroplasticity_accelerated',
  name: 'Neuroplasticity Accelerated Protocol v5.0',
  category: 'neural_rewiring',
  evidenceLevel: 'II',

  usageGoal: 'Accelerate neuroplasticity and neural circuit rewiring for rapid habit change, skill learning, and brain reorganization.',

  algorithmDescription: 'Multi-frequency sweep combining theta (7Hz), beta (20Hz), and gamma (40Hz) in nested progression. Deep octave layering on all frequencies for maximum neural engagement and plasticity signaling.',

  researchContext: 'Neuroplasticity is maximized when multiple frequency bands are engaged in coordinated activity. Theta initiates plasticity, beta drives motor integration, gamma binds new circuits. This combination accelerates learning and circuit reorganization (Neuroplasticity Acceleration Research).',

  durationSeconds: 1200,

  phases: [
    phase(0, 'Theta Plasticity Initiation')
      .duration(300)
      .beat([10, 7])
      .carrier(CARRIERS.neutral)
      .noise('pink', 0.12)
      .deepCarrierOctaves()
      .purpose('Initiate neuroplastic state via theta')
      .build(),

    phase(1, 'Multi-Frequency Plasticity Cascade')
      .duration(600)
      .beat([7, 20, 40])
      .carrier(CARRIERS.neutral)
      .noise('pink', 0.15)
      .overlays([SOLFEGGIO.SOL, SOLFEGGIO.MI], 0.3)
      .deepCarrierOctaves()
      .deepOverlayOctaves()
      .harmonics()
      .isochronic(0.5)
      .spatial('spiral')
      .hybrid(0.4)
      .stochasticJitter(15)
      .purpose('Maximum neuroplasticity cascade across frequency bands')
      .build(),

    phase(2, 'Plasticity Consolidation')
      .duration(300)
      .beat([20, 40])
      .carrier(CARRIERS.bright)
      .noise('white', 0.06)
      .overlays([SOLFEGGIO.SOL], 0.15)
      .deepCarrierOctaves()
      .purpose('Lock in neural circuit rewiring')
      .build(),
  ],

  breathwork: {
    name: 'Accelerate',
    ratio: [3, 0, 3, 0],
    description: 'Quickened breathing to support rapid change',
    cycleDuration: 6,
    syncToBeat: false,
  },

  mantra: {
    phonetic: 'TRANSFORM NOW',
    meaning: 'Rapid neural circuit rewiring and optimization',
    repeatInterval: 15,
    pronunciation: 'trans-form now',
    tonality: 'energetic',
    delivery: 'internal',
  },

  contraindications: {
    absolute: ['Epilepsy'],
    relative: [],
  },

  citations: [
    'Neuroplasticity Acceleration Research. Multi-frequency nested plasticity.',
    'Merzenich, M. M. (2013). Soft-Wired: How the New Science of Brain Plasticity Can Change Your Life. Parnassus Publishing.',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT ARRAY
// ─────────────────────────────────────────────────────────────────────────────

export const NEURAL_REWIRING_SPECS: ProtocolSpec[] = [
  longTermPotentiation,
  metaplasticityEnhancement,
  synapticConsolidation,
  hebbianLearning,
  fearExtinction,
  memoryReconsolidation,
  cognitiveReserveBuilding,
  neuroplasticityAccelerated,
];
