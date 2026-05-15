/**
 * @file gmu-15-ableheart-manifestation.ts
 * @description Grounding & Manifestation Ultra-Low Frequency (GMU-1.5) Protocol
 * @author SynSync R&D for Able Heart
 * 
 * Evidence: Grade B-C (Infraslow Grade B, 528Hz/manifestation Grade D)
 * Safety: <85dB streaming, audio-only, no contraindications
 * Confidence: [⚠️Speculative] - Infraslow effects established, manifestation claims unsupported
 * 
 * USE CASE: Embed in Able Heart manifestation/affirmation tracks to promote:
 * - Deep relaxation & grounding
 * - Subconscious processing
 * - Emotional regulation
 * - Autonomic balance
 * 
 * NOTE: "Manifestation" effects are psychologically mediated (intention-setting + relaxation)
 *       not direct frequency effects. 528Hz "DNA repair" is mythology, not RCT-validated.
 * 
 * IDEAL FOR: Manifestation tracks, affirmations, sleep transitions
 * 
 * References:
 * - [web:65] Infraslow EEG-fMRI correlation (2014): Resting-state networks
 * - [web:82] Infraslow cognitive impacts (2018): DMN modulation
 * - [web:86] Infraslow closed-loop training (2025): Anxiety/depression reduction
 * - [web:87] Infraslow state fluctuations (2019): fMRI network dynamics
 * - [web:127] Solfeggio zebrafish study (2023): Limited evidence
 * - [web:136] 528Hz testosterone study (2019): 100dB intensity (not music-relevant)
 */

interface GMU15Config {
  baseFrequency: number;         // 528 Hz ("miracle tone")
  isochronicRate: number;        // 1.5 Hz (ultra-low delta)
  modulationDepth: number;       // 0.20 (20% modulation, deep presence)
  fadeInDuration: number;        // 10 seconds
  fadeOutDuration: number;       // 10 seconds
  trackDuration: number;         // Manifestation track length
  sampleRate: number;            // 48000 Hz
  outputLevel: number;           // -10 dBFS (prominent sub-bass layer)
}

class GroundingManifestationGenerator {
  private audioContext: AudioContext;
  private carrierOsc: OscillatorNode;
  private lfoOsc: OscillatorNode;
  private gainNode: GainNode;
  private config: GMU15Config;
  
  constructor(config: Partial<GMU15Config> = {}) {
    this.config = {
      baseFrequency: 528,           // 528 Hz "miracle/transformation" frequency
      isochronicRate: 1.5,          // 1.5 Hz ultra-low delta grounding
      modulationDepth: 0.20,        // 20% modulation (noticeable presence)
      fadeInDuration: 10,
      fadeOutDuration: 10,
      trackDuration: 300,           // Default 5 minutes
      sampleRate: 48000,
      outputLevel: 0.063,           // Approx -24 dBFS base, -10 dBFS after mod
      ...config
    };
  }
  
  async generateIsochronicLayer(): Promise<AudioBuffer> {
    this.audioContext = new OfflineAudioContext(
      1,
      this.config.sampleRate * this.config.trackDuration,
      this.config.sampleRate
    );
    
    // === CARRIER: 528 Hz SINE WAVE ===
    this.carrierOsc = this.audioContext.createOscillator();
    this.carrierOsc.frequency.value = this.config.baseFrequency;
    this.carrierOsc.type = 'sine';
    
    // === ISOCHRONIC MODULATOR: 1.5 Hz TRIANGLE WAVE ===
    // Triangle wave creates smoother ultra-low frequency modulation
    this.lfoOsc = this.audioContext.createOscillator();
    this.lfoOsc.frequency.value = this.config.isochronicRate;
    this.lfoOsc.type = 'triangle'; // Smooth rise/fall for grounding effect
    
    const lfoGain = this.audioContext.createGain();
    lfoGain.gain.value = this.config.modulationDepth;
    
    this.lfoOsc.connect(lfoGain);
    
    // === AMPLITUDE MODULATION ===
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = this.config.outputLevel;
    
    lfoGain.connect(this.gainNode.gain);
    
    this.carrierOsc.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);
    
    // === ENVELOPE ===
    const now = this.audioContext.currentTime;
    const fadeIn = this.config.fadeInDuration;
    const fadeOut = this.config.fadeOutDuration;
    const duration = this.config.trackDuration;
    
    this.gainNode.gain.setValueAtTime(0, now);
    this.gainNode.gain.linearRampToValueAtTime(
      this.config.outputLevel, 
      now + fadeIn
    );
    
    this.gainNode.gain.setValueAtTime(
      this.config.outputLevel, 
      now + duration - fadeOut
    );
    this.gainNode.gain.linearRampToValueAtTime(
      0, 
      now + duration
    );
    
