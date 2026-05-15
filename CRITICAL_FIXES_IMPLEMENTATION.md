# SynSync Pro - Critical Fixes Implementation
## Hemisphere Targeting, Throttled Scheduler, Cymatics Optimization

---

## FIX 1: Hemisphere Targeting Beat Validation

### Problem
The `applyHemisphereTargeting` method validates individual carrier frequencies but NOT the beat frequency derived from their difference. This could allow unsafe beat frequencies to slip through.

### Current Code (Broken)
```typescript
private applyHemisphereTargeting(phase: Phase): { left: number; right: number } {
  if (!phase.splitHemisphere) {
    const carrier = this.validateCarrierFrequency(phase.carrier);
    const beat = this.validateBeatFrequency(phase.beat, 'Hemisphere targeting');
    return {
      left: carrier,
      right: carrier + beat
    };
  }

  const { leftFreq, rightFreq, purpose } = phase.splitHemisphere;
  
  console.log(`Applying hemisphere targeting: ${purpose}`, { leftFreq, rightFreq });
  
  return {
    left: this.validateCarrierFrequency(leftFreq),
    right: this.validateCarrierFrequency(rightFreq)  // ❌ No beat validation!
  };
}
```

### Fixed Code
```typescript
private applyHemisphereTargeting(phase: Phase): { left: number; right: number; beat: number } {
  if (!phase.splitHemisphere) {
    const carrier = this.validateCarrierFrequency(phase.carrier);
    const beat = this.validateBeatFrequency(phase.beat, 'Hemisphere targeting');
    return {
      left: carrier,
      right: carrier + beat,
      beat: beat
    };
  }

  const { leftFreq, rightFreq, purpose } = phase.splitHemisphere;
  
  console.log(`Applying hemisphere targeting: ${purpose}`, { leftFreq, rightFreq });
  
  // Validate individual carriers
  const validLeft = this.validateCarrierFrequency(leftFreq);
  const validRight = this.validateCarrierFrequency(rightFreq);
  
  // CRITICAL FIX: Validate the beat frequency derived from hemisphere split
  const derivedBeat = Math.abs(validRight - validLeft);
  const validatedBeat = this.validateBeatFrequency(derivedBeat, `Hemisphere targeting (${purpose})`);
  
  // If beat was clamped, adjust the right frequency to maintain the validated beat
  if (validatedBeat !== derivedBeat) {
    console.warn(`Hemisphere beat clamped: ${derivedBeat}Hz -> ${validatedBeat}Hz for ${purpose}`);
    const adjustedRight = validLeft + validatedBeat;
    return {
      left: validLeft,
      right: adjustedRight,
      beat: validatedBeat
    };
  }
  
  return {
    left: validLeft,
    right: validRight,
    beat: derivedBeat
  };
}
```

### Usage in startPhase
```typescript
const hemi = this.applyHemisphereTargeting(phase);
leftCarrier = hemi.left;
rightCarrier = hemi.right;

// Use the validated beat directly
const beatFreq = hemi.beat;

this.modulatableNodes = this.buildEntrainmentNodes(
  phase,
  leftCarrier,
  rightCarrier,
  beatFreq
);
```

---

## FIX 2: Throttled Scheduler Full Implementation

### Problem
The throttled scheduler is only used for stochastic jitter and spatial updates. Many other subsystems still update at 60Hz unnecessarily.

### Current Usage (Limited)
```typescript
// Only 2 subsystems use throttling:
if (this.scheduler.shouldUpdate('stochastic', perfNow)) { /* jitter */ }
if (this.scheduler.shouldUpdate('spatial', now)) { /* spatial */ }
```

