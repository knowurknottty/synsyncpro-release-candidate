// src/audio/spec-sleep-consciousness.ts
// Raw protocol definitions for Sleep & Recovery + Consciousness Expansion.

import { SOLFEGGIO, SCHUMANN_BASE, SCHUMANN_HARMONICS } from '../../types';

export const SLEEP_SPECS = {
  deep_sleep_delta: {
    id: 'deep_sleep_delta',
    title: 'Deep Sleep Delta Protocol',
    description: 'Clinical-Grade Sleep Induction',
    evidenceLevel: 'I',
    citation: 'Zhou et al. (2022), NIH Sleep Studies (2024)',
    category: 'evidence',
    section: 'Sleep & Recovery',
    duration: 5400,
    contraindications: ['Sleep apnea (consult physician)'],
    algoDesc:
      '3Hz delta binaural beats with 0.25Hz infraslow modulation to shorten sleep latency and extend N3 deep sleep stage by 40%.',
    usageGoal:
      'Fall asleep 50% faster, increase deep sleep (N3) duration, wake feeling restored. Clinical studies show significant improvement in sleep quality.',
    researchContext:
      '3Hz delta beats increase N3 duration and shorten N3 latency with strong negative correlation (r=-0.59). 0.25Hz beats entrain slow-wave oscillations.',
    phases: [
      {
        duration: 1200,
        startBeat: 8,
        endBeat: 3,
        carrier: 250,
        progressionCurve: 'sigmoid',
        noise: 'pink',
        noiseMix: 0.25,
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.8 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.5 },
        },
        overlays: [SOLFEGGIO.MI],
        overlayMix: 0.1,
      },
      {
        duration: 3000,
        beat: 3,
        carrier: 250,
        dbssFrequency: {
          primary: 3,
          secondary: 0.25,
          targetRegion: 'thalamus',
        },
        noise: 'brown',
        noiseMix: 0.35,
        spatialMotion: 'breathe',
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: true, dutyCycle: 0.3 },
          monaural: { enabled: true, strength: 0.7 },
        },
        harmonicStacking: true,
        progressionCurve: 'linear',
      },
      {
        duration: 1200,
        beat: 0.25,
        carrier: 200,
        noise: 'brown',
        noiseMix: 0.4,
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.6 },
          isochronic: { enabled: true, dutyCycle: 0.2 },
          monaural: { enabled: false, strength: 0 },
        },
        overlays: [SCHUMANN_BASE],
        overlayMix: 0.15,
      },
    ],
    breathwork: {
      name: '4-7-8 Sleep',
      ratio: [4, 7, 8, 0],
      description: "Dr. Weil's sleep breathing technique.",
    },
    mantra: {
      phonetic: 'I AM PEACEFUL SLEEP',
      meaning: 'Deep rest intention.',
      repeatInterval: 30,
    },
    evidenceGrade: 'A',
    mechanismOfAction:
      '3Hz delta entrainment increases N3 sleep duration, enhances sleep spindles, reduces sleep latency by 40-50%.',
    contraindicationsSeverity: 'mild',
    expectedOnset: 8,
    cumulativeEffect: true,
    requiredSessions: 7,
    optimalTimeOfDay: 'evening',
  },

  nap_optimizer_20min: {
    id: 'nap_optimizer_20min',
    title: '20-Minute Power Nap',
    description: 'Cognitive Refresh & Energy Boost',
    evidenceLevel: 'II',
    citation: 'NASA Nap Studies (1995), Mednick et al. (2013)',
    category: 'evidence',
    section: 'Sleep & Recovery',
    duration: 1200,
    contraindications: ['Heavy machinery operation immediately after use'],
    algoDesc:
      'Alpha-theta bridge (8-5Hz) for light sleep without deep sleep inertia. NASA research shows 20-minute naps boost performance by 34%.',
    usageGoal:
      'Quick mental refresh, improved alertness, enhanced memory consolidation without grogginess.',
    researchContext:
      '20-minute naps in theta-alpha border prevent sleep inertia while providing cognitive restoration. Longer naps risk deep sleep entry.',
    phases: [
      {
        duration: 300,
        startBeat: 10,
        endBeat: 7,
        carrier: 340,
        progressionCurve: 'exponential',
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.9 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.6 },
        },
      },
      {
        duration: 600,
        beat: 5,
        carrier: 250,
        noise: 'pink',
        noiseMix: 0.2,
        overlays: [SCHUMANN_BASE],
        overlayMix: 0.15,
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.8 },
        },
      },
      {
        duration: 300,
        startBeat: 5,
        endBeat: 10,
        carrier: 340,
        progressionCurve: 'sigmoid',
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.8 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.5 },
        },
      },
    ],
    breathwork: {
      name: 'Natural',
      ratio: [4, 4, 4, 4],
      description: 'Let breathing naturally slow.',
    },
    mantra: {
      phonetic: 'REFRESH',
      meaning: 'Quick restoration.',
      repeatInterval: 60,
    },
    evidenceGrade: 'B',
    mechanismOfAction:
      'Theta-alpha bridge provides cognitive restoration without deep sleep entry, preventing grogginess.',
    expectedOnset: 3,
    optimalTimeOfDay: 'afternoon',
  },

  rem_sleep_enhancer: {
    id: 'rem_sleep_enhancer',
    title: 'REM Sleep Enhancement',
    description: 'Dream Consolidation & Emotional Processing',
    evidenceLevel: 'II',
    citation: 'Walker (2017), REM Research Collective',
    category: 'evidence',
    section: 'Sleep & Recovery',
    duration: 5400,
    contraindications: ['REM sleep behavior disorder'],
    algoDesc:
      '4-7Hz theta oscillations with 40Hz gamma micro-bursts to enhance REM duration and dream recall.',
    usageGoal:
      'Increase REM sleep duration by 25%, enhance dream vividness, improve emotional memory consolidation.',
    researchContext:
      'Theta-gamma coupling during REM enhances hippocampal replay and emotional memory processing. Critical for learning consolidation.',
    phases: [
      {
        duration: 1800,
        startBeat: 7,
        endBeat: 4,
        carrier: 250,
        progressionCurve: 'sigmoid',
        noise: 'pink',
        noiseMix: 0.25,
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.9 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.6 },
        },
      },
      {
        duration: 2400,
        beat: 5,
        carrier: 250,
        dbssFrequency: {
          primary: 5,
          secondary: 40,
          targetRegion: 'hippocampus',
        },
        overlays: [40],
        overlayMix: 0.05,
        spatialMotion: 'random',
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.8 },
          isochronic: { enabled: true, dutyCycle: 0.3 },
          monaural: { enabled: false, strength: 0 },
        },
        progressionCurve: 'chaotic',
        progressionVariability: 0.2,
      },
      {
        duration: 1200,
        beat: 4,
        carrier: 250,
        noise: 'brown',
        noiseMix: 0.35,
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.7 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: false, strength: 0 },
        },
      },
    ],
    breathwork: {
      name: 'Dream Breathing',
      ratio: [4, 0, 6, 0],
      description: 'Natural sleep rhythm.',
    },
    mantra: {
      phonetic: 'I REMEMBER MY DREAMS',
      meaning: 'Dream recall intention.',
      repeatInterval: 60,
    },
    evidenceGrade: 'B',
    mechanismOfAction:
      'Theta-gamma coupling enhances REM duration, hippocampal replay, emotional memory consolidation.',
    contraindicationsSeverity: 'moderate',
    expectedOnset: 20,
    cumulativeEffect: true,
    optimalTimeOfDay: 'evening',
  },

  circadian_reset: {
    id: 'circadian_reset',
    title: 'Circadian Rhythm Reset',
    description: 'Jet Lag & Shift Work Recovery',
    evidenceLevel: 'III',
    citation: 'Czeisler et al. (1999), Circadian Research',
    category: 'research',
    section: 'Sleep & Recovery',
    duration: 3600,
    contraindications: ['Photosensitive epilepsy (if using visual aids)'],
    algoDesc:
      'Schumann Resonance base (7.83Hz) with melatonin-promoting 3Hz delta to recalibrate circadian clock.',
    usageGoal:
      'Reset sleep-wake cycle, reduce jet lag recovery time by 50%, normalize melatonin production.',
    researchContext:
      "7.83Hz Schumann frequency aligns with Earth's natural rhythm. 3Hz delta promotes melatonin secretion from pineal gland.",
    phases: [
      {
        duration: 1200,
        beat: SCHUMANN_BASE,
        carrier: 250,
        overlays: SCHUMANN_HARMONICS,
        overlayMix: 0.2,
        spatialMotion: 'rotate',
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.7 },
        },
        harmonicStacking: true,
      },
      {
        duration: 1800,
        startBeat: SCHUMANN_BASE,
        endBeat: 3,
        carrier: 250,
        progressionCurve: 'sigmoid',
        dbssFrequency: {
          primary: 3,
          secondary: SCHUMANN_BASE,
          targetRegion: 'thalamus',
        },
        noise: 'pink',
        noiseMix: 0.25,
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.9 },
          isochronic: { enabled: true, dutyCycle: 0.3 },
          monaural: { enabled: true, strength: 0.8 },
        },
      },
      {
        duration: 600,
        beat: 3,
        carrier: 250,
        noise: 'brown',
        noiseMix: 0.35,
        overlays: [SOLFEGGIO.MI],
        overlayMix: 0.15,
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.8 },
          isochronic: { enabled: true, dutyCycle: 0.25 },
          monaural: { enabled: false, strength: 0 },
        },
      },
    ],
    breathwork: {
      name: 'Circadian',
      ratio: [4, 4, 4, 4],
      description: 'Steady rhythm to reset biological clock.',
    },
    mantra: {
      phonetic: 'RESET',
      meaning: 'Biological recalibration.',
      repeatInterval: 20,
    },
    evidenceGrade: 'C',
    mechanismOfAction:
      'Schumann resonance + delta entrainment recalibrates suprachiasmatic nucleus, normalizes melatonin secretion.',
    expectedOnset: 30,
    cumulativeEffect: true,
    requiredSessions: 3,
    optimalTimeOfDay: 'evening',
  },

  sleep_maintenance: {
    id: 'sleep_maintenance',
    title: 'Sleep Maintenance Protocol',
    description: 'Prevent Middle-of-Night Awakening',
    evidenceLevel: 'III',
    citation: 'Sleep Medicine Research',
    category: 'research',
    section: 'Sleep & Recovery',
    duration: 7200,
    contraindications: ['Sleep apnea (consult physician)'],
    algoDesc:
      'Sustained 2-3Hz delta with 0.5Hz infraslow modulation to maintain deep sleep and prevent cortical arousal.',
    usageGoal:
      'Reduce nocturnal awakenings, maintain deep sleep, improve sleep continuity.',
    researchContext:
      'Infraslow oscillations (<0.5Hz) stabilize sleep architecture and prevent cortical micro-arousals that fragment sleep.',
    phases: [
      {
        duration: 3600,
        beat: 2.5,
        carrier: 200,
        dbssFrequency: {
          primary: 2.5,
          secondary: 0.5,
          targetRegion: 'thalamus',
        },
        noise: 'brown',
        noiseMix: 0.4,
        spatialMotion: 'breathe',
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.9 },
          isochronic: { enabled: true, dutyCycle: 0.25 },
          monaural: { enabled: true, strength: 0.7 },
        },
        progressionCurve: 'linear',
      },
      {
        duration: 3600,
        beat: 3,
        carrier: 200,
        noise: 'brown',
        noiseMix: 0.45,
        overlays: [SCHUMANN_BASE],
        overlayMix: 0.1,
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.8 },
          isochronic: { enabled: true, dutyCycle: 0.2 },
          monaural: { enabled: true, strength: 0.6 },
        },
      },
    ],
    breathwork: {
      name: 'Natural Sleep',
      ratio: [4, 0, 6, 0],
      description: 'Unconscious breathing during sleep.',
    },
    mantra: {
      phonetic: 'DEEP SLEEP',
      meaning: 'Continuous rest.',
      repeatInterval: 120,
    },
    evidenceGrade: 'C',
    mechanismOfAction:
      'Infraslow modulation stabilizes thalamocortical oscillations, prevents micro-arousals.',
    expectedOnset: 15,
    optimalTimeOfDay: 'evening',
  },
} as const;

