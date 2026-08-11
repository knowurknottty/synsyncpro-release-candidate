import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  BookOpen,
  ShieldAlert,
  Microscope,
  FileText,
  Target,
  Brain,
  Headphones,
  Maximize2,
  Minimize2,
  SlidersHorizontal,
  Clock,
  Wind,
  Mic2,
  Hexagon,
  Settings,
  ChevronLeft,
  User,
} from 'lucide-react';
import { Protocol, AudioState, SessionGuidance, MantraProfile, AccessSession } from '../types.ts';
import { Visualizer } from './Visualizer.tsx';
import { ProtocolList } from './ProtocolList.tsx';
import { SessionProgress } from './SessionProgress.tsx';
import { SourcesModal } from './SourcesModal.tsx';
import { LegalModal } from './LegalModal.tsx';
import { DownloadPortal } from './DownloadPortal.tsx';
import { SafetyGateModal } from './SafetyGateModal.tsx';
import { ManualTuningPanel } from './ManualTuningPanel.tsx';
import { GuidedHome } from './GuidedHome.tsx';
import { PhaseTimeline } from './PhaseTimeline.tsx';
import { GuidanceOverlay } from './GuidanceOverlay.tsx';
import { WavExporter } from './WavExporter.tsx';
import { Logo } from './Logo.tsx';
import { UserProfile } from './UserProfile.tsx';
import { AudioEngine } from '../services/AudioEngine.ts';
import { ProtocolVault } from '../services/ProtocolVault.ts';

interface DesktopAppProps {
  audioEngine: AudioEngine;
  activeProtocol: Protocol | null;
  audioState: AudioState;
  appMode: 'scientific' | 'speculative';
  uiMode: 'guided' | 'expert';
  isPlayingCurrent: boolean;
  modals: Record<string, boolean>;
  accessSession?: AccessSession;
  onSelectProtocol: (protocol: Protocol) => void;
  onSetAppMode: (mode: 'scientific' | 'speculative') => void;
  onSetUiMode: (mode: 'guided' | 'expert') => void;
  onPlay: () => void;
  onVolumeChange: (volume: number) => void;
  onOpenModal: (modal: string) => void;
  onCloseModal: (modal: string) => void;
  onSafetyCleared: () => void;
  onUpdateSession?: (s: AccessSession) => void;
}

