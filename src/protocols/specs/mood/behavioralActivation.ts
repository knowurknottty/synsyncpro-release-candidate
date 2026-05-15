import { Protocol } from '../../../types';

export const behavioralActivation: Protocol = {
  id: 'behavioral-activation',
  name: 'Behavioral Activation',
  category: 'mood',
  grade: 9,
  description: 'Evidence-based behavioral protocol for depression through activity scheduling and value-based action',
  targetConditions: [
    'Major depressive disorder',
    'Persistent depressive disorder',
    'Behavioral withdrawal',
    'Anhedonia',
    'Low motivation'
  ],
  
  evidenceBase: [
    'Behavioral Activation equals antidepressants in efficacy (70-75% response rate)',
    'Superior to cognitive therapy for severe depression',
    'Lower relapse rates than medication alone',
    'Effective across cultures and settings',
    'Works within 4-8 weeks for most individuals'
  ],
  
  contraindications: [
    'Active suicidal plan requiring immediate intervention',
    'Severe psychotic depression',
    'Bipolar disorder without mood stabilization',
    'Medical conditions requiring bed rest'
  ],
  
  requirements: {
    minimumSessions: 10,
    sessionDuration: 50,
    homeworkRequired: true,
    prerequisites: ['Ability to complete activity logs', 'Basic physical mobility']
  },
  
  phases: [
    {
      name: 'Assessment & Psychoeducation',
      duration: '1-2 weeks',
      goals: [
        'Understand depression-avoidance cycle',
        'Identify valued life domains',
        'Establish activity baseline',
        'Build treatment rationale'
      ],
      activities: [
        'Activity monitoring for 1 week',
        'Values assessment',
        'Depression-behavior link psychoeducation',
        'Identify avoidance patterns'
      ]
    },
    {
      name: 'Activity Scheduling',
      duration: '3-4 weeks',
      goals: [
        'Increase activation gradually',
        'Break avoidance patterns',
        'Build routine structure',
        'Experience mood-behavior connection'
      ],
      activities: [
        'Schedule 2-3 activities daily',
        'Start with easy, achievable tasks',
        'Mix pleasure and mastery activities',
        'Track completion and mood impact'
      ]
    },
    {
      name: 'Values-Based Action',
      duration: '3-4 weeks',
      goals: [
        'Align activities with personal values',
        'Increase meaningful engagement',
        'Build life satisfaction',
        'Strengthen intrinsic motivation'
      ],
      activities: [
        'Identify value-congruent activities',
        'Add meaningful activities to schedule',
        'Address obstacles to valued living',
        'Build toward long-term goals'
      ]
    },
    {
      name: 'Problem-Solving & Maintenance',
      duration: '2-3 weeks',
      goals: [
        'Troubleshoot remaining obstacles',
        'Maintain activation gains',
        'Plan for future challenges',
        'Build relapse prevention'
      ],
      activities: [
        'Structured problem-solving',
        'Identify high-risk situations',
        'Create maintenance plan',
        'Taper session frequency'
      ]
    }
  ],
  
  techniques: [
    {
      name: 'Activity Monitoring',
      description: 'Tracking activities and mood hourly',
      application: 'Daily self-monitoring throughout treatment',
      steps: [
        'Record each hour\'s primary activity',
        'Rate mood on 0-10 scale',
        'Note context and people present',
        'Identify patterns between activities and mood',
        'Use data to inform scheduling'
      ],
      example: '9am: Stayed in bed, scrolling phone. Mood: 3/10. Pattern: Morning inactivity correlates with low mood.'
    },
    {
      name: 'Activity Scheduling',
      description: 'Planning activities in advance',
      application: 'Weekly planning with daily implementation',
      steps: [
        'Review week ahead',
        'Schedule specific activities at specific times',
        'Include mix of pleasure and mastery',
        'Start small and build gradually',
        'Commit to schedule regardless of mood'
      ],
      example: 'Monday 10am: 15-minute walk around block. Tuesday 2pm: Call friend for 10 minutes.'
    },
    {
      name: 'Values Clarification',
      description: 'Identifying what matters most',
      application: 'Use to guide activity selection',
      steps: [
        'Review life domains (relationships, health, work, leisure, etc.)',
        'Rate importance of each domain',
        'Describe valued direction in each',
        'Assess current alignment',
        'Generate value-congruent activities'
      ],
      example: 'Value: Being a caring friend. Current: Not reaching out. Activity: Text one friend weekly.'
    },
    {
      name: 'Graded Task Assignment',
      description: 'Breaking tasks into manageable steps',
      application: 'Use for overwhelming or avoided tasks',
      steps: [
        'Identify avoided task',
        'Break into smallest possible steps',
        'Rank steps by difficulty',
        'Schedule easiest step first',
        'Build success momentum'
      ],
      example: 'Task: Clean house. Steps: 1) Take trash out 2) Wash 5 dishes 3) Make bed 4) Vacuum one room...'
    }
  ],
  
  troubleshooting: [
    {
      issue: 'Not following through on scheduled activities',
      solution: 'Normal initially. Start with even smaller steps. Commit to 5 minutes only. Focus on starting, not completing. Address practical barriers. Distinguish "I can\'t" from "I don\'t feel like it." Feelings follow behavior, not vice versa.'
    },
    {
      issue: 'Activities don\'t improve mood',
      solution: 'Mood may lag behind behavior by days/weeks. Continue anyway. Ensure mix of pleasure and mastery activities. Check if avoiding most important activities. May need medication consultation if no improvement after 6-8 weeks.'
    },
    {
      issue: 'Too fatigued to do anything',
      solution: 'Start with smallest possible activities (5-minute walk, brush teeth, sit outside). Activity actually increases energy despite fatigue. Distinguish depression-related fatigue from medical causes. Expect discomfort initially.'
    },
    {
      issue: 'Nothing feels enjoyable (anhedonia)',
      solution: 'Expected in depression. Do activities anyway. Focus on mastery and values initially. Pleasure capacity returns gradually with consistent activation. May take 4-6 weeks. Track for small improvements, not sudden joy.'
    },
    {
      issue: 'Situation doesn\'t allow activity changes',
      solution: 'Find smallest possible control. Even in restricted circumstances, some choice exists (reading, stretching, calling someone). Address environmental barriers systematically. Revisit values to find achievable expressions.'
    }
  ],
  
  progressMarkers: [
    {
      timeframe: 'Weeks 1-2',
      indicators: [
        'Completing activity monitoring consistently',
        'Understanding depression-behavior link',
        'Completing 50%+ of scheduled activities',
        'Slight mood improvement or stabilization'
      ]
    },
    {
      timeframe: 'Weeks 3-5',
      indicators: [
        'Completing 70%+ of scheduled activities',
        'Clear mood-activity patterns identified',
        'Reduced avoidance of key activities',
        'Noticeable mood improvement',
        'Some return of motivation'
      ]
    },
    {
      timeframe: 'Weeks 6-10',
      indicators: [
        'Sustaining activation without extensive planning',
        'Engaging in value-congruent activities',
        'Mood significantly improved',
        'Return of enjoyment capacity',
        'Routine established',
        'PHQ-9 score reduced by 50% or more'
      ]
    }
  ],
  
  maintenancePhase: {
    criteria: 'Depression remission (PHQ-9 < 5) sustained for 2 weeks with consistent activation',
    schedule: 'Biweekly for 2 months, then monthly for 4 months',
    focusAreas: [
      'Maintain activity level during stress',
      'Recognize early warning signs',
      'Rapid re-activation if mood dips',
      'Continue values-based living'
    ]
  },
  
  integration: {
    complementaryProtocols: [
      'cognitive-restructuring',
      'sleep-hygiene',
      'social-connection',
      'exercise-prescription'
    ],
    contraindicated: [],
    sequencing: 'Can combine with medication. Often first-line before cognitive work.'
  },
  
  resources: [
    {
      type: 'book',
      title: 'Behavioral Activation for Depression by Martell et al.',
      purpose: 'Comprehensive clinician guide'
    },
    {
      type: 'workbook',
      title: 'Overcoming Depression One Step at a Time by Addis & Martell',
      purpose: 'Self-help workbook for clients'
    },
    {
      type: 'worksheet',
      title: 'Activity Monitoring Log',
      purpose: 'Track activities and mood'
    },
    {
      type: 'worksheet',
      title: 'Values Compass',
      purpose: 'Clarify valued directions'
    }
  ],
  
  clinicalNotes: {
    mechanism: 'Depression causes avoidance and withdrawal, which maintains depression. Systematic activation disrupts this cycle by increasing contact with positive reinforcement and creating incompatible behavioral patterns.',
    research: 'One of the most robust treatments for depression. Comparable to medication and cognitive therapy. Particularly effective for severe depression, minorities, and those who struggle with cognitive approaches.',
    bestResponders: [
      'Those with behavioral withdrawal',
      'Severe depression',
      'Concrete, action-oriented individuals',
      'Those who struggle with cognitive restructuring'
    ],
    limitedEfficacy: [
      'When physical environment prevents activation',
      'Severe psychotic features',
      'Bipolar depression without mood stabilization'
    ]
  },
  
  usageProtocol: {
    recommendedSchedule: 'Weekly 50-minute sessions for 10-12 weeks',
    optimalTimeframe: '10-12 weeks acute phase, 6-month maintenance',
    sessionPreparation: [
      'Review activity logs',
      'Celebrate completed activities',
      'Problem-solve obstacles',
      'Plan next week\'s activities'
    ],
    homework: 'Required - daily activity monitoring and scheduled activity completion'
  },
  
  expectedTimeline: {
    immediate: 'Understanding treatment rationale',
    '1 week': 'Baseline data collected',
    '2 weeks': 'Beginning activation, small mood improvements',
    '4 weeks': 'Clear mood-activity link, moderate improvement',
    '8 weeks': 'Significant depression reduction, routine established',
    '12 weeks': 'Remission or near-remission for most, sustained activation',
    '6 months': 'Maintained gains with reduced relapse risk'
  },
  
  version_history: [
    { version: '1.0.0', date: '2026-02-16', changes: 'Initial behavioral activation protocol based on Martell model' }
  ],
  
  status: 'active',
  tags: ['mood', 'depression', 'behavioral', 'activation', 'evidence-based', 'first-line', 'novel'],
  requiresSafetyGates: true
};

export default behavioralActivation;
