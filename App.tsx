import React, { useState, useEffect, useCallback } from 'react';
import { Protocol, AccessSession, UserData } from './types.ts';
import { useTheme } from './contexts/ThemeContext.tsx';
import { useMotion } from './contexts/MotionContext.tsx';
import { useAudioEngine } from './src/context/AudioEngineContext.tsx';
import { useAudioPlayback } from './src/hooks/useAudioPlayback.ts';
import { useIOSAudioSession } from './src/hooks/useIOSAudioSession.ts';
import { useModalState } from './src/hooks/useModalState.ts';
import { DesktopApp } from './components/DesktopApp.tsx';
import { FirstRunModal } from './components/FirstRunModal.tsx';
import { SettingsPanel } from './components/SettingsPanel.tsx';
import { AccessGate } from './components/AccessGate.tsx';
import { AdminPanel } from './components/AdminPanel.tsx';
import { OnboardingModal, PrivacySettings } from './components/OnboardingModal.tsx';
import { DataExportPanel } from './components/DataExportPanel.tsx';
import { UserProfile } from './components/UserProfile.tsx';
import { AccessKeyService } from './services/AccessKeyService.ts';
import { installFrankenCAPTBridge } from './src/frankencapt/index.ts';

/**
 * Main App Component
 *
 * The public application has one canonical visual implementation. Viewport size
 * may change layout mechanics inside DesktopApp, but must never select a second
 * application tree.
 */
