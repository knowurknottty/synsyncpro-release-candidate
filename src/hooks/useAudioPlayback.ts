import { useState, useCallback, useEffect } from 'react';
import { AudioEngine } from '../../services/AudioEngine.ts';
import { Protocol, AudioState } from '../../types.ts';

export function useAudioPlayback(audioEngine: AudioEngine) {
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    isPaused: false,
    currentProtocolId: null,
    currentPhaseIndex: 0,
    volume: 0.7,
  });

  // Set up audio engine callbacks
  useEffect(() => {
    const onTick = (totalElapsed: number, phaseElapsed: number, phaseIndex: number) => {
      setAudioState(s => ({
        ...s,
        isPlaying: true,
        isPaused: false,
        currentPhaseIndex: phaseIndex,
      }));
    };

    const onComplete = () => {
      setAudioState(s => ({
        ...s,
        isPlaying: false,
        isPaused: false,
        currentProtocolId: null,
      }));
    };

    audioEngine.onTick = onTick;
    audioEngine.onComplete = onComplete;

    return () => {
      audioEngine.onTick = undefined;
      audioEngine.onComplete = undefined;
      audioEngine.dispose();
    };
  }, [audioEngine]);

  const play = useCallback(async (protocol: Protocol) => {
    if (!protocol) {
      const error = new Error('Cannot play an empty protocol.');
      audioEngine.onError?.(error);
      return;
    }

    audioEngine.setVolume(audioState.volume);
    setAudioState(s => ({
      ...s,
      isPlaying: true,
      isPaused: false,
      currentProtocolId: protocol.id,
      currentPhaseIndex: 0,
    }));

    try {
      await audioEngine.unlock();
      await audioEngine.playProtocol(protocol);
    } catch (error) {
      console.error('Failed to play protocol:', error);
      audioEngine.onError?.(error instanceof Error ? error : new Error(String(error)));
      throw error;
    }
  }, [audioEngine, audioState.volume]);

  const pause = useCallback(() => {
    try {
      audioEngine.pause();
      setAudioState(s => ({ ...s, isPaused: true }));
    } catch (error) {
      console.error('Failed to pause:', error);
    }
  }, [audioEngine]);

  const resume = useCallback(() => {
    try {
      audioEngine.resume();
      setAudioState(s => ({ ...s, isPaused: false }));
    } catch (error) {
      console.error('Failed to resume:', error);
    }
  }, [audioEngine]);

  const stop = useCallback(() => {
    try {
      audioEngine.stop();
      setAudioState(s => ({
        ...s,
        isPlaying: false,
        isPaused: false,
        currentProtocolId: null,
        currentPhaseIndex: 0,
      }));
    } catch (error) {
      console.error('Failed to stop:', error);
    }
  }, [audioEngine]);

  const setVolume = useCallback((volume: number) => {
    try {
      const clampedVolume = Math.max(0, Math.min(1, volume));
      audioEngine.setVolume(clampedVolume);
      setAudioState(s => ({ ...s, volume: clampedVolume }));
    } catch (error) {
      console.error('Failed to set volume:', error);
    }
  }, [audioEngine]);

  return {
    audioState,
    play,
    pause,
    resume,
    stop,
    setVolume,
  };
}
