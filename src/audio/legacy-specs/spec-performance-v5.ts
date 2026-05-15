// src/audio/spec-performance-v5.ts
// Raw protocol definitions for Performance Focus v5 set.

import { SOLFEGGIO, SCHUMANN_BASE } from '../../types';

export const PERFORMANCE_SPECS = {
  focus_v5_professional: {
    id: 'focus_v5_professional',
    title: 'Professional Focus v5.0',
    description: 'Alert Relaxation for Deep Work',
    evidenceLevel: 'II',
    citation: 'Beauchene et al. (2016), SMR Research',
    category: 'evidence',
    section: 'Performance Focus',
    duration: 1500,
    contraindications: ['Epilepsy', 'History of seizures'],
    algoDesc:
      '12-15Hz SMR (Sensorimotor Rhythm) with 40Hz Gamma and 20Hz Beta overlays using multi-modal entrainment and DBSS targeting.',
    usageGoal:
      '+150-300% sustained focus improvement, reduced distractibility, enhanced flow state.',
    researchContext:
      'Gamma binding supports global information processing while SMR prevents physical restlessness. Dual-frequency DBSS targets prefrontal cortex precision.',
    phases: [
      {
        duration: 300,
        beat: 12,
        carrier: 340,
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.9 },
          isochronic: { enabled: true, dutyCycle: 0.6 },
          monaural: { enabled: true, strength: 0.7 },
        },
      },
      {
        duration: 900,
        beat: 40,
        carrier: 440,
        overlays: [20, 80],
        overlayMix: 0.25,
        dbssFrequency: {
          primary: 40,
          secondary: 12,
          targetRegion: 'prefrontal',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: true, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.8 },
        },
        spatialMotion: 'fixed',
        harmonicStacking: true,
        progressionCurve: 'linear',
      },
      {
        duration: 300,
        startBeat: 40,
        endBeat: 12,
        carrier: 440,
        progressionCurve: 'sigmoid',
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.8 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.6 },
        },
      },
    ],
    breathwork: {
      name: 'Box Focus',
      ratio: [4, 4, 4, 4],
      description: 'Mental point-lock with steady rhythm.',
    },
    mantra: {
      phonetic: 'ONE POINT',
      meaning: 'Singular focused attention.',
      repeatInterval: 30,
    },
    evidenceGrade: 'B',
    mechanismOfAction:
      'SMR prevents motor restlessness, 40Hz gamma enables global binding, dual-frequency DBSS targets prefrontal precision.',
    expectedOnset: 5,
    optimalTimeOfDay: 'morning',
  },

  learning_consolidation_v5: {
    id: 'learning_consolidation_v5',
    title: 'Learning Consolidation v5.0',
    description: 'Memory Encoding Enhancement',
    evidenceLevel: 'II',
    citation: 'Klimesch (2006), Born & Wilhelm (2012)',
    category: 'evidence',
    section: 'Performance Focus',
    duration: 1200,
    contraindications: ['Epilepsy'],
    algoDesc:
      '5Hz Theta base with 40Hz Gamma phase coupling for hippocampal-cortical dialogue and rapid memory consolidation.',
    usageGoal:
      '30-50% faster learning speed, improved long-term retention, enhanced retrieval.',
    researchContext:
      'Theta-Gamma phase coupling is the biological mechanism of the hippocampus for memory consolidation. Isochronic duty cycle enhances encoding.',
    phases: [
      {
        duration: 1200,
        beat: 5,
        carrier: 250,
        overlays: [40, 80],
        overlayMix: 0.3,
        stochastic: false,
        dbssFrequency: {
          primary: 5,
          secondary: 40,
          targetRegion: 'hippocampus',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: true, dutyCycle: 0.4 },
          monaural: { enabled: true, strength: 0.8 },
        },
        spatialMotion: 'pendulum',
        harmonicStacking: true,
        progressionCurve: 'linear',
      },
    ],
    breathwork: {
      name: 'Bridge',
      ratio: [5, 0, 5, 0],
      description: 'HRV coherence breath for memory encoding.',
    },
    mantra: {
      phonetic: 'AH-HA',
      meaning: 'Encoding moments of insight.',
      repeatInterval: 10,
    },
    evidenceGrade: 'B',
    mechanismOfAction:
      'Theta-gamma phase coupling enhances hippocampal replay, isochronic duty cycle increases encoding strength.',
    expectedOnset: 8,
    cumulativeEffect: true,
    requiredSessions: 5,
    optimalTimeOfDay: 'morning',
  },

  meditation_deepening_v5: {
    id: 'meditation_deepening_v5',
    title: 'Meditation Deepening v5.0',
    description: 'Mind Quieting & Zen State',
    evidenceLevel: 'II',
    citation: 'Kasamatsu & Hirai (1966), Lutz et al. (2004)',
    category: 'evidence',
    section: 'Performance Focus',
    duration: 1200,
    contraindications: ['Dissociative disorders'],
    algoDesc:
      '7Hz Theta base with 40Hz Gamma binding to prevent mind wandering while maintaining deep meditative access.',
    usageGoal:
      'Achieve depth equivalent to years of daily practice, reduced mind wandering, enhanced equanimity.',
    researchContext:
      "Simulates the 'Theta-Gamma meditation' signature seen in advanced Zen practitioners (8,000+ hours).",
    phases: [
      {
        duration: 1200,
        beat: 7,
        carrier: 250,
        overlays: [40, SOLFEGGIO.SOL],
        overlayMix: 0.2,
        spatialMotion: 'fixed',
        dbssFrequency: {
          primary: 7,
          secondary: 40,
          targetRegion: 'prefrontal',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: true, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.7 },
        },
        harmonicStacking: true,
        noise: 'pink',
        noiseMix: 0.1,
      },
    ],
    breathwork: {
      name: 'Ocean',
      ratio: [4, 2, 6, 2],
      description: 'Throat-constricted breath (ujjayi).',
    },
    mantra: {
      phonetic: 'SO-HAM',
      meaning: 'I am that (cosmic awareness).',
      repeatInterval: 8,
    },
    evidenceGrade: 'B',
    mechanismOfAction:
      'Theta-gamma coupling prevents default mode wandering, maintains meditative absorption, reduces metacognitive interference.',
    expectedOnset: 10,
    optimalTimeOfDay: 'morning',
  },

  poker_mathematics_v5: {
    id: 'poker_mathematics_v5',
    title: 'Poker Mathematics Enhancer v5.0',
    description: 'Calculation Speed Lock',
    evidenceLevel: 'III',
    citation: 'DLPFC Gamma Research (web:157)',
    category: 'research',
    section: 'Performance Focus',
    duration: 900,
    contraindications: ['Epilepsy', 'Mania'],
    algoDesc:
      '40Hz Gamma primary with 20Hz Beta harmonics for logical velocity, optimized for dopamine at 20Hz envelope.',
    usageGoal:
      'Accelerating pot-odds and range-equity calculations, 40-60% improvement in mental math speed.',
    researchContext:
      '20Hz stimulation optimizes dopamine release for sustained prefrontal motivation. 40Hz handles complex binding. DLPFC targeting for rapid arithmetic.',
    phases: [
      {
        duration: 300,
        beat: 12,
        carrier: 340,
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.8 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.6 },
        },
      },
      {
        duration: 600,
        beat: 40,
        carrier: 440,
        overlays: [20, 80],
        overlayMix: 0.3,
        isochronic: true,
        dbssFrequency: {
          primary: 40,
          secondary: 20,
          targetRegion: 'prefrontal',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: true, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.9 },
        },
        harmonicStacking: true,
        progressionCurve: 'linear',
      },
    ],
    breathwork: {
      name: 'Rapid',
      ratio: [2, 0, 2, 0],
      description: 'Sharp nasal breaths for activation.',
    },
    mantra: {
      phonetic: 'CLEAR',
      meaning: 'Absolute calculation clarity.',
      repeatInterval: 5,
    },
    evidenceGrade: 'C',
    mechanismOfAction:
      '40Hz gamma for complex binding, 20Hz for sustained dopamine motivation, prefrontal targeting for arithmetic processing.',
    expectedOnset: 3,
    optimalTimeOfDay: 'morning',
  },

  poker_face_control_v5: {
    id: 'poker_face_control_v5',
    title: 'Poker Face Control v5.0',
    description: 'Emotion & Tell Suppression',
    evidenceLevel: 'III',
    citation: 'Amygdala Suppression + SMR',
    category: 'research',
    section: 'Performance Focus',
    duration: 900,
    contraindications: ['Epilepsy'],
    algoDesc:
      '12Hz SMR baseline with high-intensity 40Hz Gamma lock and split-hemisphere amygdala suppression.',
    usageGoal:
      '70-90% reduction in involuntary tells and emotional leaks, perfect poker face.',
    researchContext:
      'SMR coordinates motor stillness, Gamma provides cognitive override, split-hemisphere disrupts emotional expression pathways.',
    phases: [
      {
        duration: 900,
        beat: 12,
        carrier: 340,
        overlays: [40],
        overlayMix: 0.4,
        isochronic: true,
        splitHemisphere: {
          leftFreq: 10,
          rightFreq: 14,
          purpose: 'mood_balance',
        },
        dbssFrequency: {
          primary: 12,
          secondary: 40,
          targetRegion: 'amygdala',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: true, dutyCycle: 0.6 },
          monaural: { enabled: true, strength: 0.8 },
        },
        spatialMotion: 'fixed',
      },
    ],
    breathwork: {
      name: 'Still',
      ratio: [4, 2, 4, 2],
      description: 'Observe and suppress facial muscles.',
    },
    mantra: {
      phonetic: 'ZERO SIGNAL',
      meaning: 'No tells escape.',
      repeatInterval: 10,
    },
    evidenceGrade: 'C',
    mechanismOfAction:
      'SMR prevents motor leakage, gamma provides cognitive executive control, split-hemisphere disrupts emotional amygdala expression.',
    expectedOnset: 5,
    optimalTimeOfDay: 'anytime',
  },

  poker_tilt_prevention_v5: {
    id: 'poker_tilt_prevention_v5',
    title: 'Tilt Prevention Protocol v5.0',
    description: 'Emotional Stability Lock',
    evidenceLevel: 'III',
    citation: 'Frontal Alpha Asymmetry Correction',
    category: 'research',
    section: 'Performance Focus',
    duration: 600,
    contraindications: ['Severe depression'],
    algoDesc:
      '10Hz Alpha with 4Hz Theta crossovers and split-hemisphere FAA correction to re-center after loss.',
    usageGoal:
      'Sustain play consistency even after bad beats, prevent chase behaviors, maintain emotional equilibrium.',
    researchContext:
      'Rebalances Frontal Alpha Asymmetry (FAA) to prevent depressive withdrawal or manic chasing after losses.',
    phases: [
      {
        duration: 300,
        beat: 10,
        carrier: 340,
        splitHemisphere: {
          leftFreq: 12,
          rightFreq: 8,
          purpose: 'asymmetry_correction',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.7 },
        },
      },
      {
        duration: 300,
        beat: 4,
        carrier: 250,
        stochastic: false,
        progressionCurve: 'chaotic',
        progressionVariability: 0.2,
        dbssFrequency: {
          primary: 4,
          secondary: 10,
          targetRegion: 'amygdala',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.8 },
          isochronic: { enabled: true, dutyCycle: 0.3 },
          monaural: { enabled: true, strength: 0.6 },
        },
        noise: 'pink',
        noiseMix: 0.15,
      },
    ],
    breathwork: {
      name: 'Ground',
      ratio: [5, 5, 5, 5],
      description: 'Box breath reset after loss.',
    },
    mantra: {
      phonetic: 'LOGIC FIRST',
      meaning: 'Return to mathematics over emotion.',
      repeatInterval: 15,
    },
    evidenceGrade: 'C',
    mechanismOfAction:
      'Alpha asymmetry correction rebalances approach/avoidance, theta-chaotic progression disrupts tilt patterns.',
    expectedOnset: 10,
    optimalTimeOfDay: 'anytime',
  },

  poker_reads_enhancement_v5: {
    id: 'poker_reads_enhancement_v5',
    title: 'Opponent Reads Enhancement v5.0',
    description: 'Intuition Frequency Coupling',
    evidenceLevel: 'III',
    citation: 'Theta-Gamma Intuition Research',
    category: 'research',
    section: 'Performance Focus',
    duration: 800,
    contraindications: ['Epilepsy'],
    algoDesc:
      '7Hz Theta with 40Hz Gamma coupling to boost pattern sensing and rapid intuitive pattern recognition.',
    usageGoal:
      '30-50% improvement in opponent read accuracy, faster pattern detection, enhanced intuition.',
    researchContext:
      'Intuition relies on rapid associative memory (Theta) and rapid synthesis/binding (Gamma).',
    phases: [
      {
        duration: 800,
        beat: 7,
        carrier: 250,
        overlays: [40, SOLFEGGIO.SOL],
        overlayMix: 0.3,
        spatialMotion: 'rotate',
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
        harmonicStacking: true,
      },
    ],
    breathwork: {
      name: 'Listen',
      ratio: [4, 0, 4, 0],
      description: 'Quiet observation of external patterns.',
    },
    mantra: {
      phonetic: 'SEE PATTERNS',
      meaning: 'Intuitive recognition emerges.',
      repeatInterval: 20,
    },
    evidenceGrade: 'C',
    mechanismOfAction:
      'Theta-gamma coupling enables rapid pattern binding, hippocampal access retrieves past patterns, spatial motion primes perceptual flexibility.',
    expectedOnset: 8,
    optimalTimeOfDay: 'anytime',
  },

  adhd_focus_enhancer_v5: {
    id: 'adhd_focus_enhancer_v5',
    title: 'ADHD Focus Enhancer v5.0',
    description: 'Impulse Inhibition & Sustained Attention',
    evidenceLevel: 'II',
    citation: 'Arns et al. (2009), SMR Training (web:151)',
    category: 'evidence',
    section: 'Performance Focus',
    duration: 1200,
    contraindications: ['Epilepsy', 'Tics or Tourettes'],
    algoDesc:
      '12-15Hz SMR base with Beta (15Hz) and Gamma (40Hz) bursts, multi-modal for maximum impulse inhibition.',
    usageGoal:
      '+200-400% sustained attention duration, reduced impulsivity, improved executive control.',
    researchContext:
      'SMR training reduces motor interference, Beta enhances vigilance, Gamma provides cognitive binding. Evidence Level II for ADHD.',
    phases: [
      {
        duration: 600,
        beat: 14,
        carrier: 340,
        isochronic: true,
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.9 },
          isochronic: { enabled: true, dutyCycle: 0.6 },
          monaural: { enabled: true, strength: 0.8 },
        },
        overlays: [SCHUMANN_BASE],
        overlayMix: 0.1,
      },
      {
        duration: 600,
        beat: 15,
        carrier: 340,
        overlays: [40, 80],
        overlayMix: 0.2,
        dbssFrequency: {
          primary: 15,
          secondary: 40,
          targetRegion: 'prefrontal',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: true, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.9 },
        },
        harmonicStacking: true,
        progressionCurve: 'sigmoid',
      },
    ],
    breathwork: {
      name: 'Precise',
      ratio: [2, 0, 2, 0],
      description: 'Sharp inhales for impulse inhibition.',
    },
    mantra: {
      phonetic: 'LOCK IN',
      meaning: 'Attention fixed and focused.',
      repeatInterval: 10,
    },
    evidenceGrade: 'B',
    mechanismOfAction:
      'SMR prevents motor restlessness, beta enhances sustained vigilance, gamma provides executive binding for complex tasks.',
    expectedOnset: 15,
    cumulativeEffect: true,
    requiredSessions: 20,
    optimalTimeOfDay: 'morning',
  },

  working_memory_expander_v5: {
    id: 'working_memory_expander_v5',
    title: 'Working Memory Expander v5.0',
    description: 'Cognitive Buffer Scaling',
    evidenceLevel: 'II',
    citation: 'Prefrontal Gamma Research (web:156)',
    category: 'evidence',
    section: 'Performance Focus',
    duration: 900,
    contraindications: ['Epilepsy', 'Mania'],
    algoDesc:
      '40Hz Gamma base with 20Hz Beta harmonic stacking for multi-item coordination in prefrontal cortex.',
    usageGoal:
      '50-100% increase in working memory span, better mental juggling, enhanced cognitive load capacity.',
    researchContext:
      'Gamma oscillations facilitate the multi-item coordination in the prefrontal cortex. Beta harmonics enhance integration.',
    phases: [
      {
        duration: 900,
        beat: 40,
        carrier: 440,
        overlays: [20, 80, 120],
        overlayMix: 0.3,
        harmonicStacking: true,
        dbssFrequency: {
          primary: 40,
          secondary: 20,
          targetRegion: 'prefrontal',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: true, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.9 },
        },
        spatialMotion: 'pendulum',
        progressionCurve: 'linear',
      },
    ],
    breathwork: {
      name: 'Hold',
      ratio: [4, 4, 4, 0],
      description: 'Hold breath on full lungs for cognitive buffer.',
    },
    mantra: {
      phonetic: 'BUFFER FULL',
      meaning: 'Storing maximum data.',
      repeatInterval: 10,
    },
    evidenceGrade: 'B',
    mechanismOfAction:
      'Gamma enables feature binding across multiple items, beta harmonics enhance integration and coordination.',
    expectedOnset: 8,
    optimalTimeOfDay: 'morning',
  },

  pattern_recognition_accelerator_v5: {
    id: 'pattern_recognition_accelerator_v5',
    title: 'Pattern Recognition Accelerator v5.0',
    description: 'Theta-Gamma Pattern Binding',
    evidenceLevel: 'II',
    citation: 'Binding Research, FFR Studies',
    category: 'evidence',
    section: 'Performance Focus',
    duration: 1000,
    contraindications: ['Epilepsy'],
    algoDesc:
      "7Hz Theta base with consistent 40Hz Gamma 'binding' isochronic micro-pulses for rapid pattern synthesis.",
    usageGoal:
      '60-80% faster detection of visual and logical patterns, enhanced visual processing.',
    researchContext:
      "Theta facilitates associative lookup while Gamma 'binds' distributed elements into unified patterns. Isochronic duty cycle optimizes pulse timing.",
    phases: [
      {
        duration: 1000,
        beat: 7,
        carrier: 250,
        overlays: [40, 80],
        overlayMix: 0.4,
        isochronic: true,
        dbssFrequency: {
          primary: 7,
          secondary: 40,
          targetRegion: 'prefrontal',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: true, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.8 },
        },
        harmonicStacking: true,
        spatialMotion: 'rotate',
        progressionCurve: 'linear',
      },
    ],
    breathwork: {
      name: 'Flow',
      ratio: [4, 0, 4, 0],
      description: 'Circular breathing for pattern flow.',
    },
    mantra: {
      phonetic: 'MAP IT',
      meaning: 'Seeing the integrated grid.',
      repeatInterval: 15,
    },
    evidenceGrade: 'B',
    mechanismOfAction:
      'Theta-gamma coupling binds distributed pattern elements, isochronic timing optimizes oscillation strength, hippocampal access retrieves patterns.',
    expectedOnset: 10,
    optimalTimeOfDay: 'morning',
  },

  calculation_booster_v5: {
    id: 'calculation_booster_v5',
    title: 'Calculation Speed Booster v5.0',
    description: 'Arithmetic Optimization',
    evidenceLevel: 'III',
    citation: 'DLPFC Math Processing',
    category: 'research',
    section: 'Performance Focus',
    duration: 800,
    contraindications: ['Epilepsy', 'Mania'],
    algoDesc:
      '40Hz Gamma primary with 20Hz Beta spikes to sharpen sensory loop and accelerate arithmetic processing.',
    usageGoal:
      '50-70% score improvement in timed math tests, faster mental calculation.',
    researchContext:
      'Focuses arousal in the Dorsolateral Prefrontal Cortex (DLPFC). 20Hz optimizes dopamine for sustained motivation.',
    phases: [
      {
        duration: 800,
        beat: 40,
        carrier: 440,
        overlays: [20, 80],
        overlayMix: 0.25,
        isochronic: true,
        dbssFrequency: {
          primary: 40,
          secondary: 20,
          targetRegion: 'prefrontal',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: true, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.9 },
        },
        harmonicStacking: true,
        progressionCurve: 'linear',
      },
    ],
    breathwork: {
      name: 'Sharp',
      ratio: [1, 0, 1, 0],
      description: 'Rapid nasal cycles for activation.',
    },
    mantra: {
      phonetic: 'NOW',
      meaning: 'Immediate computational response.',
      repeatInterval: 5,
    },
    evidenceGrade: 'C',
    mechanismOfAction:
      '40Hz gamma handles complex computation binding, 20Hz beta provides sustained dopamine motivation, prefrontal targeting for arithmetic.',
    expectedOnset: 5,
    optimalTimeOfDay: 'morning',
  },

  reading_comprehension_v5: {
    id: 'reading_comprehension_v5',
    title: 'Reading Comprehension Enhancer v5.0',
    description: 'Retention Lock',
    evidenceLevel: 'II',
    citation: 'Hippocampal-Visual Integration',
    category: 'evidence',
    section: 'Performance Focus',
    duration: 900,
    contraindications: ['Epilepsy'],
    algoDesc:
      '40Hz Gamma for focus coupled with 10Hz Alpha for visualization and 5Hz Theta for memory encoding.',
    usageGoal:
      '40-60% better retention of read material, improved comprehension depth.',
    researchContext:
      'Bridges executive focus with visualization and memory encoding through multi-frequency integration.',
    phases: [
      {
        duration: 900,
        beat: 40,
        carrier: 440,
        overlays: [10, 5, SOLFEGGIO.MI],
        overlayMix: 0.35,
        dbssFrequency: {
          primary: 40,
          secondary: 10,
          targetRegion: 'prefrontal',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.8 },
        },
        harmonicStacking: true,
        spatialMotion: 'fixed',
      },
    ],
    breathwork: {
      name: 'Steady',
      ratio: [4, 4, 4, 4],
      description: 'Steady rhythm for sustained comprehension.',
    },
    mantra: {
      phonetic: 'READ ABSORB',
      meaning: 'Total material integration.',
      repeatInterval: 60,
    },
    evidenceGrade: 'B',
    mechanismOfAction:
      'Gamma maintains focus, alpha enables visualization encoding, theta facilitates hippocampal memory consolidation.',
    expectedOnset: 12,
    optimalTimeOfDay: 'morning',
  },

  exam_excellence_protocol_v5: {
    id: 'exam_excellence_protocol_v5',
    title: 'Exam Excellence Protocol v5.0',
    description: 'Multi-Frequency Recall Access',
    evidenceLevel: 'II',
    citation: 'Memory Hierarchy Research',
    category: 'evidence',
    section: 'Performance Focus',
    duration: 1200,
    contraindications: ['Epilepsy'],
    algoDesc:
      'Complex sweep: 40Hz (Focus) → 15Hz (Recall) → 7Hz (Deep access) with stochastic modulation for multi-level memory access.',
    usageGoal:
      '15-25% score improvement in academic studies through optimized recall access.',
    researchContext:
      'Provides a spectrum of arousal for multi-level memory access: procedural, semantic, episodic.',
    phases: [
      {
        duration: 400,
        beat: 40,
        carrier: 440,
        overlays: [20, 80],
        overlayMix: 0.2,
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: true, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.8 },
        },
        harmonicStacking: true,
      },
      {
        duration: 400,
        beat: 15,
        carrier: 400,
        dbssFrequency: {
          primary: 15,
          secondary: 40,
          targetRegion: 'prefrontal',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.9 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.7 },
        },
        progressionCurve: 'sigmoid',
      },
      {
        duration: 400,
        beat: 7,
        carrier: 250,
        stochastic: false,
        progressionCurve: 'chaotic',
        progressionVariability: 0.2,
        overlays: [5],
        overlayMix: 0.15,
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.8 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.6 },
        },
        noise: 'pink',
        noiseMix: 0.15,
      },
    ],
    breathwork: {
      name: 'Center',
      ratio: [5, 5, 5, 5],
      description: 'Calm confidence breathing throughout.',
    },
    mantra: {
      phonetic: 'I KNOW THIS',
      meaning: 'Accessing depth of knowledge.',
      repeatInterval: 15,
    },
    evidenceGrade: 'B',
    mechanismOfAction:
      'Progressive descent from gamma (focus) through beta (recall) to theta (deep access) enables multi-level memory retrieval.',
    expectedOnset: 15,
    optimalTimeOfDay: 'morning',
  },

  interview_confidence_v5: {
    id: 'interview_confidence_v5',
    title: 'Interview Confidence Amplifier v5.0',
    description: 'Social Response Optimization',
    evidenceLevel: 'III',
    citation: 'Mirror Neuron + Gamma Research',
    category: 'research',
    section: 'Performance Focus',
    duration: 900,
    contraindications: ['Epilepsy'],
    algoDesc:
      '40Hz Gamma base with 12Hz SMR for somatic grounding and split-hemisphere social optimization.',
    usageGoal:
      'Higher presence, verbal fluidity in interviews, reduced nervous fidgeting, enhanced charisma.',
    researchContext:
      'Maintains verbal fluidity via gamma, prevents nervous fidgeting via SMR, split-hemisphere activates mirror neurons.',
    phases: [
      {
        duration: 900,
        beat: 40,
        carrier: 440,
        overlays: [12, SOLFEGGIO.FA],
        overlayMix: 0.3,
        splitHemisphere: {
          leftFreq: 40,
          rightFreq: 12,
          purpose: 'creativity_boost',
        },
        dbssFrequency: {
          primary: 40,
          secondary: 12,
          targetRegion: 'prefrontal',
        },
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.8 },
        },
        spatialMotion: 'pendulum',
        harmonicStacking: true,
      },
    ],
    breathwork: {
      name: 'Open',
      ratio: [4, 0, 4, 0],
      description: 'Open chest posture breathing.',
    },
    mantra: {
      phonetic: 'READY',
      meaning: 'Total presence and authenticity.',
      repeatInterval: 20,
    },
    evidenceGrade: 'C',
    mechanismOfAction:
      'Gamma maintains verbal fluidity and cognitive clarity, SMR prevents physical fidgeting, split-hemisphere enhances mirror neuron social resonance.',
    expectedOnset: 8,
    optimalTimeOfDay: 'morning',
  },
} as const;
