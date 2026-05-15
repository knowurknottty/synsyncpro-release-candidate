// src/protocols/specs/performance/academic/examPerformanceOptimizer.ts
import { Protocol } from '../../../types';

export const examPerformanceOptimizer: Protocol = {
  id: 'exam_performance_optimizer',
  name: 'Exam Performance Optimizer',
  version: '2.0.0',
  category: 'performance',
  subcategory: 'academic',
  
  description: 'Optimizes cognitive state for high-stakes testing through anxiety reduction and cognitive enhancement. Combines alpha relaxation with beta alertness for peak performance state.',
  
  evidenceGrade: 'B',
  effectSize: 0.50,
  
  citations: [
    {
      authors: ['Wahbeh H', 'Calabrese C', 'Zwickey H'],
      title: 'Binaural beat technology in humans: a pilot study to assess psychologic and physiologic effects',
      journal: 'J Altern Complement Med',
      year: 2007,
      volume: 13,
      issue: 1,
      pages: '25-32',
      doi: '10.1089/acm.2006.6196',
      keyFindings: 'Beta/theta beats reduce anxiety and improve mood in test conditions'
    },
    {
      authors: ['Lane JD', 'Kasian SJ', 'Owens JE', 'Marsh GR'],
      title: 'Binaural auditory beats affect vigilance performance and mood',
      journal: 'Physiol Behav',
      year: 1998,
      volume: 63,
      issue: 2,
      pages: '249-252',
      doi: '10.1016/s0031-9384(97)00436-8',
      keyFindings: 'Beta binaural beats enhance vigilance and sustained attention required for testing'
    }
  ],
  
  targetStates: [
    {
      band: 'alpha',
      targetHz: 10,
      hemisphere: 'bilateral',
      region: 'parietal',
      mechanism: 'Reduces test anxiety while maintaining alert relaxation'
    },
    {
      band: 'beta',
      targetHz: 16,
      hemisphere: 'bilateral',
      region: 'prefrontal',
      mechanism: 'Maintains cognitive alertness and information retrieval'
    }
  ],
  
  phases: [
    {
      name: 'Pre-Exam Calming',
      duration: 480,
      description: 'Reduce test anxiety and physiological arousal',
      layers: [
        {
          type: 'binaural',
          carrierHz: 200,
          beatHz: 10,
          amplitudeDb: -12,
          purpose: 'Alpha for anxiety reduction'
        },
        {
          type: 'isochronic',
          carrierHz: 432,
          pulseHz: 8,
          amplitudeDb: -18,
          purpose: 'Theta-alpha transition for deep relaxation'
        }
      ]
    },
    {
      name: 'Optimal Performance State',
      duration: 900,
      description: 'Peak cognitive state combining calm alertness',
      layers: [
        {
          type: 'binaural',
          carrierHz: 250,
          beatHz: 16,
          amplitudeDb: -12,
          purpose: 'Beta for cognitive performance'
        },
        {
          type: 'monaural',
          carrierHz: 210,
          beatHz: 10,
          amplitudeDb: -15,
          purpose: 'Alpha baseline for calm confidence'
        }
      ]
    },
    {
      name: 'Pre-Test Activation',
      duration: 420,
      description: 'Final activation for exam readiness',
      layers: [
        {
          type: 'binaural',
          carrierHz: 260,
          beatHz: 18,
          amplitudeDb: -12,
          purpose: 'Beta activation for sharp focus'
        },
        {
          type: 'isochronic',
          carrierHz: 528,
          pulseHz: 16,
          amplitudeDb: -18,
          purpose: 'Consolidate optimal test-taking state'
        }
      ]
    }
  ],
  
  duration: 1800,
  
  safetyConstraints: {
    photosensitivity: {
      maxFlashRate: 18,
      enabled: false,
      warningRequired: false,
      warningText: ''
    },
    soundPressure: {
      maxDb: 70,
      warningDb: 65,
      recommendedDb: 58,
      measurement: 'Comfortable listening volume'
    },
    contraindications: [
      'Severe test anxiety requiring medical treatment (use as adjunct only)',
      'Active panic disorder',
      'Conditions requiring anti-anxiety medication during testing'
    ],
    interactions: []
  },
  
  measurements: {
    primary: [
      {
        name: 'Test Performance',
        unit: 'score/percentage',
        method: 'Actual exam scores vs baseline practice tests',
        baseline: 'Average of 3+ practice tests',
        schedule: 'Per exam',
        successCriteria: '≥10% improvement in test scores'
      },
      {
        name: 'Pre-Exam Anxiety',
        unit: 'STAI score',
        method: 'State-Trait Anxiety Inventory before exam',
        baseline: 'Pre-protocol baseline',
        schedule: 'Before each major exam',
        successCriteria: '≥30% reduction in state anxiety'
      }
    ],
    secondary: [
      {
        name: 'Subjective Confidence',
        unit: 'Likert 1-10',
        method: 'Self-rated confidence before exam',
        baseline: 'Historical average',
        schedule: 'Pre-exam',
        successCriteria: '≥2 point improvement'
      },
      {
        name: 'Focus During Exam',
        unit: 'Likert 1-10',
        method: 'Post-exam rating of sustained attention',
        baseline: 'Historical average',
        schedule: 'Post-exam',
        successCriteria: '≥8/10 sustained focus rating'
      }
    ]
  },
  
  usageProtocol: {
    recommendedSchedule: 'Use 60-90 minutes before exam. Practice with mock exams for familiarization.',
    optimalTimeOfDay: 'Timed to end 30-60 minutes before exam start',
    sessionPreparation: [
      'Use in quiet space before exam',
      'Have study materials reviewed beforehand',
      'Hydrated and nourished',
      'Practice with protocol during mock exams first'
    ],
    expectedTimeline: {
      immediate: 'Reduced pre-test jitters, enhanced calm confidence',
      '1-2 uses': 'Improved sustained attention during practice tests',
      '3-4 uses': 'Consistent anxiety management and performance gains',
      'ongoing': 'Reliable pre-exam routine for optimal performance'
    },
    maintenancePhase: {
      criteria: 'Use as-needed before high-stakes exams',
      schedule: 'Before major tests, not daily',
      monitoring: 'Track exam scores and anxiety levels'
    }
  },
  
  clinicalNotes: {
    mechanismSummary: 'Test anxiety impairs performance through prefrontal cortex dysfunction. Alpha entrainment reduces anxiety while beta maintains alertness, creating optimal alpha-beta balance for exam performance.',
    bestRespondersProfile: [
      'Students with test anxiety',
      'High-stakes exam takers (boards, certifications)',
      'Individuals who "freeze" under pressure',
      'Students who know material but underperform on tests'
    ],
    integrationWithCare: [
      'Complement to test-taking strategies coaching',
      'Adjunct to cognitive-behavioral therapy for test anxiety',
      'Part of comprehensive academic support program'
    ],
    troubleshooting: [
      {
        issue: 'Still feeling very anxious',
        solution: 'Extend calming phase to 10-12 minutes. Practice with protocol during low-stakes quizzes first. Consider professional anxiety treatment.'
      },
      {
        issue: 'Feeling too relaxed/sleepy',
        solution: 'Shorten calming phase. Use protocol earlier (90+ minutes before exam). Stand/move during final activation phase.'
      }
    ]
  },
  
  version_history: [
    { version: '2.0.0', date: '2025-02-16', changes: 'Updated schema, optimized phase timing' },
    { version: '1.0.0', date: '2024-09-01', changes: 'Initial release' }
  ],
  
  status: 'active',
  tags: ['academic', 'test_anxiety', 'performance', 'students', 'alpha_beta', 'evidence_based'],
  requiresSafetyGates: true
};

export default examPerformanceOptimizer;