export const CONSCIOUSNESS_SPECS = {
  theta_meditation_deep: {
    id: 'theta_meditation_deep',
    title: 'Theta Deep Meditation',
    description: 'Subconscious Access & Inner Vision',
    evidenceLevel: 'II',
    citation: 'Lagopoulos et al. (2009), Alpha-Theta Research',
    category: 'evidence',
    section: 'Consciousness Expansion',
    duration: 2700,
    contraindications: ['Dissociative disorders'],
    algoDesc:
      '4-7Hz theta entrainment with alpha bridge for deep meditative states, subconscious access, and hypnagogic imagery.',
    usageGoal:
      'Access deep meditative states, experience inner visions, connect with subconscious mind, enhance creativity.',
    researchContext:
      'Theta waves (4-8Hz) dominate during deep meditation, enabling subconscious access. Alpha-theta border enhances creativity and psychological integration.',
    phases: [
      {
        duration: 600,
        startBeat: 10,
        endBeat: 7,
        carrier: 340,
        progressionCurve: 'sigmoid',
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.6 },
        },
        overlays: [SOLFEGGIO.SOL],
        overlayMix: 0.15,
      },
      {
        duration: 1500,
        beat: 6,
        carrier: 250,
        dbssFrequency: {
          primary: 6,
          secondary: SCHUMANN_BASE,
          targetRegion: 'prefrontal',
        },
        spatialMotion: 'rotate',
        harmonicStacking: true,
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.8 },
        },
        overlays: [SCHUMANN_HARMONICS[0], SCHUMANN_HARMONICS[1]],
        overlayMix: 0.2,
      },
      {
        duration: 600,
        beat: 4.5,
        carrier: 250,
        noise: 'pink',
        noiseMix: 0.15,
        spatialMotion: 'breathe',
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.9 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.7 },
        },
        progressionCurve: 'linear',
      },
    ],
    breathwork: {
      name: 'Meditative',
      ratio: [4, 4, 4, 4],
      description: 'Steady, conscious breathing.',
    },
    mantra: {
      phonetic: 'OM MANI PADME HUM',
      meaning: 'The jewel in the lotus.',
      repeatInterval: 12,
    },
    evidenceGrade: 'B',
    mechanismOfAction:
      'Theta entrainment reduces prefrontal activity, enables subconscious access, enhances default mode network connectivity.',
    contraindicationsSeverity: 'moderate',
    expectedOnset: 10,
    optimalTimeOfDay: 'morning',
  },

  transcendental_gamma: {
    id: 'transcendental_gamma',
    title: 'Transcendental Gamma Meditation',
    description: 'Peak Consciousness & Unity Experience',
    evidenceLevel: 'II',
    citation: 'Lutz et al. (2004), Olympic Meditator Studies',
    category: 'evidence',
    section: 'Consciousness Expansion',
    duration: 3600,
    contraindications: ['Epilepsy', 'Severe anxiety'],
    algoDesc:
      '40Hz gamma with theta modulation (6Hz) to induce transcendental states similar to advanced meditators (12,000+ hours).',
    usageGoal:
      'Experience unity consciousness, ego dissolution, heightened awareness. Replicate brain states of Olympic-level meditators.',
    researchContext:
      'Olympic meditators (>12,000 hours) show sustained 40Hz gamma oscillations during meditation, correlating with transcendental experiences.',
    phases: [
      {
        duration: 900,
        startBeat: 10,
        endBeat: 40,
        carrier: 440,
        progressionCurve: 'exponential',
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.8 },
          isochronic: { enabled: true, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.7 },
        },
        harmonicStacking: true,
      },
      {
        duration: 1800,
        beat: 40,
        carrier: 440,
        dbssFrequency: {
          primary: 40,
          secondary: 6,
          targetRegion: 'prefrontal',
        },
        overlays: [6, 80, 120],
        overlayMix: 0.15,
        spatialMotion: 'rotate',
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: true, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.9 },
        },
        harmonicStacking: true,
        progressionCurve: 'chaotic',
        progressionVariability: 0.15,
      },
      {
        duration: 900,
        startBeat: 40,
        endBeat: 8,
        carrier: 340,
        progressionCurve: 'sigmoid',
        noise: 'white',
        noiseMix: 0.05,
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.7 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.5 },
        },
      },
    ],
    breathwork: {
      name: 'Holotropic',
      ratio: [3, 0, 3, 0],
      description: 'Fast, deep breathing for altered states.',
    },
    mantra: {
      phonetic: 'GATE GATE PARAGATE',
      meaning: 'Gone, gone, gone beyond (Heart Sutra).',
      repeatInterval: 15,
    },
    evidenceGrade: 'B',
    mechanismOfAction:
      '40Hz gamma induces large-scale neural synchronization, theta modulation enables ego dissolution, replicates advanced meditative states.',
    contraindicationsSeverity: 'severe',
    expectedOnset: 25,
    cumulativeEffect: true,
    requiredSessions: 30,
    optimalTimeOfDay: 'morning',
  },

  vipassana_theta_alpha: {
    id: 'vipassana_theta_alpha',
    title: 'Vipassana Insight Meditation',
    description: 'Mindfulness & Equanimity Training',
    evidenceLevel: 'II',
    citation: 'Cahn & Polich (2006), Vipassana Research',
    category: 'evidence',
    section: 'Consciousness Expansion',
    duration: 3600,
    contraindications: ['Severe clinical depression', 'Dissociative disorders'],
    algoDesc:
      'Alpha-theta bridge (8-6Hz) with sustained attention training patterns to cultivate insight and equanimity.',
    usageGoal:
      'Develop sustained mindfulness, cultivate equanimity, enhance present-moment awareness, reduce reactivity.',
    researchContext:
      'Vipassana meditation increases alpha and theta activity, particularly in frontal and midline regions. Associated with reduced anxiety and enhanced emotional regulation.',
    phases: [
      {
        duration: 1200,
        beat: 10,
        carrier: 340,
        overlays: [SOLFEGGIO.MI],
        overlayMix: 0.1,
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.9 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.6 },
        },
      },
      {
        duration: 1800,
        startBeat: 8,
        endBeat: 6,
        carrier: 340,
        progressionCurve: 'linear',
        dbssFrequency: {
          primary: 7,
          secondary: SCHUMANN_BASE,
          targetRegion: 'prefrontal',
        },
        spatialMotion: 'fixed',
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.8 },
        },
        harmonicStacking: true,
      },
      {
        duration: 600,
        beat: 8,
        carrier: 340,
        noise: 'pink',
        noiseMix: 0.1,
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.8 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.6 },
        },
      },
    ],
    breathwork: {
      name: 'Anapana',
      ratio: [4, 0, 4, 0],
      description: 'Awareness of natural breath.',
    },
    mantra: {
      phonetic: 'ANICCA',
      meaning: 'Impermanence (Vipassana principle).',
      repeatInterval: 20,
    },
    evidenceGrade: 'B',
    mechanismOfAction:
      'Alpha-theta entrainment enhances present-moment awareness, reduces default mode network activity, cultivates equanimity.',
    expectedOnset: 15,
    cumulativeEffect: true,
    requiredSessions: 10,
    optimalTimeOfDay: 'morning',
  },

  shamanic_theta_journey: {
    id: 'shamanic_theta_journey',
    title: 'Shamanic Theta Journey',
    description: 'Visionary States & Spirit Realm Access',
    evidenceLevel: 'IV',
    citation: 'Harner (1980), Drumming Research',
    category: 'speculative',
    section: 'Consciousness Expansion',
    duration: 2400,
    contraindications: ['Psychosis', 'Schizophrenia', 'Severe trauma'],
    algoDesc:
      '4.5Hz theta (shamanic drumming frequency) with chaotic progressions and spatial motion to induce visionary states.',
    usageGoal:
      'Access shamanic journey states, experience inner visions, communicate with archetypal imagery, explore consciousness.',
    researchContext:
      '4.5Hz corresponds to traditional shamanic drumming frequency (240 BPM ÷ 60 seconds = 4Hz). Theta states enable visionary experiences and archetypal imagery.',
    phases: [
      {
        duration: 600,
        startBeat: 10,
        endBeat: 4.5,
        carrier: 250,
        progressionCurve: 'exponential',
        noise: 'brown',
        noiseMix: 0.15,
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.9 },
          isochronic: { enabled: true, dutyCycle: 0.5 },
          monaural: { enabled: false, strength: 0 },
        },
      },
      {
        duration: 1500,
        beat: 4.5,
        carrier: 250,
        dbssFrequency: {
          primary: 4.5,
          secondary: SCHUMANN_BASE,
          targetRegion: 'prefrontal',
        },
        spatialMotion: 'random',
        overlays: [SCHUMANN_HARMONICS[0]],
        overlayMix: 0.2,
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: true, dutyCycle: 0.4 },
          monaural: { enabled: false, strength: 0 },
        },
        progressionCurve: 'chaotic',
        progressionVariability: 0.3,
      },
      {
        duration: 300,
        startBeat: 4.5,
        endBeat: 10,
        carrier: 340,
        progressionCurve: 'sigmoid',
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.7 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.5 },
        },
      },
    ],
    breathwork: {
      name: 'Shamanic',
      ratio: [3, 0, 3, 0],
      description: 'Rhythmic, repetitive breathing.',
    },
    mantra: {
      phonetic: 'HEY YA HO',
      meaning: 'Traditional journey chant.',
      repeatInterval: 10,
    },
    evidenceGrade: 'D',
    mechanismOfAction:
      '4.5Hz theta replicates shamanic drumming frequency, reduces prefrontal activity, enables visionary experiences.',
    contraindicationsSeverity: 'severe',
    expectedOnset: 15,
    optimalTimeOfDay: 'evening',
  },

  mystical_experience_protocol: {
    id: 'mystical_experience_protocol',
    title: 'Mystical Experience Protocol',
    description: 'Profound Spiritual States',
    evidenceLevel: 'IV',
    citation: 'Johns Hopkins Mystical Experience Research',
    category: 'speculative',
    section: 'Consciousness Expansion',
    duration: 4800,
    contraindications: [
      'Psychosis',
      'Schizophrenia',
      'Bipolar disorder',
      'Severe anxiety',
    ],
    algoDesc:
      'Multi-stage protocol: 8Hz alpha → 5Hz theta → 40Hz gamma burst → 0.5Hz delta. Replicates psychedelic-induced mystical states.',
    usageGoal:
      'Facilitate profound mystical experiences: unity consciousness, transcendence of time/space, ineffability, sacredness. Experimental.',
    researchContext:
      'Mystical experiences correlate with default mode network dissolution, increased entropy, theta-gamma coupling. This protocol attempts non-pharmacological induction.',
    phases: [
      {
        duration: 1200,
        startBeat: 12,
        endBeat: 8,
        carrier: 340,
        progressionCurve: 'sigmoid',
        noise: 'pink',
        noiseMix: 0.1,
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.9 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.6 },
        },
        overlays: [SOLFEGGIO.MI, SOLFEGGIO.LA],
        overlayMix: 0.2,
      },
      {
        duration: 1800,
        beat: 5,
        carrier: 250,
        dbssFrequency: {
          primary: 5,
          secondary: SCHUMANN_BASE,
          targetRegion: 'prefrontal',
        },
        spatialMotion: 'rotate',
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: false, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.8 },
        },
        harmonicStacking: true,
        progressionCurve: 'chaotic',
        progressionVariability: 0.2,
      },
      {
        duration: 1200,
        beat: 40,
        carrier: 440,
        dbssFrequency: {
          primary: 40,
          secondary: 5,
          targetRegion: 'prefrontal',
        },
        overlays: [80, 120],
        overlayMix: 0.15,
        spatialMotion: 'random',
        entrainmentMode: {
          binaural: { enabled: true, strength: 1.0 },
          isochronic: { enabled: true, dutyCycle: 0.5 },
          monaural: { enabled: true, strength: 0.9 },
        },
        harmonicStacking: true,
        progressionCurve: 'chaotic',
        progressionVariability: 0.3,
      },
      {
        duration: 600,
        startBeat: 40,
        endBeat: 0.5,
        carrier: 250,
        progressionCurve: 'exponential',
        noise: 'brown',
        noiseMix: 0.3,
        overlays: [SCHUMANN_BASE],
        overlayMix: 0.2,
        entrainmentMode: {
          binaural: { enabled: true, strength: 0.7 },
          isochronic: { enabled: true, dutyCycle: 0.2 },
          monaural: { enabled: false, strength: 0 },
        },
      },
    ],
    breathwork: {
      name: 'Holotropic',
      ratio: [3, 0, 3, 0],
      description: 'Fast, deep breathing (Grof method).',
    },
    mantra: {
      phonetic: 'TAT TVAM ASI',
      meaning: 'Thou art that (Vedic unity statement).',
      repeatInterval: 30,
    },
    evidenceGrade: 'D',
    mechanismOfAction:
      'Multi-stage protocol dissolves default mode network, induces theta-gamma coupling, creates transient hyperfrontality characteristic of mystical states.',
    contraindicationsSeverity: 'severe',
    expectedOnset: 45,
    optimalTimeOfDay: 'evening',
  },
} as const;
