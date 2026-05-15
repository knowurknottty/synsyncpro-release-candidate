// src/protocols/specs/performance/cognitive/memoryPalaceBuilder.ts
import { Protocol } from '../../../types';

export const memoryPalaceBuilder: Protocol = {
  id: 'memory_palace_builder',
  name: 'Memory Palace Builder',
  version: '2.0.0',
  category: 'performance',
  subcategory: 'cognitive',
  
  description: 'Enhances spatial memory encoding through theta-gamma coupling and hippocampal-cortical synchronization. Optimizes method of loci technique for memory athletes and students.',
  
  evidenceGrade: 'B',
  effectSize: 0.55,
  
  citations: [
    {
      authors: ['Maguire EA', 'Valentine ER', 'Wilding JM', 'Kapur N'],
      title: 'Routes to remembering: the brains behind superior memory',
      journal: 'Nat Neurosci',
      year: 2003,
      volume: 6,
      pages: '90-95',
      doi: '10.1038/nn988',
      keyFindings: 'Memory champions show enhanced hippocampal activation during spatial memory encoding'
    },
    {
      authors: ['Colgin LL'],
      title: 'Theta-gamma coupling in the entorhinal-hippocampal system',
      journal: 'Curr Opin Neurobiol',
      year: 2015,
      volume: 31,
      pages: '45-50',
      doi: '10.1016/j.conb.2014.08.001',
      keyFindings: 'Theta-gamma phase-amplitude coupling is critical for episodic memory formation'
    },
    {
      authors: ['Dragoi G', 'Buzsáki G'],
      title: 'Temporal encoding of place sequences by hippocampal cell assemblies',
      journal: 'Neuron',
      year: 2006,
      volume: 50,
      pages: '145-157',
      doi: '10.1016/j.neuron.2006.02.023',
      keyFindings: 'Theta phase sequences encode spatial trajectories essential for memory palace construction'
    }
  ],
  
  targetStates: [
    {
      band: 'theta',
      targetHz: 6,
      hemisphere: 'bilateral',
      region: 'hippocampal',
      mechanism: 'Provides temporal framework for sequential memory encoding'
    },
    {
      band: 'gamma',
      targetHz: 40,
      hemisphere: 'bilateral',
      region: 'parietal',
      mechanism: 'Enhances visuospatial processing and object-location binding'
    }
  ],
  
  phases: [
    {
      name: 'Spatial Priming',
      duration: 420,
      description: 'Activate parietal spatial processing networks',
      layers: [
        {
          type: 'binaural',
          carrierHz: 256,
          beatHz: 10,
          amplitudeDb: -15,
          purpose: 'Alpha for relaxed visualization state'
        },
        {
          type: 'isochronic',
          carrierHz: 432,
          pulseHz: 10,
          amplitudeDb: -18,
          purpose: 'Stabilize visual imagery capacity'
        }
      ]
    },
    {
      name: 'Encoding Enhancement',
      duration: 900,
      description: 'Optimize theta-gamma coupling for memory palace construction',
      layers: [
        {
          type: 'binaural',
          carrierHz: 220,
          beatHz: 6,
          amplitudeDb: -12,
          purpose: 'Theta for sequential spatial encoding'
        },
        {
          type: 'monaural',
          carrierHz: 320,
          beatHz: 40,
          amplitudeDb: -15,
          purpose: 'Gamma for object-location binding'
        },
        {
          type: 'isochronic',
          carrierHz: 528,
          pulseHz: 6,
          amplitudeDb: -18,
          purpose: 'Theta reinforcement for hippocampal activation'
        }
      ]
    },
    {
      name: 'Consolidation',
      duration: 480,
      description: 'Stabilize encoded spatial memories',
      layers: [
        {
          type: 'binaural',
          carrierHz: 200,
          beatHz: 8,
          amplitudeDb: -12,
          purpose: 'Alpha-theta transition for memory consolidation'
        },
        {
          type: 'isochronic',
          carrierHz: 396,
          pulseHz: 8,
          amplitudeDb: -18,
          purpose: 'Consolidation support'
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
      warningText: 'Contains gamma-range visual stimulation. Screen for photosensitivity.'
    },
    soundPressure: {
      maxDb: 70,
      warningDb: 65,
      recommendedDb: 55,
      measurement: 'Low-moderate volume sufficient for entrainment.'
    },
    contraindications: [
      'Photosensitive epilepsy',
      'Active psychosis with visual hallucinations',
      'Severe spatial processing disorders'
    ],
    interactions: []
  },
  
  measurements: {
    primary: [
      {
        name: 'Memory Palace Capacity',
        unit: 'items encoded',
        method: 'Method of loci task with 20-50 item list',
        baseline: '3-session average',
        schedule: 'Weekly',
        successCriteria: '≥40% increase in items accurately recalled'
      },
      {
        name: 'Spatial Encoding Speed',
        unit: 'seconds per location',
        method: 'Time to encode item-location pairs',
        baseline: '3-session average',
        schedule: 'Every 5th session',
        successCriteria: '≥30% reduction in encoding time'
      }
    ],
    secondary: [
      {
        name: 'Retrieval Accuracy',
        unit: 'percentage correct',
        method: 'Accuracy of memory palace recall after 24h delay',
        baseline: 'Pre-protocol',
        schedule: 'Weekly',
        successCriteria: '≥80% accuracy on 30+ item lists'
      },
      {
        name: 'Visualization Vividness',
        unit: 'VVIQ score',
        method: 'Vividness of Visual Imagery Questionnaire',
        baseline: 'Pre-protocol',
        schedule: 'Bi-weekly',
        successCriteria: '≥10 point improvement'
      }
    ]
  },
  
  usageProtocol: {
    recommendedSchedule: 'Daily for 4 weeks during memory palace practice, then maintenance 3x/week',
    optimalTimeOfDay: 'Before memory encoding practice. Best when alert and well-rested.',
    sessionPreparation: [
      'Have memory task prepared (list of items, target locations)',
      'Quiet environment conducive to visualization',
      'Use session immediately before practicing method of loci',
      'Eyes closed or soft focus during session'
    ],
    expectedTimeline: {
      immediate: 'Enhanced visualization clarity, easier spatial imagery',
      '1-2 weeks': 'Faster encoding speed, improved retention',
      '4 weeks': 'Significantly expanded memory palace capacity',
      '8 weeks': 'Automated spatial encoding, reduced cognitive effort'
    },
    maintenancePhase: {
      criteria: 'After 4 weeks daily use with capacity improvements',
      schedule: '3x/week or before major memory tasks',
      monitoring: 'Monthly capacity testing with 50+ item lists'
    }
  },
  
  clinicalNotes: {
    mechanismSummary: 'Memory palaces depend on hippocampal spatial mapping systems. Theta oscillations provide timing structure for sequential encoding, while gamma binds objects to locations. This protocol optimizes theta-gamma coupling observed in memory champions.',
    
    bestRespondersProfile: [
      'Students learning method of loci technique',
      'Memory athletes training for competitions',
      'Individuals with good baseline visualization ability',
      'Motivated learners willing to practice memory techniques alongside protocol'
    ],
    
    integrationWithCare: [
      'Essential to combine with actual memory palace practice',
      'Excellent adjunct to memory training courses',
      'Can accelerate skill acquisition in educational settings',
      'Useful for professional memorizers (actors, speakers, medical students)'
    ],
    
    troubleshooting: [
      {
        issue: 'Difficulty with visualization',
        solution: 'Start with simpler 5-10 item lists. Practice basic visualization exercises separately. Consider extending Spatial Priming phase.'
      },
      {
        issue: 'No improvement in encoding speed',
        solution: 'Ensure using protocol immediately before practice. Verify consistent technique use. May need 6-8 weeks for skill consolidation.'
      }
    ]
  },
  
  version_history: [
    { version: '2.0.0', date: '2025-02-16', changes: 'Updated schema, enhanced gamma coupling phase' },
    { version: '1.0.0', date: '2024-07-15', changes: 'Initial release' }
  ],
  
  status: 'active',
  tags: ['memory', 'spatial', 'learning', 'cognitive', 'hippocampus', 'evidence_based'],
  requiresSafetyGates: true
};

export default memoryPalaceBuilder;
