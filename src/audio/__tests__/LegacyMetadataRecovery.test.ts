import { describe, expect, it } from 'vitest';
import { PROTOCOLS } from '../constants.ts';
import { adaptAllSpecs } from '../specAdapter.ts';
import { ALL_SPECS } from '../../protocols/specs/index.ts';
import { LEGACY_PROTOCOL_METADATA, getLegacyProtocolMetadata } from '../legacyProtocolMetadata.ts';
import { validateProtocols } from '../../../services/validateProtocols.ts';

describe('legacy cross-platform metadata restoration', () => {
  it('reconciles all 101 active IDs with the 2026-06-11 frozen snapshot', () => {
    expect(Object.keys(PROTOCOLS).sort()).toEqual(Object.keys(LEGACY_PROTOCOL_METADATA).sort());
  });

  it('preserves curated five-module overrides and flags the other 96 historical classifications', () => {
    const reviewed = Object.values(PROTOCOLS).filter(p => p.metadataProvenance === 'reviewed-current');
    const restored = Object.values(PROTOCOLS).filter(p => p.metadataProvenance === 'legacy-restored-unverified');
    expect(reviewed).toHaveLength(5);
    expect(restored).toHaveLength(96);
    for (const p of restored) {
      const legacy = getLegacyProtocolMetadata(p.id);
      expect(legacy).toBeDefined();
      expect(p.evidenceLevel).toBe(legacy?.evidenceLevel);
      expect(p.evidenceGrade).toBe(legacy?.evidenceGrade);
      expect(p.contraindicationsSeverity).toBeDefined();
      expect(p.contraindications?.length).toBeGreaterThan(0);
    }
  });

  it('removes actual missing-field errors but retains 96 provenance-review advisories', () => {
    const issues = validateProtocols(PROTOCOLS);
    expect(issues.filter(i => i.code === 'MISSING_EVIDENCE_METADATA')).toHaveLength(0);
    expect(issues.filter(i => i.code === 'MISSING_SAFETY_METADATA')).toHaveLength(0);
    expect(issues.filter(i => i.code === 'UNVERIFIED_LEGACY_METADATA')).toHaveLength(96);
  });

  it('does not classify empty precaution lists as affirmatively safe', () => {
    const orig = ALL_SPECS.find(spec => spec.id === 'stereo_verify_test');
    if (!orig) throw new Error('Missing stereo verification source spec');
    const testSpec = { ...orig, contraindications: { absolute: [], relative: [] } };
    const converted = adaptAllSpecs([testSpec])[orig.id];
    expect(converted.contraindications).toContain(
      'Protocol-specific contraindications have not been fully reviewed; standard safety screening applies.',
    );
  });

  it('does not import a grade from a different evidence level or a missing ID', () => {
    const orig = ALL_SPECS.find(spec => spec.id === 'stereo_verify_test');
    if (!orig) throw new Error('Missing source spec');
    const changed = { ...orig, evidenceLevel: 'V' as const };
    const unmatched = { ...orig, id: 'new-protocol-not-in-legacy-snapshot' };
    const adapted = adaptAllSpecs([changed, unmatched]);
    expect(adapted[changed.id].evidenceGrade).toBeUndefined();
    expect(adapted[changed.id].metadataProvenance).toBe('missing');
    expect(adapted[unmatched.id].metadataProvenance).toBe('missing');
    expect(adapted[unmatched.id].evidenceGrade).toBeUndefined();
  });
});
