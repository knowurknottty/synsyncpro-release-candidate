import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import React from 'react';
import { Visualizer } from '../Visualizer.tsx';

vi.mock('../../contexts/ThemeContext.tsx', () => ({
  useTheme: () => ({ theme: 'dark' }),
}));

// Minimal fake 2D context: every property access returns a no-op, assignments store values.
function makeFakeCtx() {
  const store: Record<string, unknown> = {};
  return new Proxy(store, {
    get: (_t, prop) => {
      if (prop === 'canvas') return undefined;
      if (prop === 'measureText') return () => ({ width: 0 });
      return () => {};
    },
    set: (t, prop, value) => { (t as Record<string, unknown>)[String(prop)] = value; return true; },
  });
}

function makeFakeAnalyser() {
  return {
    frequencyBinCount: 1024,
    getByteFrequencyData: vi.fn(),
    getByteTimeDomainData: vi.fn(),
  };
}

function makeFakeAudioEngine() {
  return {
    analyser: makeFakeAnalyser(),
    analyserL: null,
    analyserR: null,
    analyserAux: null,
    audioContext: { sampleRate: 48000 },
  } as any;
}

describe('Visualizer WebGL2-unavailable fallback (VIS-002)', () => {
  let webgl2Calls: number;
  let twoDCalls: number;
  let originalGetContext: any;

  beforeEach(() => {
    webgl2Calls = 0;
    twoDCalls = 0;
    originalGetContext = (window as any).HTMLCanvasElement.prototype.getContext;
    (window as any).HTMLCanvasElement.prototype.getContext = vi.fn((type: string) => {
      if (type === 'webgl2') { webgl2Calls += 1; return null; }
      if (type === '2d') { twoDCalls += 1; return makeFakeCtx(); }
      return null;
    });
  });

  afterEach(() => {
    cleanup();
    (window as any).HTMLCanvasElement.prototype.getContext = originalGetContext;
  });

  it('falls back to a deterministic 2D render instead of a blank canvas when WebGL2 is unavailable', () => {
    expect(() =>
      render(
        <Visualizer
          audioEngine={makeFakeAudioEngine()}
          isPlaying={true}
          mode="neural"
          hdEnabled={true}
        />
      )
    ).not.toThrow();

    // The failed WebGL2 request must be a one-shot: the fallback re-keys to a 2D
    // canvas and must not re-enter the WebGL path (avoids recursive fallback).
    expect(webgl2Calls).toBe(1);
    // A 2D context must have been acquired for the deterministic fallback render.
    expect(twoDCalls).toBeGreaterThanOrEqual(1);
  });

  it('does not crash when cymatics WebGL2 is unavailable (pulse fallback)', () => {
    expect(() =>
      render(
        <Visualizer
          audioEngine={makeFakeAudioEngine()}
          isPlaying={true}
          mode="cymatics"
          cymaticMedium="water"
        />
      )
    ).not.toThrow();
    expect(webgl2Calls).toBeGreaterThanOrEqual(1);
    expect(twoDCalls).toBeGreaterThanOrEqual(1);
  });
});