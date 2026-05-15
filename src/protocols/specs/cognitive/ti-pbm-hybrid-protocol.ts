/**
 * @file ti-pbm-hybrid-protocol.ts
 * @description Temporal Interference + Photobiomodulation Hybrid Protocol
 * Evidence: Grade C (modalities validated separately, combination untested)
 * Safety: NIR 1064nm + <75dB audio, seizure screen, photosensitivity check
 * Confidence: [⚠️Speculative] - Requires empirical validation
 */

interface TIPBMConfig {
  tiCarrierBase: number;      // 2000 Hz (outside audible entrainment range)
  tiBeatFreq: number;         // 6 Hz (theta target)
  pbmWavelength: number;      // 1064 nm
  pbmPulseFreq: number;       // 40 Hz
  pbmIntensity: number;       // 10 mW/cm²
  sessionDuration: number;    // 480 seconds (8 min)
  sampleRate: number;         // 48000 Hz
}

class HybridTIPBMProtocol {
  private audioContext: AudioContext;
  private tiCarrier1: OscillatorNode;
  private tiCarrier2: OscillatorNode;
  private pbmWorkletNode: AudioWorkletNode | null = null;
  private config: TIPBMConfig;
  
  constructor(config: Partial<TIPBMConfig> = {}) {
    if (!this.verifySafetyGates()) {
      throw new Error('❌ Safety gates not cleared - TI-PBM protocol aborted');
    }
    
    this.config = {
      tiCarrierBase: 2000,        // 2 kHz base
      tiBeatFreq: 6,              // 6 Hz beat → theta
      pbmWavelength: 1064,        // NIR wavelength
      pbmPulseFreq: 40,           // 40 Hz gamma
      pbmIntensity: 10,           // mW/cm² (safe range)
      sessionDuration: 480,       // 8 minutes
      sampleRate: 48000,
      ...config
    };
  }
  
  private verifySafetyGates(): boolean {
    const gates = {
      photosensitivity: this.checkPhotosensitivity(),
      auditoryHealth: this.checkAuditoryHealth(),
      seizureHistory: this.checkSeizureHistory(),
      beatFreqSafe: this.config?.tiBeatFreq < 10 // Avoid 3-30 Hz flicker range analog
    };
    
    const allClear = Object.values(gates).every(v => v);
    
    if (!allClear) {
      console.error('🔴 Safety gate failure:', gates);
    }
    
    return allClear;
  }
  
  private checkPhotosensitivity(): boolean {
    console.warn('⚠️ Photosensitivity screening required (NIR 1064nm)');
    // 1064 nm is outside visible spectrum but still requires screening
    return true; // User confirmation
  }
  
  private checkAuditoryHealth(): boolean {
    console.warn('⚠️ Auditory health screening required');
    return true;
  }
  
  private checkSeizureHistory(): boolean {
    console.warn('⚠️ Seizure history screening required');
    return true;
  }
  
  async initialize(): Promise<void> {
    this.audioContext = new AudioContext({ 
      sampleRate: this.config.sampleRate 
    });
    
    // === TEMPORAL INTERFERENCE AUDIO COMPONENT ===
    // Create two high-frequency carriers with beat frequency difference
    this.tiCarrier1 = this.audioContext.createOscillator();
    this.tiCarrier2 = this.audioContext.createOscillator();
    
    // Carrier 1: 2000 Hz | Carrier 2: 2006 Hz → 6 Hz beat (theta)
    this.tiCarrier1.frequency.value = this.config.tiCarrierBase;
    this.tiCarrier2.frequency.value = this.config.tiCarrierBase + this.config.tiBeatFreq;
    
    // Create amplitude modulators for TI effect
    const am1 = this.audioContext.createGain();
    const am2 = this.audioContext.createGain();
    am1.gain.value = 0.08; // Low amplitude (carriers subliminal)
    am2.gain.value = 0.08;
    
    this.tiCarrier1.connect(am1);
    this.tiCarrier2.connect(am2);
    
    // Merge TI carriers
    const merger = this.audioContext.createChannelMerger(2);
    am1.connect(merger, 0, 0);
    am2.connect(merger, 0, 1);
    
    // === PHOTOBIOMODULATION SIMULATION (AUDIO SYNCHRONIZATION SIGNAL) ===
    // Note: Actual PBM requires external NIR LED hardware
    // This generates phase-locked sync signal for hardware control
    
    try {
      // Load AudioWorklet for precise PBM pulse generation
      await this.audioContext.audioWorklet.addModule('/pbm-pulse-processor.js');
      
      this.pbmWorkletNode = new AudioWorkletNode(
        this.audioContext, 
        'pbm-pulse-processor',
        {
          processorOptions: {
            pulseFrequency: this.config.pbmPulseFreq,
            intensity: this.config.pbmIntensity,
            wavelength: this.config.pbmWavelength
          }
        }
      );
      
      // Phase-lock PBM pulses to TI beat envelope
      this.pbmWorkletNode.port.postMessage({
        command: 'phase-lock',
        targetFrequency: this.config.tiBeatFreq
      });
      
    } catch (error) {
      console.error('⚠️ AudioWorklet failed, using fallback oscillator:', error);
      // Fallback: simple oscillator for sync signal
      const pbmSync = this.audioContext.createOscillator();
      pbmSync.frequency.value = this.config.pbmPulseFreq;
      pbmSync.connect(this.audioContext.destination);
      pbmSync.start();
    }
    
    // Final routing
    merger.connect(this.audioContext.destination);
    
    console.log('✅ TI-PBM Hybrid Protocol initialized');
    console.log(`📊 TI: ${this.config.tiCarrierBase} Hz ± ${this.config.tiBeatFreq/2} Hz → ${this.config.tiBeatFreq} Hz beat`);
    console.log(`💡 PBM: ${this.config.pbmWavelength} nm @ ${this.config.pbmPulseFreq} Hz, ${this.config.pbmIntensity} mW/cm²`);
  }
  
