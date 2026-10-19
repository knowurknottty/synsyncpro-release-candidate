import { describe, expect, it } from 'vitest';
import { clampMasterGain, MAX_MASTER_GAIN } from '../safetyLimits.ts';

describe('normalized master-gain policy', () => {
  it('never permits a gain above 0.7', () => {
    expect(MAX_MASTER_GAIN).toBe(0.7);
    expect(clampMasterGain(0.5)).toBe(0.5);
    expect(clampMasterGain(1)).toBe(0.7);
    expect(clampMasterGain(Infinity)).toBe(0);
    expect(clampMasterGain(-Infinity)).toBe(0);
    expect(clampMasterGain(NaN)).toBe(0);
    expect(clampMasterGain(-10)).toBe(0);
  });
});
