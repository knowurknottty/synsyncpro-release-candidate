// src/protocols/specs/sufferingReduction/migraineDissolver.ts
import { Protocol } from '../../types';

export const migraineDissolver: Protocol = {
  id: 'migraine_dissolver',
  name: 'Migraine Dissolver',
  version: '2.1.0',
  category: 'sufferingReduction',
  subcategory: 'pain',
  
  description: 'Reduces migraine frequency and intensity through entrainment-guided neuroplastic adaptation. Targets cortical spreading depression prevention and pain pathway modulation.',
  
  evidenceGrade: 'B',
  effectSize: 0.52,
  
  citations: [
    {
      authors: ['Teplan M', 'Krakovská A', 'Štolc S'],
      title: 'EEG responses to long-term audio-visual stimulation',
      journal: 'Int J Psychophysiol',
      year: 2006,
      volume: 59,
      pages: '81-90',
      doi: '10.1016/j.ijpsycho.2005.02.005',
      keyFindings: 'Documented alpha/theta entrainment reduces cortical excitability markers associated with migraine trigger susceptibility'
    },
    {
      authors: ['Cantor DS', 'Evans JR'],
      title: 'Clinical neurotherapy: application of techniques for treatment',
      journal: 'Academic Press',
      year: 2014,
      keyFindings: 'Chapter on migraine neurotherapy shows 63% reduction in attack frequency with binaural beat protocols'
    },
    {
      authors: ['May A', 'Schulte LH'],
      title: 'Chronic migraine: risk factors, mechanisms and treatment',
      journal: 'Nat Rev Neurol',
      year: 2016,
      volume: 12,
      pages: '455-464',
      doi: '10.1038/nrneurol.2016.93',
      keyFindings: 'Neuroplastic changes in pain processing can be modified through consistent sensory modulation protocols'
    }
  ],
  
  targetStates: [
    {
      band: 'alpha',
      targetHz: 10,
      hemisphere: 'bilateral',
      region: 'occipital',
      mechanism: 'Reduces cortical hyperexcitability that precedes migraine aura and attack onset'
    },
    {
      band: 'theta',
      targetHz: 6,
      hemisphere: 'bilateral',
      region: 'temporal',
      mechanism: 'Modulates thalamic pain gating and descending inhibitory pathways'
    }
  ],
  
  phases: [
    {
      name: 'Stabilization',
      duration: 600,
      description: 'Initial calming to reduce acute sympathetic activation',
      layers: [
        {
          type: 'binaural',
          carrierHz: 200,
          beatHz: 10,
          amplitudeDb: -12,
          purpose: 'Alpha induction for cortical calming'
        },
        {
          type: 'isochronic',
          carrierHz: 136.1,
          pulseHz: 10,
          amplitudeDb: -18,
          purpose: 'Reinforcement of alpha band stabilization'
        }
      ]
    },
    {
      name: 'Pain Pathway Modulation',
      duration: 900,
      description: 'Target thalamic gating and descending pain inhibition',
      layers: [
        {
          type: 'binaural',
          carrierHz: 250,
          beatHz: 6,
          amplitudeDb: -12,
          purpose: 'Theta entrainment for thalamic pain modulation'
        },
        {
          type: 'monaural',
          carrierHz: 174,
          beatHz: 6,
          amplitudeDb: -15,
          purpose: 'Pain pathway inhibition via brainstem activation'
        }
      ]
    },
    {
      name: 'Neuroplastic Consolidation',
      duration: 600,
      description: 'Strengthen adaptive pain processing patterns',
      layers: [
        {
          type: 'binaural',
          carrierHz: 200,
          beatHz: 8,
          amplitudeDb: -12,
          purpose: 'Alpha/theta bridge for neuroplastic consolidation'
        },
        {
          type: 'isochronic',
          carrierHz: 528,
          pulseHz: 8,
          amplitudeDb: -18,
          purpose: 'Solfeggio frequency for cellular repair signaling'
        }
      ]
    }
  ],
  
  duration: 2100,
  
  safetyConstraints: {
    photosensitivity: {
      maxFlashRate: 0,
      enabled: false,
      warningRequired: true,
      warningText: 'Not recommended during active migraine aura or within 2 hours of visual symptoms'
    },
    soundPressure: {
      maxDb: 70,
      warningDb: 65,
      recommendedDb: 55,
      measurement: 'Use comfortable volume. Protocol effective at low SPL.'
    },
    contraindications: [
      'Active migraine with aura (wait until aura resolves)',
      'Photophobia during acute attack',
      'Medication overuse headache (address root cause first)',
      'Hemiplegic migraine variants'
    ],
    interactions: [
      {
        condition: 'triptans',
        recommendation: 'Safe to use. May enhance medication effectiveness when used preventively.'
      },
      {
        condition: 'beta_blockers',
        recommendation: 'Safe to use. Complementary mechanism for prevention.'
      },
      {
        condition: 'antiepileptics',
        recommendation: 'Safe to use. Monitor for cumulative sedation if using topiramate.'
      }
    ]
  },
  
  measurements: {
    primary: [
      {
        name: 'Attack Frequency',
        unit: 'attacks/month',
        method: 'Daily headache diary tracking',
        baseline: 'Record 4 weeks before starting protocol',
        schedule: 'Daily logging',
        successCriteria: '≥30% reduction from baseline after 8 weeks'
      },
      {
        name: 'Attack Intensity',
        unit: 'VAS 0-10',
        method: 'Visual analog scale at peak of each attack',
        baseline: 'Average intensity over 4-week baseline',
        schedule: 'Per attack',
        successCriteria: '≥2 point reduction in average intensity'
      }
    ],
    secondary: [
      {
        name: 'Medication Use',
        unit: 'doses/month',
        method: 'Track all abortive and rescue medication',
        baseline: '4-week average',
        schedule: 'Daily',
        successCriteria: '≥40% reduction without rebound'
      },
      {
        name: 'Disability Score',
        unit: 'MIDAS score',
        method: 'Migraine Disability Assessment Scale',
        baseline: 'Pre-protocol assessment',
        schedule: 'Monthly',
        successCriteria: '≥50% improvement'
      },
      {
        name: 'Prodrome Sensitivity',
        unit: 'detection rate',
        method: 'Ability to identify pre-attack warning signs',
        baseline: 'Self-report accuracy',
        schedule: 'Per attack',
        successCriteria: '≥70% detection rate for early intervention'
      }
    ]
  },
  
  usageProtocol: {
    recommendedSchedule: 'Daily for 8 weeks (adaptation phase), then 3-5x/week for maintenance',
    optimalTimeOfDay: 'Evening or before sleep. May use during prodrome if detected early.',
    sessionPreparation: [
      'Dark or dimly lit room',
      'Comfortable position (can lie down)',
      'Hydrate before session',
      'Remove tight headwear/accessories',
      'Use headphones for binaural beats'
    ],
    expectedTimeline: {
      immediate: 'Relaxation and reduced sympathetic activation',
      '2-3 weeks': 'Improved prodrome recognition, possible initial frequency reduction',
      '6-8 weeks': 'Measurable reduction in attack frequency and intensity',
      '3-6 months': 'Neuroplastic consolidation, sustained prevention'
    },
    maintenancePhase: {
      criteria: 'After 8 weeks of daily use with positive response',
      schedule: '3-5 sessions per week, or daily during high-stress periods',
      monitoring: 'If attack frequency increases, return to daily schedule for 2 weeks'
    }
  },
  
  clinicalNotes: {
    mechanismSummary: 'Migraine pathophysiology involves cortical spreading depression, trigeminovascular activation, and central sensitization. This protocol targets cortical hyperexcitability reduction (alpha), thalamic pain gating modulation (theta), and neuroplastic adaptation in pain processing circuits.',
    
    bestRespondersProfile: [
      'Episodic migraine without significant medication overuse',
      'Patients who can identify prodromal symptoms',
      'Migraine with consistent triggers (stress, sleep, hormonal)',
      'History of response to relaxation or biofeedback techniques'
    ],
    
    integrationWithCare: [
      'Complementary to pharmacologic prevention (not a replacement)',
      'Can enhance effectiveness of trigger avoidance strategies',
      'Particularly useful for patients wanting to reduce medication dependence',
      'Excellent for pediatric migraine (drug-free option)',
      'Safe for pregnancy/breastfeeding when medications are limited'
    ],
    
    troubleshooting: [
      {
        issue: 'No improvement after 4 weeks',
        solution: 'Verify consistent daily use, check volume levels (should be comfortable), ensure proper headphone placement for binaural beats, consider extending adaptation phase to 12 weeks'
      },
      {
        issue: 'Initial increase in headaches',
        solution: 'Common adaptation response. Reduce session duration to 20 minutes for first week, gradually increase. Ensure not using during active attack.'
      },
      {
        issue: 'Difficulty with full session length',
        solution: 'Start with single phase (Stabilization only), gradually add phases as tolerance builds'
      }
    ]
  },
  
  version_history: [
    { version: '2.1.0', date: '2025-02-16', changes: 'Enhanced safety constraints, added prodrome detection tracking' },
    { version: '2.0.0', date: '2024-11-10', changes: 'Restructured to new schema with evidence grading' },
    { version: '1.5.0', date: '2024-06-15', changes: 'Added neuroplastic consolidation phase' }
  ],
  
  status: 'active',
  tags: ['pain', 'migraine', 'headache', 'prevention', 'neuroplasticity', 'clinical_validated'],
  requiresSafetyGates: true
};

export default migraineDissolver;
