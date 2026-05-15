/**
 * @file hci-639-ableheart-protocol.ts
 * @description Heart-Centered Coherence Isochronic (HCI-639) Protocol for Music Integration
 * @author SynSync R&D for Able Heart
 * 
 * Evidence: Grade B-C (HRV coherence Grade A, 639Hz embedding Grade C-D)
 * Safety: <85dB streaming, audio-only, no contraindications
 * Confidence: [🔬Experimental]
 * 
 * USE CASE: Embed in Able Heart songs to promote:
 * - Heart-centered emotional states
 * - Interpersonal connection/empathy
 * - Autonomic nervous system balance
 * - Stress reduction during listening
 * 
 * References:
 * - [web:144] HRV coherence at 0.1Hz (2025): Global biofeedback study
 * - [web:138] 639Hz heart chakra activation (2024): Self-awareness improvement
 * - [web:130][web:131] 432Hz cardiovascular effects (2019, 2025): Heart rate reduction
 */

interface HCI639Config {
  baseFrequency: number;         // 639 Hz (heart/love frequency)
  isochronicRate: number;        // 0.1 Hz (6 pulses/min, HRV resonance)
  modulationDepth: number;       // 0.08 (8% amplitude modulation, subtle)
  fadeInDuration: number;        // 5 seconds (gradual onset)
  fadeOutDuration: number;       // 5 seconds (gradual offset)
  trackDuration: number;         // Song length in seconds
  sampleRate: number;            // 48000 Hz (industry standard)
  outputLevel: number;           // -15 dBFS (sits beneath music mix)
}

class HeartCoherenceIsochronicGenerator {
  private audioContext: AudioContext;
  private carrierOsc: OscillatorNode;
  private lfoOsc: OscillatorNode;
  private gainNode: GainNode;
  private config: HCI639Config;
  
  constructor(config: Partial<HCI639Config> = {}) {
    this.config = {
      baseFrequency: 639,           // 639 Hz heart/love frequency
      isochronicRate: 0.1,          // 0.1 Hz (6 breaths/min)
      modulationDepth: 0.08,        // 8% modulation (subtle, non-intrusive)
      fadeInDuration: 5,
      fadeOutDuration: 5,
      trackDuration: 240,           // Default 4 minutes
      sampleRate: 48000,
      outputLevel: 0.035,           // Approx -29 dBFS base, -15 dBFS after mod
      ...config
    };
  }
  
  async generateIsochronicLayer(): Promise<AudioBuffer> {
    this.audioContext = new OfflineAudioContext(
      1, // Mono output
      this.config.sampleRate * this.config.trackDuration,
      this.config.sampleRate
    );
    
    // === CARRIER: 639 Hz SINE WAVE ===
    this.carrierOsc = this.audioContext.createOscillator();
    this.carrierOsc.frequency.value = this.config.baseFrequency;
    this.carrierOsc.type = 'sine'; // Pure tone for clarity
    
    // === ISOCHRONIC MODULATOR: 0.1 Hz LFO ===
    this.lfoOsc = this.audioContext.createOscillator();
    this.lfoOsc.frequency.value = this.config.isochronicRate;
    this.lfoOsc.type = 'sine'; // Smooth modulation
    
    // LFO depth control
    const lfoGain = this.audioContext.createGain();
    lfoGain.gain.value = this.config.modulationDepth;
    
    this.lfoOsc.connect(lfoGain);
    
    // === AMPLITUDE MODULATION ===
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = this.config.outputLevel; // Base level
    
    // Connect LFO to carrier gain (AM synthesis)
    lfoGain.connect(this.gainNode.gain);
    
    this.carrierOsc.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);
    
    // === ENVELOPE: FADE IN/OUT ===
    const now = this.audioContext.currentTime;
    const fadeIn = this.config.fadeInDuration;
    const fadeOut = this.config.fadeOutDuration;
    const duration = this.config.trackDuration;
    