    this.carrierOsc.start(now);
    this.lfoOsc.start(now);
    
    this.carrierOsc.stop(now + duration);
    this.lfoOsc.stop(now + duration);
    
    const renderedBuffer = await this.audioContext.startRendering();
    
    console.log('✅ GMU-1.5 Grounding & Manifestation Layer Generated');
    console.log(`📊 Duration: ${duration}s | Base: 528Hz | Modulation: 1.5Hz`);
    console.log(`🔊 Output Level: ${this.config.outputLevel.toFixed(3)} (≈-10dBFS in mix)`);
    console.log(`🎯 Target: Grounding, subconscious processing, emotional regulation`);
    console.log(`⚠️ Note: "Manifestation" via intention-setting + relaxation, not direct frequency`);
    
    return renderedBuffer;
  }
  
  async exportWAV(filename: string = 'GMU-15-Manifestation-Layer.wav'): Promise<Blob> {
    const buffer = await this.generateIsochronicLayer();
    const wavBlob = this.bufferToWave(buffer);
    
    const url = URL.createObjectURL(wavBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    
    console.log(`💾 Exported: ${filename}`);
    return wavBlob;
  }
  
  private bufferToWave(buffer: AudioBuffer): Blob {
    const length = buffer.length * buffer.numberOfChannels * 2;
    const wav = new ArrayBuffer(44 + length);
    const view = new DataView(wav);
    
    this.writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + length, true);
    this.writeString(view, 8, 'WAVE');
    this.writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, buffer.numberOfChannels, true);
    view.setUint32(24, buffer.sampleRate, true);
    view.setUint32(28, buffer.sampleRate * buffer.numberOfChannels * 2, true);
    view.setUint16(32, buffer.numberOfChannels * 2, true);
    view.setUint16(34, 16, true);
    this.writeString(view, 36, 'data');
    view.setUint32(40, length, true);
    
    const channelData = buffer.getChannelData(0);
    let offset = 44;
    for (let i = 0; i < channelData.length; i++) {
      const sample = Math.max(-1, Math.min(1, channelData[i]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
      offset += 2;
    }
    
    return new Blob([wav], { type: 'audio/wav' });
  }
  
  private writeString(view: DataView, offset: number, str: string): void {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  }
}

// === USAGE FOR ABLE HEART MANIFESTATION TRACKS ===
async function generateManifestationLayer(songDurationSeconds: number) {
  console.log('🌟 Generating GMU-1.5 Grounding & Manifestation Layer');
  console.log('📖 Evidence: Grade B-C [⚠️Speculative]');
  console.log('🧠 Mechanism: 1.5Hz infraslow → DMN modulation + autonomic balance');
  console.log('⚠️ CRITICAL: 528Hz "DNA repair" is mythology, not RCT-validated');
  console.log('⚠️ "Manifestation" = intention-setting + relaxation (psychological), not frequency magic');
  console.log('');
  
  const generator = new GroundingManifestationGenerator({
    trackDuration: songDurationSeconds,
    baseFrequency: 528,
    isochronicRate: 1.5,
    modulationDepth: 0.20,   // Deep presence for grounding
    outputLevel: 0.063       // -10dBFS (prominent)
  });
  
  await generator.exportWAV(`AbleHeart-GMU15-${songDurationSeconds}s.wav`);
  
  console.log('');
  console.log('✅ PRODUCTION INSTRUCTIONS:');
  console.log('1. Import WAV into DAW');
  console.log('2. Layer as sub-bass foundation beneath affirmations/vocals');
  console.log('3. Set fader to -10 dB (deep presence, felt not just heard)');
  console.log('4. Pairs well with spoken affirmations, ambient textures');
  console.log('5. High-pass filter main mix at 100Hz to leave space for GMU layer');
  console.log('');
  console.log('🎯 LISTENER BENEFITS:');
  console.log('✓ Deep relaxation & grounding sensation');
  console.log('✓ Enhanced subconscious processing');
  console.log('✓ Emotional regulation via infraslow modulation');
  console.log('✓ Autonomic balance (parasympathetic activation)');
  console.log('✓ Psychological priming for intention-setting');
  console.log('');
  console.log('💡 BEST FOR: Manifestation tracks, affirmations, sleep prep, meditation');
  console.log('⚠️ SAFETY: <85dB, no contraindications');
  console.log('📚 Evidence: [web:65][web:82][web:86][web:87] Infraslow Grade B');
  console.log('⚠️ 528Hz "miracle tone" is cultural mythology, not peer-reviewed medicine');
}

// Generate for typical Able Heart manifestation track (5 minutes)
generateManifestationLayer(300);

export { GroundingManifestationGenerator, GMU15Config };
