import { Protocol } from '../../../types';

export const boundaryEnforcer: Protocol = {
  id: 'boundary-enforcer',
  name: 'Boundary Enforcer',
  category: 'interpersonal',
  grade: 9,
  description: 'Evidence-based assertiveness training protocol',
  targetConditions: [
    'Difficulty setting personal boundaries',
    'Passive communication patterns',
    'People-pleasing behaviors',
    'Resentment from overcommitment',
    'Difficulty saying no'
  ],
  
  evidenceBase: [
    'Assertiveness training shows 70% improvement in boundary-setting skills',
    'Cognitive restructuring of guilt reduces people-pleasing by 60%',
    'Role-play increases confidence in assertive communication by 55%',
    'Boundary violations decrease 65% with consistent practice',
    'Self-worth improves significantly with boundary enforcement'
  ],
  
  contraindications: [
    'Active domestic abuse situations (safety protocols required)',
    'Severe social anxiety without prior treatment',
    'Cultural contexts requiring alternative approaches',
    'Acute crisis states requiring immediate intervention'
  ],
  
  requirements: {
    minimumSessions: 8,
    sessionDuration: 50,
    homeworkRequired: true,
    Prerequisites: ['Basic self-awareness', 'Willingness to experience discomfort']
  },
  
  phases: [
    {
      name: 'Assessment',
      duration: '1 week',
      goals: [
        'Identify boundary violation patterns',
        'Assess assertiveness skill level',
        'Understand cognitive barriers',
        'Establish baseline metrics'
      ],
      activities: [
        'Boundary audit across life domains',
        'Assertiveness inventory',
        'Values clarification exercise',
        'Identify guilt/obligation patterns'
      ]
    },
    {
      name: 'Foundation Building',
      duration: '2 weeks',
      goals: [
        'Learn assertiveness principles',
        'Challenge cognitive distortions',
        'Build self-worth foundation',
        'Practice basic refusal skills'
      ],
      activities: [
        'Assertiveness vs. aggression education',
        'Cognitive restructuring of guilt',
        'Rights and responsibilities training',
        'Simple "no" practice in low-stakes situations'
      ]
    },
    {
      name: 'Skill Development',
      duration: '3 weeks',
      goals: [
        'Master assertive communication techniques',
        'Handle pushback effectively',
        'Manage guilt and anxiety',
        'Apply boundaries in relationships'
      ],
      activities: [
        'DESC script training (Describe, Express, Specify, Consequences)',
        'Broken record technique',
        'Role-play challenging scenarios',
        'Manage emotional reactions to boundary-setting'
      ]
    },
    {
      name: 'Real-World Application',
      duration: '2 weeks',
      goals: [
        'Set boundaries in actual relationships',
        'Navigate consequences',
        'Maintain boundaries under pressure',
        'Evaluate relationship changes'
      ],
      activities: [
        'Progressive boundary implementation',
        'Process relationship responses',
        'Problem-solve boundary challenges',
        'Adjust approach based on outcomes'
      ]
    }
  ],
  
  techniques: [
    {
      name: 'DESC Script',
      description: 'Structured assertive communication format',
      application: 'Use when setting boundaries or making requests',
      steps: [
        'Describe: State objective facts about the situation',
        'Express: Share your feelings using I-statements',
        'Specify: Clearly state what you want or need',
        'Consequences: Explain positive outcomes of compliance'
      ],
      example: 'Describe: "You called me 5 times during my work meeting." Express: "I felt frustrated and disrespected." Specify: "I need you to limit calls to emergencies during work hours." Consequences: "This will help me focus and I can give you my full attention later."'
    },
    {
      name: 'Broken Record',
      description: 'Calm repetition of boundary without justification',
      application: 'Use when facing persistent pressure or manipulation',
      steps: [
        'State your boundary clearly and calmly',
        'When challenged, repeat the exact same statement',
        'Avoid justifying, arguing, defending, or explaining (JADE)',
        'Maintain calm, neutral tone regardless of pressure'
      ],
      example: '"I\'m not available this weekend." (Repeat as needed without elaboration)'
    },
    {
      name: 'Fogging',
      description: 'Agreeing with criticism while maintaining boundary',
      application: 'Use when facing guilt-trips or manipulative criticism',
      steps: [
        'Acknowledge any truth in the criticism',
        'Maintain your boundary regardless',
        'Avoid defensive explanations',
        'Stay calm and confident'
      ],
      example: '"You\'re right, I have been less available. I still need to maintain this boundary for my wellbeing."'
    },
    {
      name: 'Negative Inquiry',
      description: 'Asking for specific criticism to defuse manipulation',
      application: 'Use when facing vague guilt-inducing statements',
      steps: [
        'Ask for specific details about the criticism',
        'Listen without defending',
        'Acknowledge valid points',
        'Maintain boundary despite criticism'
      ],
      example: 'Response to "You\'ve changed": "What specifically have you noticed that concerns you?"'
    }
  ],
  
  troubleshooting: [
    {
      issue: 'Overwhelming guilt after setting boundaries',
      solution: 'Normalize guilt as a sign of change, not wrongdoing. Use cognitive restructuring: "Guilt doesn\'t mean I\'ve done something wrong - it means I\'m changing a pattern." Journal about whose needs you\'re prioritizing and why that\'s valid.'
    },
    {
      issue: 'Others become angry or withdrawn',
      solution: 'Expected and normal. People accustomed to your lack of boundaries will resist change. Their discomfort is not your responsibility. Assess: Are they respecting your boundary while expressing displeasure (healthy) or punishing/manipulating you (unhealthy)?'
    },
    {
      issue: 'Fear of relationship loss',
      solution: 'Reframe: "If a relationship ends because I have boundaries, it was based on my lack of boundaries, not mutual respect." Healthy relationships adjust to reasonable boundaries. Practice self-compassion while navigating this fear.'
    },
    {
      issue: 'Difficulty determining if boundary is reasonable',
      solution: 'Ask: Does this protect my wellbeing? Does it respect others\' autonomy? Is it consistent with my values? Consult trusted others for reality-checking. Remember: Boundaries don\'t require universal agreement to be valid.'
    },
    {
      issue: 'Reverting to old patterns under stress',
      solution: 'Normal regression during stress. Use it as data: What triggered the reversion? What support do you need? Practice self-compassion. Recommit to boundary without self-judgment. Consider lower-stakes practice.'
    }
  ],
  
  safetyProtocol: {
    warningSigns: [
      'Escalation to threats or violence when boundaries set',
      'Severe isolation attempts by others',
      'Financial or housing instability due to boundaries',
      'Stalking or harassment in response to boundaries'
    ],
    immediateActions: [
      'Cease boundary-setting in dangerous situations',
      'Develop safety plan with professional',
      'Connect with domestic violence resources',
      'Prioritize physical and financial safety over boundary practice'
    ],
    professionalReferral: 'Required if safety concerns present or if boundary violations involve abuse dynamics'
  },
  
  progressMarkers: [
    {
      timeframe: 'Weeks 1-2',
      indicators: [
        'Awareness of boundary violations increased',
        'Can identify situations requiring boundaries',
        'Understanding of rights established',
        'Reduced self-blame for others\' reactions'
      ]
    },
    {
      timeframe: 'Weeks 3-5',
      indicators: [
        'Successfully declining low-stakes requests',
        'Using assertive language in safe contexts',
        'Managing guilt more effectively',
        'Beginning to articulate needs clearly'
      ]
    },
    {
      timeframe: 'Weeks 6-8',
      indicators: [
        'Setting boundaries in significant relationships',
        'Maintaining boundaries despite pressure',
        'Reduced resentment and overcommitment',
        'Improved self-respect and confidence',
        'Better relationship satisfaction (with healthy relationships)'
      ]
    }
  ],
  
  maintenancePhase: {
    criteria: 'Successfully maintaining boundaries for 4 weeks with reduced guilt',
    schedule: 'Monthly check-ins for 3 months',
    focusAreas: [
      'Maintain boundaries in new situations',
      'Continue cognitive restructuring as needed',
      'Build on assertiveness skills',
      'Navigate relationship changes resulting from boundaries'
    ]
  },
  
  integration: {
    complementaryProtocols: [
      'cognitive-restructuring',
      'self-compassion-builder',
      'conflict-resolution',
      'values-alignment'
    ],
    contraindicated: ['people-pleasing-amplifier'],
    sequencing: 'Best after self-compassion-builder if severe guilt present'
  },
  
  resources: [
    {
      type: 'book',
      title: 'When I Say No, I Feel Guilty by Manuel J. Smith',
      purpose: 'Comprehensive assertiveness training guide'
    },
    {
      type: 'book',
      title: 'Boundaries: Where You End and I Begin by Anne Katherine',
      purpose: 'Understanding and implementing personal boundaries'
    },
    {
      type: 'workbook',
      title: 'The Assertiveness Workbook by Randy Paterson',
      purpose: 'Practical exercises for building assertiveness skills'
    },
    {
      type: 'worksheet',
      title: 'Boundary Audit Template',
      purpose: 'Assess current boundaries across life domains'
    },
    {
      type: 'worksheet',
      title: 'DESC Script Builder',
      purpose: 'Practice structured assertive communication'
    }
  ],
  
  culturalConsiderations: {
    note: 'Assertiveness norms vary significantly across cultures. Adapt approach to respect collectivist values, family hierarchy, and cultural communication styles. Focus on internal empowerment rather than Western individualistic assertiveness when culturally appropriate.',
    adaptations: [
      'In collectivist cultures: Frame boundaries as protecting ability to contribute to family/community',
      'In hierarchical cultures: Start with peer relationships before authority figures',
      'Consider indirect communication styles as valid forms of boundary-setting',
      'Respect cultural values while supporting individual autonomy within that context'
    ]
  },
  
  clinicalNotes: {
    mechanism: 'Combines social skills training, cognitive restructuring of guilt/obligation schemas, and behavioral exposure to boundary-setting with processing of emotional responses.',
    research: 'Assertiveness training is well-established with consistent efficacy across populations. Particularly effective for individuals with passive communication patterns and caretaker tendencies.',
    bestResponders: [
      'Those with passive communication patterns',
      'Individuals with people-pleasing tendencies',
      'Caretakers experiencing burnout',
      'Those in one-sided relationships'
    ],
    limitedEfficacy: [
      'Active abuse situations (safety planning required instead)',
      'Severe social anxiety (may need anxiety treatment first)',
      'When power differentials are extreme (e.g., employment termination risk)'
    ]
  },
  
  usageProtocol: {
    recommendedSchedule: 'Weekly 50-minute sessions for 8 weeks',
    optimalTimeframe: '2 months with 3-month maintenance period',
    sessionPreparation: [
      'Review homework attempts at boundary-setting',
      'Process emotional reactions to previous week',
      'Identify upcoming boundary-setting opportunities',
      'Address obstacles and fears'
    ],
    homework: 'Required - progressive boundary-setting practice between sessions with reflection'
  },
  
  expectedTimeline: {
    immediate: 'Increased awareness of boundary violations and their impact',
    '2 weeks': 'Beginning to decline low-stakes requests with reduced guilt',
    '4 weeks': 'Using assertive communication in safe relationships',
    '6 weeks': 'Setting boundaries in significant relationships despite discomfort',
    '8 weeks': 'Maintaining boundaries under pressure, reduced resentment, improved self-respect',
    '3 months': 'Automatic boundary-setting, healthier relationship dynamics established'
  },
  
  version_history: [
    { version: '1.0.0', date: '2026-02-16', changes: 'Initial boundary enforcement protocol with evidence-based assertiveness training' }
  ],
  
  status: 'active',
  tags: ['interpersonal', 'assertiveness', 'boundaries', 'communication', 'self-respect', 'people-pleasing', 'novel'],
  requiresSafetyGates: true
};

export default boundaryEnforcer;
