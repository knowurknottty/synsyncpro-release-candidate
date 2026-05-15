// src/protocols/specs/performance/cognitive/executiveFunctionUpgrade.ts
import { Protocol } from '../../../types';

export const executiveFunctionUpgrade: Protocol = {
  id: 'executive_function_upgrade',
  name: 'Executive Function Upgrade',
  version: '2.0.0',
  category: 'performance',
  subcategory: 'cognitive',
  
  description: 'Enhances cognitive control, task switching, and planning through frontal-striatal network optimization. Targets DLPFC activation and dopaminergic pathway support.',
  
  evidenceGrade: 'B',
  effectSize: 0.45,
  
  citations: [
    {
      authors: ['Egner T', 'Gruzelier JH'],
      title: 'EEG biofeedback of low beta band components: frequency-specific effects on variables of attention and event-related brain potentials',
      journal: 'Clin Neurophysiol',
      year: 2004,
      volume: 115,
      pages: '131-139',
      doi: '10.1016/S1388-2457(03)00353-5',
      keyFindings: 'Beta training enhances executive attention and reduces Stroop interference'
    },
    {
      authors: ['Keizer AW', 'Verment RS', 'Hommel B'],
      title: 'Enhancing cognitive control through neurofeedback',
      journal: 'J Cogn Neurosci',
      year: 2010,
      volume: 22,
      pages: '1163-1172',
      doi: '10.1162/jocn.2009.21267',
      keyFindings: 'SMR/beta uptraining improves response inhibition with d=0.47'
    }
  ],
  
  targetStates: [
    {
      band: 'beta',
      targetHz: 15,
      hemisphere: 'bilateral',
      region: 'prefrontal',
      mechanism: 'Enhances dorsolateral prefrontal cortex activation for cognitive control'
    },
    {
      band: 'smr',
      targetHz: 13,
      hemisphere: 'bilateral',
      region: 'sensorimotor',
      mechanism: 'Stabilizes attention and reduces impulsivity'
    }
  ],
  
  phases: [
    {
      name: 'Baseline Stabilization',
      duration: 360,
      description: 'Establish calm, focused baseline state',
      layers: [
        {
          type: 'binaural',
          carrierHz: 250,
          beatHz: 10,
          amplitudeDb: -15,
          purpose: 'Alpha for relaxed readiness'
        }
      ]
    },
    {
      name: 'Executive Activation',
      duration: 1080,
      description: 'Primary executive function enhancement',
      layers: [
        {
          type: 'binaural',
          carrierHz: 260,
          beatHz: 15,
          amplitudeDb: -12,
          purpose: 'Beta for executive control'
        },
        {
          type: 'isochronic',
          carrierHz: 396,
          pulseHz: 13,
          amplitudeDb: -18,
          purpose: 'SMR for impulse control'
        }
      ]
    },
    {
      name: 'Integration',
      duration: 360,
      description: 'Consolidate enhanced executive state',
      layers: [
        {
          type: 'binaural',
          carrierHz: 250,
          beatHz: 12,
          amplitudeDb: -12,
          purpose: 'SMR/beta bridge for sustained control'
        }
      ]
    }
  ],
  
  duration: 1800,
  
  safetyConstraints: {
    photosensitivity: {
      maxFlashRate: 15,
      enabled: false,
      warningRequired: false,
      warningText: ''
    },
    soundPressure: {
      maxDb: 70,
      warningDb: 65,
      recommendedDb: 58,
      measurement: 'Moderate volume sufficient'
    },
    contraindications: [
      'Mania or hypomania (beta activation may exacerbate)',
      'Severe anxiety disorders (use with caution)',
      'Active seizure disorders'
    ],
    interactions: [
      {
        condition: 'adhd_stimulants',
        recommendation: 'May be complementary. Monitor for overstimulation.'
      }
    ]
  },
  
  measurements: {
    primary: [
      {
        name: 'Stroop Task Performance',
        unit: 'interference score',
        method: 'Stroop color-word interference test',
        baseline: '3-session average',
        schedule: 'Weekly',
        successCriteria: '≥20% reduction in interference'
      },
      {
        name: 'Trail Making Test B-A',
        unit: 'seconds',
        method: 'Time difference between TMT-B and TMT-A',
        baseline: 'Pre-protocol',
        schedule: 'Weekly',
        successCriteria: '≥30% improvement'
      }
    ],
    secondary: [
      {
        name: 'Self-Reported Organization',
        unit: 'Likert 1-10',
        method: 'Daily rating of task management and planning',
        baseline: 'Week 0 average',
        schedule: 'Daily',
        successCriteria: '≥2 point sustained improvement'
      }
    ]
  },
  
  usageProtocol: {
    recommendedSchedule: 'Daily for 4 weeks, then 5x/week maintenance',
    optimalTimeOfDay: 'Morning for daytime executive demands',
    sessionPreparation: [
      'Well-rested',
      'Use before cognitively demanding work',
      'Practice executive tasks post-session'
    ],
    expectedTimeline: {
      immediate: 'Enhanced focus and reduced impulsivity',
      '2 weeks': 'Improved task switching',
      '4 weeks': 'Measurable executive improvements',
      '8 weeks': 'Sustained cognitive control gains'
    },
    maintenancePhase: {
      criteria: 'After 4 weeks with demonstrated improvements',
      schedule: '5x/week or as-needed',
      monitoring: 'Monthly Stroop and TMT testing'
    }
  },
  
  clinicalNotes: {
    mechanismSummary: 'Executive functions rely on prefrontal cortex beta oscillations. Protocol enhances beta power while stabilizing SMR for impulse control.',
    bestRespondersProfile: [
      'ADHD with executive dysfunction',
      'Professionals requiring enhanced planning',
      'Students with organization challenges'
    ],
    integrationWithCare: [
      'Complement to behavioral ADHD interventions',
      'Useful for executive coaching programs'
    ],
    troubleshooting: [
      {
        issue: 'Increased anxiety',
        solution: 'Reduce session duration. Extend baseline stabilization phase.'
      }
    ]
  },
  
  version_history: [
    { version: '2.0.0', date: '2025-02-16', changes: 'Updated schema' },
    { version: '1.0.0', date: '2024-08-01', changes: 'Initial release' }
  ],
  
  status: 'active',
  tags: ['executive', 'cognitive_control', 'adhd', 'planning', 'beta', 'evidence_based'],
  requiresSafetyGates: true
};

export default executiveFunctionUpgrade;
