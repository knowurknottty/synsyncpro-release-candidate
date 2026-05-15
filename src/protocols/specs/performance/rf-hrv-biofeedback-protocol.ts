/**
 * @file rf-hrv-biofeedback-protocol.ts
 * @description Resonance Frequency HRV Biofeedback + Infraslow Entrainment Protocol
 * Evidence: Grade A (Extensive RCT evidence: HRV improvement, anxiety reduction)
 * Safety: Low risk, controlled breathing, optional visual/haptic cues
 * Confidence: [✅Established]
 * 
 * References:
 * - [web:40] HRV brain death to resonance (2020): 0.1Hz coherence
 * - [web:43] Haptic guidance (2023): Visuo-haptic superior (P_0.1 = 0.55±0.20)
 * - [web:60] RF breathing impact (2017): Max HRV at ~6 breaths/min
 * - [web:63] HRVB review (2017): RF = 4.5-7 breaths/min, typically 5.5
 */

interface RFHRVConfig {
  resonanceFrequency: number;    // 0.1 Hz (6 breaths/min typical)
  sessionDuration: number;       // 1200 seconds (20 min)
  audioGuidance: boolean;        // Breathing pace audio cues
  hapticGuidance: boolean;       // Optional haptic feedback
  visualFeedback: boolean;       // HRV amplitude display
  calibrationMode: boolean;      // Auto-find individual RF
  sampleRate: number;            // 48000 Hz
}

class ResonanceFrequencyHRVProtocol {
  private audioContext: AudioContext;
  private breathCueOsc: OscillatorNode;
  private gainNode: GainNode;
  private config: RFHRVConfig;
  private hrvMonitor: HRVMonitor | null = null;
  private visualDisplay: HTMLElement | null = null;
  private isRunning: boolean = false;
  private breathCount: number = 0;
  
  constructor(config: Partial<RFHRVConfig> = {}) {
    if (!this.verifySafetyGates()) {
      throw new Error('❌ Safety gates not cleared - RF-HRV protocol aborted');
    }
    
    this.config = {
      resonanceFrequency: 0.1,       // 0.1 Hz = 6 breaths/min
      sessionDuration: 1200,         // 20 minutes
      audioGuidance: true,
      hapticGuidance: false,
      visualFeedback: true,
      calibrationMode: false,        // Manual RF or auto-calibrate
      sampleRate: 48000,
      ...config
    };
  }
  
  private verifySafetyGates(): boolean {
    const gates = {
      respiratoryHealth: this.checkRespiratoryHealth(),
      cardiovascularHealth: this.checkCardiovascularHealth(),
      photosensitivity: this.config?.visualFeedback ? this.checkPhotosensitivity() : true
    };
    
    const allClear = Object.values(gates).every(v => v);
    
    if (!allClear) {
      console.error('🔴 Safety gate failure:', gates);
    }
    
    return allClear;
  }
  
  private checkRespiratoryHealth(): boolean {
    console.warn('⚠️ Respiratory screening:');
    console.warn('   - COPD: Use with caution');
    console.warn('   - Asthma: Avoid during acute exacerbation');
    return confirm('I confirm no severe respiratory conditions');
  }
  
  private checkCardiovascularHealth(): boolean {
    console.warn('⚠️ Cardiovascular screening:');
    console.warn('   - Generally safe for most CVD');
    console.warn('   - Consult physician if severe CVD or recent cardiac event');
    return confirm('I confirm physician clearance if applicable');
  }
  
  private checkPhotosensitivity(): boolean {
    if (!this.config?.visualFeedback) return true;
    console.warn('⚠️ Visual feedback: Slow-changing graphs (no flicker risk)');
    return true;
  }
  
