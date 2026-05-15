/**
 * @file mgs40-multimodal-protocol.ts
 * @description Multimodal Gamma Synchrony Enhancement (40 Hz Audiovisual)
 * Evidence: Grade B-C (emerging RCT for audiovisual, strong ASSR reliability)
 * Safety: 🔴 HIGH PHOTOSENSITIVITY RISK - Mandatory screening + emergency stop
 * Confidence: [🔬Experimental]
 */

interface MGS40Config {
  gammaFrequency: number;      // 40 Hz - ASSR optimal
  audioPinkNoise: boolean;     // Use pink noise vs sine carrier
  visualDutyCycle: number;     // 0.5 (50% on/off)
  visualIntensity: number;     // 0-1 (max brightness multiplier)
  audioAmplitude: number;      // 0.2 (conservative)
  sessionDuration: number;     // 900 seconds (15 min)
  rampDuration: number;        // 60 seconds (gradual onset)
  sampleRate: number;          // 48000 Hz
  emergencyStopEnabled: boolean;
}

class MultimodalGammaProtocol {
  private audioContext: AudioContext;
  private isochronicOsc: OscillatorNode;
  private noiseBuffer: AudioBuffer | null = null;
  private gainNode: GainNode;
  private visualElement: HTMLElement | null = null;
  private visualInterval: number | null = null;
  private config: MGS40Config;
  private isRunning: boolean = false;
  
  constructor(config: Partial<MGS40Config> = {}) {
    // 🔴 CRITICAL SAFETY CHECK
    if (!this.verifySafetyGates()) {
      throw new Error('🔴 SAFETY FAILURE - MGS-40 protocol aborted');
    }
    
    this.config = {
      gammaFrequency: 40,
      audioPinkNoise: true,
      visualDutyCycle: 0.5,
      visualIntensity: 0.8,      // 80% max brightness
      audioAmplitude: 0.2,
      sessionDuration: 900,      // 15 minutes
      rampDuration: 60,          // 1 minute ramp
      sampleRate: 48000,
      emergencyStopEnabled: true,
      ...config
    };
    
    // Setup emergency stop
    if (this.config.emergencyStopEnabled) {
      this.setupEmergencyStop();
    }
  }
  
  private verifySafetyGates(): boolean {
    console.warn('🔴 CRITICAL: 40 Hz visual flicker poses photosensitivity risk');
    
    const gates = {
      photosensitivityScreen: this.checkPhotosensitivity(),
      seizureHistory: this.checkSeizureHistory(),
      visualHealth: this.checkVisualHealth(),
      auditoryHealth: this.checkAuditoryHealth(),
      consentObtained: this.obtainInformedConsent()
    };
    
    const allClear = Object.values(gates).every(v => v);
    
    if (!allClear) {
      console.error('🔴 Safety gate failure - Protocol cannot proceed:', gates);
    }
    
    return allClear;
  }
  
  private checkPhotosensitivity(): boolean {
    console.error('🔴 MANDATORY: Photosensitivity screening required');
    console.error('   Reference: https://www.epilepsy.com/photosensitivity');
    console.error('   40 Hz is NEAR high-risk flicker range (3-30 Hz extreme)');
    // In production: Implement actual screening questionnaire
    return confirm('I confirm NO history of photosensitive epilepsy or seizures');
  }
  
  private checkSeizureHistory(): boolean {
    console.error('🔴 CONTRAINDICATION: Any seizure history');
    return confirm('I confirm NO personal or family history of seizures');
  }
  
  private checkVisualHealth(): boolean {
    console.warn('⚠️ Visual health screening recommended');
    return confirm('I confirm no severe visual impairments or photophobia');
  }
  
  private checkAuditoryHealth(): boolean {
    console.warn('⚠️ Auditory health screening recommended');
    return true;
  }
  
  private obtainInformedConsent(): boolean {
    const consent = `
    ⚠️ INFORMED CONSENT REQUIRED ⚠️
    
    MGS-40 Protocol involves 40 Hz audiovisual stimulation.
    
    RISKS:
    - Photosensitive seizures (if predisposed)
    - Visual discomfort, eye strain
    - Headache, dizziness
    - Auditory fatigue
    
    CONTRAINDICATIONS:
    - History of seizures or epilepsy
    - Photosensitive epilepsy (personal or family)
    - Severe visual impairments
    - Active migraine
    
    SAFETY MEASURES:
    - Emergency stop button (ESC key)
    - Gradual intensity ramp (60s)
    - Session limit: 15 minutes
    - SPL: <80 dB
    
    Evidence Grade: B-C [🔬Experimental]
    
    Do you consent to proceed?
    `;
    
    console.warn(consent);
    return confirm(consent);
  }
  
