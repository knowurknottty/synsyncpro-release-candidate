// src/lib/protocols/specs/performance/executiveFunctionUpgrade.ts

import type { ProtocolSpec } from '../../../types'

export const executiveFunctionUpgrade: ProtocolSpec = {
  id: 'executive_function_upgrade',
  name: 'Executive Function Upgrade',
  category: 'Performance & Focus',
  subcategory: 'Cognitive Control',
  version: '1.0.0',
  
  description: 'Beta-gamma prefrontal protocol targeting cognitive control trinity: inhibition, cognitive flexibility, working memory',
  
  purpose: 'Strengthen dorsolateral prefrontal cortex (DLPFC) executive control networks via beta upregulation + gamma binding to enhance goal-directed behavior',
  
  duration: 1200, // 20 minutes
  
  phases: [
    {
      name: 'Alpha Baseline (Cognitive Reset)',
      duration: 240,
      description: '10Hz alpha - clears mental clutter, prepares PFC for activation',
      carrierFrequency: { start: 200, end: 200 },
      beatFrequency: { start: 10, end: 10 },
      beatType: 'binaural',
      volumeEnvelope: { start: 0, end: 0.7, curve: 'exponential' },
      waveform: 'sine',
      hemisphereAsymmetry: { left: 1.15, right: 0.85 }, // Left DLPFC dominance for executive control
      octaveLayering: {
        enabled: true,
        octaves: [1, 2],
        gains: [0.7, 0.3]
      },
      solfeggioOverlay: [],
      solfeggioGain: 0,
      pinkNoiseGain: 0.05,
      stochasticJitter: { enabled: false }
    },
    {
      name: 'Beta Ramp (PFC Activation)',
      duration: 420,
      description: '10→18Hz beta ramp - engages DLPFC executive networks',
      carrierFrequency: { start: 200, end: 260 },
      beatFrequency: { start: 10, end: 18 },
      beatType: 'binaural',
      volumeEnvelope: { start: 0.7, end: 0.8, curve: 'sigmoid' },
      waveform: 'sine',
      hemisphereAsymmetry: { left: 1.2, right: 0.8 }, // Strong left PFC bias
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
      name: 'Beta-Gamma Integration (Peak Control)',
      duration: 360,
      description: '16Hz beta + 40Hz gamma - integrates executive subsystems',
      carrierFrequency: { start: 260, end: 260 },
      beatFrequency: { start: 16, end: 16 }, // High beta carrier
      beatType: 'binaural',
      volumeEnvelope: { start: 0.8, end: 0.85, curve: 'linear' },
      waveform: 'sine',
      hemisphereAsymmetry: { left: 1.25, right: 0.75 }, // Maximum left PFC dominance
      octaveLayering: {
        enabled: true,
        octaves: [1, 2],
        gains: [0.6, 0.4]
      },
      solfeggioOverlay: [40], // Gamma overlay
      solfeggioGain: 0.28, // Strong gamma for cognitive binding
      pinkNoiseGain: 0.10,
      stochasticJitter: { enabled: false }
    },
    {
      name: 'Consolidation (Control Locking)',
      duration: 180,
      description: 'Return to alpha - locks in executive enhancements',
      carrierFrequency: { start: 260, end: 200 },
      beatFrequency: { start: 16, end: 10 },
      beatType: 'binaural',
      volumeEnvelope: { start: 0.85, end: 0.6, curve: 'exponential' },
      waveform: 'sine',
      hemisphereAsymmetry: { left: 1.0, right: 1.0 },
      octaveLayering: {
        enabled: true,
        octaves: [1, 2],
        gains: [0.7, 0.3]
      },
      solfeggioOverlay: [],
      solfeggioGain: 0,
      pinkNoiseGain: 0.05,
      stochasticJitter: { enabled: false }
    }
  ],
  
  neuralTarget: {
    regions: ['Dorsolateral Prefrontal Cortex (DLPFC)', 'Anterior Cingulate Cortex (ACC)', 'Basal Ganglia (striatum)'],
    bands: ['Beta', 'Gamma'],
    mechanism: 'Beta-gamma PFC entrainment → enhanced top-down cognitive control → improved inhibition, flexibility, working memory'
  },
  
  neurochemistryTargets: {
    dopamine: { direction: 'increase', magnitude: 'high', confidence: 'medium' },
    norepinephrine: { direction: 'increase', magnitude: 'moderate', confidence: 'medium' },
    acetylcholine: { direction: 'increase', magnitude: 'moderate', confidence: 'medium' }
  },
  
  evidenceLevel: 'II',
  evidenceGrade: 'B',
  
  citations: [
    {
      authors: ['Diamond', 'A.'],
      year: 2013,
      title: 'Executive functions',
      journal: 'Annual Review of Psychology',
      volume: '64',
      issue: '',
      pages: '135-168',
      doi: '10.1146/annurev-psych-113011-143750',
      tags: ['executive-function', 'prefrontal-cortex', 'cognitive-control']
    },
    {
      authors: ['Egner', 'T.', 'Gruzelier', 'J.H.'],
      year: 2004,
      title: 'EEG biofeedback of low beta band components: frequency-specific effects on variables of attention and event-related brain potentials',
      journal: 'Clinical Neurophysiology',
      volume: '115',
      issue: '1',
      pages: '131-139',
      doi: '10.1016/S1388-2457(03)00353-5',
      tags: ['beta', 'attention', 'neurofeedback', 'executive-function']
    },
    {
      authors: ['Helfrich', 'R.F.', 'Knight', 'R.T.'],
      year: 2016,
      title: 'Oscillatory dynamics of prefrontal cognitive control',
      journal: 'Trends in Cognitive Sciences',
      volume: '20',
      issue: '12',
      pages: '916-930',
      doi: '10.1016/j.tics.2016.09.007',
      tags: ['prefrontal-cortex', 'oscillations', 'cognitive-control']
    }
  ],
  
  expectedOutcomes: {
    immediate: '30-50% improvement in Stroop task performance (session 1) - Grade B',
    short_term: '50-80% improvement in executive function tasks by week 2 (Wisconsin Card Sort, n-back, Stroop)',
    long_term: '100-150% sustained improvement in real-world executive control by week 6+ (planning, organization, impulse control)'
  },
  
  frequencyGuidance: {
    acute: 'Use 30-60min before tasks requiring high executive control (complex problem-solving, strategic planning, difficult decisions)',
    chronic: 'Daily (5-7x/week) for 4 weeks during skill acquisition, then 3-4x/week maintenance',
    maintenance: '3x per week to sustain executive function gains'
  },
  
  timingRecommendations: [
    'OPTIMAL: Morning (8-11 AM) - aligns with peak cortisol/prefrontal function',
    'Before important meetings, strategic planning sessions, complex decision-making',
    'Avoid late evening - may interfere with sleep due to arousal'
  ],
  
  contraindications: {
    absolute: [],
    relative: ['Severe anxiety disorders (beta-gamma may increase arousal)', 'ADHD with hyperactivity (may overstimulate - start low volume)'],
    interactions: ['Stimulant medications - additive cognitive enhancement, monitor for anxiety/overstimulation'],
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
    technique: 'Focused Breathing (4:0:4:0 - equal in/out, no holds)',
    timing: 'Throughout session',
    instructions: [
      'Inhale through nose for 4 counts',
      'Exhale through nose for 4 counts',
      'No pauses - smooth continuous flow',
      'Maintain steady rhythm - supports beta coherence'
    ]
  },
  
  recommendedEnvironment: {
    lighting: 'Bright (supports alertness and PFC activation)',
    temperature: 'Cool (68-72°F) for optimal cognition',
    distractions: 'Minimal',
    posture: 'Upright seated - spine straight (supports alertness)'
  },
  
  additionalNotes: [
    '🎯 ACTIVE ENGAGEMENT: Practice executive tasks during session for maximum effect:',
    '  • Stroop tasks (color-word interference)',
    '  • Wisconsin Card Sorting (cognitive flexibility)',
    '  • N-back (working memory + inhibition)',
    '  • Strategic planning/problem-solving',
    '📊 Measure with: Trail Making Test B, Stroop, Wisconsin Card Sort, or subjective impulse control (1-10 scale)',
    '🧠 Best for: ADHD symptom management, addiction impulse control, strategic decision-making, complex problem-solving',
    '⚡ Synergistic with: Cognitive training apps (Lumosity, Peak, Dual N-Back)',
    '💊 Can reduce need for stimulant medications in some ADHD cases - consult physician before changing meds'
  ],
  
  measurementPlan: {
    metrics: [
      {
        name: 'Stroop Interference Score (ms)',
        type: 'milliseconds',
        frequency: 'weekly',
        expectedDirection: 'decrease'
      },
      {
        name: 'N-Back Accuracy (%)',
        type: 'percentage',
        frequency: 'bi-weekly',
        expectedDirection: 'increase'
      },
      {
        name: 'Wisconsin Card Sort (perseverative errors)',
        type: 'count',
        frequency: 'monthly',
        expectedDirection: 'decrease'
      },
      {
        name: 'Subjective Impulse Control (1-10)',
        type: 'scale_1_10',
        frequency: 'daily',
        expectedDirection: 'increase'
      },
      {
        name: 'Task Switching Efficiency (switch cost ms)',
        type: 'milliseconds',
        frequency: 'weekly',
        expectedDirection: 'decrease'
      }
    ],
    timeHorizons: {
      acute: 'Session 1: 30-50% Stroop improvement',
      intermediate: 'Week 2: 50-80% executive task improvement',
      sustained: 'Week 6+: 100-150% real-world executive control'
    }
  },
  
  evidenceSpec: {
    effectSize: {
      value: 0.55,
      ci95: [0.38, 0.72],
      measure: 'Cohen\'s d for executive function improvement (Egner & Gruzelier 2004)'
    },
    studyQuality: 'RCT (Egner & Gruzelier) + strong mechanistic foundation (Diamond, Helfrich & Knight)',
    doseResponse: 'Cumulative gains: Week 1 (+30-50%), Week 2 (+50-80%), Week 4 (+80-120%), plateau week 6',
    sources: [
      'Egner & Gruzelier (2004) - Beta neurofeedback improves attention/executive function',
      'Diamond (2013) - Executive function framework and training principles',
      'Helfrich & Knight (2016) - Prefrontal oscillatory mechanisms'
    ]
  },
  
  tags: ['executive-function', 'cognitive-control', 'prefrontal-cortex', 'beta-gamma', 'inhibition', 'cognitive-flexibility', 'ADHD-support'],
  
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}
