// src/audio/spec-neural-autonomic.ts
// Raw protocol defs for Neural Rewiring & Autonomic Mastery / HRV.

import { SOLFEGGIO, SCHUMANN_BASE } from '../../types';

export const NEURAL_SPECS = {
  long_term_potentiation_activator_v5: {
    id: 'long_term_potentiation_activator_v5',
    title: 'Long-Term Potentiation Activator v5.0',
    description: 'Synaptic Strength Enhancement',
    evidenceLevel: 'II',
    citation: 'LTP NMDA Receptor (web:226, web:235)',
    category: 'evidence',
    section: 'Neural Rewiring',
    duration: 1200,
    contraindications: ['Epilepsy'],
    algoDesc:
      '7Hz Theta with 40Hz Gamma bursts for NMDA receptor activation and synaptic strengthening.',
    usageGoal:
      'Activate long-term potentiation (LTP) at synaptic level for permanent circuit strengthening.',
    researchContext:
      'Theta-gamma coupling activates NMDA receptors, triggering long-term potentiation and synaptic strengthening. Enables learning consolidation.',
    phases: [
      {
        duration: 1200,
        beat: 7,
        carrier: 250,
        overlays: [40, SOLFEGGIO.MI],
        overlayMix: 0.35,
        harmonicStacking: true,
        dbssFrequency: {
          primary: 7,
          secondary: 40,
          targetRegion: 'hippocampus',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.8 },
        },
        spatialMotion: 'fixed',
        progressionCurve: 'linear',
      },
    ],
    breathwork: {
      name: 'Consolidate',
      ratio: [4, 4, 4, 4],
      description: 'Lock in learning deeply.',
    },
    mantra: {
      phonetic: 'STRENGTHEN',
      meaning: 'Neural pathways solidify.',
      repeatInterval: 30,
    },
    evidenceGrade: 'B',
    mechanismOfAction:
      'Theta-gamma coupling activates NMDA receptors, triggers calcium influx, initiates LTP cascade for permanent strengthening.',
    expectedOnset: 20,
    cumulativeEffect: true,
    requiredSessions: 30,
    optimalTimeOfDay: 'post-learning',
  },

  metaplasticity_prime_learning_readiness_v5: {
    id: 'metaplasticity_prime_learning_readiness_v5',
    title: 'Metaplasticity Prime v5.0',
    description: 'Learning Readiness & Neural Preparation',
    evidenceLevel: 'II',
    citation: 'Metaplasticity Learning (web:226, web:235)',
    category: 'evidence',
    section: 'Neural Rewiring',
    duration: 900,
    contraindications: ['Epilepsy'],
    algoDesc:
      '8Hz Alpha with 7Hz Theta for metaplasticity priming - preparing brain for optimal learning.',
    usageGoal:
      'Prime brain for accelerated learning, activate metaplastic state for enhanced receptivity.',
    researchContext:
      "Metaplasticity is 'plasticity of plasticity' - preparing neurons for more efficient learning. Alpha-theta bridge enables this state.",
    phases: [
      {
        duration: 900,
        beat: 8,
        carrier: 250,
        overlays: [7, SOLFEGGIO.MI],
        overlayMix: 0.25,
        dbssFrequency: {
          primary: 8,
          secondary: 7,
          targetRegion: 'neocortex',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.9 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.7 },
        },
        spatialMotion: 'breathe',
        progressionCurve: 'sigmoid',
      },
    ],
    breathwork: {
      name: 'Ready',
      ratio: [4, 0, 4, 0],
      description: 'Prepare mind for learning.',
    },
    mantra: {
      phonetic: 'OPEN LEARN',
      meaning: 'Brain ready for transformation.',
      repeatInterval: 20,
    },
    evidenceGrade: 'B',
    mechanismOfAction:
      'Alpha-theta coupling primes metaplastic state, prepares neurons for higher plasticity, enables accelerated learning curves.',
    expectedOnset: 10,
    cumulativeEffect: true,
    requiredSessions: 10,
    optimalTimeOfDay: 'pre-learning',
  },

  synaptic_consolidation_deep_v5: {
    id: 'synaptic_consolidation_deep_v5',
    title: 'Synaptic Consolidation Deep v5.0',
    description: 'Memory Consolidation & Synaptic Pruning',
    evidenceLevel: 'II',
    citation: 'Sleep Consolidation (web:226, web:231)',
    category: 'evidence',
    section: 'Neural Rewiring',
    duration: 1200,
    contraindications: ['Epilepsy'],
    algoDesc:
      'Nested Delta (2Hz) with Theta (5Hz) for deep consolidation and sleep-like synapse optimization.',
    usageGoal:
      'Consolidate learning during waking state, optimize synaptic pruning and strengthening.',
    researchContext:
      'During sleep, delta oscillations drive synaptic consolidation. This protocol mimics sleep consolidation benefits while awake.',
    phases: [
      {
        duration: 1200,
        beat: 2,
        carrier: 250,
        overlays: [5, SOLFEGGIO.MI],
        overlayMix: 0.3,
        harmonicStacking: true,
        dbssFrequency: {
          primary: 2,
          secondary: 5,
          targetRegion: 'hippocampus',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.8 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.6 },
        },
        spatialMotion: 'breathe',
        progressionCurve: 'linear',
      },
    ],
    breathwork: {
      name: 'Settle',
      ratio: [5, 5, 5, 5],
      description: 'Allow synapses to settle deeply.',
    },
    mantra: {
      phonetic: 'CONSOLIDATE',
      meaning: 'Memories crystallize.',
      repeatInterval: 30,
    },
    evidenceGrade: 'B',
    mechanismOfAction:
      'Nested Delta-Theta mimics sleep consolidation, triggers synaptic strengthening and pruning, stabilizes long-term memories.',
    expectedOnset: 25,
    cumulativeEffect: true,
    requiredSessions: 20,
    optimalTimeOfDay: 'post-learning',
  },

  myelination_accelerator_v5: {
    id: 'myelination_accelerator_v5',
    title: 'Myelination Accelerator v5.0',
    description: 'Axonal Insulation & Signal Speed',
    evidenceLevel: 'III',
    citation: 'Gamma Myelination Support',
    category: 'research',
    section: 'Neural Rewiring',
    duration: 1200,
    contraindications: ['Epilepsy'],
    algoDesc:
      '40Hz Gamma with repetitive pulsing (10Hz envelope) for oligodendrocyte stimulation and myelination.',
    usageGoal:
      'Accelerate myelination of key neural circuits, increase signal propagation speed.',
    researchContext:
      '40Hz gamma activity correlates with circuit refinement. Repetitive stimulation triggers myelinating oligodendrocytes.',
    phases: [
      {
        duration: 1200,
        beat: 40,
        carrier: 440,
        overlays: [10, SOLFEGGIO.SOL],
        overlayMix: 0.25,
        harmonicStacking: true,
        dbssFrequency: {
          primary: 40,
          secondary: 10,
          targetRegion: 'white_matter',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: true, dutyCycle: 0.6 },
          monaural: { enabled: true, strength: 0.8 },
        },
        spatialMotion: 'fixed',
        progressionCurve: 'linear',
      },
    ],
    breathwork: {
      name: 'Speed',
      ratio: [2, 0, 2, 0],
      description: 'Feel mental speed increasing.',
    },
    mantra: {
      phonetic: 'FAST CIRCUITS',
      meaning: 'Signal speed maximized.',
      repeatInterval: 15,
    },
    evidenceGrade: 'C',
    mechanismOfAction:
      '40Hz gamma stimulates oligodendrocytes, repetitive 10Hz envelope triggers myelination response, accelerates circuit speed.',
    expectedOnset: 30,
    cumulativeEffect: true,
    requiredSessions: 40,
    optimalTimeOfDay: 'morning',
  },

  circuit_pruning_renewal_v5: {
    id: 'circuit_pruning_renewal_v5',
    title: 'Circuit Pruning & Renewal v5.0',
    description: 'Synaptic Pruning & Dead Circuit Removal',
    evidenceLevel: 'III',
    citation: 'Pruning Theta Delta',
    category: 'research',
    section: 'Neural Rewiring',
    duration: 900,
    contraindications: ['Epilepsy'],
    algoDesc:
      'Delta (1.5Hz) with strategic silence gaps for microglial pruning activation.',
    usageGoal:
      'Remove unused synapses and dead circuits, enable neuronal renewal.',
    researchContext:
      'Microglia prune synapses during low-activity states. Strategic silence with delta enables efficient circuit cleanup.',
    phases: [
      {
        duration: 600,
        beat: 1.5,
        carrier: 250,
        overlays: [SOLFEGGIO.UT],
        overlayMix: 0.15,
        dbssFrequency: {
          primary: 1.5,
          secondary: 0,
          targetRegion: 'microglia',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.7 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.5 },
        },
      },
      {
        duration: 300,
        beat: 0.5,
        carrier: 100,
        noise: null,
        entrainmentMode: {
          binaural: { enabled: false, strength: 0 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: false, strength: 0 },
        },
      },
    ],
    breathwork: {
      name: 'Release',
      ratio: [4, 4, 4, 4],
      description: 'Release what no longer serves.',
    },
    mantra: {
      phonetic: 'RENEW',
      meaning: 'Old patterns cleared.',
      repeatInterval: 30,
    },
    evidenceGrade: 'C',
    mechanismOfAction:
      'Delta activity triggers microglial pruning, strategic silence enables cleanup, circuit renewal through removal.',
    expectedOnset: 20,
    cumulativeEffect: true,
    requiredSessions: 50,
    optimalTimeOfDay: 'evening',
  },

  skill_acquisition_turbo_v5: {
    id: 'skill_acquisition_turbo_v5',
    title: 'Skill Acquisition Turbo v5.0',
    description: 'Accelerated Learning & Motor Skill Encoding',
    evidenceLevel: 'II',
    citation: 'Beta Gamma Skill (web:226, web:235)',
    category: 'evidence',
    section: 'Neural Rewiring',
    duration: 1200,
    contraindications: ['Epilepsy'],
    algoDesc:
      '20Hz Beta with 40Hz Gamma for motor cortex activation and skill encoding acceleration.',
    usageGoal:
      'Accelerate skill acquisition 2-3x, enhance motor learning and performance.',
    researchContext:
      'Beta-gamma coupling activates motor cortex networks. Cambridge research shows trough-phase entrainment speeds skill learning.',
    phases: [
      {
        duration: 1200,
        beat: 20,
        carrier: 440,
        overlays: [40, SOLFEGGIO.SOL],
        overlayMix: 0.3,
        isochronic: true,
        dbssFrequency: {
          primary: 20,
          secondary: 40,
          targetRegion: 'motor_cortex',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: true, dutyCycle: 0.6 },
          monaural: { enabled: true, strength: 0.8 },
        },
        spatialMotion: 'fixed',
        progressionCurve: 'linear',
      },
    ],
    breathwork: {
      name: 'Practice',
      ratio: [4, 0, 4, 0],
      description: 'Embody skill during practice.',
    },
    mantra: {
      phonetic: 'MASTER',
      meaning: 'Skill mastery accelerated.',
      repeatInterval: 20,
    },
    evidenceGrade: 'B',
    mechanismOfAction:
      'Beta-gamma coupling activates motor networks, isochronic precision locks entrainment, accelerates skill encoding and consolidation.',
    expectedOnset: 15,
    cumulativeEffect: true,
    requiredSessions: 20,
    optimalTimeOfDay: 'during-practice',
  },

  memory_reconsolidation_mastery_v5: {
    id: 'memory_reconsolidation_mastery_v5',
    title: 'Memory Reconsolidation Mastery v5.0',
    description: 'Memory Updating & Trauma Integration',
    evidenceLevel: 'II',
    citation: 'Reconsolidation Theta',
    category: 'evidence',
    section: 'Neural Rewiring',
    duration: 1200,
    contraindications: ['Severe PTSD (unsupervised)', 'Epilepsy'],
    algoDesc:
      '7Hz Theta with 40Hz Gamma for memory reconsolidation window activation.',
    usageGoal:
      'Update traumatic memories, rewrite negative narratives at neurological level.',
    researchContext:
      'Memories enter reconsolidation window when recalled. Theta-gamma coupling enables rewriting during this plastic window.',
    phases: [
      {
        duration: 1200,
        beat: 7,
        carrier: 250,
        overlays: [40, SOLFEGGIO.FA],
        overlayMix: 0.35,
        stochastic: false,
        progressionCurve: 'sigmoid',
        dbssFrequency: {
          primary: 7,
          secondary: 40,
          targetRegion: 'hippocampus',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.8 },
        },
        spatialMotion: 'breathe',
        harmonicStacking: true,
      },
    ],
    breathwork: {
      name: 'Rewrite',
      ratio: [4, 4, 4, 4],
      description: 'Update memory with new narrative.',
    },
    mantra: {
      phonetic: 'HEALED PAST',
      meaning: 'Memories rewritten with healing.',
      repeatInterval: 30,
    },
    evidenceGrade: 'B',
    mechanismOfAction:
      'Theta-gamma coupling opens reconsolidation window, enables memory updating, facilitates trauma integration and rewriting.',
    expectedOnset: 25,
    cumulativeEffect: true,
    requiredSessions: 30,
    optimalTimeOfDay: 'evening',
  },

  neural_integration_protocol_v5: {
    id: 'neural_integration_protocol_v5',
    title: 'Neural Integration Protocol v5.0',
    description: 'Whole-Brain Coherence & Network Integration',
    evidenceLevel: 'III',
    citation: 'Cross-Network Gamma',
    category: 'research',
    section: 'Neural Rewiring',
    duration: 1200,
    contraindications: ['Epilepsy'],
    algoDesc:
      '40Hz Gamma with random spatial motion for whole-brain gamma synchronization.',
    usageGoal:
      'Integrate disparate brain networks into unified whole-brain coherence.',
    researchContext:
      'Global gamma oscillations emerge from integrated network activity. Random panning activates cross-network communication.',
    phases: [
      {
        duration: 1200,
        beat: 40,
        carrier: 440,
        overlays: [SOLFEGGIO.MI],
        overlayMix: 0.2,
        spatialMotion: 'random',
        harmonicStacking: true,
        progressionCurve: 'chaotic',
        progressionVariability: 0.15,
        dbssFrequency: {
          primary: 40,
          secondary: 20,
          targetRegion: 'whole_brain',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.8 },
        },
      },
    ],
    breathwork: {
      name: 'Integrate',
      ratio: [4, 0, 4, 0],
      description: 'Feel brain unifying.',
    },
    mantra: {
      phonetic: 'ONE BRAIN',
      meaning: 'Complete neural integration.',
      repeatInterval: 20,
    },
    evidenceGrade: 'C',
    mechanismOfAction:
      '40Hz gamma drives global synchronization, random panning connects distant networks, creates unified whole-brain coherence.',
    expectedOnset: 30,
    cumulativeEffect: true,
    requiredSessions: 25,
    optimalTimeOfDay: 'anytime',
  },
} as const;

