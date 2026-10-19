import { describe, expect, it } from 'vitest';
import { PROTOCOLS } from '../constants.ts';
import { FRANKENCAPT_RELEASE_MODULES } from '../../frankencapt/publicRelease.ts';

const expectedLevels: Record<string, string> = {
  neuro_analgesia: 'III',
  deep_sleep_delta: 'III',
  focus_v5_professional: 'III',
  anxiety_relief_v4: 'III',
  mood_elevator_v4: 'V',
};

describe('public proof module metadata integrity', () => {
  it('preserves exact phase durations and public canonical protocol IDs', () => {
    expect(FRANKENCAPT_RELEASE_MODULES).toHaveLength(5);
    for (const item of FRANKENCAPT_RELEASE_MODULES) {
      const p = PROTOCOLS[item.protocolId];
      expect(p, item.protocolId).toBeDefined();
      const phaseTotal = p.phases.reduce((sum, phase) => sum + phase.duration, 0);
      expect(phaseTotal, item.protocolId + ' phase total').toBe(p.duration);
    }
  });

  it('does not expose unsupported clinical outcome percentages as public promises', () => {
    for (const item of FRANKENCAPT_RELEASE_MODULES) {
      const p = PROTOCOLS[item.protocolId];
      const copy = [p.description, p.usageGoal, p.algoDesc, p.researchContext].join(' ');
      expect(copy, p.id).not.toMatch(/(?:\d+\s*(?:-|–)\s*\d+\s*%|\d+\s*%\s*(?:improvement|reduction)|equivalent to benzodiazepines)/i);
      expect(copy, p.id).not.toMatch(/(?:clinically proven|guaranteed relief|direct dopamine reward activation)/i);
    }
  });

  it('records conservative evidence metadata and seizure cautions for each public module', () => {
    for (const item of FRANKENCAPT_RELEASE_MODULES) {
      const p = PROTOCOLS[item.protocolId];
      expect(p.evidenceLevel).toBe(expectedLevels[item.protocolId]);
      expect(p.contraindications?.join(' ')).toMatch(/seizure|epilepsy/i);
    }
    for (const item of FRANKENCAPT_RELEASE_MODULES) {
      const p = PROTOCOLS[item.protocolId];
      expect(p.evidenceGrade).toBe(item.protocolId === 'mood_elevator_v4' ? 'D' : 'C');
      expect(p.contraindicationsSeverity).toBe('severe');
    }
    expect(PROTOCOLS.mood_elevator_v4.category).toBe('speculative');
  });
});
