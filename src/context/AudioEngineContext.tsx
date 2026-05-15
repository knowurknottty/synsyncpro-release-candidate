import React, { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import { AudioEngine } from '../../services/AudioEngine.ts';

/**
 * AudioEngineContext provides a singleton AudioEngine instance
 * managed by React component lifecycle, ensuring proper cleanup.
 */
const AudioEngineContext = createContext<AudioEngine | null>(null);

interface AudioEngineProviderProps {
  children: ReactNode;
  onError?: (error: Error) => void;
}

export const AudioEngineProvider: React.FC<AudioEngineProviderProps> = ({
  children,
  onError,
}) => {
  const engineRef = useRef<AudioEngine | null>(null);

  // Initialize AudioEngine once
  if (!engineRef.current) {
    engineRef.current = new AudioEngine();
  }

  useEffect(() => {
    const engine = engineRef.current;

    // Set up error handler
    if (engine && onError) {
      engine.onError = (error: Error) => {
        onError(error);
      };
    }

    // Cleanup on unmount
    return () => {
      if (engine) {
        engine.onError = undefined;
        try {
          engine.dispose?.();
        } catch (error) {
          console.error('Error disposing AudioEngine:', error);
        }
      }
    };
  }, [onError]);

  return (
    <AudioEngineContext.Provider value={engineRef.current}>
      {children}
    </AudioEngineContext.Provider>
  );
};

/**
 * Hook to access the AudioEngine instance
 * Must be used within an AudioEngineProvider
 */
export const useAudioEngine = (): AudioEngine => {
  const engine = useContext(AudioEngineContext);
  if (!engine) {
    throw new Error(
      'useAudioEngine must be used within an AudioEngineProvider. ' +
        'Wrap your component tree with <AudioEngineProvider>'
    );
  }
  return engine;
};
