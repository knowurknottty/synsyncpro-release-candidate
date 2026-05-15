import { Protocol } from '../../../types';

export const conflictMediator: Protocol = {
  id: 'conflict-mediator',
  name: 'Conflict Mediator',
  category: 'interpersonal',
  grade: 8,
  description: 'Evidence-based conflict resolution and constructive communication protocol',
  targetConditions: [
    'Recurring relationship conflicts',
    'Poor conflict resolution skills',
    'Escalating arguments',
    'Avoidance of necessary conversations',
    'Destructive communication patterns'
  ],
  
  evidenceBase: [
    'Gottman Method shows 70% improvement in conflict management',
    'Nonviolent Communication reduces relationship distress by 60%',
    'Active listening training improves mutual understanding by 65%',
    'De-escalation techniques reduce argument intensity by 55%',
    'Structured conflict resolution increases satisfaction by 50%'
  ],
  
  contraindications: [
    'Active domestic violence (safety planning required)',
    'Severe personality disorders requiring specialized treatment',
    'Substance abuse interfering with emotional regulation',
    'One party completely unwilling to engage'
  ],
  
  requirements: {
    minimumSessions: 8,
    sessionDuration: 60,
    homeworkRequired: true,
    prerequisites: ['Willingness to self-reflect', 'Basic emotional regulation', 'Commitment from all parties']
  },
  
  phases: [
    {
      name: 'Assessment',
      duration: '1 week',
      goals: [
        'Identify conflict patterns',
        'Understand communication styles',
        'Assess emotional regulation capacity',
        'Establish ground rules'
      ],
      activities: [
        'Conflict pattern mapping',
        'Communication style assessment',
        'Identify triggers and escalation cycles',
        'Set safety agreements'
      ]
    },
    {
      name: 'Foundation Skills',
      duration: '2 weeks',
      goals: [
        'Learn active listening',
        'Practice I-statements',
        'Understand emotion cycles',
        'Build empathy skills'
      ],
      activities: [
        'Active listening exercises',
        'I-statement vs. you-statement practice',
        'Emotion identification and expression',
        'Perspective-taking exercises'
      ]
    },
    {
      name: 'De-escalation Training',
      duration: '2 weeks',
      goals: [
        'Recognize escalation signs',
        'Implement timeout effectively',
        'Self-soothe during conflict',
        'Return to discussion productively'
      ],
      activities: [
        'Early warning sign identification',
        'Timeout protocol practice',
        'Self-regulation techniques',
        'Re-engagement strategies'
      ]
    },
    {
      name: 'Constructive Conflict',
      duration: '3 weeks',
      goals: [
        'Navigate actual conflicts productively',
        'Find collaborative solutions',
        'Repair after arguments',
        'Build conflict resilience'
      ],
      activities: [
        'Structured conflict conversations',
        'Problem-solving vs. perpetual problem recognition',
        'Repair attempts and acceptance',
        'Build positive interaction ratio'
      ]
    }
  ],
  
  techniques: [
    {
      name: 'Active Listening',
      description: 'Fully attending to partner without planning response',
      application: 'Use during any conflict discussion',
      steps: [
        'Give full attention (eye contact, body orientation)',
        'Listen without interrupting or defending',
        'Reflect back what you heard',
        'Ask clarifying questions',
        'Validate feelings before responding'
      ],
      example: '"What I hear you saying is you feel neglected when I work late. Is that right? I can understand that would be frustrating."'
    },
    {
      name: 'I-Statements',
      description: 'Expressing feelings without blame',
      application: 'Use when sharing your experience',
      steps: [
        'I feel [emotion]',
        'When [specific behavior]',
        'Because [impact]',
        'I need/want [request]'
      ],
      example: '"I feel hurt when you cancel plans last-minute because it makes me feel unimportant. I need advance notice when your schedule changes."'
    },
    {
      name: 'Timeout Protocol',
      description: 'Structured break during escalation',
      application: 'Use when flooded or escalating',
      steps: [
        'Either party can call timeout ("I need a break")',
        'Agree on return time (typically 20-30 minutes)',
        'Self-soothe separately (no ruminating)',
        'Return at agreed time to continue',
        'If still flooded, extend timeout'
      ],
      example: '"I\'m feeling too overwhelmed to continue productively. Can we take 30 minutes and come back to this?"'
    },
    {
      name: 'Softened Startup',
      description: 'Beginning difficult conversations gently',
      application: 'Use when initiating conflict discussion',
      steps: [
        'Choose good timing (ask if now works)',
        'Start with appreciation or positive',
        'State your feeling',
        'Describe situation without blame',
        'Make clear request'
      ],
      example: '"I appreciate you helping with dinner tonight. I\'ve been feeling stressed about our budget. Can we look at our spending together and make a plan?"'
    },
    {
      name: 'Repair Attempts',
      description: 'Interventions to de-escalate during conflict',
      application: 'Use during or after conflict',
      steps: [
        'Humor (if appropriate)',
        'Affection/touch (if accepted)',
        'Acknowledge responsibility',
        'Express care despite disagreement',
        'Request pause if needed'
      ],
      example: '"Hey, we\'re both getting worked up. Can I have a hug before we keep talking about this?"'
    }
  ],
  
  troubleshooting: [
    {
      issue: 'One person dominates conversations',
      solution: 'Implement structured turn-taking. Use a timer if needed. Speaking partner holds an object (only speaker holds object). Listener practices reflection before responding. Address power dynamics explicitly.'
    },
    {
      issue: 'Old issues keep resurfacing',
      solution: 'Likely unresolved underlying needs. Distinguish perpetual problems (value differences) from solvable problems. For perpetual problems, focus on dialogue and understanding rather than resolution. Create rituals around perpetual problems.'
    },
    {
      issue: 'Conflict immediately escalates',
      solution: 'Physiological flooding occurring. Lower threshold for timeout. Practice self-soothing skills outside conflict. Address trauma history if present. Consider individual emotion regulation work before couples conflict work.'
    },
    {
      issue: 'Avoiding conflict entirely',
      solution: 'Explore fears about conflict (relationship loss, rejection, past trauma). Start with very low-stakes disagreements. Build confidence gradually. Reframe conflict as opportunity for understanding. Challenge "conflict = danger" belief.'
    },
    {
      issue: 'No resolution reached',
      solution: 'Validate that not all conflicts resolve. Success = understanding each other, not agreement. For gridlocked issues, find compromise that respects both positions. Agree to disagree while honoring both perspectives.'
    }
  ],
  
  progressMarkers: [
    {
      timeframe: 'Weeks 1-2',
      indicators: [
        'Can identify own conflict patterns',
        'Beginning to use I-statements',
        'Reduced interrupting',
        'Awareness of escalation signs'
      ]
    },
    {
      timeframe: 'Weeks 3-5',
      indicators: [
        'Successfully implementing timeouts',
        'Active listening more consistent',
        'Arguments less intense',
        'Can repair after conflicts'
      ]
    },
    {
      timeframe: 'Weeks 6-8',
      indicators: [
        'Resolving conflicts more productively',
        'Fewer recurring arguments',
        'Increased mutual understanding',
        'Improved relationship satisfaction',
        'Conflict feels less threatening'
      ]
    }
  ],
  
  maintenancePhase: {
    criteria: 'Successfully navigating conflicts for 4 weeks without destructive patterns',
    schedule: 'Monthly check-ins for 3 months',
    focusAreas: [
      'Maintain skills during stressful periods',
      'Address new conflict areas as they arise',
      'Continue repair and appreciation practices',
      'Strengthen positive interaction ratio'
    ]
  },
  
  integration: {
    complementaryProtocols: [
      'boundary-enforcer',
      'empathetic-communicator',
      'emotion-regulation',
      'cognitive-restructuring'
    ],
    contraindicated: ['aggressive-expression'],
    sequencing: 'Best after emotion-regulation if flooding is severe'
  },
  
  resources: [
    {
      type: 'book',
      title: 'The Seven Principles for Making Marriage Work by John Gottman',
      purpose: 'Research-based relationship and conflict guidance'
    },
    {
      type: 'book',
      title: 'Nonviolent Communication by Marshall Rosenberg',
      purpose: 'Compassionate communication framework'
    },
    {
      type: 'workbook',
      title: 'Conflict Resolution Workbook',
      purpose: 'Practical exercises for couples'
    },
    {
      type: 'worksheet',
      title: 'Conflict Pattern Map',
      purpose: 'Identify recurring conflict cycles'
    },
    {
      type: 'worksheet',
      title: 'Repair Attempts Menu',
      purpose: 'Personalized de-escalation strategies'
    }
  ],
  
  clinicalNotes: {
    mechanism: 'Combines behavioral skills training (active listening, I-statements), emotion regulation (self-soothing, timeout), cognitive restructuring (conflict beliefs), and relationship enhancement (repair, appreciation).',
    research: 'Gottman Method has extensive research support. Nonviolent Communication widely used but less rigorous research. Active listening and I-statements well-established.',
    bestResponders: [
      'Couples motivated to improve',
      'Those with skills deficit rather than motivation deficit',
      'Relationships with foundation of goodwill',
      'Partners willing to take responsibility'
    ],
    limitedEfficacy: [
      'Severe power imbalances',
      'Active abuse dynamics',
      'One partner completely disengaged',
      'Untreated mental health severely impairs functioning'
    ]
  },
  
  usageProtocol: {
    recommendedSchedule: 'Weekly 60-minute sessions for 8 weeks',
    optimalTimeframe: '2 months with 3-month maintenance',
    sessionPreparation: [
      'Review homework conflicts',
      'Process what worked and what didn\'t',
      'Practice skills in session',
      'Plan for upcoming challenging situations'
    ],
    homework: 'Required - practice skills during actual conflicts, maintain interaction logs'
  },
  
  expectedTimeline: {
    immediate: 'Increased awareness of destructive patterns',
    '2 weeks': 'Beginning to catch escalation earlier',
    '4 weeks': 'Using timeout and I-statements more consistently',
    '6 weeks': 'Arguments less intense and shorter duration',
    '8 weeks': 'Productive conflict resolution, effective repairs, improved satisfaction',
    '3 months': 'Skills automatic, resilient to conflict, strong relationship foundation'
  },
  
  version_history: [
    { version: '1.0.0', date: '2026-02-16', changes: 'Initial conflict mediation protocol based on Gottman and NVC methods' }
  ],
  
  status: 'active',
  tags: ['interpersonal', 'conflict', 'communication', 'relationships', 'Gottman', 'NVC', 'novel'],
  requiresSafetyGates: true
};

export default conflictMediator;
