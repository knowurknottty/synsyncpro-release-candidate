import { describe, expect, it } from 'vitest';
import { PROTOCOL_EVIDENCE_REGISTRY } from '../protocol-evidence-registry.ts';

function entry(id: string) {
  const result = PROTOCOL_EVIDENCE_REGISTRY.find((candidate) => candidate.protocolId === id);
  if (!result) throw new Error('Missing evidence spec: ' + id);
  return result;
}

describe('public evidence citation integrity', () => {
  it('does not transfer Marshall electrical-stimulation percentages into sleep audio claims', () => {
    const sleep = entry('deep_sleep_delta');
    const marshall = sleep.sources.find((source) => source.doiOrUrl?.includes('nature05278'));
    const fan = sleep.sources.find((source) => source.doiOrUrl?.includes('76059-9'));
    expect(marshall?.note).toMatch(/electrical/i);
    expect(fan?.citation).toContain('Fan, Z.');
    expect(fan?.note).toMatch(/no significant entrainment/i);
    expect(sleep.effectSizeEstimates).toBeUndefined();
    expect(sleep.evidenceGrade).not.toBe('A');
  });

  it('never labels preliminary single-child EEG neurofeedback as an audio RCT', () => {
    const focus = entry('focus_v5_professional');
    const lubar = focus.sources.find((source) => source.citation.includes('Lubar'));
    expect(lubar?.type).not.toBe('RCT');
    expect(lubar?.note).toMatch(/single-child/i);
    expect(focus.effectSizeEstimates).toBeUndefined();
  });

  it('attributes the 84-study integrative review to its actual authors', () => {
    for (const id of ['deep_sleep_delta', 'anxiety_relief_v4']) {
      const review = entry(id).sources.find((source) => source.doiOrUrl?.includes('09682-x'));
      expect(review?.citation).toContain('Cidral-Filho');
      expect(review?.type).toBe('IntegrativeReview');
    }
  });
});