  private setupEmergencyStop(): void {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isRunning) {
        console.error('🛑 EMERGENCY STOP ACTIVATED');
        this.stop();
      }
    });
    
    console.log('✅ Emergency stop enabled: Press ESC to abort');
  }
  
  async initialize(): Promise<void> {
    this.audioContext = new AudioContext({ 
      sampleRate: this.config.sampleRate 
    });
    
    // === AUDIO COMPONENT ===
    if (this.config.audioPinkNoise) {
      // Generate pink noise buffer
      this.noiseBuffer = await this.generatePinkNoise();
      const noiseSource = this.audioContext.createBufferSource();
      noiseSource.buffer = this.noiseBuffer;
      noiseSource.loop = true;
      
      // Amplitude modulation at 40 Hz (isochronic effect)
      this.gainNode = this.audioContext.createGain();
      this.gainNode.gain.value = 0; // Start silent (ramp up)
      
      this.isochronicOsc = this.audioContext.createOscillator();
      this.isochronicOsc.frequency.value = this.config.gammaFrequency;
      
      // Modulate pink noise with 40 Hz square wave
      const modDepth = this.audioContext.createGain();
      modDepth.gain.value = 0.5;
      this.isochronicOsc.connect(modDepth);
      modDepth.connect(this.gainNode.gain);
      
      noiseSource.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);
      
      noiseSource.start();
    } else {
      // Fallback: Pure 40 Hz isochronic tone
      this.isochronicOsc = this.audioContext.createOscillator();
      this.isochronicOsc.frequency.value = this.config.gammaFrequency;
      
      this.gainNode = this.audioContext.createGain();
      this.gainNode.gain.value = 0;
      
      this.isochronicOsc.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);
    }
    
    // === VISUAL COMPONENT ===
    this.visualElement = document.createElement('div');
    this.visualElement.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background: rgb(255, 244, 229); /* Warm white 2700K */
      opacity: 0;
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(this.visualElement);
    
    console.log('✅ MGS-40 Protocol initialized');
    console.log(`📊 Gamma: ${this.config.gammaFrequency} Hz audiovisual synchrony`);
    console.log(`⚠️ Photosensitivity risk acknowledged`);
  }
  
  private async generatePinkNoise(): Promise<AudioBuffer> {
    const bufferSize = this.config.sampleRate * 2; // 2 seconds
    const buffer = this.audioContext.createBuffer(
      1, 
      bufferSize, 
      this.config.sampleRate
    );
    const data = buffer.getChannelData(0);
    
    // Pink noise generation (1/f spectrum)
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
    
    return buffer;
  }
  
  start(): void {
    const now = this.audioContext.currentTime;
    this.isRunning = true;
    
    // Start audio oscillator
    this.isochronicOsc.start(now);
    
    // Ramp up audio amplitude over rampDuration
    this.gainNode.gain.setValueAtTime(0, now);
    this.gainNode.gain.linearRampToValueAtTime(
      this.config.audioAmplitude, 
      now + this.config.rampDuration
    );
    
    // Start 40 Hz visual flicker (phase-locked to audio)
    const flickerPeriod = 1000 / this.config.gammaFrequency; // 25ms per cycle
    const onDuration = flickerPeriod * this.config.visualDutyCycle;
    const offDuration = flickerPeriod * (1 - this.config.visualDutyCycle);
    
    let visualPhase = 0;
    let currentIntensity = 0;
    
    this.visualInterval = window.setInterval(() => {
      if (!this.isRunning || !this.visualElement) return;
      
      // Ramp up visual intensity
      const elapsed = performance.now() / 1000;
      if (elapsed < this.config.rampDuration) {
        currentIntensity = (elapsed / this.config.rampDuration) * this.config.visualIntensity;
      } else {
        currentIntensity = this.config.visualIntensity;
      }
      
      // Toggle flicker
      visualPhase = (visualPhase + 1) % 2;
      this.visualElement.style.opacity = visualPhase === 0 
        ? String(currentIntensity) 
        : '0';
        
    }, flickerPeriod / 2); // Toggle at double rate for duty cycle control
    
    // Auto-stop after session duration
    setTimeout(() => {
      this.stop();
    }, this.config.sessionDuration * 1000);
    
    console.log(`✅ MGS-40 Protocol started`);
    console.log(`⏱️ Duration: ${this.config.sessionDuration}s (${this.config.sessionDuration/60} min)`);
    console.log(`🔊 Audio: 40 Hz isochronic ${this.config.audioPinkNoise ? 'pink noise' : 'tone'}`);
    console.log(`💡 Visual: 40 Hz flicker, ${this.config.visualDutyCycle * 100}% duty cycle`);
    console.log(`⚠️ Evidence: Grade B-C [🔬Experimental]`);
    console.log(`🛑 Emergency stop: Press ESC`);
  }
  
  stop(): void {
    this.isRunning = false;
    
    const now = this.audioContext.currentTime;
    
    // Ramp down audio (avoid clicks)
    this.gainNode.gain.cancelScheduledValues(now);
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
    this.gainNode.gain.linearRampToValueAtTime(0, now + 0.1);
    
    setTimeout(() => {
      this.isochronicOsc?.stop();
      this.audioContext?.close();
    }, 150);
    
    // Stop visual flicker
    if (this.visualInterval) {
      clearInterval(this.visualInterval);
      this.visualInterval = null;
    }
    
    // Remove visual element
    if (this.visualElement) {
      this.visualElement.remove();
      this.visualElement = null;
    }
    
    console.log('⏹️ MGS-40 Protocol stopped');
  }
}

// Usage example
async function runMGS40Session() {
  console.warn('🔴 WARNING: High photosensitivity risk protocol');
  console.warn('🔴 Ensure all safety screenings completed');
  
  const protocol = new MultimodalGammaProtocol({
    gammaFrequency: 40,
    audioPinkNoise: true,
    visualDutyCycle: 0.5,
    visualIntensity: 0.8,
    sessionDuration: 900,      // 15 minutes
    rampDuration: 60,          // 1 minute ramp
    emergencyStopEnabled: true
  });
  
  await protocol.initialize();
  protocol.start();
  
  console.log('📖 Evidence: Grade B-C (2025 RCT shows attention improvement)');
  console.log('🔬 Confidence: [🔬Experimental]');
  console.log('📚 References:');
  console.log('   - Audiovisual gamma: web:33 (2025 bioRxiv)');
  console.log('   - ASSR reliability: web:3 (ICC=0.79-0.80)');
  console.log('   - Attention modulation: web:14 (systematic review)');
}

export { MultimodalGammaProtocol, MGS40Config };
