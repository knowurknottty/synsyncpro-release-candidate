import { Protocol } from '../../../types';

export const empatheticCommunicator: Protocol = {
  id: 'empathetic-communicator',
  name: 'Empathetic Communicator',
  category: 'interpersonal',
  grade: 7,
  description: 'Evidence-based empathy development and compassionate communication protocol',
  targetConditions: [
    'Difficulty understanding others\' perspectives',
    'Being perceived as cold or uncaring',
    'Relationship disconnection',
    'Poor emotional attunement',
    'Communication lacks warmth'
  ],
  
  evidenceBase: [
    'Empathy training increases prosocial behavior by 60%',
    'Perspective-taking reduces interpersonal conflict by 55%',
    'Emotional validation improves relationship satisfaction by 50%',
    'Active empathic listening enhances connection by 65%',
    'Compassion-focused communication decreases loneliness by 45%'
  ],
  
  contraindications: [
    'Empathy being exploited in abusive dynamics',
    'Severe depression where empathy becomes overwhelming',
    'Narcissistic traits preventing genuine perspective-taking',
    'Trauma causing empathic distress'
  ],
  
  requirements: {
    minimumSessions: 6,
    sessionDuration: 50,
    homeworkRequired: true,
    prerequisites: ['Basic self-awareness', 'Willingness to be vulnerable']
  },
  
  phases: [
    {
      name: 'Foundation',
      duration: '2 weeks',
      goals: [
        'Understand empathy components',
        'Build emotional vocabulary',
        'Practice perspective-taking',
        'Develop curiosity about others'
      ],
      activities: [
        'Cognitive vs. affective empathy education',
        'Emotion wheel exercises',
        'Perspective-taking scenarios',
        'Curious questioning practice'
      ]
    },
    {
      name: 'Skill Building',
      duration: '2 weeks',
      goals: [
        'Master empathic listening',
        'Provide emotional validation',
        'Express compassion effectively',
        'Read emotional cues'
      ],
      activities: [
        'Reflective listening practice',
        'Validation statement training',
        'Nonverbal empathy exercises',
        'Emotion recognition drills'
      ]
    },
    {
      name: 'Application',
      duration: '2 weeks',
      goals: [
        'Use empathy in real relationships',
        'Balance empathy with boundaries',
        'Respond compassionately to distress',
        'Deepen emotional connections'
      ],
      activities: [
        'Real-world empathy practice',
        'Self-compassion to prevent burnout',
        'Empathic response to difficult emotions',
        'Connection-building conversations'
      ]
    }
  ],
  
  techniques: [
    {
      name: 'Reflective Listening',
      description: 'Mirroring others\' emotions and content',
      application: 'Use when someone shares experiences',
      steps: [
        'Listen fully without formulating response',
        'Identify the emotion being expressed',
        'Reflect back emotion and content',
        'Check for accuracy',
        'Follow their lead'
      ],
      example: '"It sounds like you\'re feeling really frustrated because the project didn\'t go as planned. Is that right?"'
    },
    {
      name: 'Validation',
      description: 'Communicating that emotions make sense',
      application: 'Use when acknowledging others\' feelings',
      steps: [
        'Acknowledge the emotion',
        'Normalize it in context',
        'Show understanding without fixing',
        'Avoid "at least" or minimizing',
        'Stay present with their experience'
      ],
      example: '"Of course you\'re disappointed. You worked so hard on this and had high hopes. That makes complete sense."'
    },
    {
      name: 'Perspective-Taking',
      description: 'Imagining others\' internal experience',
      application: 'Use to understand different viewpoints',
      steps: [
        'Suspend your own perspective temporarily',
        'Consider their history, values, needs',
        'Imagine feeling what they might feel',
        'Ask clarifying questions',
        'Hold multiple perspectives simultaneously'
      ],
      example: 'Mentally ask: "If I had their background and was in this situation, how might I feel and why?"'
    },
    {
      name: 'Empathic Inquiry',
      description: 'Asking questions from genuine curiosity',
      application: 'Use to deepen understanding',
      steps: [
        'Ask open-ended questions',
        'Focus on feelings and meaning',
        'Avoid interrogation or judgment',
        'Show genuine interest',
        'Follow up with deeper questions'
      ],
      example: '"What was that experience like for you?" "How did that affect you?" "What matters most to you about this?"'
    }
  ],
  
  troubleshooting: [
    {
      issue: 'Empathy feels fake or forced',
      solution: 'Normal at first. Focus on genuine curiosity rather than "correct" responses. Start with easier people/situations. Work on own emotional awareness - hard to recognize emotions in others if disconnected from your own.'
    },
    {
      issue: 'Becoming overwhelmed by others\' emotions',
      solution: 'Distinguish empathy from emotional contagion. Practice grounding techniques. Set boundaries around emotional labor. Develop self-compassion. May need to address personal trauma affecting empathic capacity.'
    },
    {
      issue: 'Others don\'t seem to want empathy',
      solution: 'Respect different comfort levels with emotional expression. Some people prefer problem-solving. Ask: "Do you want empathy or solutions?" Cultural factors affect empathy expression. Timing matters.'
    },
    {
      issue: 'Difficulty reading emotional cues',
      solution: 'Study facial expressions and body language systematically. Ask directly about feelings. Practice with low-stakes situations. Consider alexithymia assessment if severe. Use structured approaches to emotion recognition.'
    }
  ],
  
  progressMarkers: [
    {
      timeframe: 'Weeks 1-2',
      indicators: [
        'Increased awareness of others\' emotions',
        'Beginning to ask about feelings',
        'Reduced advice-giving',
        'More curious about perspectives'
      ]
    },
    {
      timeframe: 'Weeks 3-4',
      indicators: [
        'Consistent validation statements',
        'Better emotion recognition',
        'Empathic responses feel more natural',
        'Others report feeling heard'
      ]
    },
    {
      timeframe: 'Weeks 5-6',
      indicators: [
        'Automatic empathic responding',
        'Deeper relational connections',
        'Comfortable with emotional conversations',
        'Balanced empathy with self-care',
        'Perceived as caring and understanding'
      ]
    }
  ],
  
  maintenancePhase: {
    criteria: 'Consistently demonstrating empathy in relationships for 3 weeks',
    schedule: 'Monthly check-ins for 2 months',
    focusAreas: [
      'Maintain skills under stress',
      'Extend empathy to difficult people',
      'Balance empathy with boundaries',
      'Continue self-compassion practice'
    ]
  },
  
  integration: {
    complementaryProtocols: [
      'conflict-mediator',
      'boundary-enforcer',
      'self-compassion-builder',
      'emotional-literacy'
    ],
    contraindicated: ['emotional-detachment'],
    sequencing: 'Pairs well with conflict-mediator; may need boundary-enforcer if empathy leads to overextension'
  },
  
  resources: [
    {
      type: 'book',
      title: 'The Empathy Effect by Helen Riess',
      purpose: 'Science and practice of empathy'
    },
    {
      type: 'book',
      title: 'Nonviolent Communication by Marshall Rosenberg',
      purpose: 'Compassionate communication framework'
    },
    {
      type: 'workbook',
      title: 'Empathy Workbook',
      purpose: 'Structured empathy exercises'
    }
  ],
  
  clinicalNotes: {
    mechanism: 'Combines cognitive perspective-taking training, emotional literacy development, behavioral communication skills, and mindfulness-based attention to others.',
    research: 'Empathy training shows consistent benefits across studies. Particularly effective for those with empathy deficits from different causes (cognitive, emotional, experiential).',
    bestResponders: [
      'Those motivated to improve relationships',
      'People with empathy knowledge gaps',
      'Individuals raised in emotionally restricted environments',
      'Those wanting deeper connections'
    ],
    limitedEfficacy: [
      'Severe narcissistic personality disorder',
      'Lack of motivation to change',
      'Contexts where empathy is exploited',
      'Unaddressed trauma causing empathy shutdown'
    ]
  },
  
  usageProtocol: {
    recommendedSchedule: 'Weekly 50-minute sessions for 6 weeks',
    optimalTimeframe: '6 weeks with 2-month maintenance',
    sessionPreparation: [
      'Review empathy practice attempts',
      'Process challenges and successes',
      'Role-play difficult scenarios',
      'Build emotional vocabulary'
    ],
    homework: 'Required - daily empathy practice with reflection'
  },
  
  expectedTimeline: {
    immediate: 'Increased awareness of empathy importance',
    '2 weeks': 'Beginning to recognize others\' emotions more accurately',
    '4 weeks': 'Consistent empathic responses, others notice change',
    '6 weeks': 'Natural empathy, deeper connections, relational satisfaction improved',
    '2 months': 'Empathy integrated into communication style, relationships strengthened'
  },
  
  version_history: [
    { version: '1.0.0', date: '2026-02-16', changes: 'Initial empathetic communication protocol' }
  ],
  
  status: 'active',
  tags: ['interpersonal', 'empathy', 'communication', 'relationships', 'compassion', 'novel'],
  requiresSafetyGates: false
};

export default empatheticCommunicator;
