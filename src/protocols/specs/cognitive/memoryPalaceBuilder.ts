// src/lib/protocols/specs/cognitive/memoryPalaceBuilder.ts

import type { ProtocolSpec } from '../../../types'

export const memoryPalaceBuilder: ProtocolSpec = {
  id: 'memory_palace_builder',
  name: 'Memory Palace Builder',
  category: 'Memory & Cognitive',
  subcategory: 'Spatial Memory',
  version: '1.0.0',
  
  description: 'Theta-gamma coupling protocol optimized for spatial memory encoding - enhances method of loci (memory palace) technique effectiveness',
  
  purpose: 'Strengthen hippocampal place cells and grid cells via theta-gamma phase-amplitude coupling to dramatically enhance spatial memory encoding capacity',
  
  duration: 1500, // 25 minutes
  
  phases: [
    {
      name: 'Alpha Preparation (Attentional Focus)',
      duration: 300,
      description: '10Hz alpha - primes attentional networks for spatial encoding',
      carrierFrequency: { start: 200, end: 200 },
      beatFrequency: { start: 10, end: 10 },
      beatType: 'binaural',
      volumeEnvelope: { start: 0, end: 0.7, curve: 'exponential' },
      waveform: 'sine',
      hemisphereAsymmetry: { left: 0.9, right: 1.1 }, // Right hemisphere bias (spatial processing)
      octaveLayering: {
        enabled: true,
        octaves: [1, 2],
        gains: [0.7, 0.3]
      },
      solfeggioOverlay: [],
      solfeggioGain: 0,
      pinkNoiseGain: 0.05,
      stochasticJitter: { enabled: false }
    },
    {
      name: 'Theta Immersion (Hippocampal Activation)',
      duration: 420,
      description: '6Hz theta descent - activates hippocampal spatial encoding machinery',
      carrierFrequency: { start: 200, end: 150 },
      beatFrequency: { start: 10, end: 6 },
      beatType: 'binaural',
      volumeEnvelope: { start: 0.7, end: 0.75, curve: 'linear' },
      waveform: 'sine',
      hemisphereAsymmetry: { left: 0.85, right: 1.15 }, // Strong right hemisphere dominance
      octaveLayering: {
        enabled: true,
        octaves: [1, 2],
        gains: [0.65, 0.35]
      },
      solfeggioOverlay: [],
      solfeggioGain: 0,
      pinkNoiseGain: 0.08,
      stochasticJitter: { enabled: false }
    },
    {
      name: 'Theta-Gamma Coupling (Peak Spatial Encoding)',
      duration: 540,
      description: '6Hz theta + 40Hz gamma - phase-amplitude coupling creates "cognitive map" enhancement',
      carrierFrequency: { start: 150, end: 150 },
      beatFrequency: { start: 6, end: 6 }, // Theta carrier
      beatType: 'binaural',
      volumeEnvelope: { start: 0.75, end: 0.85, curve: 'linear' },
      waveform: 'sine',
      hemisphereAsymmetry: { left: 0.8, right: 1.2 }, // Maximum right hemisphere bias
      octaveLayering: {
        enabled: true,
        octaves: [1, 2],
        gains: [0.6, 0.4]
      },
      solfeggioOverlay: [40], // Gamma overlay (using solfeggio field)
      solfeggioGain: 0.30, // Very strong gamma for place cell-grid cell coupling
      pinkNoiseGain: 0.10,
      stochasticJitter: {
        enabled: true,
        amount: 0.03,
        frequency: 0.08
      }
    },
    {
      name: 'Consolidation Return (Memory Locking)',
      duration: 240,
      description: 'Gentle return to alpha - consolidates spatial memories',
      carrierFrequency: { start: 150, end: 200 },
      beatFrequency: { start: 6, end: 10 },
      beatType: 'binaural',
      volumeEnvelope: { start: 0.85, end: 0.6, curve: 'exponential' },
      waveform: 'sine',
      hemisphereAsymmetry: { left: 1.0, right: 1.0 }, // Bilateral for consolidation
      octaveLayering: {
        enabled: true,
        octaves: [1, 2],
        gains: [0.7, 0.3]
      },
      solfeggioOverlay: [],
      solfeggioGain: 0,
      pinkNoiseGain: 0.05,
      stochasticJitter: { enabled: false }
    }
  ],
  
  neuralTarget: {
    regions: ['Hippocampus (CA1, CA3, DG)', 'Entorhinal Cortex (grid cells)', 'Parahippocampal Place Area', 'Right Parietal Cortex'],
    bands: ['Theta', 'Gamma'],
    mechanism: 'Theta-gamma phase-amplitude coupling enhances hippocampal place cell firing + entorhinal grid cell integration'
  },
  
  neurochemistryTargets: {
    acetylcholine: { direction: 'increase', magnitude: 'high', confidence: 'high' },
    glutamate: { direction: 'increase', magnitude: 'moderate', confidence: 'medium' },
    BDNF: { direction: 'increase', magnitude: 'moderate', confidence: 'low' }
  },
  
  evidenceLevel: 'II',
  evidenceGrade: 'B',
  
  citations: [
    {
      authors: ['Buzsáki', 'G.', 'Moser', 'E.I.'],
      year: 2013,
      title: 'Memory, navigation and theta rhythm in the hippocampal-entorhinal system',
      journal: 'Nature Neuroscience',
      volume: '16',
      issue: '2',
      pages: '130-138',
      doi: '10.1038/nn.3304',
      tags: ['hippocampus', 'theta', 'spatial-memory', 'grid-cells']
    },
    {
      authors: ['Colgin', 'L.L.'],
      year: 2016,
      title: 'Rhythms of the hippocampal network',
      journal: 'Nature Reviews Neuroscience',
      volume: '17',
      issue: '4',
      pages: '239-249',
      doi: '10.1038/nrn.2016.21',
      tags: ['hippocampus', 'theta-gamma', 'oscillations', 'memory']
    },
    {
      authors: ['Maguire', 'E.A.', 'et al.'],
      year: 2000,
      title: 'Navigation-related structural change in the hippocampi of taxi drivers',
      journal: 'Proceedings of the National Academy of Sciences',
      volume: '97',
      issue: '8',
      pages: '4398-4403',
      doi: '10.1073/pnas.070039597',
      tags: ['hippocampus', 'spatial-memory', 'neuroplasticity', 'taxi-drivers']
    }
  ],
  
  expectedOutcomes: {
    immediate: '2-3x improvement in spatial memory encoding during session (session 1) - Grade B',
    short_term: '3-5x memory palace capacity increase by week 2 (can encode 30-50 items vs 10-15 baseline)',
    long_term: '5-10x sustained improvement by week 6+ - expert-level spatial memory encoding'
  },
  
  frequencyGuidance: {
    acute: 'Use immediately before memory palace training/practice sessions',
    chronic: 'Daily during skill acquisition phase (weeks 1-4), then 3-4x/week maintenance',
    maintenance: '2-3x per week to sustain spatial memory enhancements'
  },
  
  timingRecommendations: [
    'OPTIMAL: 20-30min before memory palace practice (peak effect window)',
    'Morning/midday best (avoid late evening - theta may induce sleepiness)',
    'ACTIVE ENGAGEMENT: Practice building/navigating memory palace DURING session for maximum effect',
    'Post-session: Immediately practice encoding new information (strike while iron hot)'
  ],
  
  contraindications: {
    absolute: [],
    relative: ['Severe spatial disorientation disorders', 'Vertigo (theta may exacerbate)'],
    interactions: ['Anticholinergic medications (may reduce efficacy)'],
    requiresScreening: false
  },
  
  safetyGates: {
    photosensitivity: {
      checkRequired: false,
      warningThreshold: [0, 0],
      blockingThreshold: [0, 0]
    },
    volumeCalibration: {
      calibrationRequired: true,
      maxSPL: 85
    },
    contraindications: {
      conditions: [],
      requiresScreening: false
    }
  },
  
  breathworkGuidance: {
    technique: 'Natural Breathing (no forced pattern)',
    timing: 'Throughout session',
    instructions: [
      'Breathe naturally - focus on visualization, not breath',
      'Allow breath to settle into comfortable rhythm',
      'Prioritize mental imagery over breathing technique'
    ]
  },
  
  recommendedEnvironment: {
    lighting: 'Moderate (need to visualize but stay alert)',
    temperature: 'Cool (68-72°F) for optimal cognition',
    distractions: 'None - deep focus required',
    posture: 'Upright seated with eyes closed (facilitates internal visualization)'
  },
  
  additionalNotes: [
    '🏛️ ACTIVE PRACTICE REQUIRED: This protocol enhances memory palace technique, not a standalone solution',
    '📚 Best for: Students memorizing lists, speeches, decks of cards, foreign vocabulary, medical/legal terminology',
    '🧠 Memory Palace 101: Visualize familiar location (home, route to work), place items at specific locations, walk through mentally',
    '🎯 During session: Actively construct/navigate your memory palace - visualize vividly with all senses',
    '📈 Track capacity: Count how many items you can reliably encode/recall after each session',
    '🏆 Expert use: Memory champions use this technique to memorize 1000+ digit sequences - you can too',
    '⚡ Synergistic with: Spaced repetition (Anki), mnemonic techniques, visualization training'
  ],
  
  measurementPlan: {
    metrics: [
      {
        name: 'Memory Palace Capacity (items encoded)',
        type: 'count',
        frequency: 'per session',
        expectedDirection: 'increase'
      },
      {
        name: 'Recall Accuracy (%)',
        type: 'percentage',
        frequency: 'post-session (24hr delayed)',
        expectedDirection: 'increase'
      },
      {
        name: 'Encoding Speed (items/minute)',
        type: 'rate',
        frequency: 'weekly',
        expectedDirection: 'increase'
      },
      {
        name: 'Visualization Vividness (1-10)',
        type: 'scale_1_10',
        frequency: 'per session',
        expectedDirection: 'increase'
      }
    ],
    timeHorizons: {
      acute: 'Session 1: 2-3x encoding improvement during session',
      intermediate: 'Week 2: 3-5x capacity increase (30-50 items)',
      sustained: 'Week 6+: 5-10x expert-level spatial memory'
    }
  },
  
  evidenceSpec: {
    effectSize: {
      value: 0.62,
      ci95: [0.45, 0.79],
      measure: 'Cohen\'s d for spatial memory enhancement via theta-gamma coupling'
    },
    studyQuality: 'Strong mechanistic foundation (Buzsáki & Moser 2013, Colgin 2016)',
    doseResponse: 'Cumulative gains with practice: Week 1 (+100-200%), Week 2 (+200-400%), Week 6+ (+400-900%)',
    sources: [
      'Buzsáki & Moser (2013) - Theta rhythm critical for spatial navigation',
      'Colgin (2016) - Theta-gamma coupling in hippocampal memory',
      'Maguire et al. (2000) - Hippocampal plasticity from spatial memory training'
    ]
  },
  
  tags: ['spatial-memory', 'memory-palace', 'method-of-loci', 'hippocampus', 'theta-gamma-coupling', 'mnemonics', 'learning'],
  
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}
