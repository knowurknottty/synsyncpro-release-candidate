// src/lib/protocols/specs/hormonalOptimization/trtPhase1Stack.ts

import type { ProtocolSpec } from '../../../types'

export const trtPhase1Stack: ProtocolSpec = {
  id: 'trt_phase_1_stack',
  name: 'TRT Phase 1 Stack',
  category: 'Hormonal Optimization',
  subcategory: 'Testosterone Support',
  version: '1.0.0',
  
  description: 'Beta-gamma testosterone optimization protocol - stimulates hypothalamic-pituitary-gonadal (HPG) axis for natural testosterone enhancement',
  
  purpose: 'Phase 1 loading: Activate GnRH pulsatile release via beta-band hypothalamic entrainment + gamma neuromodulation to upregulate endogenous testosterone production',
  
  duration: 1200, // 20 minutes
  
  phases: [
    {
      name: 'Alpha Grounding (HPG Axis Priming)',
      duration: 240,
      description: 'Establish 10Hz alpha baseline - optimizes hypothalamic receptivity',
      carrierFrequency: { start: 200, end: 200 },
      beatFrequency: { start: 10, end: 10 },
      beatType: 'binaural',
      volumeEnvelope: { start: 0, end: 0.7, curve: 'exponential' },
      waveform: 'sine',
      hemisphereAsymmetry: { left: 1.0, right: 1.0 }, // Bilateral hypothalamic targeting
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
      name: 'Beta Ramp (GnRH Pulse Activation)',
      duration: 480,
      description: 'Ramp 10→20Hz beta - mimics natural GnRH pulsatile rhythm (60-90min cycles)',
      carrierFrequency: { start: 200, end: 250 },
      beatFrequency: { start: 10, end: 20 },
      beatType: 'binaural',
      volumeEnvelope: { start: 0.7, end: 0.8, curve: 'sigmoid' },
      waveform: 'sine',
      hemisphereAsymmetry: { left: 1.0, right: 1.0 },
      octaveLayering: {
        enabled: true,
        octaves: [1, 2],
        gains: [0.65, 0.35]
      },
      solfeggioOverlay: [528], // Transformation, healing, DNA repair
      solfeggioGain: 0.15,
      pinkNoiseGain: 0.08,
      stochasticJitter: {
        enabled: true,
        amount: 0.04, // Mimics natural GnRH pulse variability
        frequency: 0.08
      }
    },
    {
      name: 'Gamma Bursts (Neuromodulation)',
      duration: 300,
      description: '40Hz gamma pulses superimposed on 16Hz beta - enhances neuroplasticity, receptor upregulation',
      carrierFrequency: { start: 250, end: 250 },
      beatFrequency: { start: 16, end: 16 }, // Mid-beta carrier
      beatType: 'binaural',
      volumeEnvelope: { start: 0.8, end: 0.85, curve: 'linear' },
      waveform: 'sine',
      hemisphereAsymmetry: { left: 1.0, right: 1.0 },
      octaveLayering: {
        enabled: true,
        octaves: [1, 2],
        gains: [0.6, 0.4]
      },
      solfeggioOverlay: [40], // Gamma overlay (using solfeggio field)
      solfeggioGain: 0.25, // Strong gamma component
      pinkNoiseGain: 0.10,
      stochasticJitter: { enabled: false }
    },
    {
      name: 'Alpha Return (Consolidation)',
      duration: 180,
      description: 'Return to 10Hz alpha - locks in HPG axis activation',
      carrierFrequency: { start: 250, end: 200 },
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
      solfeggioOverlay: [528],
      solfeggioGain: 0.12,
      pinkNoiseGain: 0.05,
      stochasticJitter: { enabled: false }
    }
  ],
  
  neuralTarget: {
    regions: ['Hypothalamus (GnRH neurons)', 'Anterior Pituitary', 'Leydig Cells (indirect)'],
    bands: ['Beta', 'Gamma'],
    mechanism: 'Beta-band GnRH pulse frequency entrainment → LH/FSH release → testicular testosterone synthesis'
  },
  
  neurochemistryTargets: {
    GnRH: { direction: 'increase', magnitude: 'moderate', confidence: 'low' },
    LH: { direction: 'increase', magnitude: 'moderate', confidence: 'low' },
    testosterone: { direction: 'increase', magnitude: 'moderate', confidence: 'low' },
    dopamine: { direction: 'increase', magnitude: 'moderate', confidence: 'medium' }
  },
  
  evidenceLevel: 'V',
  evidenceGrade: 'E',
  
  citations: [
    {
      authors: ['Herbison', 'A.E.'],
      year: 2016,
      title: 'Control of puberty onset and fertility by gonadotropin-releasing hormone neurons',
      journal: 'Nature Reviews Endocrinology',
      volume: '12',
      issue: '8',
      pages: '452-466',
      doi: '10.1038/nrendo.2016.70',
      tags: ['GnRH', 'testosterone', 'HPG-axis', 'puberty']
    },
    {
      authors: ['Knobil', 'E.'],
      year: 1980,
      title: 'The neuroendocrine control of the menstrual cycle',
      journal: 'Recent Progress in Hormone Research',
      volume: '36',
      issue: '',
      pages: '53-88',
      doi: '',
      tags: ['GnRH-pulse', 'neuroendocrine', 'pulsatility']
    }
  ],
  
  expectedOutcomes: {
    immediate: 'Hypothetical acute LH pulse within 30-60min post-session (not measurable without blood draw)',
    short_term: 'Estimated 10-20% total testosterone increase by week 4 (Grade E - speculative)',
    long_term: '20-30% testosterone increase by week 12 with consistent 6x/week use (unproven)'
  },
  
  frequencyGuidance: {
    acute: 'Not applicable - requires loading phase',
    chronic: '6-7x per week for 12 weeks (loading phase), then 4-5x per week maintenance',
    maintenance: '3-4x per week after achieving target testosterone levels'
  },
  
  timingRecommendations: [
    'OPTIMAL: Morning (6-8 AM) - aligns with natural testosterone circadian peak',
    'CRITICAL: Consistent daily timing - GnRH pulsatility entrainment requires rhythmic stimulus',
    'Combine with resistance training (weight lifting) for synergistic effects',
    'Avoid late evening - may disrupt sleep-related hormonal cycles'
  ],
  
  contraindications: {
    absolute: ['Prostate cancer', 'Male breast cancer', 'Severe BPH (benign prostatic hyperplasia)'],
    relative: ['Untreated sleep apnea (testosterone may worsen)', 'Polycythemia (high red blood cell count)', 'Severe heart failure'],
    interactions: [
      'Exogenous TRT (testosterone replacement therapy) - may interfere with natural production suppression',
      'Clomiphene/enclomiphene - additive HPG axis stimulation (use with caution)',
      'Aromatase inhibitors - synergistic but may over-suppress estrogen'
    ],
    requiresScreening: true
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
      conditions: ['prostate cancer', 'male breast cancer', 'severe BPH', 'polycythemia'],
      requiresScreening: true
    }
  },
  
  breathworkGuidance: {
    technique: 'Power Breathing (4:0:4:2 - brief hold after exhale)',
    timing: 'Throughout session',
    instructions: [
      'Inhale deeply through nose for 4 counts',
      'Exhale forcefully through mouth for 4 counts',
      'Hold empty for 2 counts (mild hypoxia stimulates sympathetic tone)',
      'Repeat - maintain steady, powerful rhythm'
    ]
  },
  
  recommendedEnvironment: {
    lighting: 'Bright (full-spectrum if available) - supports circadian testosterone rhythm',
    temperature: 'Cool to moderate (68-72°F)',
    distractions: 'Minimal',
    posture: 'Upright seated or standing - avoid supine (reduces testosterone acutely)'
  },
  
  additionalNotes: [
    '⚠️ [Grade E - SPECULATIVE] This protocol is hypothesis-driven with NO clinical validation',
    '🩸 MANDATORY: Get baseline bloodwork (total/free testosterone, LH, FSH, estradiol, PSA) before starting',
    '📊 Retest at weeks 4, 8, 12 to track response - discontinue if no improvement',
    '🏋️ CRITICAL: Combine with resistance training 3-4x/week - synergistic effect on testosterone',
    '🥩 Optimize nutrition: adequate protein (1g/lb), healthy fats, micronutrients (zinc, vitamin D, magnesium)',
    '😴 Prioritize sleep: 7-9hr/night - sleep deprivation crushes testosterone',
    '🚫 NOT a replacement for medical TRT - consult endocrinologist if hypogonadal',
    '📉 If testosterone DECREASES or side effects occur (acne, aggression, testicular atrophy), STOP immediately'
  ],
  
  measurementPlan: {
    metrics: [
      {
        name: 'Total Testosterone (ng/dL)',
        type: 'blood_test',
        frequency: 'weeks 0, 4, 8, 12',
        expectedDirection: 'increase'
      },
      {
        name: 'Free Testosterone (pg/mL)',
        type: 'blood_test',
        frequency: 'weeks 0, 4, 8, 12',
        expectedDirection: 'increase'
      },
      {
        name: 'LH (mIU/mL)',
        type: 'blood_test',
        frequency: 'weeks 0, 12',
        expectedDirection: 'increase'
      },
      {
        name: 'Estradiol (pg/mL)',
        type: 'blood_test',
        frequency: 'weeks 0, 12',
        expectedDirection: 'stable or slight increase'
      },
      {
        name: 'PSA (ng/mL)',
        type: 'blood_test',
        frequency: 'weeks 0, 12',
        expectedDirection: 'stable (monitor for safety)'
      },
      {
        name: 'Subjective Energy (1-10)',
        type: 'scale_1_10',
        frequency: 'weekly',
        expectedDirection: 'increase'
      },
      {
        name: 'Libido (1-10)',
        type: 'scale_1_10',
        frequency: 'weekly',
        expectedDirection: 'increase'
      }
    ],
    timeHorizons: {
      acute: 'Week 1-2: No measurable changes expected (loading phase)',
      intermediate: 'Week 4: Estimated 10-20% testosterone increase (if responsive)',
      sustained: 'Week 12: 20-30% increase in responders (unproven - Grade E)'
    }
  },
  
  evidenceSpec: {
    effectSize: {
      value: 0.0, // Unknown - no studies
      ci95: [0, 0],
      measure: 'No direct evidence for brainwave entrainment on testosterone'
    },
    studyQuality: 'Hypothesis only - mechanistic plausibility from GnRH pulse literature',
    doseResponse: 'Unknown - theoretical protocol',
    sources: [
      'Herbison (2016) - GnRH neuron control of fertility (mechanistic background)',
      'Knobil (1980) - GnRH pulsatility discovery (classic work)',
      'NO STUDIES on brainwave entrainment for testosterone - purely speculative'
    ]
  },
  
  tags: ['testosterone', 'TRT', 'hormonal-optimization', 'HPG-axis', 'GnRH', 'beta-gamma', 'speculative', 'mens-health'],
  
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}
