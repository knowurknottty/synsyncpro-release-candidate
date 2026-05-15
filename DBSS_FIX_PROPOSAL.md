# DBSS (Dual-Frequency Brain Stimulation) Fix

## Current Problem (Line ~575 in AudioEngine.ts)

```typescript
// Current broken implementation:
const dbssMod = (dbss.primary + dbss.secondary) / 2;  // ❌ Just averages!
const beatFreq = this.validateBeatFrequency(dbssMod, 'DBSS modulation');
```

**What's wrong:** This just creates a single beat frequency that's the average of primary and secondary. No actual dual-frequency modulation happens.

## What DBSS Should Do

DBSS should create **two independent beat frequencies** that target different neural pathways:
- **Primary frequency:** Targets thalamic-cortical loops (consciousness/arousal)
- **Secondary frequency:** Targets specific regions (hippocampus, prefrontal, etc.)

The two frequencies should **modulate each other** (Amplitude Modulation) to create complex interference patterns that penetrate deeper into brain tissue.

## Proposed Fix

### Option 1: True AM Modulation (Recommended)

```typescript
private applyDBSSTargeting(phase: Phase): { 
  primary: number; 
  secondary: number;
  amDepth: number;
} | null {
  if (!phase.dbssFrequency) return null;

  const { primary, secondary, targetRegion, modulationDepth = 0.3 } = phase.dbssFrequency;
  
  console.log(`Applying DBSS targeting: ${targetRegion}`, { primary, secondary });
  
  // Validate both frequencies
  const validPrimary = this.validateBeatFrequency(primary, `DBSS primary (${targetRegion})`);
  const validSecondary = this.validateBeatFrequency(secondary, `DBSS secondary (${targetRegion})`);
  
  return { 
    primary: validPrimary, 
    secondary: validSecondary,
    amDepth: modulationDepth 
  };
}
```

Then in `startPhase()`:

```typescript
const dbss = this.applyDBSSTargeting(phase);
if (dbss) {
  // DBSS mode: dual-frequency with AM modulation
  leftCarrier = this.validateCarrierFrequency(phase.carrier);
  rightCarrier = leftCarrier;

  // Create AM-modulated beat: primary carrier + secondary envelope
  const beatFreq = dbss.primary;
  const modFreq = dbss.secondary;
  const modDepth = dbss.amDepth;

  this.modulatableNodes = this.buildDBSSNodes(
    phase,
    leftCarrier,
    rightCarrier,
    beatFreq,
    modFreq,
    modDepth
  );
}
```

### New Method: buildDBSSNodes()

```typescript
private buildDBSSNodes(
  phase: Phase,
  leftCarrier: number,
  rightCarrier: number,
  beatFreq: number,
  modFreq: number,
  modDepth: number
): EntrainmentNodes {
  const nodes = this.buildEntrainmentNodes(
    phase,
    leftCarrier,
    rightCarrier,
    beatFreq
  );

  if (!nodes.rightOsc) return nodes;

  // Create AM modulation oscillator
  const modOsc = this.ctx!.createOscillator();
  const modGain = this.ctx!.createGain();
  
  modOsc.frequency.value = modFreq;
  
  // AM depth: 0 = no modulation, 1 = full modulation
  modGain.gain.value = modDepth;
  
  // Connect: modOsc -> modGain -> rightOsc.frequency
  modOsc.connect(modGain);
  modGain.connect(nodes.rightOsc.frequency);
  
  modOsc.start();
  
  // Store for cleanup
  nodes.dbssModOsc = modOsc;
  nodes.dbssModGain = modGain;

  return nodes;
}
```

### Updated Type Definition

```typescript
// In types.ts, add to EntrainmentNodes:
interface EntrainmentNodes {
  // ... existing fields ...
  dbssModOsc?: OscillatorNode;
  dbssModGain?: GainNode;
}
```

## Alternative: Simpler Fix (If AM is too complex)

Just use the **primary frequency** as the main beat, and document that secondary is for future expansion:

```typescript
const dbss = this.applyDBSSTargeting(phase);
if (dbss) {
  // Use primary frequency as the beat
  const beatFreq = dbss.primary;
  
  // Log that secondary is reserved for future AM implementation
  console.log(`DBSS: Using primary=${dbss.primary}Hz, secondary=${dbss.secondary}Hz reserved for AM`);
  
  this.modulatableNodes = this.buildEntrainmentNodes(
    phase,
    leftCarrier,
    rightCarrier,
    beatFreq
  );
}
```

## Marketing Implications

**Current claim:** "Deep Brain Stimulation Synchronization for targeting specific neuroanatomical regions"

**Honest claim options:**
1. **With AM fix:** "Dual-frequency modulation targeting multiple neural pathways simultaneously"
2. **Without fix:** "Multi-frequency protocol support (advanced modulation coming)"

## Recommendation

1. **Short-term:** Implement the simpler fix (use primary, document secondary as reserved)
2. **Medium-term:** Implement true AM modulation with `buildDBSSNodes()`
3. **Update marketing:** Soften DBSS claims until full implementation

## Files to Modify

1. `services/AudioEngine.ts`:
   - Update `applyDBSSTargeting()` to return modulation depth
   - Add `buildDBSSNodes()` method
   - Update `startPhase()` DBSS branch
   - Update cleanup in `stopCurrentPhase()`

2. `src/types/audio.ts`:
   - Add `dbssModOsc` and `dbssModGain` to EntrainmentNodes
   - Add `modulationDepth` to DBSSFrequencySpec

3. `services/__tests__/AudioEngine.test.ts`:
   - Add tests for DBSS mode
   - Verify AM modulation creates expected frequency components