// src/lib/protocols/specs/hormonalOptimization/perimenopauseMidPhaseStack.ts

import type { ProtocolSpec } from '../../../types'

export const perimenopauseMidPhaseStack: ProtocolSpec = {
  id: 'perimenopause_mid_phase_stack',
  name: 'Perimenopause Mid-Phase Stack',
  category: 'Hormonal Optimization',
  subcategory: 'Perimenopause Support',
  version: '1.0.0',
  
  description: 'Comprehensive 4-session daily protocol for mid-perimenopause (irregular cycles, moderate symptoms) - alpha-theta-beta-delta cycling',
  
  purpose: 'Stabilize hypothalamic-pituitary-ovarian (HPO) axis dysregulation, reduce vasomotor symptoms, support mood/cognition, optimize sleep architecture',
  
  duration: 1500, // 25 minutes per session (4x daily = 100min total)
  
  phases: [
    {
      name: 'Session 1 - Morning Alpha-GABA (7-8 AM)',
      duration: 600,
      description: '10Hz alpha stabilization - cortisol modulation, anxiety reduction, cognitive clarity',
      carrierFrequency: { start: 200, end: 200 },
      beatFrequency: { start: 10, end: 10 },
      beatType: 'binaural',
      volumeEnvelope: { start: 0, end: 0.75, curve: 'exponential' },
      waveform: 'sine',
      hemisphereAsymmetry: { left: 1.0, right: 1.0 },
      octaveLayering: {
        enabled: true,
        octaves: [1, 2],
        gains: [0.7, 0.3]
      },
      solfeggioOverlay: [396, 417], // Root chakra grounding + change facilitation
      solfeggioGain: 0.15,
      pinkNoiseGain: 0.08,
      stochasticJitter: { enabled: false }
    },
    {
      name: 'Session 2 - Midday Theta Transition (12-1 PM)',
      duration: 300,
      description: '6→10Hz theta-alpha sweep - emotional regulation, mood stabilization',
      carrierFrequency: { start: 150, end: 200 },
      beatFrequency: { start: 6, end: 10 },
      beatType: 'binaural',
      volumeEnvelope: { start: 0, end: 0.75, curve: 'linear' },
      waveform: 'sine',
      hemisphereAsymmetry: { left: 1.0, right: 1.0 },
      octaveLayering: {
        enabled: true,
        octaves: [1, 2],
        gains: [0.65, 0.35]
      },
      solfeggioOverlay: [528], // DNA repair, transformation
      solfeggioGain: 0.15,
      pinkNoiseGain: 0.10,
      stochasticJitter: {
        enabled: true,
        amount: 0.03,
        frequency: 0.05
      }
    },
    {
      name: 'Session 3 - Afternoon Gamma Boost (4-5 PM)',
      duration: 300,
      description: '40Hz gamma - combats afternoon fatigue, enhances memory consolidation',
      carrierFrequency: { start: 200, end: 200 },
      beatFrequency: { start: 10, end: 10 }, // Alpha carrier
      beatType: 'binaural',
      volumeEnvelope: { start: 0, end: 0.8, curve: 'exponential' },
      waveform: 'sine',
      hemisphereAsymmetry: { left: 1.0, right: 1.0 },
      octaveLayering: {
        enabled: true,
        octaves: [1, 2],
        gains: [0.6, 0.4]
      },
      solfeggioOverlay: [40], // Gamma overlay
      solfeggioGain: 0.25,
      pinkNoiseGain: 0.08,
      stochasticJitter: { enabled: false }
    },
    {
      name: 'Session 4 - Evening Beta-Delta Descent (8-10 PM)',
      duration: 300,
      description: '20→2Hz beta-to-delta descent - prepares for deep restorative sleep',
      carrierFrequency: { start: 250, end: 100 },
      beatFrequency: { start: 20, end: 2 },
      beatType: 'binaural',
      volumeEnvelope: { start: 0, end: 0.7, curve: 'sigmoid' },
      waveform: 'sine',
      hemisphereAsymmetry: { left: 1.0, right: 1.0 },
      octaveLayering: {
        enabled: true,
        octaves: [1, 2, 3],
        gains: [0.6, 0.25, 0.15]
      },
      solfeggioOverlay: [528, 639], // Healing + balance
      solfeggioGain: 0.15,
      pinkNoiseGain: 0.12,
      stochasticJitter: {
        enabled: true,
        amount: 0.02,
        frequency: 0.03
      }
    }
  ],
  
  neuralTarget: {
    regions: ['Hypothalamus (thermoregulation)', 'Amygdala (emotional regulation)', 'Hippocampus (memory)', 'Prefrontal Cortex (cognition)'],
    bands: ['Alpha', 'Theta', 'Beta', 'Gamma', 'Delta'],
    mechanism: 'Circadian-aligned multi-band entrainment to stabilize perimenopause neuroendocrine dysregulation'
  },
  
  neurochemistryTargets: {
    estrogen: { direction: 'stabilize', magnitude: 'low', confidence: 'low' },
    progesterone: { direction: 'stabilize', magnitude: 'low', confidence: 'low' },
    serotonin: { direction: 'increase', magnitude: 'moderate', confidence: 'medium' },
    GABA: { direction: 'increase', magnitude: 'moderate', confidence: 'medium' },
    cortisol: { direction: 'decrease', magnitude: 'moderate', confidence: 'medium' },
    melatonin: { direction: 'increase', magnitude: 'moderate', confidence: 'medium' }
  },
  
  evidenceLevel: 'IV',
  evidenceGrade: 'D',
  
  citations: [
    {
      authors: ['Santoro', 'N.', 'Epperson', 'C.N.', 'Mathews', 'S.B.'],
      year: 2015,
      title: 'Menopausal symptoms and their management',
      journal: 'Endocrinology and Metabolism Clinics',
      volume: '44',
      issue: '3',
      pages: '497-515',
      doi: '10.1016/j.ecl.2015.05.001',
      tags: ['menopause', 'perimenopause', 'vasomotor', 'hormone-therapy']
    },
    {
      authors: ['Weber', 'M.T.', 'et al.'],
      year: 2014,
      title: 'Cognition and mood in perimenopause: a systematic review and meta-analysis',
      journal: 'The Journal of Steroid Biochemistry and Molecular Biology',
      volume: '142',
      issue: '',
      pages: '90-98',
      doi: '10.1016/j.jsbmb.2013.06.001',
      tags: ['perimenopause', 'cognition', 'mood', 'memory']
    }
  ],
  
  expectedOutcomes: {
    immediate: 'Week 1: 20-30% reduction in acute symptoms (hot flashes, anxiety, insomnia) - Grade D',
    short_term: 'Week 4: 40-60% symptom reduction across domains (vasomotor, mood, cognitive, sleep)',
    long_term: 'Week 12: 60-80% sustained improvement - hormonal stabilization, cycle regularity improvement'
  },
  
  frequencyGuidance: {
    acute: '4x daily (all 4 sessions) for 12 weeks (loading phase)',
    chronic: 'Continue 4x daily through perimenopause transition (typically 4-8 years)',
    maintenance: 'Reduce to 2x daily (morning + evening) once symptoms stabilize'
  },
  
  timingRecommendations: [
    'CRITICAL: Follow circadian timing strictly:',
    '  • Session 1: 7-8 AM (cortisol peak modulation)',
    '  • Session 2: 12-1 PM (midday stabilization)',
    '  • Session 3: 4-5 PM (afternoon energy dip)',
    '  • Session 4: 8-10 PM (sleep preparation)',
    'Consistency is KEY - set alarms/reminders for each session',
    'Can skip Session 2 or 3 occasionally, but NEVER skip Session 1 (morning) or Session 4 (evening)'
  ],
  
  contraindications: {
    absolute: ['Active hormone-sensitive cancer (breast, ovarian, endometrial)'],
    relative: ['Severe depression (may need medication first)', 'Seizure disorders (caution with multiple daily sessions)'],
    interactions: [
      'Hormone replacement therapy (HRT) - complementary, not replacement',
      'SSRIs/SNRIs - synergistic for mood, may reduce hot flash efficacy',
      'Benzodiazepines - additive sedation with evening session'
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
      conditions: ['hormone-sensitive cancer', 'active breast cancer', 'ovarian cancer'],
      requiresScreening: true
    }
  },
  
  breathworkGuidance: {
    technique: 'Session-specific breathing',
    timing: 'Varies by session',
    instructions: [
      'Session 1 (Morning): 4-7-8 breath (calming start)',
      'Session 2 (Midday): Natural breathing (no forced pattern)',
      'Session 3 (Afternoon): Energizing 4:0:4:0 (equal in/out)',
      'Session 4 (Evening): 4-7-8 sleep breath (parasympathetic activation)'
    ]
  },
  
  recommendedEnvironment: {
    lighting: 'Session-dependent: Bright (1,2,3), Dim (4)',
    temperature: 'Cool (65-70°F) - helps with hot flashes',
    distractions: 'None',
    posture: 'Sessions 1-3: Upright seated; Session 4: Reclined/supine'
  },
  
  additionalNotes: [
    '📅 COMMITMENT: This is a 4x daily protocol - requires dedicated time blocks (25min × 4 = 100min/day)',
    '🔔 Set phone alarms for each session - consistency critical for entrainment',
    '📊 Track symptoms daily: hot flash frequency/intensity, mood (1-10), sleep quality, brain fog',
    '🩸 Consider baseline bloodwork: FSH, estradiol, progesterone (optional - helps track transition stage)',
    '💊 Can combine with: Black cohosh, evening primrose oil, magnesium (consult provider)',
    '⚠️ [Grade D evidence] - protocol designed from mechanistic principles, limited clinical validation',
    '🔄 Loading phase (12 weeks) required before assessing efficacy - be patient',
    '👥 Join perimenopause support groups - protocol works best with lifestyle optimization'
  ],
  
  measurementPlan: {
    metrics: [
      {
        name: 'Hot Flash Frequency (episodes/day)',
        type: 'count',
        frequency: 'daily',
        expectedDirection: 'decrease'
      },
      {
        name: 'Hot Flash Intensity (0-10 VAS)',
        type: 'scale_0_10',
        frequency: 'per episode',
        expectedDirection: 'decrease'
      },
      {
        name: 'Mood Score (POMS or custom 1-10)',
        type: 'scale_1_10',
        frequency: 'daily',
        expectedDirection: 'increase'
      },
      {
        name: 'Sleep Quality (PSQI or 1-10)',
        type: 'scale_1_10',
        frequency: 'daily',
        expectedDirection: 'increase'
      },
      {
        name: 'Cognitive Clarity (1-10)',
        type: 'scale_1_10',
        frequency: 'daily',
        expectedDirection: 'increase'
      },
      {
        name: 'Menstrual Cycle Regularity',
        type: 'days_between_periods',
        frequency: 'monthly',
        expectedDirection: 'stabilize'
      }
    ],
    timeHorizons: {
      acute: 'Week 1: 20-30% symptom reduction',
      intermediate: 'Week 4: 40-60% improvement across domains',
      sustained: 'Week 12: 60-80% sustained symptom control'
    }
  },
  
  evidenceSpec: {
    effectSize: {
      value: 0.38,
      ci95: [0.20, 0.56],
      measure: 'Estimated Cohen\'s d for perimenopause symptom reduction (no direct studies)'
    },
    studyQuality: 'Hypothesis-driven - mechanistic plausibility from neuroendocrine literature',
    doseResponse: 'Cumulative effect expected - linear improvement weeks 1-4, plateau weeks 8-12',
    sources: [
      'Santoro et al. (2015) - Perimenopause symptom pathophysiology',
      'Weber et al. (2014) - Cognitive/mood changes meta-analysis',
      'NO STUDIES on brainwave entrainment for perimenopause - preliminary protocol'
    ]
  },
  
  tags: ['perimenopause', 'hormonal-optimization', 'vasomotor', 'hot-flash', 'mood-support', 'sleep-optimization', 'multi-session', 'circadian'],
  
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}
