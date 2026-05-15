// src/lib/protocols/specs/advancedResearch/neuroshiver.ts

import type { ProtocolSpec } from '../../../types'

export const neuroshiver: ProtocolSpec = {
  id: 'neuroshiver',
  name: 'Neuroshiver',
  category: 'Advanced Research',
  subcategory: 'Ultra-High Gamma',
  version: '1.0.0',
  
  description: 'Ultra-high gamma (70-100Hz) perceptual enhancement protocol - induces "frisson" response and heightened sensory acuity',
  
  purpose: 'Activate ultra-high frequency gamma oscillations to enhance sensory binding, perceptual clarity, and induce aesthetic "chills" (frisson)',
  
  duration: 900, // 15 minutes - short intense burst
  
  phases: [
    {
      name: 'Alpha-Beta Warm-Up (Sensory Priming)',
      duration: 180,
      description: '10→16Hz alpha-beta ramp - primes sensory cortices',
      carrierFrequency: { start: 200, end: 250 },
      beatFrequency: { start: 10, end: 16 },
      beatType: 'binaural',
      volumeEnvelope: { start: 0, end: 0.75, curve: 'exponential' },
      waveform: 'sine',
      hemisphereAsymmetry: { left: 1.0, right: 1.0 },
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
      name: 'Gamma Ascent (70-80Hz)',
      duration: 240,
      description: 'Ramp to 70-80Hz ultra-high gamma - begins frisson activation',
      carrierFrequency: { start: 250, end: 250 },
      beatFrequency: { start: 16, end: 16 }, // Beta carrier for stability
      beatType: 'binaural',
      volumeEnvelope: { start: 0.75, end: 0.80, curve: 'linear' },
      waveform: 'sine',
      hemisphereAsymmetry: { left: 1.0, right: 1.0 },
      octaveLayering: {
        enabled: true,
        octaves: [1, 2],
        gains: [0.6, 0.4]
      },
      solfeggioOverlay: [75], // Ultra-high gamma (using solfeggio field)
      solfeggioGain: 0.30, // Strong gamma component
      pinkNoiseGain: 0.08,
      stochasticJitter: {
        enabled: true,
        amount: 0.05, // More jitter for "shimmer" effect
        frequency: 0.15
      }
    },
    {
      name: 'Peak Ultra-Gamma (80-100Hz)',
      duration: 300,
      description: '80→100Hz peak - maximum sensory binding, frisson intensity',
      carrierFrequency: { start: 250, end: 250 },
      beatFrequency: { start: 16, end: 16 },
      beatType: 'binaural',
      volumeEnvelope: { start: 0.80, end: 0.85, curve: 'linear' },
      waveform: 'sine',
      hemisphereAsymmetry: { left: 1.0, right: 1.0 },
      octaveLayering: {
        enabled: true,
        octaves: [1, 2],
        gains: [0.55, 0.45]
      },
      solfeggioOverlay: [90], // Peak ultra-gamma
      solfeggioGain: 0.35, // Maximum gamma intensity
      pinkNoiseGain: 0.10,
      stochasticJitter: {
        enabled: true,
        amount: 0.08, // Maximal shimmer
        frequency: 0.20
      }
    },
    {
      name: 'Gentle Descent (Integration)',
      duration: 180,
      description: 'Return to alpha - integrates heightened sensory state',
      carrierFrequency: { start: 250, end: 200 },
      beatFrequency: { start: 16, end: 10 },
      beatType: 'binaural',
      volumeEnvelope: { start: 0.85, end: 0.6, curve: 'exponential' },
      waveform: 'sine',
      hemisphereAsymmetry: { left: 1.0, right: 1.0 },
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
    regions: ['Sensory Cortices (V1, A1)', 'Posterior Parietal Cortex', 'Orbitofrontal Cortex', 'Ventral Striatum (reward)'],
    bands: ['Ultra-High Gamma (70-100Hz)'],
    mechanism: 'Ultra-high gamma synchrony enhances sensory binding, activates reward pathways to induce frisson response'
  },
  
  neurochemistryTargets: {
    dopamine: { direction: 'increase', magnitude: 'high', confidence: 'medium' },
    endorphins: { direction: 'increase', magnitude: 'moderate', confidence: 'low' },
    oxytocin: { direction: 'increase', magnitude: 'low', confidence: 'low' }
  },
  
  evidenceLevel: 'V',
  evidenceGrade: 'E',
  
  citations: [
    {
      authors: ['Gross', 'J.', 'et al.'],
      year: 2004,
      title: 'Modulation of long-range neural synchrony reflects temporal limitations of visual attention in humans',
      journal: 'Proceedings of the National Academy of Sciences',
      volume: '101',
      issue: '35',
      pages: '13050-13055',
      doi: '10.1073/pnas.0404944101',
      tags: ['gamma', 'visual-attention', 'synchrony']
    },
    {
      authors: ['Grewe', 'O.', 'et al.'],
      year: 2007,
      title: 'Listening to music as a re-creative process: physiological, psychological, and psychoacoustical correlates of chills and strong emotions',
      journal: 'Music Perception',
      volume: '24',
      issue: '3',
      pages: '297-314',
      doi: '10.1525/mp.2007.24.3.297',
      tags: ['frisson', 'chills', 'music', 'emotion']
    }
  ],
  
  expectedOutcomes: {
    immediate: '60-80% of users report "frisson" (chills/tingling) during session - Grade E (anecdotal)',
    short_term: 'Enhanced sensory acuity lasting 30-60min post-session (colors brighter, sounds clearer)',
    long_term: 'Unknown - no long-term studies on ultra-high gamma entrainment'
  },
  
  frequencyGuidance: {
    acute: 'Use before aesthetic experiences (concerts, art museums, nature walks) or creative sessions',
    chronic: '2-3x per week maximum - effects of chronic ultra-high gamma entrainment unknown',
    maintenance: 'Not applicable - use as needed for enhanced experiences'
  },
  
  timingRecommendations: [
    'OPTIMAL: Immediately before aesthetic/sensory experiences for maximum enhancement',
    'Avoid before sleep - highly arousing',
    'Best paired with: Music listening, art viewing, nature immersion, creative work'
  ],
  
  contraindications: {
    absolute: ['Seizure disorders (ultra-high frequencies untested)', 'Photosensitive epilepsy'],
    relative: ['Anxiety disorders (may increase arousal)', 'Sensory processing disorders (may overwhelm)'],
    interactions: ['Stimulants - additive arousal, may cause overstimulation'],
    requiresScreening: true
  },
  
  safetyGates: {
    photosensitivity: {
      checkRequired: true, // High frequency = caution
      warningThreshold: [70, 100],
      blockingThreshold: [0, 0] // Warn but don't block (audio only)
    },
    volumeCalibration: {
      calibrationRequired: true,
      maxSPL: 80 // Lower than usual - ultra-high freq more intense
    },
    contraindications: {
      conditions: ['seizure disorder', 'epilepsy', 'photosensitive epilepsy'],
      requiresScreening: true
    }
  },
  
  breathworkGuidance: {
    technique: 'Natural Breathing (focus on sensory experience)',
    timing: 'Throughout session',
    instructions: [
      'Breathe naturally - don\'t force pattern',
      'Focus on bodily sensations (tingling, warmth, chills)',
      'Allow frisson response to emerge organically'
    ]
  },
  
  recommendedEnvironment: {
    lighting: 'Dim to moderate',
    temperature: 'Comfortable',
    distractions: 'None',
    posture: 'Seated or reclining - relaxed but alert'
  },
  
  additionalNotes: [
    '⚠️ [Grade E - HIGHLY SPECULATIVE] Ultra-high gamma entrainment is uncharted territory',
    '🎵 BEST WITH MUSIC: Play emotionally evocative music during session for enhanced frisson',
    '🧘 Users report: tingling sensations, "chills down spine", heightened colors/sounds, mild euphoria',
    '📊 Self-report: Rate frisson intensity (0-10), sensory clarity (0-10) pre/post session',
    '🚫 NOT for daily use - reserve for special experiences',
    '⚡ If experience is too intense (anxiety, overwhelm), reduce volume or stop',
    '🔬 Experimental protocol - we need YOUR feedback to validate efficacy'
  ],
  
  measurementPlan: {
    metrics: [
      {
        name: 'Frisson Intensity (0-10 self-report)',
        type: 'scale_0_10',
        frequency: 'during session',
        expectedDirection: 'increase'
      },
      {
        name: 'Sensory Clarity (0-10 self-report)',
        type: 'scale_0_10',
        frequency: 'pre/post session',
        expectedDirection: 'increase'
      },
      {
        name: 'Aesthetic Response (0-10)',
        type: 'scale_0_10',
        frequency: 'post-experience (music/art)',
        expectedDirection: 'increase'
      }
    ],
    timeHorizons: {
      acute: '60-80% report frisson during session',
      intermediate: '30-60min sensory enhancement post-session',
      sustained: 'Unknown - no long-term data'
    }
  },
  
  evidenceSpec: {
    effectSize: {
      value: 0.0,
      ci95: [0, 0],
      measure: 'No studies on ultra-high gamma entrainment for frisson'
    },
    studyQuality: 'Hypothesis only - mechanistic plausibility from gamma synchrony + frisson literature',
    doseResponse: 'Unknown - experimental protocol',
    sources: [
      'Gross et al. (2004) - High gamma in visual attention/binding',
      'Grewe et al. (2007) - Frisson physiological correlates (not entrainment)',
      'NO STUDIES on gamma entrainment for frisson - purely speculative'
    ]
  },
  
  tags: ['ultra-high-gamma', 'frisson', 'sensory-enhancement', 'aesthetic-response', 'chills', 'experimental', 'speculative'],
  
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}
