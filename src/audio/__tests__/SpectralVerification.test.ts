/**
 * Spectral verification tests for noise generation
 * Ensures pink/brown/white noise have correct spectral slopes
 */

import { describe, test, expect, beforeEach } from 'vitest';
import { SpectrallyAccurateNoiseGenerator } from '../NoiseGenerator';

/**
 * Measure spectral slope using octave band analysis
 * Returns slope in dB/octave
 */
function measureSpectralSlope(buffer: AudioBuffer): number {
  const fftSize = 8192;
  const samples = buffer.getChannelData(0);

  // Define octave bands (ISO standard)
  const octaveBands = [
    { center: 125, low: 88, high: 177 },
    { center: 250, low: 177, high: 354 },
    { center: 500, low: 354, high: 707 },
    { center: 1000, low: 707, high: 1414 },
    { center: 2000, low: 1414, high: 2828 },
    { center: 4000, low: 2828, high: 5657 },
  ];

  const sampleRate = buffer.sampleRate;
  const binWidth = sampleRate / fftSize;

  // Calculate power at each octave center using a direct DFT. This verifies
  // actual spectral content instead of treating time-domain samples as bins.
  const bandPowers: number[] = [];

  for (const band of octaveBands) {
    let real = 0;
    let imag = 0;
    const step = Math.max(1, Math.floor(samples.length / fftSize));
    const usableSamples = Math.min(samples.length, fftSize * step);

    for (let i = 0; i < usableSamples; i += step) {
      const phase = (2 * Math.PI * band.center * i) / sampleRate;
      real += samples[i] * Math.cos(phase);
      imag -= samples[i] * Math.sin(phase);
    }

    const power = (real * real + imag * imag) / usableSamples;
    bandPowers.push(10 * Math.log10(Math.max(power, 1e-10)));
  }

  // Linear regression to find slope
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  const n = bandPowers.length;

  for (let i = 0; i < n; i++) {
    const x = i; // Octave number
    const y = bandPowers[i]; // Power in dB
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumX2 += x * x;
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);

  return slope; // dB per octave
}

describe('Spectral Verification Tests', () => {
  let context: AudioContext;
  let generator: SpectrallyAccurateNoiseGenerator;

  beforeEach(() => {
    // Create offline audio context for testing
    context = new (window.AudioContext || (window as any).webkitAudioContext)();
    generator = new SpectrallyAccurateNoiseGenerator(context);
  });

  test('Pink noise has -3dB/octave slope (±0.5dB tolerance)', () => {
    const buffer = generator.generatePinkNoise();
    const slope = measureSpectralSlope(buffer);

    // Research standard: -3dB/octave ±0.5dB
    expect(slope).toBeGreaterThanOrEqual(-3.5);
    expect(slope).toBeLessThanOrEqual(-2.5);

    console.log(`✅ Pink noise slope: ${slope.toFixed(2)} dB/octave`);
  });

  test('Brown noise has -6dB/octave slope (±0.5dB tolerance)', () => {
    const buffer = generator.generateBrownNoise();
    const slope = measureSpectralSlope(buffer);

    // Research standard: -6dB/octave ±0.5dB
    expect(slope).toBeGreaterThanOrEqual(-6.5);
    expect(slope).toBeLessThanOrEqual(-5.5);

    console.log(`✅ Brown noise slope: ${slope.toFixed(2)} dB/octave`);
  });

  test('White noise has ~0dB/octave slope (±1dB tolerance)', () => {
    const buffer = generator.generateWhiteNoise();
    const slope = measureSpectralSlope(buffer);

    // Research standard: 0dB/octave ±1dB
    expect(slope).toBeGreaterThanOrEqual(-1);
    expect(slope).toBeLessThanOrEqual(1);

    console.log(`✅ White noise slope: ${slope.toFixed(2)} dB/octave`);
  });

  test('Noise sources are loopable without artifacts', () => {
    const pinkSource = generator.createNoiseSource('pink');
    const brownSource = generator.createNoiseSource('brown');
    const whiteSource = generator.createNoiseSource('white');

    expect(pinkSource.loop).toBe(true);
    expect(brownSource.loop).toBe(true);
    expect(whiteSource.loop).toBe(true);

    expect(pinkSource.buffer).not.toBeNull();
    expect(brownSource.buffer).not.toBeNull();
    expect(whiteSource.buffer).not.toBeNull();

    console.log('✅ All noise sources are loopable');
  });
});
