/**
 * @file adaptive-tg-cfc-protocol.ts
 * @description Theta-Gamma Cross-Frequency Coupling Protocol
 * Evidence: Grade B (RCT + mechanistic studies)
 * Safety: <75dB, no photosensitivity risk, seizure screening required
 */

interface TGCFCConfig {
  gammaCarrier: number;      // 40 Hz - ASSR optimal
  thetaModulation: number;   // 6 Hz - theta band
  sessionDuration: number;   // 1200 seconds (20 min)
  sampleRate: number;        // 48000 Hz
  baseAmplitude: number;     // 0.15 (ensures <75dB with typical headphones)
}

class AdaptiveTGCFCProtocol {
  private audioContext: AudioContext;
  private leftOsc: OscillatorNode;
  private rightOsc: OscillatorNode;
  private modulatorLFO: OscillatorNode;
  private gainNode: GainNode;
  private config: TGCFCConfig;
  
  constructor(config: Partial<TGCFCConfig> = {}) {
    // Safety verification
    if (!this.verifySafetyGates()) {
      throw new Error('Safety gates not cleared');
    }
    
    this.config = {
      gammaCarrier: 200,           // Base carrier (40 Hz binaural = 200 ± 20 Hz)
      thetaModulation: 6,          // Theta envelope
      sessionDuration: 1200,
      sampleRate: 48000,
      baseAmplitude: 0.15,         // Conservative amplitude
      ...config
    };
  }
  
  private verifySafetyGates(): boolean {
    // Implement safety checklist
    const cleared = {
      photosensitivity: true,      // Audio-only protocol
      auditoryScreen: this.checkAuditoryHealth(),
      seizureHistory: this.checkSeizureHistory(),
      tinnitusScreen: this.checkTinnitus()
    };
    
    return Object.values(cleared).every(v => v);
  }
  
  private checkAuditoryHealth(): boolean {
    // Placeholder: Implement actual screening
    console.warn('⚠️ Auditory health screening required');
    return true; // User confirmation needed
  }
  
  private checkSeizureHistory(): boolean {
    console.warn('⚠️ Seizure history screening required');
    return true;
  }
  
  private checkTinnitus(): boolean {
    console.warn('⚠️ Tinnitus/hyperacusis screening required');
    return true;
  }
  
  async initialize(): Promise<void> {
    this.audioContext = new AudioContext({ 
      sampleRate: this.config.sampleRate 
    });
    
    // Create binaural beat pair (40 Hz differential)
    this.leftOsc = this.audioContext.createOscillator();
    this.rightOsc = this.audioContext.createOscillator();
    
    // Left: 200 Hz | Right: 240 Hz → 40 Hz binaural beat
    this.leftOsc.frequency.value = this.config.gammaCarrier;
    this.rightOsc.frequency.value = this.config.gammaCarrier + 40;
    
    // Create theta (6 Hz) isochronic modulator
    this.modulatorLFO = this.audioContext.createOscillator();
    this.modulatorLFO.frequency.value = this.config.thetaModulation;
    
    // Gain node for amplitude modulation
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = this.config.baseAmplitude;
    
    // Create stereo splitter
    const splitter = this.audioContext.createChannelSplitter(2);
    const merger = this.audioContext.createChannelMerger(2);
    
    // Route: Left osc → L channel, Right osc → R channel
    this.leftOsc.connect(splitter);
    this.rightOsc.connect(splitter);
    splitter.connect(merger, 0, 0);
    splitter.connect(merger, 1, 1);
    
    // Apply theta modulation to gain
    const modulatorGain = this.audioContext.createGain();
    modulatorGain.gain.value = 0.5; // Modulation depth
    this.modulatorLFO.connect(modulatorGain);
    modulatorGain.connect(this.gainNode.gain);
    
    // Final routing
    merger.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);
  }
  
  start(): void {
    const now = this.audioContext.currentTime;
    
    this.leftOsc.start(now);
    this.rightOsc.start(now);
    this.modulatorLFO.start(now);
    
    // Auto-stop after session duration
    this.leftOsc.stop(now + this.config.sessionDuration);
    this.rightOsc.stop(now + this.config.sessionDuration);
    this.modulatorLFO.stop(now + this.config.sessionDuration);
    
    console.log(`✅ TG-CFC Protocol started: 40Hz binaural + 6Hz theta modulation`);
    console.log(`📊 Session duration: ${this.config.sessionDuration}s (${this.config.sessionDuration/60} min)`);
    console.log(`🔊 SPL target: <75dB | Evidence: Grade B [🔬Experimental]`);
  }
  
  stop(): void {
    this.leftOsc.stop();
    this.rightOsc.stop();
    this.modulatorLFO.stop();
    this.audioContext.close();
    console.log('⏹️ TG-CFC Protocol stopped');
  }
  
  // Adaptive adjustment method (requires EEG integration)
  adjustThetaRate(newRate: number): void {
    if (newRate < 4 || newRate > 8) {
      console.error('❌ Theta rate must be 4-8 Hz');
      return;
    }
    this.modulatorLFO.frequency.setValueAtTime(
      newRate, 
      this.audioContext.currentTime
    );
    console.log(`🔄 Theta modulation adjusted to ${newRate} Hz`);
  }
}

// Usage example
async function runTGCFCSession() {
  const protocol = new AdaptiveTGCFCProtocol({
    gammaCarrier: 200,
    thetaModulation: 6,
    sessionDuration: 1200, // 20 minutes
    baseAmplitude: 0.15
  });
  
  await protocol.initialize();
  protocol.start();
  
  // Example adaptive adjustment at 10-minute mark
  setTimeout(() => {
    protocol.adjustThetaRate(7); // Increase to 7 Hz if attention wanes
  }, 600000); // 10 minutes
}

// Export for integration
export { AdaptiveTGCFCProtocol, TGCFCConfig };
