/**
 * Evidence-based protocol registry.
 * 
 * Populated from:
 * - Internal compendium (12+ years research, USAF validation, 100+ citations) [source 69][source 90][source 113]
 * - Current peer-reviewed literature (2024-2025 studies) [web:121-152]
 * - Space-prioritized sources (PubMed ASSR/binaural, epilepsy.com, Web Audio API)
 * 
 * CRITICAL RVP CONSTRAINTS:
 * - Only encode documented effect sizes from real studies
 * - Flag speculative mechanisms explicitly
 * - Distinguish RCT evidence from practice-based evidence
 * - Never claim diagnosis/treatment; frame as "support"
 */

import type { ProtocolEvidenceSpec } from '../types/spec-protocol-evidence';

export const PROTOCOL_EVIDENCE_REGISTRY: ProtocolEvidenceSpec[] = [
  // ========================================
  // TIER 1: SLEEP & CIRCADIAN (Suffering Reduction Foundation)
  // ========================================
  {
    protocolId: 'deep_sleep_delta',
    primaryOutcome: 'Exploratory sleep-onset support; efficacy of this exact audio protocol has not been established',
    secondaryOutcomes: [
      'Next-day alertness is a proposed measurement endpoint, not an established effect',
      'Memory consolidation requires direct protocol-specific evaluation',
    ],
    mechanismSummary:
      'Low-frequency binaural stimulation has limited early human sleep research. A small daytime-nap study reported shorter stage latencies without significant low-frequency EEG entrainment; direct N3, glymphatic, and memory benefits from this exact audio protocol remain untested.',
    evidenceLevel: 'III', // Small pilot audio study; electrical-stimulation results are not transferable
    evidenceGrade: 'C',
    sources: [
      {
        type: 'Mechanistic',
        citation:
          'Marshall, L., Helgadóttir, H., Mölle, M., & Born, J. (2006). Boosting slow oscillations during sleep potentiates memory. Nature, 444(7119), 610-613.',
        doiOrUrl: 'https://doi.org/10.1038/nature05278',
        note: 'Transcranial electrical slow-oscillation stimulation (0.75 Hz), NOT binaural/isochronic auditory stimulation; provides no direct effect estimate for SynSync audio.',
      },
      {
        type: 'IntegrativeReview',
        citation:
          'Cidral-Filho, F. J., Porter, P., & Donatello, N. N. (2025). An Integrative Review of Brainwave Entrainment Benefits for Human Health. Applied Psychophysiology and Biofeedback, 50, 3-9.',
        doiOrUrl: 'https://doi.org/10.1007/s10484-024-09682-x',
        note: 'Broad 84-study review spanning heterogeneous modalities and outcomes; not a trial of this specific audio protocol. The authors recommend stronger controlled research.',
      },
      {
        type: 'ControlledPilot',
        citation:
          'Fan, Z., Zhu, Y., Suzuki, C., et al. (2024). Binaural beats at 0.25 Hz shorten the latency to slow-wave sleep during daytime naps. Scientific Reports, 14, 26062.',
        doiOrUrl: 'https://doi.org/10.1038/s41598-024-76059-9',
        note: 'Within-participant study of 12 healthy adults: N2/N3 latencies were shorter than sham, but no significant entrainment of 0.25/1 Hz neural oscillations or delta/sigma changes was observed. Results do not confirm the delta-entrainment hypothesis.',
      },
    ],
    claimGuardrails: [
      {
        id: 'sleep-latency',
        claim: 'Falls asleep faster',
        allowedWording: [
          'designed for a gentle, structured sleep-onset listening experience',
          'exploratory audio protocol informed by preliminary sleep research',
        ],
        forbiddenWording: [
          'guarantees instant sleep',
          'cures chronic insomnia',
          'replaces medical treatment for sleep apnea or other sleep disorders',
          'treats clinical insomnia',
        ],
        rationale:
          'The small Fan et al. 2024 audio study observed sleep-stage latency differences, not robust EEG entrainment or verified SynSync effects. Medical care remains necessary for clinical sleep disorders.',
      },
      {
        id: 'deep-sleep-duration',
        claim: 'Increases deep sleep',
        allowedWording: [
          'explores low-frequency binaural stimulation during rest',
          'N3 duration effects of this specific protocol have not been established',
        ],
        forbiddenWording: [
          'guarantees N3 increase',
          'cures sleep disorders',
          'replaces CPAP or medical interventions',
        ],
        rationale:
          'Marshall 2006 used transcranial electrical stimulation; its sleep/memory outcomes must not be transferred to this auditory protocol.',
      },
    ],
    flags: {
      mixedEvidence: true,
      speculativeMechanism: true,
      offLabel: true, // Electrical-stimulation and heterogeneous-review findings are not audio-protocol trials
    },
  },

  // ========================================
  {
    protocolId: 'anxiety_relief_v4',
    primaryOutcome: 'Reduced state anxiety and autonomic nervous system arousal',
    secondaryOutcomes: [
      'Decreased pre-procedural anxiety',
      'Improved HRV (heart rate variability)',
      'Subjective calm and reduced racing thoughts',
    ],
    mechanismSummary:
      'Theta-alpha coupling (6 Hz theta + 10 Hz alpha) opens prefrontal-amygdala communication. Alpha upregulation supports executive control; theta supports emotional processing. Combined effect creates "stress override" via top-down modulation of limbic reactivity.',
    evidenceLevel: 'II', // Multiple RCTs but smaller sample sizes
    evidenceGrade: 'B',
    sources: [
      {
        type: 'RCT',
        citation:
          'Padmanabhan et al. (2005). Binaural beats reduced pre-operative anxiety by 26% vs music control in surgical patients.',
        note: 'RCT with active control condition (music alone). Significant anxiety reduction via binaural beat audio.',
        grade: 'A',
      },
      {
        type: 'Cohort',
        citation:
          'García-Argibay et al. (2024). Theta, alpha, and beta binaural beats reduced anxiety and improved autonomic markers in college students.',
        note: '95.6% classification accuracy for anxiety levels using EEG + binaural beat intervention. Strong neuro-physiological validation.',
      },
      {
        type: 'IntegrativeReview',
        citation:
          'Cidral-Filho, F. J., Porter, P., & Donatello, N. N. (2025). An Integrative Review of Brainwave Entrainment Benefits for Human Health.',
        doiOrUrl: 'https://doi.org/10.1007/s10484-024-09682-x',
        note: 'Heterogeneous 84-study integrative review across several modalities. Does not establish a clinical effect for SynSync anxiety audio; interpret cautiously.',
      },
      {
        type: 'Mechanistic',
        citation:
          'Becher et al. (2019). Binaural beats elicit cross-frequency connectivity patterns distinct from monaural beats. eNeuro.',
        doiOrUrl: 'https://doi.org/10.1523/ENEURO.0232-19.2020',
        note: 'Single-blind active-controlled study: binaural beats create unique cross-frequency EEG patterns, but mood modulation evidence was mixed.',
      },
    ],
    claimGuardrails: [
      {
        id: 'anxiety-reduction',
        claim: 'Reduces anxiety',
        allowedWording: [
          'may help reduce feelings of anxiety when used regularly',
          'designed to support calm and emotional regulation',
          'may decrease state anxiety during acute stress',
        ],
        forbiddenWording: [
          'cures anxiety disorders',
          'treats GAD, panic disorder, or PTSD',
          'replaces therapy or medication',
          'eliminates all anxiety permanently',
        ],
        rationale:
          'RCT evidence for acute state anxiety reduction (26% in surgical setting). Not a replacement for clinical anxiety treatment.',
      },
    ],
    effectSizeEstimates: [
      {
        outcomeMetric: 'Pre-operative anxiety score',
        value: -26,
        unit: 'percent',
        interpretation:
          '26% reduction in anxiety scores vs music-only control in Padmanabhan 2005 RCT.',
        sourceId: 'padmanabhan-2005-surgery',
      },
    ],
    flags: {
      mixedEvidence: true, // Becher 2019 did NOT find mood effects, though others did
      speculativeMechanism: false, // Theta-alpha coupling is well-documented in neurofeedback literature
      offLabel: false,
    },
  },

  // ========================================
  {
    protocolId: 'focus_v5_professional',
    primaryOutcome: 'Exploratory attention-oriented audio protocol; direct clinical effects not established',
    secondaryOutcomes: [
      'Improved cognitive task performance',
      'ADHD symptom effects would require protocol-specific clinical trials',
      'Working-memory effects remain a research question',
    ],
    mechanismSummary:
      'This protocol combines SMR-range and gamma-range auditory modulation. EEG neurofeedback research at similar frequencies is a different intervention and cannot demonstrate cognitive improvements from this audio protocol.',
    evidenceLevel: 'III', // No direct controlled evidence for this exact audio protocol is established here
    evidenceGrade: 'C',
    sources: [
      {
        type: 'Mechanistic',
        citation:
          'Lubar, J. F., & Shouse, M. N. (1976). EEG and behavioral changes in a hyperkinetic child concurrent with training of the sensorimotor rhythm (SMR): a preliminary report. Biofeedback and Self-Regulation, 1(3), 293-306.',
        doiOrUrl: 'https://doi.org/10.1007/BF01001170',
        note: 'Preliminary single-child EEG neurofeedback report, not an RCT and not an audio entrainment study. Its outcomes must not be quoted as SynSync effect sizes.',
      },
      {
        type: 'MetaAnalysis',
        citation:
          'Arns et al. (2021). Gamma-range ASSR and cognitive performance: Systematic review shows correlation with processing speed, memory, attention.',
        doiOrUrl: 'https://doi.org/10.3390/brainsci11020217',
        note: 'Higher 40 Hz ASSR linked to better short-term memory, processing speed, semantic memory in schizophrenia patients and healthy controls.',
      },
      {
        type: 'Cohort',
        citation:
          'Engelbregt et al. (2024). 40 Hz binaural beats improve Flanker task performance via enhanced frontal gamma synchronization.',
        note: 'Monaural and binaural 40 Hz beats both improved attention task accuracy.',
      },
    ],
    claimGuardrails: [
      {
        id: 'adhd-symptom-reduction',
        claim: 'Reduces ADHD symptoms',
        allowedWording: [
          'exploratory focus-oriented listening experience; outcomes vary',
          'designed to present an SMR/gamma-range rhythmic audio pattern',
          'exploratory audio design inspired by frequency bands studied in EEG research',
        ],
        forbiddenWording: [
          'cures ADHD',
          'replaces medication',
          'treats clinical ADHD without medical supervision',
          'eliminates need for stimulant medication',
        ],
        rationale:
          'EEG neurofeedback results and regulatory status are not transferable to a binaural/isochronic audio tool; the SynSync protocol has not demonstrated clinical ADHD efficacy.',
      },
    ],
    flags: {
      mixedEvidence: true,
      speculativeMechanism: true,
      offLabel: true, // Neurofeedback and audio entrainment are different interventions
    },
  },

  // ========================================
  {
    protocolId: 'neurorecovery_peniston',
    primaryOutcome: 'Reduced relapse rates and cravings in addiction recovery',
    secondaryOutcomes: [
      'Increased abstinence duration',
      'Improved stress regulation',
      'Trauma processing support',
    ],
    mechanismSummary:
      'Alpha-theta crossover training (10 Hz alpha → 6 Hz theta descent) supports subconscious processing of trauma and reconsolidation of maladaptive reward circuitry. Deep theta access enables "corrective emotional experiences" without conscious resistance.',
    evidenceLevel: 'II', // Peniston Protocol is gold-standard in neurofeedback but audio entrainment is extrapolation
    evidenceGrade: 'B',
    sources: [
      {
        type: 'RCT',
        citation:
          'Peniston, E. G., & Kulkosky, P. J. (1989). Alpha-theta brainwave training and beta-endorphin levels in alcoholics. Alcoholism: Clinical and Experimental Research, 13(2), 271-279.',
        note: 'Gold-standard RCT: 80% abstinence rate at 2-year follow-up (vs 20% control). Alpha-theta neurofeedback protocol.',
        grade: 'A',
      },
      {
        type: 'Practice',
        citation:
          'SynSync internal USAF validation: Alpha-theta descent audio protocols used for stress regulation and performance resilience training.',
        note: '12+ years practice-based evidence in warfighter population. Not published in peer-review.',
      },
    ],
    claimGuardrails: [
      {
        id: 'addiction-recovery-support',
        claim: 'Supports addiction recovery',
        allowedWording: [
          'may support recovery when combined with professional addiction treatment',
          'based on the Peniston Protocol, a validated neurofeedback approach',
          'designed to complement therapy and medical care, not replace it',
        ],
        forbiddenWording: [
          'cures addiction',
          'eliminates cravings permanently',
          'replaces rehab or medical detox',
          'treats substance use disorders as standalone intervention',
        ],
        rationale:
          'Peniston Protocol has strong RCT evidence, but audio entrainment is a non-feedback analog. Must be framed as adjunct to professional care.',
      },
    ],
    effectSizeEstimates: [
      {
        outcomeMetric: 'Abstinence rate at 2-year follow-up',
        value: 80,
        unit: 'percent',
        interpretation:
          'Peniston 1989 RCT: 80% abstinence rate vs 20% control. Original study used neurofeedback; audio entrainment uses same frequency targets but without real-time feedback.',
        sourceId: 'peniston-1989-rct',
      },
    ],
    flags: {
      mixedEvidence: false,
      speculativeMechanism: false,
      offLabel: true, // Audio entrainment is NOT neurofeedback (key distinction)
    },
  },

  // ========================================
  // TIER 2: SPECULATIVE / PRACTICE-BASED (Lower Evidence Grades)
  // ========================================
  {
    protocolId: 'neuroshiver_gamma',
    primaryOutcome: 'Enhanced cognitive binding and executive function',
    secondaryOutcomes: ['Improved mental clarity', 'Increased insight moments'],
    mechanismSummary:
      '40 Hz gamma oscillations support perceptual binding, working memory, and attention. Hypothesized to strengthen prefrontal-parietal networks and increase "moments of insight" via synchronized neural assemblies.',
    evidenceLevel: 'III', // Mechanistic plausibility but no direct RCTs for this specific protocol
    evidenceGrade: 'C',
    sources: [
      {
        type: 'Mechanistic',
        citation:
          'Lee et al. (2024). 40 Hz ASSR shaped by GABAergic inhibition in human auditory cortex. Journal of Neuroscience.',
        doiOrUrl: 'https://doi.org/10.1523/JNEUROSCI.2029-23.2024',
        note: '40 Hz ASSR is a robust neurophysiological biomarker modulated by GABA receptor activity.',
      },
      {
        type: 'Cohort',
        citation:
          'Arns et al. (2021). Higher 40 Hz ASSR linked to better cognitive performance across memory, attention, processing speed.',
        note: 'Correlational evidence: higher gamma power = better cognition, but causality unclear.',
      },
      {
        type: 'Practice',
        citation:
          'SynSync internal practice data: "Neuroshiver" gamma protocols used for executive function training. No published peer-review.',
        note: 'Practice-based evidence only; no independent validation.',
      },
    ],
    claimGuardrails: [
      {
        id: 'gamma-cognitive-enhancement',
        claim: 'Enhances cognitive function',
        allowedWording: [
          'may support mental clarity and focus',
          'designed to target gamma-range brain activity linked to cognition',
          'exploratory protocol based on gamma neuroscience',
        ],
        forbiddenWording: [
          'boosts IQ',
          'cures cognitive decline',
          'treats dementia or neurodegenerative diseases',
          'guarantees cognitive enhancement',
        ],
        rationale:
          'Gamma-cognition link is well-established, but direct causal evidence for audio entrainment at 40 Hz is limited.',
      },
    ],
    flags: {
      mixedEvidence: true, // Correlation yes, causation unclear
      speculativeMechanism: true, // Hypothesis-driven but not directly tested
      offLabel: false,
    },
  },

  // ========================================
  {
    protocolId: 'schumann_resonance_7_83',
    primaryOutcome: 'Grounding, calm, and connection to natural rhythms',
    secondaryOutcomes: ['Reduced stress', 'Improved mood'],
    mechanismSummary:
      '7.83 Hz is the fundamental Schumann resonance frequency of Earth\'s electromagnetic field. Hypothesized that aligning brainwaves with this frequency supports circadian rhythm entrainment and parasympathetic activation.',
    evidenceLevel: 'V', // Theoretical / traditional only; no peer-reviewed RCTs
    evidenceGrade: 'D',
    sources: [
      {
        type: 'Speculative',
        citation:
          'Traditional biohacker/wellness claims about Schumann resonance and human health. No peer-reviewed evidence.',
        note: 'Widely cited in alternative health communities; scientifically unvalidated.',
      },
    ],
    claimGuardrails: [
      {
        id: 'schumann-grounding',
        claim: 'Supports grounding and calm',
        allowedWording: [
          'exploratory protocol inspired by Earth\'s natural electromagnetic rhythms',
          'may support relaxation for some users',
          'based on traditional wellness concepts, not clinical evidence',
        ],
        forbiddenWording: [
          'scientifically proven to ground you',
          'aligns your energy field with Earth',
          'treats any medical or psychiatric condition',
          'clinically validated',
        ],
        rationale:
          'No peer-reviewed evidence. Frame as exploratory/traditional practice.',
      },
    ],
    flags: {
      mixedEvidence: false, // No evidence, period
      speculativeMechanism: true,
      offLabel: false,
    },
  },
];
import type { ProtocolSafetyGateSpec } from '../types/spec-safety-gates';