const App: React.FC = () => {
  const isAdminRoute = new URLSearchParams(window.location.search).has('admin');

  const [accessSession, setAccessSession] = useState<AccessSession | null>(
    () => AccessKeyService.restoreCachedSession() ?? AccessKeyService.createPublicReleaseSession(),
  );

  const audioEngine = useAudioEngine();
  const { theme, toggleTheme } = useTheme();
  const { reduceMotion, setReduceMotion } = useMotion();
  const { audioState, play, pause, resume, stop, setVolume } = useAudioPlayback(audioEngine);
  const { modals, open, close } = useModalState();

  const [activeProtocol, setActiveProtocol] = useState<Protocol | null>(null);
  const [appMode, setAppMode] = useState<'scientific' | 'speculative'>('scientific');
  const [safetyCleared, setSafetyCleared] = useState(false);
  const [uiMode, setUiMode] = useState<'guided' | 'expert'>(
    () => (localStorage.getItem('synsync_ui_mode') as 'guided' | 'expert') || 'guided'
  );

  const [showWelcome, setShowWelcome] = useState<boolean>(
    () => !localStorage.getItem('synsync_seen_welcome')
  );
  const handleDismissWelcome = () => {
    localStorage.setItem('synsync_seen_welcome', '1');
    setShowWelcome(false);
  };

  const [showOnboarding, setShowOnboarding] = useState<boolean>(() => {
    if (!accessSession) return false;
    const prefs = accessSession.userData.preferences || {};
    return !prefs.onboardingCompleted;
  });

  const handleOnboardingComplete = (profile: Partial<UserData>, privacy: PrivacySettings) => {
    if (!accessSession) return;

    const updatedUserData: UserData = {
      ...accessSession.userData,
      ...profile,
      preferences: {
        ...accessSession.userData.preferences,
        ...profile.preferences,
        privacy,
      },
    };

    AccessKeyService.setLocalUserData(accessSession.token.uid, updatedUserData);
    setAccessSession({ ...accessSession, userData: updatedUserData });
    setShowOnboarding(false);
  };

  const handleOnboardingSkip = () => {
    handleOnboardingComplete(
      {
        displayName: 'Explorer',
        preferences: { onboardingCompleted: true, onboardingCompletedAt: Date.now() }
      },
      {
        trackSessionDuration: true,
        trackProtocolUsage: true,
        trackTimeOfDay: true,
        trackDeviceInfo: false,
        allowResearchExport: false,
        researchExportAnonymized: true,
      }
    );
  };

  const [scanlinesEnabled, setScanlinesEnabled] = useState<boolean>(
    () => localStorage.getItem('synsync_scanlines') !== 'false'
  );
  const [defaultVolume, setDefaultVolume] = useState<number>(
    () => parseFloat(localStorage.getItem('synsync_default_volume') || '0.5')
  );
  const [headphoneWarning, setHeadphoneWarning] = useState<boolean>(
    () => localStorage.getItem('synsync_headphone_warning') !== 'false'
  );
  const [showAccessGate, setShowAccessGate] = useState(false);

  useEffect(() => {
    localStorage.setItem('synsync_ui_mode', uiMode);
  }, [uiMode]);

  useEffect(() => {
    localStorage.setItem('synsync_scanlines', String(scanlinesEnabled));
  }, [scanlinesEnabled]);

  useEffect(() => {
    localStorage.setItem('synsync_default_volume', String(defaultVolume));
  }, [defaultVolume]);

  useEffect(() => {
    localStorage.setItem('synsync_headphone_warning', String(headphoneWarning));
  }, [headphoneWarning]);

  useEffect(() => {
    if (accessSession) {
      const prefs = accessSession.userData.preferences || {};
      if (!prefs.onboardingCompleted) setShowOnboarding(true);
    }
  }, [accessSession?.token.uid]);

  useIOSAudioSession({
    audioContext: audioEngine?.ctx ?? null,
    isPlaying: audioState.isPlaying && !audioState.isPaused,
    title: activeProtocol?.title,
    artist: 'SynSync Pro',
  });

  useEffect(() => {
    if (!audioEngine) return undefined;
    return installFrankenCAPTBridge(audioEngine);
  }, [audioEngine]);

  useEffect(() => {
    setSafetyCleared(false);
  }, [activeProtocol?.id]);

  const handlePlay = useCallback(() => {
    try {
      if (!activeProtocol) return;
      const isNewSelection = audioState.currentProtocolId !== activeProtocol.id;

      if (!safetyCleared && (isNewSelection || !audioState.isPlaying)) {
        open('safetyGate');
        return;
      }

      if (!isNewSelection && audioState.isPlaying && !audioState.isPaused) {
        pause();
      } else if (!isNewSelection && audioState.isPaused) {
        resume();
      } else {
        stop();
        play(activeProtocol);
      }
    } catch (error) {
      console.error('Playback error:', error);
    }
  }, [activeProtocol, audioState, safetyCleared, open, pause, resume, stop, play]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;
      if (e.code === 'Space') {
        e.preventDefault();
        handlePlay();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handlePlay]);

  const isPlayingCurrent =
    audioState.isPlaying &&
    !audioState.isPaused &&
    audioState.currentProtocolId === activeProtocol?.id;

  const handleSafetyCleared = () => {
    setSafetyCleared(true);
    close('safetyGate');
    if (activeProtocol) {
      stop();
      play(activeProtocol);
    }
  };

  useEffect(() => {
    if (!('mediaSession' in navigator)) return;

    const handleMediaPause = () => {
      if (audioState.isPlaying && !audioState.isPaused) pause();
    };
    const handleMediaPlay = () => {
      if (audioState.isPaused) resume();
    };
    const handleMediaStop = () => stop();

    navigator.mediaSession.setActionHandler('pause', handleMediaPause);
    navigator.mediaSession.setActionHandler('play', handleMediaPlay);
    navigator.mediaSession.setActionHandler('stop', handleMediaStop);

    return () => {
      navigator.mediaSession.setActionHandler('pause', null);
      navigator.mediaSession.setActionHandler('play', null);
      navigator.mediaSession.setActionHandler('stop', null);
    };
  }, [audioState.isPlaying, audioState.isPaused, pause, resume, stop]);

  const handleOpenModal = (modal: string) => open(modal as any);
  const handleCloseModal = (modal: string) => close(modal as any);

  const commonProps = {
    audioEngine,
    activeProtocol,
    audioState,
    appMode,
    uiMode,
    isPlayingCurrent,
    modals: modals as Record<string, boolean>,
    theme,
    toggleTheme,
    scanlinesEnabled,
    reduceMotion,
    defaultVolume,
    headphoneWarning,
    onSelectProtocol: setActiveProtocol,
    onSetAppMode: setAppMode,
    onSetUiMode: setUiMode,
    onPlay: handlePlay,
    onVolumeChange: setVolume,
    onOpenModal: handleOpenModal,
    onCloseModal: handleCloseModal,
    onSafetyCleared: handleSafetyCleared,
    onScanlinesToggle: setScanlinesEnabled,
    onReduceMotionToggle: setReduceMotion,
    onDefaultVolumeChange: setDefaultVolume,
    onHeadphoneWarningToggle: setHeadphoneWarning,
  };

  if (isAdminRoute) return <AdminPanel />;

  if (showAccessGate || !accessSession) {
    return (
      <AccessGate
        onAccess={(session) => {
          setAccessSession(session);
          setShowAccessGate(false);
        }}
      />
    );
  }

  return (
    <div data-synsync-shell="canonical" className="relative flex min-h-dvh w-full flex-col overflow-x-hidden">
      {showWelcome && <FirstRunModal onDismiss={handleDismissWelcome} />}
      {showOnboarding && (
        <OnboardingModal
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}
      <DataExportPanel
        isOpen={modals.dataExport || false}
        onClose={() => close('dataExport')}
        accessSession={accessSession}
      />
      <UserProfile
        isOpen={modals.userProfile || false}
        onClose={() => close('userProfile')}
        accessSession={accessSession}
        onUpdateSession={setAccessSession}
        onRequestNewFile={() => {
          setAccessSession(null);
          setShowAccessGate(true);
        }}
      />
      <SettingsPanel
        isOpen={modals.settings || false}
        onClose={() => close('settings')}
        uiMode={uiMode}
        scanlinesEnabled={scanlinesEnabled}
        reduceMotion={reduceMotion}
        defaultVolume={defaultVolume}
        theme={theme}
        headphoneWarning={headphoneWarning}
        onUiModeChange={setUiMode}
        onScanlinesToggle={setScanlinesEnabled}
        onReduceMotionToggle={setReduceMotion}
        onDefaultVolumeChange={setDefaultVolume}
        onThemeChange={toggleTheme}
        onHeadphoneWarningToggle={setHeadphoneWarning}
        onOpenDataExport={() => open('dataExport')}
        onOpenUserProfile={() => open('userProfile')}
      />
      <DesktopApp
        {...commonProps}
        accessSession={accessSession}
        onUpdateSession={setAccessSession}
      />
    </div>
  );
};

export default App;
