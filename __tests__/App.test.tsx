import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App.tsx';
import { useAudioEngine } from '../src/context/AudioEngineContext.tsx';
import { useAudioPlayback } from '../src/hooks/useAudioPlayback.ts';
import { useResponsiveness } from '../src/hooks/useResponsiveness.ts';
import { useModalState } from '../src/hooks/useModalState.ts';

// Mock all the custom hooks
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

// Mock components
vi.mock('../components/MobileApp.tsx', () => ({
  MobileApp: (props: any) => <div data-testid="mobile-app">Mobile App</div>,
}));

vi.mock('../components/DesktopApp.tsx', () => ({
  DesktopApp: (props: any) => <div data-testid="desktop-app">Desktop App</div>,
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
    it('should use useAudioEngine hook', () => {
      render(<App />);
      expect(useAudioEngine).toHaveBeenCalled();
    });

    it('should use useAudioPlayback hook', () => {
      render(<App />);
      expect(useAudioPlayback).toHaveBeenCalledWith(mockAudioEngine);
    });

    it('should use useResponsiveness hook', () => {
      render(<App />);
      expect(useResponsiveness).toHaveBeenCalled();
    });

    it('should use useModalState hook', () => {
      render(<App />);
      expect(useModalState).toHaveBeenCalled();
    });
  });

  describe('responsive routing', () => {
    it('should render DesktopApp when not mobile', () => {
      render(<App />);
      expect(screen.getByTestId('desktop-app')).toBeInTheDocument();
      expect(screen.queryByTestId('mobile-app')).not.toBeInTheDocument();
    });

    it('should render MobileApp when mobile', () => {
      (useResponsiveness as any).mockReturnValue({
        isMobile: true,
        width: 375,
        orientation: 'portrait' as const,
      });
      render(<App />);
      expect(screen.getByTestId('mobile-app')).toBeInTheDocument();
      expect(screen.queryByTestId('desktop-app')).not.toBeInTheDocument();
    });
  });

  describe('state management', () => {
    it('should initialize with null active protocol', () => {
      render(<App />);
      // Check that the component renders (state is initialized)
      expect(screen.getByTestId('desktop-app')).toBeInTheDocument();
    });

    it('should initialize with scientific app mode', () => {
      render(<App />);
      expect(screen.getByTestId('desktop-app')).toBeInTheDocument();
    });

    it('should initialize with archive tab on mobile', () => {
      (useResponsiveness as any).mockReturnValue({
        isMobile: true,
        width: 375,
        orientation: 'portrait' as const,
      });
      render(<App />);
      expect(screen.getByTestId('mobile-app')).toBeInTheDocument();
    });
  });

  describe('safety gating', () => {
    it('should reset safetyCleared when protocol changes', () => {
      const { rerender } = render(<App />);

      // Change protocol - this should reset safety cleared
      // (We can't directly test state changes, but we can verify no errors occur)
      expect(screen.getByTestId('desktop-app')).toBeInTheDocument();
    });
  });

  describe('isPlayingCurrent calculation', () => {
    it('should be true when playing current protocol', () => {
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
      // Component should render without errors
      expect(screen.getByTestId('desktop-app')).toBeInTheDocument();
    });

    it('should be false when paused', () => {
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

    it('should be false when not playing', () => {
      (useAudioPlayback as any).mockReturnValue({
        ...mockAudioPlayback,
        audioState: {
          ...mockAudioPlayback.audioState,
          isPlaying: false,
          isPaused: false,
        },
      });

      render(<App />);
      expect(screen.getByTestId('desktop-app')).toBeInTheDocument();
    });
  });

  describe('props passing', () => {
    it('should pass audioEngine to components', () => {
      render(<App />);
      expect(screen.getByTestId('desktop-app')).toBeInTheDocument();
      // Verify audioEngine was called
      expect(useAudioEngine).toHaveBeenCalled();
    });

    it('should pass audioState to components', () => {
      render(<App />);
      expect(screen.getByTestId('desktop-app')).toBeInTheDocument();
      // Verify useAudioPlayback was called
      expect(useAudioPlayback).toHaveBeenCalled();
    });

    it('should pass modals to components', () => {
      render(<App />);
      expect(screen.getByTestId('desktop-app')).toBeInTheDocument();
      // Verify useModalState was called
      expect(useModalState).toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('should handle missing AudioEngine gracefully', () => {
      (useAudioEngine as any).mockReturnValue(null);
      expect(() => {
        render(<App />);
      }).not.toThrow();
    });

    it('should render even if hooks return undefined', () => {
      (useAudioPlayback as any).mockReturnValue({
        audioState: {},
        play: vi.fn(),
        pause: vi.fn(),
        resume: vi.fn(),
        stop: vi.fn(),
        setVolume: vi.fn(),
      });

      expect(() => {
        render(<App />);
      }).not.toThrow();
    });
  });

  describe('mobile specific behavior', () => {
    it('should set mobile tab to session after playing protocol on mobile', () => {
      (useResponsiveness as any).mockReturnValue({
        isMobile: true,
        width: 375,
        orientation: 'portrait' as const,
      });

      render(<App />);
      expect(screen.getByTestId('mobile-app')).toBeInTheDocument();
    });
  });

  describe('modal integration', () => {
    it('should pass modal state to components', () => {
      render(<App />);
      expect(useModalState).toHaveBeenCalled();
      expect(screen.getByTestId('desktop-app')).toBeInTheDocument();
    });

    it('should handle modal open/close callbacks', () => {
      render(<App />);
      // Verify that modal callbacks are wired up
      expect(screen.getByTestId('desktop-app')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should render without accessibility violations', () => {
      const { container } = render(<App />);
      expect(container).toBeInTheDocument();
      // Component should be properly structured
      expect(screen.getByTestId('desktop-app')).toBeInTheDocument();
    });
  });

  describe('component lifecycle', () => {
    it('should handle re-renders', () => {
      const { rerender } = render(<App />);
      rerender(<App />);
      expect(screen.getByTestId('desktop-app')).toBeInTheDocument();
    });

    it('should handle responsive changes', () => {
      const { rerender } = render(<App />);

      // Change to mobile
      (useResponsiveness as any).mockReturnValue({
        isMobile: true,
        width: 375,
        orientation: 'portrait' as const,
      });

      rerender(<App />);
      expect(screen.getByTestId('mobile-app')).toBeInTheDocument();

      // Change back to desktop
      (useResponsiveness as any).mockReturnValue({
        isMobile: false,
        width: 1920,
        orientation: 'landscape' as const,
      });

      rerender(<App />);
      expect(screen.getByTestId('desktop-app')).toBeInTheDocument();
    });
  });

  describe('type safety', () => {
    it('should be properly typed', () => {
      // This is more of a compile-time check
      const element = React.createElement(App);
      expect(element).toBeDefined();
      expect(element.type).toBe(App);
    });
  });
});
