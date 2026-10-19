# Scientific evaluation and claims-validation protocol

**Audience:** research collaborators, evidence reviewers and product owners. **Status:** recommended study design; **no study was conducted by this documentation mission**.

## A reproducible claim must define the intervention

Capture: source commit and protocol ID; normalized phase parameters and timing; digital render file/hash; actual transducer and fit; amplifier/system gain; ear-level exposure; context; expected audible beats and confounding noise/spatialization. A screenshot of a protocol card or an output frequency label is not sufficient.

## Evidence grading that does not blur modalities

1. **Implementation proof:** code and tests show an intended audio waveform can be generated.
2. **Signal proof:** independent capture confirms audio spectral/timing/acoustic properties across devices.
3. **Physiological response:** controlled EEG or other objectively measured response with appropriate stimulus/sham comparators.
4. **Behavioral/subjective response:** blinded validated outcome measures and a pre-registered analysis.
5. **Clinical benefit:** suitably powered, ethically reviewed trials for specified populations and endpoints; regulatory status where relevant.

These layers are **not interchangeable**. Do not take a percentage from an EEG neurofeedback study and label it the predicted change from auditory entrainment. Distinguish a frequency-following response from a therapeutic effect.

## Targeted primary-literature audit — examples confirmed 2026-10-19

The source registry is not safe to treat as an independently checked clinical bibliography. A **limited four-entry spot-check** found:

- [Marshall et al., *Nature* (2006)](https://www.nature.com/articles/nature05278) studied **transcranial electrical slow-oscillation stimulation**, not binaural auditory beats. Matching nominal frequency alone cannot transfer the study's memory or sleep outcome.
- [Fan and colleagues, *Scientific Reports* (2024)](https://www.nature.com/articles/s41598-024-76059-9), DOI 10.1038/s41598-024-76059-9, is attributed in the registry to “Rimmele et al.” It reported a limited daytime-nap sleep-stage latency finding with 0.25-Hz binaural beats, but not significant evidence of EEG entrainment at that frequency.
- [Lubar & Shouse, 1976 (PMID 990355)](https://pubmed.ncbi.nlm.nih.gov/990355/) documents preliminary **single-child EEG neurofeedback**, not a randomized trial of audio; any reported ADHD effects are not an estimate for SynSync's sound.
- The [84-study integrative review (PMID 39699823)](https://pubmed.ncbi.nlm.nih.gov/39699823/), DOI 10.1007/s10484-024-09682-x, is credited to **Cidral-Filho, Porter and Donatello**, not the “Jirakittayakorn & Wongsawat” authors assigned to the 84-study review in the registry.

These are **specific citation/interpretation corrections**, not an exhaustive review or disproof of all auditory entrainment effects. See [source audit](REPOSITORY_AUDIT_2026-10-19.md) for severity, code references and remediation guidance. The data registry itself was not modified.

## Proposed validation ladder

- **A. DSP bench:** verify signal frequencies, modulation depths, phase changes, ramp transients, noise spectra, peak/RMS/loudness and clipping using repeatable offline renders.
- **B. Device bench:** measure listening-level variability, stereo channel separation, background audio interruptions, cache/version consistency and PWA behavior.
- **C. Feasibility pilot:** document informed consent, inclusion/exclusion, adverse events, usability, response heterogeneity and dropouts. Feedback is not causal efficacy evidence.
- **D. Controlled study:** preregister target outcome, stimuli, sham, randomization, blinding where feasible, sample-size justification, multiple-testing plan, responder definition and intention-to-treat strategy.
- **E. Independent replication:** share a lawful reproducible subset, negative results, protocol revisions and uncertainty, not only positive testimonials.

## Data rights and participant safety

Use explicit, granular consent. Minimize collection, avoid exporting identifiable health records by default, document researcher access and withdrawal limits, and specify emergency and stopping procedures. No automatic research participation should be inferred from installing or playing a protocol.

## Claims review worksheet

| Field | Required evidence |
| --- | --- |
| Claim sentence | precise outcome and population |
| Intervention equivalence | exact acoustic stimulus and delivery, not merely nominal frequency |
| Comparator | sham, baseline, music, quiet, neurofeedback, electrical stimulation etc. |
| Study strength | RCT/cohort/mechanistic/qualitative and bias analysis |
| Replication | independent positive/null/conflicting studies |
| Safety | adverse events and contraindications |
| Bound wording | “designed for” versus “may support” versus proven outcome |
| Release scope | candidate version and device setup |

**Source to reassess first:** `src/specs/protocol-evidence-registry.ts`. Cross-check original peer-reviewed papers before adopting its effect-size or mechanism descriptions.