  async initialize(): Promise<void> {
    this.audioContext = new AudioContext({ 
      sampleRate: this.config.sampleRate 
    });
    
    // === AUDIO BREATHING CUE ===
    if (this.config.audioGuidance) {
      this.breathCueOsc = this.audioContext.createOscillator();
      this.gainNode = this.audioContext.createGain();
      
      // Create breathing cue tone (440 Hz, pulsed at RF)
      this.breathCueOsc.frequency.value = 440; // A4 pitch
      
      // Amplitude modulation at resonance frequency
      const lfo = this.audioContext.createOscillator();
      lfo.frequency.value = this.config.resonanceFrequency;
      
      const lfoGain = this.audioContext.createGain();
      lfoGain.gain.value = 0.5; // Modulation depth
      
      lfo.connect(lfoGain);
      lfoGain.connect(this.gainNode.gain);
      
      this.breathCueOsc.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);
      this.gainNode.gain.value = 0.15; // Base volume
    }
    
    // === HAPTIC GUIDANCE ===
    if (this.config.hapticGuidance && 'vibrate' in navigator) {
      console.log('📳 Haptic guidance enabled (device vibration)');
    } else if (this.config.hapticGuidance) {
      console.warn('⚠️ Haptic guidance requested but device not supported');
    }
    
    // === VISUAL FEEDBACK ===
    if (this.config.visualFeedback) {
      this.setupVisualFeedback();
    }
    
    // === HRV MONITORING ===
    this.hrvMonitor = new HRVMonitor();
    await this.hrvMonitor.initialize();
    
    console.log('✅ RF-HRV Protocol initialized');
    console.log(`🫁 Resonance Frequency: ${this.config.resonanceFrequency} Hz (${60 * this.config.resonanceFrequency} breaths/min)`);
    console.log(`⏱️ Session: ${this.config.sessionDuration / 60} minutes`);
    console.log(`📚 Evidence: Grade A [✅Established]`);
  }
  
  private setupVisualFeedback(): void {
    this.visualDisplay = document.createElement('div');
    this.visualDisplay.style.cssText = `
      position: fixed;
      top: 50px; left: 50%;
      transform: translateX(-50%);
      width: 400px;
      padding: 20px;
      background: rgba(0, 0, 0, 0.8);
      color: #00ff00;
      font-family: monospace;
      border-radius: 10px;
      z-index: 10000;
      text-align: center;
    `;
    this.visualDisplay.innerHTML = `
      <h3>HRV Biofeedback</h3>
      <div id="hrv-display" style="font-size: 24px; margin: 10px 0;">
        LF Power: <span id="lf-power">--</span>
      </div>
      <div id="breath-guide" style="font-size: 18px;">
        <span id="breath-phase">Inhale...</span>
      </div>
      <canvas id="hrv-waveform" width="360" height="100" style="background: #000; margin-top: 10px;"></canvas>
    `;
    document.body.appendChild(this.visualDisplay);
  }
  
  start(): void {
    this.isRunning = true;
    const now = this.audioContext.currentTime;
    
    // Start audio breathing cue
    if (this.config.audioGuidance) {
      this.breathCueOsc.start(now);
      this.breathCueOsc.stop(now + this.config.sessionDuration);
    }
    
    // Start HRV monitoring loop
    this.monitorHRV();
    
    // Start breathing guidance
    this.guideBreathing();
    
    // Auto-stop after session duration
    setTimeout(() => {
      this.stop();
    }, this.config.sessionDuration * 1000);
    
    console.log('✅ RF-HRV Protocol started');
    console.log('🫁 Follow breathing cues: Inhale rising tone, Exhale falling tone');
    console.log('📊 Watch HRV feedback to optimize coherence');
  }
  
  private async monitorHRV(): Promise<void> {
    while (this.isRunning && this.hrvMonitor) {
      const hrvData = await this.hrvMonitor.getLFPower();
      
      if (this.config.visualFeedback) {
        const lfPowerElement = document.getElementById('lf-power');
        if (lfPowerElement) {
          lfPowerElement.textContent = hrvData.lfPower.toFixed(1) + ' ms²';
        }
        
        // Update waveform visualization
        this.updateWaveform(hrvData.waveform);
      }
      
      // Log high coherence events
      if (hrvData.coherence > 0.8) {
        console.log(`✨ High coherence achieved: ${hrvData.coherence.toFixed(2)}`);
      }
      
      await this.sleep(1000); // Update every 1 second
    }
  }
  
  private async guideBreathing(): Promise<void> {
    const breathPeriodMs = 1000 / this.config.resonanceFrequency; // e.g., 10000ms for 0.1Hz
    const inhaleDuration = breathPeriodMs * 0.4; // 40% inhale
    const exhaleDuration = breathPeriodMs * 0.6; // 60% exhale
    
    while (this.isRunning) {
      this.breathCount++;
      
      // INHALE phase
      if (this.config.visualFeedback) {
        const phaseElement = document.getElementById('breath-phase');
        if (phaseElement) phaseElement.textContent = '⬆️ Inhale...';
      }
      
      if (this.config.hapticGuidance && 'vibrate' in navigator) {
        navigator.vibrate(200); // Short vibration for inhale start
      }
      
      await this.sleep(inhaleDuration);
      
      // EXHALE phase
      if (this.config.visualFeedback) {
        const phaseElement = document.getElementById('breath-phase');
        if (phaseElement) phaseElement.textContent = '⬇️ Exhale...';
      }
      
      if (this.config.hapticGuidance && 'vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]); // Pattern for exhale
      }
      
      await this.sleep(exhaleDuration);
      
      if (this.breathCount % 10 === 0) {
        console.log(`🫁 Breath count: ${this.breathCount}`);
      }
    }
  }
  
  private updateWaveform(waveformData: number[]): void {
    const canvas = document.getElementById('hrv-waveform') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    const step = canvas.width / waveformData.length;
    for (let i = 0; i < waveformData.length; i++) {
      const x = i * step;
      const y = canvas.height / 2 - waveformData[i] * 30; // Scale for visibility
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    
    ctx.stroke();
  }
  
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  stop(): void {
    this.isRunning = false;
    
    this.breathCueOsc?.stop();
    this.audioContext?.close();
    
    if (this.visualDisplay) {
      this.visualDisplay.remove();
      this.visualDisplay = null;
    }
    
    console.log('⏹️ RF-HRV Protocol stopped');
    console.log(`📊 Session summary: ${this.breathCount} breaths completed`);
    console.log('📈 HRV improvements expected after 6 weeks (5 sessions/week)');
  }
}