const DesktopAppComponent: React.FC<DesktopAppProps> = ({
  audioEngine,
  activeProtocol,
  audioState,
  appMode,
  uiMode,
  isPlayingCurrent,
  modals,
  accessSession,
  onSelectProtocol,
  onSetAppMode,
  onSetUiMode,
  onPlay,
  onVolumeChange,
  onOpenModal,
  onCloseModal,
  onSafetyCleared,
  onUpdateSession,
}) => {
  const [vizMode, setVizMode] = useState<string>('oscilloscope');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const vizContainerRef = useRef<HTMLDivElement>(null);
  const [activeGuidances, setActiveGuidances] = useState<Set<SessionGuidance>>(new Set());
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleGuidance = useCallback((id: SessionGuidance) => {
    setActiveGuidances(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else {
        if (id === 'socratic') next.clear();
        next.add(id);
      }
      return next;
    });
  }, []);

  const GUIDANCE_MODES: { id: SessionGuidance; label: string; Icon: React.ElementType }[] = [
    { id: 'audio_only', label: 'Audio Only', Icon: Headphones },
    { id: 'breathwork', label: 'Breathe', Icon: Wind },
    { id: 'mantra', label: 'Mantra', Icon: Mic2 },
    { id: 'socratic', label: 'Reflect', Icon: Brain },
    { id: 'geometry', label: 'Geometry', Icon: Hexagon },
  ];

  const DEFAULT_MANTRA: MantraProfile = {
    id: 'universal',
    name: 'Universal',
    phonetic: 'SO HUM',
    meaning: 'I am that — the universal consciousness',
    pronunciation: 'soh · hum',
    tonality: 'Natural voice, low and resonant',
  };

  const mantraForOverlay: MantraProfile = activeProtocol?.mantra
    ? {
        id: activeProtocol.id,
        name: activeProtocol.title,
        phonetic: activeProtocol.mantra.phonetic,
        meaning: activeProtocol.mantra.meaning,
        pronunciation: activeProtocol.mantra.phonetic,
        tonality: 'Natural voice',
      }
    : DEFAULT_MANTRA;

  const WEBGL_MODES = new Set(['neural', 'cosmic', 'hyper', 'symmetry', 'galactic', 'cyber', 'dmt']);
  const GUIDED_VIZ_MODES = [
    { id: 'oscilloscope', label: 'Scope' },
    { id: 'spectrum', label: 'Spectrum' },
    { id: 'pulse', label: 'Pulse' },
    { id: 'fractal', label: 'Fractal' },
  ];
  const EXPERT_VIZ_MODES = [
    { id: 'oscilloscope', label: 'Scope' },
    { id: 'spectrum', label: 'Spectrum' },
    { id: 'waveform', label: 'Wave' },
    { id: 'neural', label: 'Neural' },
    { id: 'cymatics', label: 'Cymatics' },
    { id: 'cosmic', label: 'Cosmic' },
    { id: 'dmt', label: 'DMT' },
    { id: 'galactic', label: 'Galactic' },
    { id: 'fractal', label: 'Fractal' },
    { id: 'sacred_geometry', label: 'Sacred' },
  ];
  const vizModes = uiMode === 'expert' ? EXPERT_VIZ_MODES : GUIDED_VIZ_MODES;
  const VIZ_MODE_DESCRIPTIONS: Record<string, string> = {
    oscilloscope: 'Scope: Classic waveform display showing audio signal over time',
    spectrum: 'Spectrum: Frequency analysis showing intensity across frequency bands',
    pulse: 'Pulse: Rhythmic visualization synced to binaural beat frequency',
    fractal: 'Fractal: Recursive geometric patterns responding to audio dynamics',
    waveform: 'Waveform: Detailed stereo signal representation',
    neural: 'Neural: 3D synaptic network visualization (WebGL)',
    cymatics: 'Cymatics: Water-like wave interference patterns',
    cosmic: 'Cosmic: Deep space volumetric effects (WebGL)',
    dmt: 'DMT: Psychedelic kaleidoscope patterns (WebGL)',
    galactic: 'Galactic: Stellar nebula effects (WebGL)',
    sacred_geometry: 'Sacred: Platonic solid animations',
  };

  useEffect(() => {
    const onFSChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFSChange);
    return () => document.removeEventListener('fullscreenchange', onFSChange);
  }, []);

  const handleFullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen();
    else vizContainerRef.current?.requestFullscreen();
  }, []);

  return (
    <div
      className="w-full min-w-0 bg-neuro-900 text-gray-100 grid grid-cols-1 lg:grid-cols-12 bg-cyber-grid relative"
      style={{ minHeight: '100dvh', height: '100dvh', overflow: 'hidden' }}
      data-synsync-layout="canonical-responsive"
    >
      <div className="absolute inset-0 pointer-events-none scanlines z-[100] opacity-20" aria-hidden="true" />

      {accessSession && onUpdateSession && (
        <UserProfile
          isOpen={profileOpen}
          accessSession={accessSession}
          onClose={() => setProfileOpen(false)}
          onUpdateSession={onUpdateSession}
          onRequestNewFile={() => onOpenModal('accessGate')}
        />
      )}
      <SourcesModal isOpen={modals.sources} onClose={() => onCloseModal('sources')} />
      <LegalModal isOpen={modals.legal} onClose={() => onCloseModal('legal')} />
      <DownloadPortal isOpen={modals.download} onClose={() => onCloseModal('download')} />
      <SafetyGateModal
        isOpen={modals.safetyGate}
        onClose={() => onCloseModal('safetyGate')}
        onClearance={onSafetyCleared}
        protocol={activeProtocol}
      />

      <aside className="lg:col-span-3 bg-neuro-800/80 border-b lg:border-b-0 lg:border-r border-neuro-700 backdrop-blur-xl flex flex-col max-h-[42dvh] lg:max-h-none lg:h-full z-20 min-w-0">
        <div className="p-3 sm:p-4 lg:p-6 border-b border-neuro-700/50 bg-neuro-900/50 shrink-0">
          <button
            onClick={() => onSelectProtocol(null as any)}
            className="mb-3 lg:mb-4 w-full text-left hover:opacity-80 transition-opacity cursor-pointer"
            aria-label="Return to home"
            title="Click to return to home"
          >
            <Logo size="lg" showIcon={false} variant="default" />
          </button>

          <div className="flex gap-1 bg-black/40 p-1 border border-neuro-700/50 rounded mb-3">
            <button
              onClick={() => {
                onSetUiMode('guided');
                if (uiMode === 'expert') onSelectProtocol(null as any);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${uiMode === 'guided' ? 'bg-neuro-500 text-black' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Guided
            </button>
            <button
              onClick={() => {
                onSetUiMode('expert');
                if (uiMode === 'guided') onSelectProtocol(null as any);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${uiMode === 'expert' ? 'bg-neuro-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Expert
            </button>
          </div>

          {uiMode === 'expert' && (
            <div className="flex gap-2 bg-black/40 p-1 border border-neuro-700/50 rounded">
              <button
                onClick={() => onSetAppMode('scientific')}
                className={`flex-1 py-1.5 text-[10px] font-bold font-mono rounded ${appMode === 'scientific' ? 'bg-neuro-700/80 text-white' : 'text-gray-600'}`}
              >
                Research-Backed
              </button>
              <button
                onClick={() => onSetAppMode('speculative')}
                className={`flex-1 py-1.5 text-[10px] font-bold font-mono rounded ${appMode === 'speculative' ? 'bg-neuro-accent/20 text-neuro-accent' : 'text-gray-600'}`}
              >
                Exploratory
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 custom-scrollbar">
          {uiMode === 'guided' ? (
            <GuidedHome
              protocols={ProtocolVault.getAllProtocols()}
              selectedId={activeProtocol?.id || null}
              onSelect={onSelectProtocol}
              prescription={accessSession?.userData.prescription}
            />
          ) : (
            <ProtocolList
              protocols={ProtocolVault.getAllProtocols()}
              selectedId={activeProtocol?.id || null}
              onSelect={onSelectProtocol}
              mode={appMode}
            />
          )}
        </div>

        <div className="p-3 sm:p-4 border-t border-neuro-700/50 flex flex-col gap-2 shrink-0">
          <div className="flex gap-2">
            <button onClick={() => onOpenModal('sources')} className="flex-1 py-2 bg-neuro-700/30 hover:bg-neuro-700/50 rounded text-[9px] font-bold uppercase tracking-widest text-gray-400 border border-neuro-700 flex items-center justify-center gap-2">
              <BookOpen className="w-3 h-3" /> Library
            </button>
            <button onClick={() => onOpenModal('legal')} className="flex-1 py-2 bg-neuro-700/30 hover:bg-neuro-700/50 rounded text-[9px] font-bold uppercase tracking-widest text-gray-400 border border-neuro-700 flex items-center justify-center gap-2">
              <ShieldAlert className="w-3 h-3" /> Legal
            </button>
          </div>
          <button onClick={() => onOpenModal('settings')} className="w-full py-2 bg-neuro-700/30 hover:bg-neuro-700/50 rounded text-[9px] font-bold uppercase tracking-widest text-gray-400 border border-neuro-700 flex items-center justify-center gap-2">
            <Settings className="w-3 h-3" /> Settings
          </button>
        </div>
      </aside>

      <main className="lg:col-span-9 flex flex-col min-h-0 h-full bg-transparent relative z-10 min-w-0 overflow-hidden">
        <div className="min-h-16 border-b border-neuro-700/50 flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 lg:px-8 py-2 bg-neuro-900/80 backdrop-blur-md z-20 shrink-0">
          <div className="flex gap-3 items-center min-w-0">
            <div className={`w-2 h-2 rounded-full shrink-0 ${audioState.isPlaying && !audioState.isPaused ? 'bg-neuro-500 animate-pulse' : 'bg-neuro-800 border border-neuro-600'}`} />
            <span className={`font-mono text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase truncate ${audioState.isPlaying && !audioState.isPaused ? 'text-neuro-300' : 'text-neuro-400'}`}>
              {audioState.isPlaying && !audioState.isPaused ? 'Session Active' : 'Session Ready'}
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <Volume2 className="w-4 h-4 text-gray-500 shrink-0" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={audioState.volume}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                className="w-20 sm:w-28 lg:w-32 h-1 bg-neuro-700 rounded-lg appearance-none cursor-pointer accent-neuro-500"
                aria-label="Master volume"
              />
            </div>
            <button
              onClick={() => setProfileOpen(true)}
              className="flex items-center gap-2 px-2 sm:pl-3 sm:pr-4 py-1.5 rounded-full border border-neuro-700/50 bg-neuro-800/40 hover:border-neuro-500/60 hover:bg-neuro-700/50 transition-all group shrink-0"
              aria-label="Open user profile"
            >
              <div className="w-5 h-5 rounded-full bg-neuro-500/20 border border-neuro-500/40 flex items-center justify-center shrink-0">
                <User className="w-3 h-3 text-neuro-400" />
              </div>
              <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-widest text-gray-500 group-hover:text-gray-300 transition-colors">
                {accessSession?.userData.displayName || 'Profile'}
              </span>
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 p-3 sm:p-4 lg:p-8 overflow-y-auto custom-scrollbar">
          {activeProtocol ? (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 lg:gap-6 xl:gap-8 min-w-0">
              <section className="xl:col-span-7 flex flex-col gap-4 lg:gap-6 xl:pr-4 pb-10 min-w-0">
                <div ref={vizContainerRef} className="bg-black border-2 border-neuro-700/50 rounded-xl lg:rounded-2xl overflow-hidden relative aspect-video shadow-2xl shrink-0 min-w-0">
                  <Visualizer
                    audioEngine={audioEngine}
                    isPlaying={audioState.isPlaying}
                    mode={vizMode as any}
                    complexity={0.5}
                    background="#000"
                    hdEnabled={WEBGL_MODES.has(vizMode)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  <button
                    onClick={() => {
                      if (document.fullscreenElement) document.exitFullscreen();
                      else onSelectProtocol(null as any);
                    }}
                    className="absolute top-3 left-3 p-2 bg-black/50 hover:bg-black/80 rounded-lg border border-white/10 text-white/60 hover:text-white transition-all z-10 flex items-center gap-1.5"
                    aria-label="Back to protocols"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleFullscreen}
                    className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/80 rounded-lg border border-white/10 text-white/60 hover:text-white transition-all z-10"
                    aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  >
                    {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                  <div className="absolute top-14 right-3 flex flex-col gap-1.5 z-10">
                    {GUIDANCE_MODES.filter(m => m.id !== 'audio_only').map(({ id, label, Icon }) => (
                      <button
                        key={id}
                        onClick={() => toggleGuidance(id)}
                        className={`p-2 rounded-lg border transition-all ${activeGuidances.has(id) ? 'bg-neuro-accent/30 border-neuro-accent text-neuro-accent' : 'bg-black/50 border-white/10 text-white/50 hover:text-white'}`}
                        aria-label={`Toggle ${label} guidance`}
                        aria-pressed={activeGuidances.has(id)}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </button>
                    ))}
                  </div>
                  <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6">
                    <SessionProgress audioEngine={audioEngine} />
                  </div>
                  <GuidanceOverlay
                    modes={Array.from(activeGuidances)}
                    breathRatio={activeProtocol?.breathwork?.ratio ?? [4, 4, 4, 4]}
                    mantra={mantraForOverlay}
                    elapsedTime={0}
                    onClose={id => toggleGuidance(id)}
                  />
                </div>

                <div className="flex gap-1.5 overflow-x-auto pb-1 custom-scrollbar shrink-0">
                  {vizModes.map(m => (
                    <button
                      key={m.id}
                      onClick={() => setVizMode(m.id)}
                      title={VIZ_MODE_DESCRIPTIONS[m.id] || m.label}
                      className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest rounded-full whitespace-nowrap transition-all border ${vizMode === m.id ? 'bg-neuro-500/20 border-neuro-500 text-neuro-300' : 'bg-transparent border-neuro-700/50 text-gray-600 hover:border-neuro-600 hover:text-gray-400'}`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                <div className="flex gap-1.5 overflow-x-auto pb-1 custom-scrollbar shrink-0 items-center">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-gray-600 whitespace-nowrap mr-1">Guide:</span>
                  <button
                    onClick={() => setActiveGuidances(new Set())}
                    className={`flex items-center gap-1 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest rounded-full whitespace-nowrap transition-all border ${activeGuidances.size === 0 ? 'bg-neuro-accent/20 border-neuro-accent text-neuro-accent' : 'bg-transparent border-neuro-700/50 text-gray-600'}`}
                  >
                    <Headphones className="w-3 h-3" /> Audio Only
                  </button>
                  {GUIDANCE_MODES.filter(m => m.id !== 'audio_only').map(({ id, label, Icon }) => (
                    <button
                      key={id}
                      onClick={() => toggleGuidance(id)}
                      className={`flex items-center gap-1 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest rounded-full whitespace-nowrap transition-all border ${activeGuidances.has(id) ? 'bg-neuro-accent/20 border-neuro-accent text-neuro-accent' : 'bg-transparent border-neuro-700/50 text-gray-600'}`}
                    >
                      <Icon className="w-3 h-3" /> {label}
                    </button>
                  ))}
                </div>

                <div className="bg-neuro-800/40 border border-neuro-700 backdrop-blur-xl p-4 sm:p-6 lg:p-8 rounded-xl lg:rounded-2xl flex flex-col gap-4 min-w-0">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                    <div className="min-w-0">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight uppercase font-mono mb-2 break-words">
                        {activeProtocol.title}
                      </h2>
                      <div className="flex gap-2 flex-wrap mt-1">
                        {activeProtocol.evidenceLevel && <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-neuro-500/10 border border-neuro-500/30 text-neuro-400">Level {activeProtocol.evidenceLevel}</span>}
                        <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-neuro-accent/10 border border-neuro-accent/30 text-neuro-accent">{(activeProtocol.section ?? 'General').toUpperCase()}</span>
                        {uiMode === 'expert' && activeProtocol.optimalTimeOfDay && <span className="text-[10px] font-mono px-2 py-1 rounded bg-black/30 border border-neuro-700/50 text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" />{activeProtocol.optimalTimeOfDay.replace(/-/g, ' ')}</span>}
                      </div>
                    </div>
                    <button
                      onClick={onPlay}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all shrink-0 ${!isPlayingCurrent ? 'bg-neuro-500 text-black shadow-lg shadow-neuro-500/30 hover:scale-105' : 'bg-neuro-900 border-2 border-neuro-500 text-neuro-500'}`}
                      aria-label={isPlayingCurrent ? 'Pause protocol' : 'Play protocol'}
                    >
                      {!isPlayingCurrent ? <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-1 fill-current" /> : <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />}
                    </button>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{activeProtocol.description}</p>
                  {activeProtocol.usageGoal && (
                    <div className="bg-neuro-900/60 p-4 rounded-xl border border-neuro-500/20">
                      <div className="flex items-center gap-2 text-neuro-300 text-xs font-bold uppercase tracking-widest mb-2"><Target className="w-4 h-4" /> Session Goal</div>
                      <p className="text-xs text-gray-300 leading-relaxed">{activeProtocol.usageGoal}</p>
                    </div>
                  )}
                  <button onClick={() => onOpenModal('download')} className="w-full py-3 bg-neuro-800 hover:bg-neuro-700 border border-neuro-600 text-gray-300 hover:text-white font-bold rounded-lg transition-colors text-sm">Get Portable App</button>
                </div>

                <WavExporter protocol={activeProtocol} audioEngine={audioEngine} />
              </section>

              <section className="xl:col-span-5 flex flex-col gap-4 lg:gap-6 xl:pl-4 pb-10 min-w-0">
                {uiMode === 'guided' ? (
                  <>
                    {activeProtocol.optimalTimeOfDay && (
                      <div className="bg-neuro-800/40 border border-neuro-700 rounded-2xl p-5 flex items-center gap-4">
                        <Clock className="w-5 h-5 text-neuro-500 shrink-0" />
                        <div><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Best time</p><p className="text-sm text-gray-200 capitalize">{activeProtocol.optimalTimeOfDay.replace(/-/g, ' ')}</p></div>
                      </div>
                    )}
                    {activeProtocol.contraindications && activeProtocol.contraindications.length > 0 && (
                      <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6 flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-widest"><ShieldAlert className="w-4 h-4" /> Contraindications</div>
                        <ul className="text-xs text-red-300 space-y-1">{activeProtocol.contraindications.map((ci, i) => <li key={i}>• {ci}</li>)}</ul>
                      </div>
                    )}
                    <div className="bg-neuro-800/20 border border-neuro-700/40 rounded-2xl p-6 flex flex-col items-center gap-4 text-center">
                      <SlidersHorizontal className="w-8 h-8 text-neuro-700" />
                      <p className="text-xs text-gray-600 leading-relaxed max-w-[260px]">Expert mode unlocks fine-tuning controls, phase structure analysis, and full research context.</p>
                      <button onClick={() => { onSetUiMode('expert'); onSelectProtocol(null as any); }} className="px-5 py-2 text-xs font-bold font-mono uppercase tracking-widest bg-neuro-800 border border-neuro-700 rounded-lg text-neuro-400">Switch to Expert</button>
                    </div>
                  </>
                ) : (
                  <>
                    <PhaseTimeline protocol={activeProtocol} audioEngine={audioEngine} />
                    <div className="bg-neuro-800/40 border border-neuro-700 rounded-2xl p-4 sm:p-6"><ManualTuningPanel audioEngine={audioEngine} /></div>
                    {activeProtocol.algoDesc && (
                      <div className="bg-neuro-800/40 border border-neuro-700 rounded-2xl p-4 sm:p-6 flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-neuro-400 text-xs font-bold uppercase tracking-widest"><Microscope className="w-4 h-4" /> How It Works</div>
                        <div className="bg-neuro-900/60 p-4 rounded-xl border border-neuro-500/20 text-xs text-gray-300 font-mono leading-relaxed max-h-48 overflow-y-auto custom-scrollbar">{activeProtocol.algoDesc}</div>
                      </div>
                    )}
                    {activeProtocol.researchContext && (
                      <div className="bg-neuro-800/40 border border-neuro-700 rounded-2xl p-4 sm:p-6 flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest"><FileText className="w-4 h-4" /> Research Background</div>
                        <div className="bg-neuro-900/30 p-4 rounded-xl border border-neuro-700/50 text-xs text-gray-400 italic leading-relaxed max-h-48 overflow-y-auto custom-scrollbar">{activeProtocol.researchContext}</div>
                      </div>
                    )}
                    {activeProtocol.contraindications && activeProtocol.contraindications.length > 0 && (
                      <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-4 sm:p-6 flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-widest"><ShieldAlert className="w-4 h-4" /> Contraindications</div>
                        <ul className="text-xs text-red-300 space-y-1">{activeProtocol.contraindications.map((ci, i) => <li key={i}>• {ci}</li>)}</ul>
                      </div>
                    )}
                  </>
                )}
              </section>
            </div>
          ) : (
            <div className="h-full min-h-[240px] flex flex-col items-center justify-center text-center opacity-50 px-4">
              <Headphones className="w-16 h-16 sm:w-24 sm:h-24 text-neuro-700 mb-6" />
              <p className="text-base sm:text-lg font-mono uppercase tracking-widest">Choose a session from the panel</p>
              <p className="text-sm text-gray-600 mt-2">Put on headphones for the best experience</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export const DesktopApp = React.memo(DesktopAppComponent);