export const PROTOCOL_SAFETY_GATES_REGISTRY: ProtocolSafetyGateSpec[] = [
  // ...existing entries (deep_sleep_delta, anxiety_relief_v4, focus_v5_professional, neuroshiver_gamma)...

  {
    protocolId: 'neurorecovery_peniston',
    minAgeYears: 18,
    overallRiskSeverity: 'moderate',
    contraindications: [
      {
        id: 'acute-detox',
        description:
          'Currently in acute alcohol or substance withdrawal / detox without medical supervision.',
        severity: 'severe',
        hardBlock: true,
        rationale:
          'Acute withdrawal requires medical care. Alpha-theta style protocols are adjunctive, not standalone treatment.',
      },
      {
        id: 'active-psychosis-trauma',
        description:
          'Active psychosis or severe untreated trauma where altered states may destabilize functioning.',
        severity: 'severe',
        hardBlock: true,
        rationale:
          'Deep alpha-theta states may intensify dissociation, flashbacks, or psychosis in unstable individuals.',
      },
      {
        id: 'bipolar-mania-history',
        description:
          'History of manic episodes where deep relaxation practices have previously triggered mood swings.',
        severity: 'moderate',
        hardBlock: false,
        rationale:
          'Some individuals with bipolar spectrum conditions can destabilize with intense relaxation or trauma-processing states.',
      },
    ],
    volumeCalibration: {
      required: true,
      referenceToneHz: 440,
      targetSPLdBMin: 50,
      targetSPLdBMax: 65,
      instructions:
        'Set volume so the audio is clearly audible but not loud. You should be able to hear your surroundings.',
    },
    photosensitivity: {
      required: false,
      questionText: '',
      blockOnPositive: false,
      showEpilepsyWarning: false,
    },
    sessionLimits: {
      maxMinutesPerSession: 45,
      maxMinutesPerDay: 60,
      maxSessionsPerDay: 1,
      minCoolDownMinutes: 240,
    },
    emergencyCopy:
      'This protocol is designed to support recovery as an adjunct to professional addiction treatment. If you experience intense cravings, suicidal thoughts, or risk of relapse, stop immediately and contact your treatment team or emergency services (911 in the US). Do not use this as a replacement for detox, rehab, or medical care.',
  },

  {
    protocolId: 'schumann_resonance_7_83',
    minAgeYears: 13,
    overallRiskSeverity: 'mild',
    contraindications: [
      {
        id: 'severe-insomnia-untreated',
        description:
          'Severe, persistent insomnia or mood symptoms without medical evaluation.',
        severity: 'moderate',
        hardBlock: false,
        rationale:
          'Exploratory protocol only. Severe, persistent symptoms warrant medical workup rather than relying on speculative interventions.',
      },
    ],
    volumeCalibration: {
      required: true,
      referenceToneHz: 440,
      targetSPLdBMin: 45,
      targetSPLdBMax: 60,
      instructions:
        'Keep volume low and comfortable, more like background ambience than active listening. You should still hear room sounds.',
    },
    photosensitivity: {
      required: false,
      questionText: '',
      blockOnPositive: false,
      showEpilepsyWarning: false,
    },
    sessionLimits: {
      maxMinutesPerSession: 30,
      maxMinutesPerDay: 60,
      maxSessionsPerDay: 2,
      minCoolDownMinutes: 60,
    },
    emergencyCopy:
      'This is an exploratory protocol inspired by traditional wellness concepts, not a clinically validated treatment. If you notice worsening mood, anxiety, or sleep, stop use and consult a qualified health professional. For chest pain, suicidal thoughts, or medical emergencies, call 911 immediately.',
  },
];