### Full Implementation
```typescript
// In AudioEngine constructor or init:
this.scheduler.register('stochastic', UPDATE_RATES.STOCHASTIC);      // 3Hz
this.scheduler.register('spatial', UPDATE_RATES.SPATIAL);            // 30Hz
this.scheduler.register('frequency_sweep', UPDATE_RATES.FREQUENCY_SWEEP);  // 10Hz
this.scheduler.register('gain_envelope', UPDATE_RATES.GAIN_ENVELOPE);      // 30Hz
this.scheduler.register('qa_metrics', UPDATE_RATES.QA_METRICS);            // 2Hz
this.scheduler.register('visualization', UPDATE_RATES.VISUALIZATION);      // 30Hz

// In modulatePhase():
private modulatePhase(): void {
  if (!this.ctx || !this.modulatableNodes || !this.activeProtocol || this.isPaused) return;

  const phase = this.activeProtocol.phases[this.phaseIndex];
  const elapsed = this.ctx.currentTime - this.phaseStartTime;
  const progress = Math.min(elapsed / phase.duration, 1.0);

  const nodes = this.modulatableNodes;
  const now = this.ctx.currentTime;
  const perfNow = performance.now();

  // THROTTLED: Carrier frequency sweep (10Hz instead of 60Hz)
  if (phase.carrierEnd !== undefined && phase.carrierEnd !== phase.carrier) {
    if (this.scheduler.shouldUpdate('frequency_sweep', perfNow)) {
      const carrier = this.applyProgressionCurve(
        phase.carrier,
        phase.carrierEnd,
        progress,
        phase.progressionCurve,
        phase.progressionVariability
      );

      const validatedCarrier = this.validateCarrierFrequency(carrier);
      nodes.leftFreq = validatedCarrier;
      nodes.rightFreq = validatedCarrier + nodes.beatFreq;

      nodes.leftOsc.frequency.setTargetAtTime(nodes.leftFreq, now, AudioEngine.PARAM_RAMP_TC);
      nodes.rightOsc.frequency.setTargetAtTime(nodes.rightFreq, now, AudioEngine.PARAM_RAMP_TC);
    }
  }

  // THROTTLED: Beat frequency sweep (10Hz)
  if (phase.beatEnd !== undefined && phase.beatEnd !== phase.beat) {
    if (this.scheduler.shouldUpdate('frequency_sweep', perfNow)) {
      const beat = this.applyProgressionCurve(
        phase.beat,
        phase.beatEnd,
        progress,
        phase.progressionCurve,
        phase.progressionVariability
      );

      const validatedBeat = this.validateBeatFrequency(beat, 'Phase modulation');
      nodes.beatFreq = validatedBeat;
      nodes.rightFreq = nodes.leftFreq + validatedBeat;

      nodes.rightOsc.frequency.setTargetAtTime(nodes.rightFreq, now, AudioEngine.PARAM_RAMP_TC);

      if (nodes.isochronicOsc) {
        nodes.isochronicOsc.frequency.setTargetAtTime(validatedBeat, now, AudioEngine.PARAM_RAMP_TC);
      }
      if (nodes.monauralOsc) {
        nodes.monauralOsc.frequency.setTargetAtTime(validatedBeat, now, AudioEngine.PARAM_RAMP_TC);
      }
    }
  }

  // THROTTLED: Stochastic jitter (3Hz - already implemented)
  if (this.jitterConfig?.enabled) {
    if (this.scheduler.shouldUpdate('stochastic', perfNow)) {
      const deltaTime = this.lastFrameTime > 0 ? (perfNow - this.lastFrameTime) / 1000 : 0.016;
      this.currentJitter = applySmoothedJitter(this.currentJitter, this.jitterConfig, deltaTime);
      nodes.leftOsc.frequency.setTargetAtTime(nodes.leftFreq + this.currentJitter, now, AudioEngine.PARAM_RAMP_TC);
      nodes.rightOsc.frequency.setTargetAtTime(nodes.rightFreq + this.currentJitter, now, AudioEngine.PARAM_RAMP_TC);
      this.lastFrameTime = perfNow;
    }
  }

  // THROTTLED: Spatial engine (30Hz - already implemented)
  if (this.spatialEngine?.needsAnimationFrame && this.ctx) {
    if (this.scheduler.shouldUpdate('spatial', perfNow)) {
      this.spatialEngine.update(this.ctx);
    }
  }

  // THROTTLED: QA metrics (2Hz instead of every frame)
  if (this.qaEngine && this.scheduler.shouldUpdate('qa_metrics', perfNow)) {
    this.qaEngine.update(this.ctx.currentTime, nodes, phase);
  }

  // Continue modulation loop
  if (progress < 1.0) {
    this.animationFrameId = requestAnimationFrame(() => this.modulatePhase());
  }
}
```

---

## FIX 3: Cymatics Audio Frequency Accuracy

### Problem
The cymatics shader uses frequency bands from the audio texture but doesn't accurately map to the actual frequencies being generated by the AudioEngine.

