import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../App.tsx';
import { useAudioEngine } from '../src/context/AudioEngineContext.tsx';
import { useAudioPlayback } from '../src/hooks/useAudioPlayback.ts';
import { useResponsiveness } from '../src/hooks/useResponsiveness.ts';
import { useModalState } from '../src/hooks/useModalState.ts';

vi.mock('../src/context/AudioEngineContext.tsx', () => ({
  useAudioEngine: vi.fn(),
}));

vi.mock('../src/hooks/useAudioPlayback.ts', () => ({
  useAudioPlayback: vi.fn(),
}));

vi.mock('../src/hooks/useResponsiveness.ts', () => ({
  useResponsiveness: vi.fn(),
}));

vi.mock('../src/hooks/useModalState.ts', () => ({
  useModalState: vi.fn(),
}));

vi.mock('../services/AccessKeyService.ts', () => ({
  AccessKeyService: {
    restoreCachedSession: vi.fn(() => ({
      token: {
        uid: 'test-user',
        exp: Date.now() + 86_400_000,
        plan: 'test',
      },
      userData: {
        preferences: {
          onboardingCompleted: true,
        },
      },
      fileBlob: new Blob(['test-session'], { type: 'application/json' }),
      filename: 'test.syns',
    })),
    createPublicReleaseSession: vi.fn(() => ({
      token: {
        uid: 'public-release',
        exp: null,
        plan: 'lifetime',
      },
      userData: {
        preferences: {
          onboardingCompleted: true,
          publicRelease: true,
        },
      },
      fileBlob: new Blob(['public-session'], { type: 'application/json' }),
      filename: 'synsync-public-release.syns',
    })),
    setLocalUserData: vi.fn(),
    formatExpiry: vi.fn(() => 'Test access'),
  },
}));

vi.mock('../components/DesktopApp.tsx', () => ({
  DesktopApp: () => <div data-testid="desktop-app">Canonical App</div>,
}));

const mockAudioEngine = {
  playProtocol: vi.fn(),
  stop: vi.fn(),
  pause: vi.fn(),
  resume: vi.fn(),
  setVolume: vi.fn(),
  dispose: vi.fn(),
} as any;

const mockAudioPlayback = {
  audioState: {
    isPlaying: false,
    isPaused: false,
    volume: 0.5,
    currentProtocolId: null,
    currentPhaseIndex: 0,
    totalElapsed: 0,
    phaseElapsed: 0,
  },
  play: vi.fn(),
  pause: vi.fn(),
  resume: vi.fn(),
  stop: vi.fn(),
  setVolume: vi.fn(),
};

const mockResponsiveness = {
  isMobile: false,
  width: 1920,
  orientation: 'landscape' as const,
};

const mockModalState = {
  modals: {
    sources: false,
    legal: false,
    download: false,
    safetyGate: false,
  },
  toggle: vi.fn(),
  open: vi.fn(),
  close: vi.fn(),
  closeAll: vi.fn(),
};

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useAudioEngine as any).mockReturnValue(mockAudioEngine);
    (useAudioPlayback as any).mockReturnValue(mockAudioPlayback);
    (useResponsiveness as any).mockReturnValue(mockResponsiveness);
    (useModalState as any).mockReturnValue(mockModalState);
  });

  describe('hooks integration', () => {
    it('uses the shared audio engine and playback hooks', () => {
      render(<App />);
      expect(useAudioEngine).toHaveBeenCalled();
      expect(useAudioPlayback).toHaveBeenCalledWith(mockAudioEngine);
      expect(useResponsiveness).toHaveBeenCalled();
      expect(useModalState).toHaveBeenCalled();
    });
  });

  describe('canonical responsive routing', () => {
    it('renders the canonical app for a wide viewport classification', () => {
      render(<App />);
      expect(screen.getByTestId('desktop-app')).toBeInTheDocument();
    });

    it('renders the same canonical app for a narrow/mobile classification', () => {
      (useResponsiveness as any).mockReturnValue({
        isMobile: true,
        width: 375,
        orientation: 'portrait' as const,
      });

      render(<App />);
      expect(screen.getByTestId('desktop-app')).toBeInTheDocument();
    });

    it('does not replace the application tree when responsiveness changes', () => {
      const { rerender } = render(<App />);
      expect(screen.getByTestId('desktop-app')).toBeInTheDocument();

      (useResponsiveness as any).mockReturnValue({
        isMobile: true,
        width: 390,
        orientation: 'portrait' as const,
      });
      rerender(<App />);
      expect(screen.getByTestId('desktop-app')).toBeInTheDocument();

      (useResponsiveness as any).mockReturnValue({
        isMobile: false,
        width: 1440,
        orientation: 'landscape' as const,
      });
      rerender(<App />);
      expect(screen.getByTestId('desktop-app')).toBeInTheDocument();
    });
  });

  describe('state and playback integration', () => {
    it('renders with the default inactive audio state', () => {
      render(<App />);
      expect(screen.getByTestId('desktop-app')).toBeInTheDocument();
    });

    it('renders while playback is active', () => {
      (useAudioPlayback as any).mockReturnValue({
        ...mockAudioPlayback,
        audioState: {
          ...mockAudioPlayback.audioState,
          isPlaying: true,
          isPaused: false,
          currentProtocolId: 'test-protocol',
        },
      });

      render(<App />);
      expect(screen.getByTestId('desktop-app')).toBeInTheDocument();
    });

    it('renders while playback is paused', () => {
      (useAudioPlayback as any).mockReturnValue({
        ...mockAudioPlayback,
        audioState: {
          ...mockAudioPlayback.audioState,
          isPlaying: false,
          isPaused: true,
          currentProtocolId: 'test-protocol',
        },
      });

      render(<App />);
      expect(screen.getByTestId('desktop-app')).toBeInTheDocument();
    });
  });

  describe('modal integration', () => {
    it('wires modal state while preserving canonical rendering', () => {
      render(<App />);
      expect(useModalState).toHaveBeenCalled();
      expect(screen.getByTestId('desktop-app')).toBeInTheDocument();
    });
  });

  describe('error handling', () => {
    it('handles a missing AudioEngine without switching application identity', () => {
      (useAudioEngine as any).mockReturnValue(null);
      expect(() => render(<App />)).not.toThrow();
      expect(screen.getByTestId('desktop-app')).toBeInTheDocument();
    });

    it('renders even when playback state is minimally populated', () => {
      (useAudioPlayback as any).mockReturnValue({
        audioState: {},
        play: vi.fn(),
        pause: vi.fn(),
        resume: vi.fn(),
        stop: vi.fn(),
        setVolume: vi.fn(),
      });

      expect(() => render(<App />)).not.toThrow();
      expect(screen.getByTestId('desktop-app')).toBeInTheDocument();
    });
  });

  describe('component lifecycle', () => {
    it('handles re-renders without replacing the canonical app', () => {
      const { rerender } = render(<App />);
      rerender(<App />);
      expect(screen.getByTestId('desktop-app')).toBeInTheDocument();
    });
  });

  describe('type safety', () => {
    it('creates a valid App element', () => {
      const element = React.createElement(App);
      expect(element).toBeDefined();
      expect(element.type).toBe(App);
    });
  });
});
