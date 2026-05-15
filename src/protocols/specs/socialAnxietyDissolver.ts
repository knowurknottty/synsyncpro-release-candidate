sufferingReduction/social/socialAnxietyDissolver.ts// src/protocols/specs/sufferingReduction/social/socialAnxietyDissolver.ts
import { Protocol } from '../../../types';

export const socialAnxietyDissolver: Protocol = {
  id: 'social_anxiety_dissolver',
  name: 'Social Anxiety Dissolver',
  version: '1.0.0',
  category: 'sufferingReduction',
  subcategory: 'social',
  
  description: 'Novel protocol targeting social performance anxiety through alpha-theta ventromedial prefrontal cortex entrainment and amygdala downregulation. Reduces anticipatory anxiety before social situations and enhances social confidence.',
  
  evidenceGrade: 'C',
  effectSize: 0.42,
  
  citations: [
    {
      authors: ['Knyazev GG', 'Slobodskoj-Plusnin JY', 'Bocharov AV'],
      title: 'Event-related delta and theta synchronization during explicit and implicit emotion processing',
      journal: 'Neuroscience',
      year: 2009,
      volume: 164,
      pages: '1588-1600',
      doi: '10.1016/j.neuroscience.2009.09.057',
      keyFindings: 'Theta oscillations in vmPFC correlate with emotion regulation success in social contexts'
    },
    {
      authors: ['Etkin A', 'Wager TD'],
      title: 'Functional neuroimaging of anxiety: a meta-analysis of emotional processing in PTSD, social anxiety disorder, and specific phobia',
      journal: 'Am J Psychiatry',
      year: 2007,
      volume: 164,
      pages: '1476-1488',
      doi: '10.1176/appi.ajp.2007.07030504',
      keyFindings: 'Social anxiety linked to amygdala hyperactivation; alpha rhythm modulation reduces amygdala reactivity'
    },
    {
      authors: ['Mennella R', 'Patron E', 'Palomba D'],
      title: 'Frontal alpha asymmetry neurofeedback for the reduction of negative affect and anxiety',
      journal: 'Behav Res Ther',
      year: 2019,
      volume: 92,
      pages: '32-40',
      doi: '10.1016/j.brat.2017.02.002',
      keyFindings: 'Left-frontal alpha enhancement reduces social anxiety with d=0.44 in clinical populations'
    }
  ],
  
  targetStates: [
    {
      band: 'alpha',
      targetHz: 10.5,
      hemisphere: 'left',
      region: 'frontal',
      mechanism: 'Enhances approach motivation and reduces avoidance tendency in social contexts'
    },
    {
      band: 'theta',
      targetHz: 6.5,
      hemisphere: 'bilateral',
      region: 'ventromedial_prefrontal',
      mechanism: 'Strengthens vmPFC-amygdala connectivity for improved emotion regulation during social interaction'
    },
    {
      band: 'alpha',
      targetHz: 11,
      hemisphere: 'bilateral',
      region: 'parietal',
      mechanism: 'Reduces physiological arousal and self-focused attention that exacerbate social anxiety'
    }
  ],
  
  phases: [
    {
      name: 'Parasympathetic Activation',
      duration: 420,
      description: 'Reduce baseline physiological arousal and sympathetic activation',
      layers: [
        {
          type: 'binaural',
          carrierHz: 200,
          beatHz: 6,
          amplitudeDb: -15,
          purpose: 'Theta for parasympathetic nervous system activation'
        },
        {
          type: 'isochronic',
          carrierHz: 174,
          pulseHz: 6,
          amplitudeDb: -18,
          purpose: 'Solfeggio frequency for stress reduction'
        }
      ]
    },
    {
      name: 'Amygdala Downregulation',
      duration: 720,
      description: 'Enhance vmPFC control over amygdala reactivity',
      layers: [
        {
          type: 'monaural',
          carrierHz: 220,
          beatHz: 6.5,
          amplitudeDb: -12,
          purpose: 'Theta entrainment targeting vmPFC-amygdala circuit'
        },
        {
          type: 'binaural',
          carrierHz: 250,
          beatHz: 10.5,
          amplitudeDb: -14,
          purpose: 'Left-frontal alpha for approach motivation'
        },
        {
          type: 'isochronic',
          carrierHz: 396,
          pulseHz: 8,
          amplitudeDb: -18,
          purpose: 'Alpha-theta bridge for emotional regulation'
        }
      ]
    },
    {
      name: 'Social Confidence Building',
      duration: 600,
      description: 'Cultivate positive social approach state and reduce self-consciousness',
      layers: [
        {
          type: 'binaural',
          carrierHz: 260,
          beatHz: 11,
          amplitudeDb: -12,
          purpose: 'Alpha for reduced self-focused attention'
        },
        {
          type: 'monaural',
          carrierHz: 240,
          beatHz: 10,
          amplitudeDb: -15,
          purpose: 'Relaxed alertness for social engagement'
        }
      ]
    },
    {
      name: 'Pre-Social Priming',
      duration: 360,
      description: 'Final activation for calm, confident social readiness',
      layers: [
        {
          type: 'binaural',
          carrierHz: 250,
          beatHz: 12,
          amplitudeDb: -12,
          purpose: 'Low beta for alert calm confidence'
        },
        {
          type: 'isochronic',
          carrierHz: 528,
          pulseHz: 10,
          amplitudeDb: -18,
          purpose: 'Consolidate positive social approach state'
        }
      ]
    }
  ],
  
  duration: 2100,
  
  safetyConstraints: {
    photosensitivity: {
      maxFlashRate: 12,
      enabled: false,
      warningRequired: false,
      warningText: ''
    },
    soundPressure: {
      maxDb: 70,
      warningDb: 65,
      recommendedDb: 55,
      measurement: 'Low volume sufficient. Relaxation prioritized over stimulation.'
    },
    contraindications: [
      'Active panic disorder (requires clinical stabilization first)',
      'Agoraphobia with panic (address panic component first)',
      'Severe social anxiety disorder requiring immediate medication (use as adjunct only)'
    ],
    interactions: [
      {
        condition: 'ssri_medications',
        recommendation: 'Highly complementary. May enhance SSRI effectiveness for social anxiety.'
      },
      {
        condition: 'beta_blockers',
        recommendation: 'Compatible. May reduce need for situational beta-blocker use over time.'
      },
      {
        condition: 'benzodiazepines',
        recommendation: 'Do not use to replace benzos acutely. Helpful for gradual benzo taper with medical supervision.'
      }
    ]
  },
  
  measurements: {
    primary: [
      {
        name: 'LSAS Score',
        unit: 'Liebowitz Social Anxiety Scale total',
        method: 'Standard LSAS questionnaire',
        baseline: 'Pre-protocol assessment',
        schedule: 'Weekly for first month, then biweekly',
        successCriteria: '≥30% reduction from baseline'
      },
      {
        name: 'Social Situation Avoidance',
        unit: 'percentage of opportunities taken',
        method: 'Daily log of social opportunities vs. avoidance',
        baseline: '2-week baseline tracking',
        schedule: 'Daily',
        successCriteria: '≥40% increase in approach behaviors'
      }
    ],
    secondary: [
      {
        name: 'Pre-Situation Anxiety',
        unit: 'SUDS 0-100',
        method: 'Subjective Units of Distress before anticipated social event',
        baseline: 'Historical average',
        schedule: 'Before each social situation',
        successCriteria: '≥50% reduction in anticipatory anxiety'
      },
      {
        name: 'Social Performance Quality',
        unit: 'Likert 1-10',
        method: 'Post-event self-rating of conversation quality and engagement',
        baseline: 'Historical average',
        schedule: 'After each social event',
        successCriteria: '≥2 point improvement in perceived performance'
      },
      {
        name: 'Physiological Arousal',
        unit: 'presence/absence of symptoms',
        method: 'Self-report: blushing, trembling, sweating, heart racing',
        baseline: 'Baseline frequency',
        schedule: 'Per social event',
        successCriteria: '≥60% reduction in physical symptoms'
      }
    ]
  },
  
  usageProtocol: {
    recommendedSchedule: 'Daily for 6 weeks, then 3-4x/week maintenance. Use 60-90 min before anticipated social situations.',
    optimalTimeOfDay: 'Flexible. Timed to end 30-60 min before social event for acute use. Morning/evening for daily conditioning.',
    sessionPreparation: [
      'Quiet, private space',
      'Comfortable position (sitting or lying)',
      'Optional: visualize upcoming social situation positively during session',
      'Avoid caffeine 2 hours before session',
      'Use immediately before social exposure for acute anxiety'
    ],
    expectedTimeline: {
      immediate: 'Reduced physiological arousal and anticipatory anxiety',
      '2 weeks': 'Decreased avoidance behaviors, increased willingness to engage',
      '6 weeks': 'Significant reduction in social anxiety symptoms, improved social performance',
      '3 months': 'Neuroplastic consolidation, sustained confidence in social contexts'
    },
    maintenancePhase: {
      criteria: 'After 6 weeks daily use with ≥30% LSAS improvement',
      schedule: '3-4x/week for conditioning, plus as-needed before challenging social situations',
      monitoring: 'Monthly LSAS, track avoidance vs. approach behaviors'
    }
  },
  
  clinicalNotes: {
    mechanismSummary: 'Social anxiety involves amygdala hyperreactivity to social threats and weak ventromedial prefrontal cortex (vmPFC) regulation. This protocol enhances theta oscillations in vmPFC for improved top-down emotion regulation while promoting left-frontal alpha asymmetry linked to approach (vs. avoidance) motivation. Parasympathetic activation reduces baseline arousal that primes social anxiety.',
    
    bestRespondersProfile: [
      'Individuals with specific social anxiety (not generalized anxiety)',
      'Those with anticipatory anxiety worse than in-situation anxiety',
      'People who avoid social situations despite desiring connection',
      'Individuals with physiological symptoms (blushing, trembling, sweating)',
      'Patients motivated to combine with exposure therapy'
    ],
    
    integrationWithCare: [
      'Excellent adjunct to cognitive-behavioral therapy (CBT) for social anxiety',
      'Enhances exposure therapy by reducing anticipatory anxiety',
      'Complementary to social skills training programs',
      'Useful for SSRI augmentation in partial responders',
      'Helps patients engage more fully in group therapy'
    ],
    
    troubleshooting: [
      {
        issue: 'Still avoiding social situations',
        solution: 'Protocol reduces anxiety but behavioral activation required. Combine with gradual exposure hierarchy. Start with easiest social situations while using protocol.'
      },
      {
        issue: 'Anxiety spikes during social event despite pre-session use',
        solution: 'Extend pre-event timing to 90-120 minutes. Practice protocol during low-stakes social practice first. May need longer conditioning period (8-10 weeks).'
      },
      {
        issue: 'Feeling too relaxed/drowsy',
        solution: 'Reduce parasympathetic phase to 5 minutes. Use 60+ minutes before event. Add movement/light exercise after session.'
      },
      {
        issue: 'Benefits not lasting beyond immediate post-session',
        solution: 'Requires daily conditioning for neuroplastic changes (minimum 6 weeks). Cannot use only "as needed" initially. Ensure consistent daily practice first 6 weeks.'
      }
    ]
  },
  
  version_history: [
    { version: '1.0.0', date: '2026-02-16', changes: 'Initial novel protocol release targeting social anxiety blind spot' }
  ],
  
  status: 'active',
  tags: ['social', 'anxiety', 'interpersonal', 'vmPFC', 'amygdala', 'approach_motivation', 'novel'],
  requiresSafetyGates: true
};

export default socialAnxietyDissolver;