export const AUTONOMIC_SPECS = {
  vagal_tone_builder_v5: {
    id: 'vagal_tone_builder_v5',
    title: 'Vagal Tone Builder v5.0',
    description: 'Parasympathetic Activation & Vagal Strength',
    evidenceLevel: 'II',
    citation: 'Vagal Tone HRV (web:230, web:233)',
    category: 'evidence',
    section: 'Autonomic Mastery',
    duration: 1200,
    contraindications: ['Serious heart conditions (consult physician)'],
    algoDesc:
      '5Hz Theta with strategic 10Hz alpha overlays for vagal afferent stimulation.',
    usageGoal:
      '+20-30% vagal tone increase, enhanced parasympathetic resilience.',
    researchContext:
      'Vagal tone predicts cardiac health, stress resilience, inflammation levels. Low vagal tone = 47% higher cardiac death risk.',
    phases: [
      {
        duration: 1200,
        beat: 5,
        carrier: 250,
        overlays: [10, SOLFEGGIO.MI],
        overlayMix: 0.25,
        dbssFrequency: {
          primary: 5,
          secondary: 10,
          targetRegion: 'vagus_nerve',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.9 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.7 },
        },
        harmonicStacking: true,
        spatialMotion: 'breathe',
        progressionCurve: 'sigmoid',
      },
    ],
    breathwork: {
      name: 'Tone',
      ratio: [5, 5, 5, 5],
      description: 'Slow, deep vagal activation.',
    },
    mantra: {
      phonetic: 'CALM STRONG',
      meaning: 'Vagal tone strengthened.',
      repeatInterval: 30,
    },
    evidenceGrade: 'B',
    mechanismOfAction:
      'Theta-alpha coupling stimulates vagal afferents, increases RMSSD (vagal marker), enhances parasympathetic tone.',
    expectedOnset: 20,
    cumulativeEffect: true,
    requiredSessions: 40,
    optimalTimeOfDay: 'evening',
  },

  hrv_coherence_optimizer_v5: {
    id: 'hrv_coherence_optimizer_v5',
    title: 'HRV Coherence Optimizer v5.0',
    description: '0.1 Hz Resonance Frequency Training',
    evidenceLevel: 'II',
    citation: 'HRV Coherence 0.1Hz (web:233, web:236)',
    category: 'evidence',
    section: 'Autonomic Mastery',
    duration: 900,
    contraindications: ['Serious heart conditions', 'Recent cardiac event'],
    algoDesc:
      'Carrier frequency paced at 0.1 Hz (6 breaths/minute) for cardiac-respiratory coherence.',
    usageGoal:
      'Achieve cardiac-respiratory synchronization at resonance frequency (0.1 Hz / 6 breaths/min).',
    researchContext:
      '0.1 Hz resonance frequency produces HRV coherence (heart-breath-blood pressure alignment). Immediate + persistent benefits.',
    phases: [
      {
        duration: 900,
        beat: 0.1,
        carrier: 250,
        overlays: [SCHUMANN_BASE, SOLFEGGIO.MI],
        overlayMix: 0.2,
        isochronic: true,
        dbssFrequency: {
          primary: 0.1,
          secondary: 10,
          targetRegion: 'heart',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.8 },
          isochronic: { enabled: true, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.6 },
        },
        spatialMotion: 'breathe',
        progressionCurve: 'linear',
      },
    ],
    breathwork: {
      name: 'Resonate',
      ratio: [6, 0, 6, 0],
      description: '10 sec in, 10 sec out (6 breaths/min).',
    },
    mantra: {
      phonetic: 'COHERENT',
      meaning: 'Heart-brain in sync.',
      repeatInterval: 60,
    },
    evidenceGrade: 'B',
    mechanismOfAction:
      '0.1 Hz carrier induces cardiac-respiratory coherence, baroreflex engages at resonance frequency, physiological coherence established.',
    expectedOnset: 5,
    cumulativeEffect: true,
    requiredSessions: 20,
    optimalTimeOfDay: 'morning',
  },

  baroreflex_sensitivity_enhancer_v5: {
    id: 'baroreflex_sensitivity_enhancer_v5',
    title: 'Baroreflex Sensitivity Enhancer v5.0',
    description: 'Blood Pressure-Heart Rate Coupling',
    evidenceLevel: 'II',
    citation: 'Baroreflex Theta',
    category: 'evidence',
    section: 'Autonomic Mastery',
    duration: 1200,
    contraindications: ['Severe hypotension or hypertension'],
    algoDesc:
      'Slow ramping (0.05-0.1 Hz) for baroreflex tuning and blood pressure regulation.',
    usageGoal:
      'Enhance baroreflex gain by 50%+, improve blood pressure regulation.',
    researchContext:
      'High baroreflex sensitivity predicts cardiovascular health. Training at resonance frequency increases baroreflex gain persistently.',
    phases: [
      {
        duration: 1200,
        beat: 0.075,
        carrier: 250,
        overlays: [SOLFEGGIO.MI],
        overlayMix: 0.15,
        harmonicStacking: true,
        dbssFrequency: {
          primary: 0.075,
          secondary: 10,
          targetRegion: 'nucleus_tractus_solitarius',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.8 },
          isochronic: { enabled: true, dutyCycle: 0.4 },
          monaural: { enabled: true, strength: 0.6 },
        },
        spatialMotion: 'breathe',
        progressionCurve: 'sigmoid',
      },
    ],
    breathwork: {
      name: 'Regulate',
      ratio: [6, 0, 6, 0],
      description: 'Feel blood pressure stabilizing.',
    },
    mantra: {
      phonetic: 'STABLE',
      meaning: 'Blood pressure balanced.',
      repeatInterval: 60,
    },
    evidenceGrade: 'B',
    mechanismOfAction:
      'Slow ramping at 0.075 Hz engages baroreflex arc, enhances blood pressure sensitivity, improves cardiovascular regulation.',
    expectedOnset: 25,
    cumulativeEffect: true,
    requiredSessions: 50,
    optimalTimeOfDay: 'morning',
  },

  cardiac_resilience_protocol_v5: {
    id: 'cardiac_resilience_protocol_v5',
    title: 'Cardiac Resilience Protocol v5.0',
    description: 'Heart Health & Stress Recovery',
    evidenceLevel: 'II',
    citation: 'Cardiac Health SDNN (web:230, web:233)',
    category: 'evidence',
    section: 'Autonomic Mastery',
    duration: 900,
    contraindications: ['Congestive heart failure', 'Cardiac arrhythmia'],
    algoDesc:
      'Alpha-Theta blend (8Hz/5Hz) for cardiac autonomic resilience and stress recovery.',
    usageGoal:
      '+30% cardiac health markers, faster recovery from stress.',
    researchContext:
      'Low SDNN (heart rate variability) predicts cardiac events. Alpha-theta enhances HRV and recovery from stress.',
    phases: [
      {
        duration: 450,
        beat: 8,
        carrier: 340,
        overlays: [SOLFEGGIO.MI],
        overlayMix: 0.15,
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.8 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.6 },
        },
      },
      {
        duration: 450,
        beat: 5,
        carrier: 250,
        overlays: [SOLFEGGIO.MI],
        overlayMix: 0.15,
        harmonicStacking: true,
        dbssFrequency: {
          primary: 5,
          secondary: 8,
          targetRegion: 'heart',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.7 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.5 },
        },
        spatialMotion: 'breathe',
        progressionCurve: 'linear',
      },
    ],
    breathwork: {
      name: 'Heart',
      ratio: [5, 5, 5, 5],
      description: 'Feel heart strengthening.',
    },
    mantra: {
      phonetic: 'STRONG HEART',
      meaning: 'Cardiac resilience.',
      repeatInterval: 30,
    },
    evidenceGrade: 'B',
    mechanismOfAction:
      'Alpha-theta coupling enhances parasympathetic recovery, improves HRV markers, strengthens cardiac autonomic resilience.',
    expectedOnset: 20,
    cumulativeEffect: true,
    requiredSessions: 35,
    optimalTimeOfDay: 'post-stress',
  },

  heart_brain_communication_v5: {
    id: 'heart_brain_communication_v5',
    title: 'Heart-Brain Communication v5.0',
    description: 'Cardiac-Neural Integration',
    evidenceLevel: 'II',
    citation: 'Interoceptive Vagal Signal',
    category: 'evidence',
    section: 'Autonomic Mastery',
    duration: 1200,
    contraindications: ['Serious heart conditions'],
    algoDesc:
      '7Hz Theta with 40Hz Gamma over 528Hz carrier for heart-brain coherence.',
    usageGoal:
      'Enhance heart-brain signaling, increase interoceptive awareness.',
    researchContext:
      'Vagus carries 80% afferent (heart->brain) signals. Theta-gamma coupling optimizes this communication channel.',
    phases: [
      {
        duration: 1200,
        beat: 7,
        carrier: 528,
        overlays: [40, SOLFEGGIO.FA],
        overlayMix: 0.3,
        harmonicStacking: true,
        dbssFrequency: {
          primary: 7,
          secondary: 40,
          targetRegion: 'insula',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.8 },
        },
        spatialMotion: 'breathe',
        progressionCurve: 'linear',
      },
    ],
    breathwork: {
      name: 'Listen',
      ratio: [4, 4, 4, 4],
      description: "Listen to heart's wisdom.",
    },
    mantra: {
      phonetic: 'I HEAR YOU',
      meaning: 'Heart-brain integration.',
      repeatInterval: 30,
    },
    evidenceGrade: 'B',
    mechanismOfAction:
      'Theta-gamma coupling at insula enhances interoceptive processing, 528Hz resonates with heart frequency, optimizes vagal signaling.',
    expectedOnset: 20,
    optimalTimeOfDay: 'evening',
  },

  cholinergic_anti_inflammatory_pathway_v5: {
    id: 'cholinergic_anti_inflammatory_pathway_v5',
    title: 'Cholinergic Anti-Inflammatory v5.0',
    description: 'Cytokine Regulation & Inflammation',
    evidenceLevel: 'II',
    citation: 'Vagal Anti-Inflammatory (web:233)',
    category: 'evidence',
    section: 'Autonomic Mastery',
    duration: 900,
    contraindications: ['Autoimmune disorders (consult physician)'],
    algoDesc:
      '5Hz Theta for vagal cholinergic pathway activation and anti-inflammatory signaling.',
    usageGoal:
      'Activate cholinergic anti-inflammatory pathway, reduce pro-inflammatory cytokines (TNF-α, IL-6, IL-1β).',
    researchContext:
      'Vagal stimulation releases acetylcholine, which suppresses pro-inflammatory cytokines via cholinergic pathway.',
    phases: [
      {
        duration: 900,
        beat: 5,
        carrier: 250,
        overlays: [SOLFEGGIO.UT],
        overlayMix: 0.15,
        dbssFrequency: {
          primary: 5,
          secondary: 10,
          targetRegion: 'vagus_nucleus',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.9 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.7 },
        },
        spatialMotion: 'breathe',
        progressionCurve: 'linear',
      },
    ],
    breathwork: {
      name: 'Anti-Inflame',
      ratio: [5, 5, 5, 5],
      description: 'Cool internal fire.',
    },
    mantra: {
      phonetic: 'CALM FIRE',
      meaning: 'Inflammation quenched.',
      repeatInterval: 20,
    },
    evidenceGrade: 'B',
    mechanismOfAction:
      '5Hz theta activates vagal cholinergic pathway, releases acetylcholine, suppresses TNF-α/IL-6/IL-1β pro-inflammatory cytokines.',
    expectedOnset: 15,
    cumulativeEffect: true,
    requiredSessions: 30,
    optimalTimeOfDay: 'morning',
  },
} as const;