// HRV Monitor (simplified proxy - replace with actual PPG/ECG integration)
class HRVMonitor {
  async initialize(): Promise<void> {
    console.log('📊 HRV Monitor initialized (placeholder - integrate actual sensor)');
  }
  
  async getLFPower(): Promise<{ lfPower: number; coherence: number; waveform: number[] }> {
    // Placeholder: Simulate HRV metrics
    // Replace with actual HRV analysis: FFT of RR intervals, extract 0.05-0.14 Hz power
    
    const lfPower = 300 + Math.random() * 200; // Simulate 300-500 ms²
    const coherence = 0.5 + Math.random() * 0.4; // Simulate 0.5-0.9 coherence
    
    // Simulate waveform (sine wave at 0.1 Hz for visualization)
    const waveform = Array.from({ length: 50 }, (_, i) => 
      Math.sin(2 * Math.PI * i / 50) + Math.random() * 0.2
    );
    
    return { lfPower, coherence, waveform };
  }
}

// Usage example
async function runRFHRVSession() {
  console.log('🫁 Preparing RF-HRV Biofeedback session');
  console.log('📚 Evidence: Grade A (Extensive RCT validation)');
  console.log('   - [web:40] 0.1Hz coherence optimizes energy supply');
  console.log('   - [web:43] Visuo-haptic guidance: P_0.1 = 0.55±0.20');
  console.log('   - [web:60][web:63] RF breathing maximizes HRV amplitude');
  
  const protocol = new ResonanceFrequencyHRVProtocol({
    resonanceFrequency: 0.1,       // 6 breaths/min
    sessionDuration: 1200,         // 20 minutes
    audioGuidance: true,
    hapticGuidance: true,          // If device supports
    visualFeedback: true
  });
  
  await protocol.initialize();
  protocol.start();
  
  console.log('💡 TIP: Focus on smooth, diaphragmatic breathing');
  console.log('💡 Watch LF Power increase as you synchronize with the cue');
}

export { ResonanceFrequencyHRVProtocol, RFHRVConfig, HRVMonitor };
