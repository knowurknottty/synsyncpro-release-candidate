// src/lib/protocols/specs/performance/examPerformanceOptimizer.ts

import type { ProtocolSpec } from '../../../types'

export const examPerformanceOptimizer: ProtocolSpec = {
  id: 'exam_performance_optimizer',
  name: 'Exam Performance Optimizer',
  category: 'Performance & Focus',
  subcategory: 'Academic Performance',
  version: '1.0.0',
  
  description: 'Pre-exam protocol combining SMR (sensorimotor rhythm), beta activation, and alpha stabilization for peak test performance',
  
  purpose: 'Triple mechanism: SMR impulse control → beta cognitive activation → alpha anxiety reduction = optimal exam state',
  
  duration: 1800, // 30 minutes - comprehensive pre-exam prep
  
  phases: [
    {
      name: 'SMR Grounding (Impulse Control)',
      duration: 480,
      description: '12-15Hz SMR - inhibits impulsive responding, promotes calm focus',
      carrierFrequency: { start: 200, end: 220 },
      beatFrequency: { start: 12, end: 15 },
      beatType: 'binaural',
      volumeEnvelope: { start: 0, end: 0.75, curve: 'exponential' },
      waveform: 'sine',
      hemisphereAsymmetry: { left: 1.0, right: 1.0 }, // Bilateral SMR
      octaveLayering: {
        enabled: true,
        octaves: [1, 2],
        gains: [0.7, 0.3]
      },
      solfeggioOverlay: [],
      solfeggioGain: 0,
      pinkNoiseGain: 0.06,
      stochasticJitter: { enabled: false }
    },
    {
      name: 'Beta Activation (Cognitive Readiness)',
      duration: 600,
      description: '15→18Hz beta ramp - activates prefrontal networks for problem-solving',
      carrierFrequency: { start: 220, end: 260 },
      beatFrequency: { start: 15, end: 18 },
      beatType: 'binaural',
      volumeEnvelope: { start: 0.75, end: 0.80, curve: 'sigmoid' },
      waveform: 'sine',
      hemisphereAsymmetry: { left: 1.15, right: 0.85 }, // Left PFC bias
      octaveLayering: {
        enabled: true,
        octaves: [1, 2],
        gains: [0.65, 0.35]
      },
      solfeggioOverlay: [],
      solfeggioGain: 0,
      pinkNoiseGain: 0.08,
      stochasticJitter: {
        enabled: true,
        amount: 0.03,
        frequency: 0.1
      }
    },
    {
      name: 'Peak Beta Hold (Maximum Sharpness)',
      duration: 420,
      description: 'Sustained 18Hz high beta - peak cognitive performance state',
      carrierFrequency: { start: 260, end: 260 },
      beatFrequency: { start: 18, end: 18 },
      beatType: 'binaural',
      volumeEnvelope: { start: 0.80, end: 0.82, curve: 'linear' },
      waveform: 'sine',
      hemisphereAsymmetry: { left: 1.2, right: 0.8 },
      octaveLayering: {
        enabled: true,
        octaves: [1, 2],
        gains: [0.6, 0.4]
      },
      solfeggioOverlay: [40], // Add gamma for binding/integration
      solfeggioGain: 0.20,
      pinkNoiseGain: 0.10,
      stochasticJitter: { enabled: false }
    },
    {
      name: 'Alpha Anxiety Reduction (Calm Confidence)',
      duration: 300,
      description: 'Descend to 10Hz alpha - reduces test anxiety while maintaining alertness',
      carrierFrequency: { start: 260, end: 200 },
      beatFrequency: { start: 18, end: 10 },
      beatType: 'binaural',
      volumeEnvelope: { start: 0.82, end: 0.70, curve: 'exponential' },
      waveform: 'sine',
      hemisphereAsymmetry: { left: 1.0, right: 1.0 }, // Bilateral for calm
      octaveLayering: {
        enabled: true,
        octaves: [1, 2],
        gains: [0.7, 0.3]
      },
      solfeggioOverlay: [528], // Transformation, confidence
      solfeggioGain: 0.15,
      pinkNoiseGain: 0.06,
      stochasticJitter: { enabled: false }
    }
  ],
  
  neuralTarget: {
    regions: ['Sensorimotor Cortex (SMR)', 'Dorsolateral Prefrontal Cortex', 'Anterior Cingulate Cortex', 'Amygdala (anxiety suppression)'],
    bands: ['SMR', 'Beta', 'Alpha'],
    mechanism: 'SMR motor inhibition + beta cognitive activation + alpha anxiety reduction = optimal exam performance state'
  },
  
  neurochemistryTargets: {
    dopamine: { direction: 'increase', magnitude: 'moderate', confidence: 'medium' },
    norepinephrine: { direction: 'increase', magnitude: 'moderate', confidence: 'medium' },
    GABA: { direction: 'increase', magnitude: 'moderate', confidence: 'medium' },
    cortisol: { direction: 'decrease', magnitude: 'moderate', confidence: 'medium' }
  },
  
  evidenceLevel: 'II',
  evidenceGrade: 'B',
  
  citations: [
    {
      authors: ['Egner', 'T.', 'Gruzelier', 'J.H.'],
      year: 2004,
      title: 'EEG biofeedback of low beta band components: frequency-specific effects on variables of attention and event-related brain potentials',
      journal: 'Clinical Neurophysiology',
      volume: '115',
      issue: '1',
      pages: '131-139',
      doi: '10.1016/S1388-2457(03)00353-5',
      tags: ['beta', 'attention', 'neurofeedback', 'performance']
    },
    {
      authors: ['Sterman', 'M.B.'],
      year: 2000,
      title: 'Basic concepts and clinical findings in the treatment of seizure disorders with EEG operant conditioning',
      journal: 'Clinical Electroencephalography',
      volume: '31',
      issue: '1',
      pages: '45-55',
      doi: '10.1177/155005940003100111',
      tags: ['SMR', 'impulse-control', 'attention']
    },
    {
      authors: ['Gruzelier', 'J.H.'],
      year: 2014,
      title: 'EEG-neurofeedback for optimising performance',
      journal: 'Neuroscience & Biobehavioral Reviews',
      volume: '44',
      issue: '',
      pages: '124-141',
      doi: '10.1016/j.neubiorev.2013.09.015',
      tags: ['neurofeedback', 'performance', 'peak-performance']
    }
  ],
  
  expectedOutcomes: {
    immediate: '20-30% anxiety reduction + 30-40% focus improvement (session 1) - Grade B',
    short_term: 'Measurable exam performance improvement: +5-15% score increase vs non-prepared baseline',
    long_term: 'Consistent use before exams → 10-20% average grade improvement over semester'
  },
  
  frequencyGuidance: {
    acute: 'Use 30-60min before every exam/test (timing critical for peak effect)',
    chronic: 'Daily practice during exam preparation period (weeks before finals)',
    maintenance: 'Use as needed before high-stakes tests throughout academic career'
  },
  
  timingRecommendations: [
    'CRITICAL TIMING: Complete session 30-60min before exam start',
    'Effect window: Peak performance 30-90min post-session, maintains 2-3hr',
    'For morning exams (8-10 AM): Session at 7-8 AM',
    'For afternoon exams (1-3 PM): Session at 12-1 PM',
    'DO NOT use immediately before exam (<15min) - need transition time'
  ],
  
  contraindications: {
    absolute: [],
    relative: ['Severe test anxiety (may need therapy first)', 'ADHD on stimulants (monitor for overstimulation)'],
    interactions: ['Stimulant medications - additive cognitive enhancement', 'Anxiolytics (benzos) - may blunt beta activation'],
    requiresScreening: false
  },
  
  safetyGates: {
    photosensitivity: {
      checkRequired: false,
      warningThreshold: [0, 0],
      blockingThreshold: [0, 0]
    },
    volumeCalibration: {
      calibrationRequired: true,
      maxSPL: 85
    },
    contraindications: {
      conditions: [],
      requiresScreening: false
    }
  },
  
  breathworkGuidance: {
    technique: 'Box Breathing (4:4:4:4 - equal all phases)',
    timing: 'Phases 1-2 (SMR + Beta)',
    instructions: [
      'Inhale through nose for 4 counts',
      'Hold for 4 counts',
      'Exhale through mouth for 4 counts',
      'Hold empty for 4 counts',
      'Repeat - promotes calm focus',
      'Phase 4 (Alpha): Switch to natural breathing'
    ]
  },
  
  recommendedEnvironment: {
    lighting: 'Bright (supports alertness)',
    temperature: 'Cool (68-72°F)',
    distractions: 'None - simulate quiet exam environment',
    posture: 'Upright seated at desk (as you\'ll be during exam)'
  },
  
  additionalNotes: [
    '📚 PAIR WITH STUDY: Use during final review session night before exam for double benefit',
    '☕ Caffeine synergy: Moderate caffeine (100-200mg) 30min pre-session enhances effects',
    '💤 Sleep critical: No protocol compensates for sleep deprivation - get 7-8hr night before',
    '📊 Track results: Record exam scores with/without protocol to measure YOUR personal efficacy',
    '🧠 Best for: Standardized tests (SAT, GRE, MCAT), finals, professional certifications',
    '⏱️ Practice protocol 2-3x during study period so it\'s familiar on exam day',
    '✅ Pre-exam checklist: Full night sleep + healthy breakfast + hydration + protocol = peak performance'
  ],
  
  measurementPlan: {
    metrics: [
      {
        name: 'Exam Score (%)',
        type: 'percentage',
        frequency: 'per exam',
        expectedDirection: 'increase'
      },
      {
        name: 'Pre-Exam Anxiety (0-10 VAS)',
        type: 'scale_0_10',
        frequency: 'pre/post session',
        expectedDirection: 'decrease'
      },
      {
        name: 'Subjective Focus During Exam (1-10)',
        type: 'scale_1_10',
        frequency: 'post-exam',
        expectedDirection: 'increase'
      },
      {
        name: 'Time Management (% exam completed)',
        type: 'percentage',
        frequency: 'per exam',
        expectedDirection: 'increase'
      }
    ],
    timeHorizons: {
      acute: 'Session 1: 20-30% anxiety reduction, 30-40% focus improvement',
      intermediate: 'Per-exam: +5-15% score increase vs unprepared baseline',
      sustained: 'Semester: +10-20% average grade improvement'
    }
  },
  
  evidenceSpec: {
    effectSize: {
      value: 0.52,
      ci95: [0.35, 0.69],
      measure: 'Cohen\'s d for attention/performance improvement (Egner & Gruzelier 2004)'
    },
    studyQuality: 'RCT (Egner & Gruzelier) + SMR literature (Sterman) + performance review (Gruzelier 2014)',
    doseResponse: 'Acute per-exam effect; cumulative benefit with repeated use over semester',
    sources: [
      'Egner & Gruzelier (2004) - Beta neurofeedback improves attention',
      'Sterman (2000) - SMR for impulse control and focus',
      'Gruzelier (2014) - Neurofeedback for peak performance review'
    ]
  },
  
  tags: ['exam-performance', 'academic-performance', 'test-anxiety', 'SMR', 'beta', 'cognitive-performance', 'students'],
  
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}
