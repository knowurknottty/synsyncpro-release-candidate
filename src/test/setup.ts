import '@testing-library/jest-dom';
import { expect, afterEach, vi, beforeAll, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// jsdom (< v24) does not implement ResizeObserver. Visualizer now uses one to keep
// the canvas backing store in sync, so provide a minimal observer stub for tests.
if (typeof globalThis.ResizeObserver === 'undefined') {
  class ResizeObserverStub {
    constructor(private callback: () => void) {}
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  (globalThis as any).ResizeObserver = ResizeObserverStub;
}

// jsdom does not implement matchMedia by default.
if (typeof window !== 'undefined' && typeof (window as any).matchMedia === 'undefined') {
  (window as any).matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// Cleanup after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Mock Web Audio API
beforeAll(() => {
  const audioParam = (value = 0) => ({
    value,
    setValueAtTime: vi.fn(),
    setTargetAtTime: vi.fn(),
    linearRampToValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn(),
    cancelScheduledValues: vi.fn(),
  });

  const audioNode = () => ({
    connect: vi.fn().mockReturnThis(),
    disconnect: vi.fn(),
  });

  const createMockAudioContext = () => ({
    createOscillator: vi.fn(() => ({
      ...audioNode(),
      frequency: audioParam(0),
      detune: audioParam(0),
      type: 'sine',
      start: vi.fn(),
      stop: vi.fn(),
    })),
    createGain: vi.fn(() => ({
      ...audioNode(),
      gain: audioParam(1),
    })),
    createBiquadFilter: vi.fn(() => ({
      ...audioNode(),
      type: 'lowpass',
      frequency: audioParam(350),
      Q: audioParam(1),
      gain: audioParam(0),
    })),
    createDelay: vi.fn(() => ({
      ...audioNode(),
      delayTime: audioParam(0),
    })),
    createChannelSplitter: vi.fn(() => audioNode()),
    createChannelMerger: vi.fn(() => audioNode()),
    createStereoPanner: vi.fn(() => ({
      ...audioNode(),
      pan: audioParam(0),
    })),
    createBuffer: vi.fn((channels: number, length: number, sampleRate: number) => {
      const channelData = Array.from({ length: channels }, () => new Float32Array(length));
      return {
        numberOfChannels: channels,
        length,
        duration: length / sampleRate,
        sampleRate,
        getChannelData: vi.fn((channel: number) => channelData[channel]),
        copyFromChannel: vi.fn(),
        copyToChannel: vi.fn(),
      };
    }),
    createBufferSource: vi.fn(() => ({
      ...audioNode(),
      buffer: null,
      loop: false,
      playbackRate: audioParam(1),
      start: vi.fn(),
      stop: vi.fn(),
    })),
    createAnalyser: vi.fn(() => ({
      ...audioNode(),
      fftSize: 2048,
      frequencyBinCount: 1024,
      getByteFrequencyData: vi.fn(),
      getFloatFrequencyData: vi.fn(),
      getByteTimeDomainData: vi.fn(),
      getFloatTimeDomainData: vi.fn(),
    })),
    createDynamicsCompressor: vi.fn(() => ({
      ...audioNode(),
      threshold: audioParam(-24),
      knee: audioParam(30),
      ratio: audioParam(12),
      attack: audioParam(0.003),
      release: audioParam(0.25),
    })),
    destination: audioNode(),
    listener: {
      positionX: audioParam(0),
      positionY: audioParam(0),
      positionZ: audioParam(0),
      forwardX: audioParam(0),
      forwardY: audioParam(0),
      forwardZ: audioParam(-1),
      upX: audioParam(0),
      upY: audioParam(1),
      upZ: audioParam(0),
    },
    currentTime: 1,
    sampleRate: 48000,
    state: 'running',
    resume: vi.fn().mockResolvedValue(undefined),
    suspend: vi.fn().mockResolvedValue(undefined),
    close: vi.fn().mockResolvedValue(undefined),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as any;

  (global as any).AudioContext = vi.fn(() => createMockAudioContext());
  (global as any).OfflineAudioContext = vi.fn(() => createMockAudioContext());
  (global as any).webkitAudioContext = vi.fn(() => createMockAudioContext());
  (global as any).PannerNode = vi.fn((_ctx, options = {}) => ({
    ...audioNode(),
    ...options,
    positionX: audioParam(0),
    positionY: audioParam(0),
    positionZ: audioParam(0),
    orientationX: audioParam(1),
    orientationY: audioParam(0),
    orientationZ: audioParam(0),
  }));

  Object.defineProperty(HTMLMediaElement.prototype, 'play', {
    configurable: true,
    value: vi.fn().mockResolvedValue(undefined),
  });
  Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
    configurable: true,
    value: vi.fn(),
  });
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Suppress console errors during tests
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeEach(() => {
  console.error = vi.fn((...args) => {
    // Only suppress specific expected errors during tests
    const message = String(args[0]);
    if (!message.includes('Warning: ReactDOM.render')) {
      originalConsoleError(...args);
    }
  });

  console.warn = vi.fn((...args) => {
    // Only suppress specific expected warnings during tests
    const message = String(args[0]);
    if (!message.includes('Warning')) {
      originalConsoleWarn(...args);
    }
  });
});

// Restore original console functions after tests
afterEach(() => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});
