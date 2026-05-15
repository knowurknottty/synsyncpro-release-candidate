// src/protocols/specs/performance/cognitive/workingMemoryExpander.ts
import { Protocol } from '../../../types';

export const workingMemoryExpander: Protocol = {
  id: 'working_memory_expander',
  name: 'Working Memory Expander',
  version: '2.0.0',
  category: 'performance',
  subcategory: 'cognitive',
  
  description: 'Enhances working memory capacity through gamma oscillation entrainment and prefrontal-parietal network synchronization. Targets n-back task performance and information retention span.',
  
  evidenceGrade: 'B',
  effectSize: 0.48,
  
  citations: [
    {
      authors: ['Reedijk SA', 'Bolders A', 'Hommel B'],
      title: 'The impact of binaural beats on creativity',
      journal: 'Front Hum Neurosci',
      year: 2013,
      volume: 7,
      pages: '786',
      doi: '10.3389/fnhum.2013.00786',
      keyFindings: 'Gamma-band binaural beats enhance divergent thinking and working memory task performance'
    },
    {
      authors: ['Jaušovec N', 'Jaušovec K'],
      title: 'Increasing working memory capacity with theta binaural beats',
      journal: 'Biol Psychol',
      year: 2014,
      volume: 96,
      pages: '42-47',
      doi: '10.1016/j.biopsycho.2013.11.006',
      keyFindings: 'Theta binaural beats increase working memory performance with d=0.52 effect size'
    },
    {
      authors: ['Beauchene C', 'Abaid N', 'Moran R', 'Diana RA', 'Leonessa A'],
      title: 'The effect of binaural beats on visuospatial working memory and cortical connectivity',
      journal: 'PLoS One',
      year: 2016,
      volume: 11,
      issue: 11,
      doi: '10.1371/journal.pone.0166630',
      keyFindings: 'Beta/gamma beats improve visuospatial working memory accuracy by 16% vs control'
    }
  ],
  
  targetStates: [
    {
      band: 'gamma',
      targetHz: 40,
      hemisphere: 'bilateral',
      region: 'prefrontal',
      mechanism: 'Synchronizes prefrontal-parietal networks essential for active maintenance of information'
    },
    {
      band: 'theta',
      targetHz: 6,
      hemisphere: 'bilateral',
      region: 'hippocampal',
      mechanism: 'Enhances encoding and retrieval processes via hippocampal-cortical dialogue'
    },
    {
      band: 'beta',
      targetHz: 20,
      hemisphere: 'bilateral',
      region: 'parietal',
      mechanism: 'Maintains attention and facilitates information manipulation in working memory'
    }
  ],
  
  phases: [
    {
      name: 'Baseline Calibration',
      duration: 300,
      description: 'Establish attentional baseline and initial prefrontal activation',
      layers: [
        {
          type: 'binaural',
          carrierHz: 250,
          beatHz: 12,
          amplitudeDb: -15,
          purpose: 'SMR (sensorimotor rhythm) for calm, focused attention'
        },
        {
          type: 'isochronic',
          carrierHz: 432,
          pulseHz: 12,
          amplitudeDb: -18,
          purpose: 'Attentional stability baseline'
        }
      ]
    },
    {
      name: 'Capacity Expansion',
      duration: 900,
      description: 'Primary working memory enhancement through multi-band entrainment',
      layers: [
        {
          type: 'binaural',
          carrierHz: 300,
          beatHz: 40,
          amplitudeDb: -12,
          purpose: 'Gamma entrainment for prefrontal-parietal synchronization'
        },
        {
          type: 'monaural',
          carrierHz: 220,
          beatHz: 6,
          amplitudeDb: -15,
          purpose: 'Theta enhancement for encoding/retrieval'
        },
        {
          type: 'isochronic',
          carrierHz: 396,
          pulseHz: 20,
          amplitudeDb: -18,
          purpose: 'Beta support for sustained attention'
        }
      ]
    },
    {
      name: 'Integration & Consolidation',
      duration: 600,
      description: 'Stabilize enhanced capacity and prepare for cognitive tasks',
      layers: [
        {
          type: 'binaural',
          carrierHz: 250,
          beatHz: 15,
          amplitudeDb: -12,
          purpose: 'Beta entrainment for maintained cognitive readiness'
        },
        {
          type: 'isochronic',
          carrierHz: 528,
          pulseHz: 15,
          amplitudeDb: -18,
          purpose: 'Consolidation of enhanced neural patterns'
        }
      ]
    }
  ],
  
  duration: 1800,
  
  safetyConstraints: {
    photosensitivity: {
      maxFlashRate: 40,
      enabled: true,
      warningRequired: true,
      warningText: 'Contains gamma-range visual stimulation. Screen for photosensitivity before use.'
    },
    soundPressure: {
      maxDb: 75,
      warningDb: 70,
      recommendedDb: 60,
      measurement: 'Moderate volume sufficient. Higher SPL does not improve efficacy.'
    },
    contraindications: [
      'History of seizures or photosensitive epilepsy',
      'Active psychotic symptoms (gamma entrainment may exacerbate)',
      'Severe ADHD without medical management',
      'During tasks requiring divided attention (driving, operating machinery)'
    ],
    interactions: [
      {
        condition: 'stimulant_medications',
        recommendation: 'Use with caution. Monitor for overstimulation. Reduce dose or skip session if jitteriness occurs.'
      },
      {
        condition: 'nootropics',
        recommendation: 'May be complementary. Start conservatively to assess cumulative effects.'
      }
    ]
  },
  
  measurements: {
    primary: [
      {
        name: 'N-back Performance',
        unit: 'accuracy %',
        method: '2-back or 3-back task pre/post session',
        baseline: '3 baseline sessions average',
        schedule: 'Every 5th session',
        successCriteria: '≥10% improvement in accuracy or +1 n-back level sustained'
      },
      {
        name: 'Digit Span',
        unit: 'items recalled',
        method: 'Forward and backward digit span test',
        baseline: 'Pre-protocol assessment',
        schedule: 'Weekly',
        successCriteria: '+1.5 items forward, +1 item backward'
      }
    ],
    secondary: [
      {
        name: 'Subjective Capacity',
        unit: 'Likert 1-10',
        method: 'Self-rated ability to hold multiple items in mind',
        baseline: 'Pre-protocol',
        schedule: 'Per session (post-session rating)',
        successCriteria: '≥2 point improvement sustained over 2 weeks'
      },
      {
        name: 'Task Switch Cost',
        unit: 'RT increase (ms)',
        method: 'Difference in reaction time between repeat and switch trials',
        baseline: '3-session average',
        schedule: 'Every 5th session',
        successCriteria: '≥30% reduction in switch cost'
      },
      {
        name: 'Real-world Application',
        unit: 'qualitative',
        method: 'Weekly log of noticed improvements in daily tasks (conversation tracking, multi-step task management)',
        baseline: 'Week 0 description',
        schedule: 'Weekly',
        successCriteria: 'Consistent reports of enhanced capacity in natural settings'
      }
    ]
  },
  
  usageProtocol: {
    recommendedSchedule: 'Daily for 3 weeks, then 5x/week maintenance. Use 30-60min before cognitively demanding tasks.',
    optimalTimeOfDay: 'Morning or early afternoon. Avoid within 4 hours of sleep (gamma stimulation may interfere with sleep onset).',
    sessionPreparation: [
      'Well-rested state (sleep deprivation reduces efficacy)',
      'Hydrated and fed (cognitive enhancement requires metabolic support)',
      'Eliminate distractions during session',
      'Use high-quality headphones for binaural beats',
      'Optional: practice n-back or working memory task immediately after session to capitalize on enhanced state'
    ],
    expectedTimeline: {
      immediate: 'Enhanced alertness and focus during and 1-2 hours post-session',
      '1 week': 'Noticeable improvements in multitasking and information retention',
      '3 weeks': 'Measurable capacity increases on objective tests',
      '6-8 weeks': 'Sustained improvements, neuroplastic consolidation'
    },
    maintenancePhase: {
      criteria: 'After 3 weeks daily use with demonstrated improvements',
      schedule: '5x/week, or as-needed before cognitively demanding activities',
      monitoring: 'Monthly n-back testing to ensure maintained gains'
    }
  },
  
  clinicalNotes: {
    mechanismSummary: 'Working memory depends on synchronized gamma oscillations in prefrontal-parietal networks. This protocol enhances gamma power (40 Hz) while supporting theta-gamma coupling for encoding/retrieval. Beta frequencies maintain sustained attention necessary for working memory tasks.',
    
    bestRespondersProfile: [
      'Baseline working memory in normal-to-low-average range (more room for improvement)',
      'Students and knowledge workers with high cognitive demands',
      'Individuals willing to practice working memory tasks alongside protocol',
      'Age 18-65 (less evidence for older adults, though not contraindicated)'
    ],
    
    integrationWithCare: [
      'Excellent complement to cognitive training programs',
      'Can enhance effectiveness of ADHD behavioral interventions',
      'Useful adjunct for students with learning disabilities affecting working memory',
      'May reduce need for pharmacological cognitive enhancement in some individuals'
    ],
    
    troubleshooting: [
      {
        issue: 'Headache or mental fatigue during/after session',
        solution: 'Reduce session duration to 20 minutes. Gradually increase as tolerance builds. Ensure adequate hydration and blood glucose.'
      },
      {
        issue: 'No measurable improvements after 2 weeks',
        solution: 'Verify consistent daily use. Combine with active working memory training (n-back apps). Consider baseline capacity may already be high.'
      },
      {
        issue: 'Jitteriness or overstimulation',
        solution: 'Reduce volume. Avoid caffeine within 2 hours of session. Switch to morning-only sessions. If persists, pause protocol for 3 days then resume at lower intensity.'
      },
      {
        issue: 'Difficulty sleeping if used in evening',
        solution: 'Limit use to before 4pm. Gamma entrainment is activating. Consider switching to different protocol for evening cognitive needs.'
      }
    ]
  },
  
  version_history: [
    { version: '2.0.0', date: '2025-02-16', changes: 'Updated to new schema, added photosensitivity safety gates, enhanced measurement specifications' },
    { version: '1.5.0', date: '2024-09-20', changes: 'Added beta frequency layer for sustained attention' },
    { version: '1.0.0', date: '2024-05-10', changes: 'Initial release based on Beauchene et al. 2016 protocol' }
  ],
  
  status: 'active',
  tags: ['cognitive', 'working_memory', 'attention', 'executive_function', 'gamma', 'evidence_based'],
  requiresSafetyGates: true
};

export default workingMemoryExpander;