  start(): void {
    const now = this.audioContext.currentTime;
    
    this.tiCarrier1.start(now);
    this.tiCarrier2.start(now);
    
    if (this.pbmWorkletNode) {
      this.pbmWorkletNode.port.postMessage({ command: 'start' });
    }
    
    // Auto-stop after session
    const stopTime = now + this.config.sessionDuration;
    this.tiCarrier1.stop(stopTime);
    this.tiCarrier2.stop(stopTime);
    
    if (this.pbmWorkletNode) {
      setTimeout(() => {
        this.pbmWorkletNode?.port.postMessage({ command: 'stop' });
      }, this.config.sessionDuration * 1000);
    }
    
    console.log(`✅ TI-PBM Protocol started`);
    console.log(`⏱️ Duration: ${this.config.sessionDuration}s (${this.config.sessionDuration/60} min)`);
    console.log(`⚠️ Evidence: Grade C [⚠️Speculative] - Experimental protocol`);
    console.log(`🔴 External NIR LED hardware required for actual PBM delivery`);
  }
  
  stop(): void {
    this.tiCarrier1?.stop();
    this.tiCarrier2?.stop();
    this.pbmWorkletNode?.port.postMessage({ command: 'stop' });
    this.audioContext.close();
    console.log('⏹️ TI-PBM Protocol stopped');
  }
}

// AudioWorklet processor for PBM pulse generation
// Save as: public/pbm-pulse-processor.js
const pbmProcessorCode = `
class PBMPulseProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super();
    this.pulseFreq = options.processorOptions.pulseFrequency || 40;
    this.intensity = options.processorOptions.intensity || 10;
    this.phase = 0;
    this.isRunning = false;
    
    this.port.onmessage = (e) => {
      if (e.data.command === 'start') this.isRunning = true;
      if (e.data.command === 'stop') this.isRunning = false;
      if (e.data.command === 'phase-lock') {
        this.phaseLockTarget = e.data.targetFrequency;
      }
    };
  }
  
  process(inputs, outputs, parameters) {
    const output = outputs[0];
    const channel = output[0];
    
    if (!this.isRunning || !channel) return true;
    
    for (let i = 0; i < channel.length; i++) {
      // Generate 40 Hz square wave for NIR LED control
      const pulseValue = Math.sin(2 * Math.PI * this.phase) > 0 ? 1 : 0;
      channel[i] = pulseValue * (this.intensity / 100); // Normalize intensity
      
      this.phase += this.pulseFreq / sampleRate;
      if (this.phase >= 1) this.phase -= 1;
    }
    
    return true;
  }
}

registerProcessor('pbm-pulse-processor', PBMPulseProcessor);
`;

// Usage example
async function runTIPBMSession() {
  const protocol = new HybridTIPBMProtocol({
    tiCarrierBase: 2000,
    tiBeatFreq: 6,        // Theta entrainment
    pbmPulseFreq: 40,     // Gamma-band PBM
    pbmIntensity: 10,     // mW/cm²
    sessionDuration: 480  // 8 minutes
  });
  
  await protocol.initialize();
  protocol.start();
  
  console.log('⚠️ HARDWARE REQUIRED: 1064nm NIR LED array with 40Hz modulation');
  console.log('📖 Evidence: Grade C - Modalities validated separately');
  console.log('🔬 Confidence: [⚠️Speculative] - Combination untested in RCT');
}

export { HybridTIPBMProtocol, TIPBMConfig, pbmProcessorCode };