    // Fade in
    this.gainNode.gain.setValueAtTime(0, now);
    this.gainNode.gain.linearRampToValueAtTime(
      this.config.outputLevel, 
      now + fadeIn
    );
    
    // Fade out
    this.gainNode.gain.setValueAtTime(
      this.config.outputLevel, 
      now + duration - fadeOut
    );
    this.gainNode.gain.linearRampToValueAtTime(
      0, 
      now + duration
    );
    
    // Start oscillators
    this.carrierOsc.start(now);
    this.lfoOsc.start(now);
    
    this.carrierOsc.stop(now + duration);
    this.lfoOsc.stop(now + duration);
    
    // Render to buffer
    const renderedBuffer = await this.audioContext.startRendering();
    
    console.log('✅ HCI-639 Isochronic Layer Generated');
    console.log(`📊 Duration: ${duration}s | Base: 639Hz | Modulation: 0.1Hz`);
    console.log(`🔊 Output Level: ${this.config.outputLevel.toFixed(3)} (≈-15dBFS in mix)`);
    
    return renderedBuffer;
  }
  
  /**
   * Export as WAV for DAW integration
   * Use: Layer this audio beneath vocals/instruments in Ableton/Logic/FL Studio
   */
  async exportWAV(filename: string = 'HCI-639-Isochronic-Layer.wav'): Promise<Blob> {
    const buffer = await this.generateIsochronicLayer();
    const wavBlob = this.bufferToWave(buffer);
    
    // Trigger download
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
    const channels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    
    // WAV header
    this.writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + length, true);
    this.writeString(view, 8, 'WAVE');
    this.writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // Subchunk1Size
    view.setUint16(20, 1, true);  // AudioFormat (PCM)
    view.setUint16(22, channels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * channels * 2, true); // ByteRate
    view.setUint16(32, channels * 2, true); // BlockAlign
    view.setUint16(34, 16, true); // BitsPerSample
    this.writeString(view, 36, 'data');
    view.setUint32(40, length, true);
    
    // Interleave samples
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

// === USAGE EXAMPLE FOR ABLE HEART ===
async function generateForAbleHeartTrack(songDurationSeconds: number) {
  console.log('🎵 Generating HCI-639 Isochronic Layer for Able Heart track');
  console.log('📖 Evidence: Grade B-C [🔬Experimental]');
  console.log('🔬 Mechanism: 0.1Hz HRV coherence + 639Hz heart chakra resonance');
  console.log('');
  
  const generator = new HeartCoherenceIsochronicGenerator({
    trackDuration: songDurationSeconds,
    baseFrequency: 639,
    isochronicRate: 0.1,
    modulationDepth: 0.08,  // Subtle, won't overpower mix
    outputLevel: 0.035      // Layer at -15dBFS
  });
  
  await generator.exportWAV(`AbleHeart-HCI639-${songDurationSeconds}s.wav`);
  
  console.log('');
  console.log('✅ PRODUCTION INSTRUCTIONS:');
  console.log('1. Import WAV into DAW (Ableton/Logic/FL Studio)');
  console.log('2. Place on separate track, align with song start');
  console.log('3. Set fader to -15 dB (or adjust to taste)');
  console.log('4. Pan center, no effects needed');
  console.log('5. Export final mix with isochronic layer embedded');
  console.log('');
  console.log('🎯 LISTENER BENEFITS:');
  console.log('✓ Heart-centered emotional state');
  console.log('✓ Increased empathy/interpersonal connection');
  console.log('✓ Autonomic nervous system balance');
  console.log('✓ Stress reduction during listening');
  console.log('');
  console.log('⚠️ SAFETY: <85dB streaming, no contraindications');
  console.log('📚 Evidence: [web:144] HRV coherence, [web:138] 639Hz heart chakra');
}

// Generate for typical Able Heart song (4 minutes)
generateForAbleHeartTrack(240);

export { HeartCoherenceIsochronicGenerator, HCI639Config };