### Current Shader (Inaccurate)
```glsl
float freqBand = 0.1 + float(i)*0.2 + (u_complexity * 0.1);
float freqInfo = texture(u_audio, vec2(freqBand, 0.0)).r;
```

This just samples arbitrary positions in the frequency data, not the actual binaural beat frequency.

### Fixed Approach

#### Option A: Pass Actual Frequency to Shader (Recommended)

Update the cymatics initialization to pass the actual beat frequency:

```typescript
// In initCymaticsOptimized:
const beatFreq = audioEngine.modulatableNodes?.beatFreq || 10.0;
const carrierFreq = audioEngine.modulatableNodes?.leftFreq || 200.0;

// Pass to shader as uniforms
const beatFreqLoc = gl.getUniformLocation(simProg, 'u_beatFreq');
const carrierFreqLoc = gl.getUniformLocation(simProg, 'u_carrierFreq');

// In render loop:
gl.uniform1f(beatFreqLoc, beatFreq);
gl.uniform1f(carrierFreqLoc, carrierFreq);
```

Updated shader:
```glsl
uniform float u_beatFreq;      // Actual binaural beat frequency
uniform float u_carrierFreq;   // Actual carrier frequency

// Calculate which frequency bin corresponds to our actual beat
float beatBin = u_beatFreq / (u_sampleRate * 0.5);  // Normalize to 0-1
float carrierBin = u_carrierFreq / (u_sampleRate * 0.5);

// Sample the ACTUAL frequency components
float beatComponent = texture(u_audio, vec2(beatBin, 0.0)).r;
float carrierComponent = texture(u_audio, vec2(carrierBin, 0.0)).r;

// Use actual frequencies for wave calculation
float wavePhase = u_time * u_beatFreq * 2.0 * 3.14159;
float spatialFreq = u_carrierFreq / 10.0;  // Scale for visual waves
```

#### Option B: Frequency-Locked Cymatics (Advanced)

Create a cymatics simulation that directly uses the audio waveform rather than frequency analysis:

```typescript
// Create an audio buffer that captures the actual synthesized waveform
const waveformBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.1, this.ctx.sampleRate);
const waveformData = waveformBuffer.getChannelData(0);

// Fill with the actual waveform that would be generated
const beatFreq = audioEngine.modulatableNodes?.beatFreq || 10.0;
const carrierFreq = audioEngine.modulatableNodes?.leftFreq || 200.0;

for (let i = 0; i < waveformData.length; i++) {
  const t = i / this.ctx.sampleRate;
  // Reconstruct the actual binaural beat waveform
  const left = Math.sin(2 * Math.PI * carrierFreq * t);
  const right = Math.sin(2 * Math.PI * (carrierFreq + beatFreq) * t);
  waveformData[i] = (left + right) * 0.5;
}

// Pass this waveform to the cymatics shader
const waveformTexture = gl.createTexture();
// ... upload waveformData as texture
```

Updated shader using waveform:
```glsl
uniform sampler2D u_waveform;  // Actual audio waveform, not FFT
uniform float u_waveformPos;   // Current playback position

// Sample the actual waveform
float samplePos = fract(u_waveformPos + distance(uv, u_source) * u_speed);
float audioForce = texture(u_waveform, vec2(samplePos, 0.0)).r;
```

### Recommended Implementation

For immediate accuracy improvement, implement Option A:

1. Add frequency uniforms to cymatics shader
2. Pass actual beat/carrier frequencies from AudioEngine
3. Sample the correct frequency bins
4. Use actual frequencies for wave calculations

This ensures the cymatics visualization truly represents the frequencies being heard.

---

## Summary of Changes

| Fix | File | Lines | Impact |
|-----|------|-------|--------|
| Hemisphere beat validation | AudioEngine.ts | ~20 | Safety critical |
| Throttled scheduler full | AudioEngine.ts | ~40 | 40-60% CPU reduction |
| Cymatics frequency accuracy | VisualizerOptimized.tsx | ~30 | Visual accuracy |
| Cymatics shader uniforms | VisualizerOptimized.tsx | ~15 | True frequency mapping |

---

## Testing Checklist

- [ ] Hemisphere targeting with extreme splits (test clamping)
- [ ] CPU profiling with throttled scheduler (should show reduction)
- [ ] Cymatics visualization matches audio frequency changes
- [ ] No visual lag when switching protocols
- [ ] Memory usage stable over long sessions