/**
 * @module TransauralCrosstalkCancellation
 * @group Spatial Audio & Immersion (Group 5)
 * @evidenceGrade Speculative
 * @description Speaker playback crosstalk-reduction utility for experimental
 * binaural presentation without headphones.
 */

export interface SpeakerSetup {
  angle: number;
  distance: number;
  height: number;
}

export interface HeadPosition {
  azimuth: number;
  elevation: number;
  distance: number;
}

export class TransauralCrosstalkCancellation {
  public readonly input: GainNode;
  public readonly output: GainNode;

  private readonly context: AudioContext;
  private readonly splitter: ChannelSplitterNode;
  private readonly merger: ChannelMergerNode;
  private readonly leftDirect: GainNode;
  private readonly rightDirect: GainNode;
  private readonly leftCancel: GainNode;
  private readonly rightCancel: GainNode;
  private readonly leftDelay: DelayNode;
  private readonly rightDelay: DelayNode;

  private speakerAngle: number;
  private earDistance: number;
  private headTrackingEnabled = false;
  private currentHeadAzimuth = 0;
  private orientationHandler: ((event: DeviceOrientationEvent) => void) | null = null;

  private readonly MIN_SPEAKER_ANGLE = 10;
  private readonly MAX_SPEAKER_ANGLE = 60;
  private readonly MIN_EAR_DISTANCE = 0.15;
  private readonly MAX_EAR_DISTANCE = 0.25;
  private readonly MAX_ITD = 0.0006;

  constructor(
    audioContext: AudioContext,
    speakerSetup: SpeakerSetup = { angle: 30, distance: 1.5, height: 0 }
  ) {
    this.context = audioContext;
    this.speakerAngle = this.validateSpeakerAngle(speakerSetup.angle);
    this.earDistance = 0.18;

    this.input = this.context.createGain();
    this.output = this.context.createGain();
    this.splitter = this.context.createChannelSplitter(2);
    this.merger = this.context.createChannelMerger(2);
    this.leftDirect = this.context.createGain();
    this.rightDirect = this.context.createGain();
    this.leftCancel = this.context.createGain();
    this.rightCancel = this.context.createGain();
    this.leftDelay = this.context.createDelay(0.01);
    this.rightDelay = this.context.createDelay(0.01);

    this.leftDirect.gain.value = 1;
    this.rightDirect.gain.value = 1;
    this.leftCancel.gain.value = -0.35;
    this.rightCancel.gain.value = -0.35;

    this.updateDelaysForGeometry(0);
    this.connectInternalGraph();
  }

  connect(leftInput: AudioNode, rightInput: AudioNode, destination: AudioNode): void {
    leftInput.connect(this.leftDirect);
    leftInput.connect(this.rightCancel);
    rightInput.connect(this.rightDirect);
    rightInput.connect(this.leftCancel);
    this.output.connect(destination);
  }

  setSpeakerAngle(angleDegrees: number): void {
    this.speakerAngle = this.validateSpeakerAngle(angleDegrees);
    this.updateDelaysForGeometry(this.currentHeadAzimuth);
  }

  setEarDistance(distanceMeters: number): void {
    if (!Number.isFinite(distanceMeters)) {
      throw new Error('Ear distance must be finite');
    }
    if (distanceMeters < this.MIN_EAR_DISTANCE || distanceMeters > this.MAX_EAR_DISTANCE) {
      throw new Error(`Ear distance must be between ${this.MIN_EAR_DISTANCE}m and ${this.MAX_EAR_DISTANCE}m`);
    }
    this.earDistance = distanceMeters;
    this.updateDelaysForGeometry(this.currentHeadAzimuth);
  }

  enableHeadTracking(): boolean {
    if (this.headTrackingEnabled) return true;
    if (typeof window === 'undefined' || typeof DeviceOrientationEvent === 'undefined') return false;

    const maybePermission = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<'granted' | 'denied' | 'default'>;
    };

    if (typeof maybePermission.requestPermission === 'function') {
      void maybePermission.requestPermission()
        .then((state) => {
          if (state === 'granted') this.startHeadTracking();
        })
        .catch(() => undefined);
      return true;
    }

    this.startHeadTracking();
    return true;
  }

  disableHeadTracking(): void {
    if (this.orientationHandler && typeof window !== 'undefined') {
      window.removeEventListener('deviceorientation', this.orientationHandler);
    }
    this.orientationHandler = null;
    this.headTrackingEnabled = false;
    this.currentHeadAzimuth = 0;
    this.updateDelaysForGeometry(0);
  }

  getHeadPosition(): HeadPosition {
    return {
      azimuth: this.currentHeadAzimuth,
      elevation: 0,
      distance: 0,
    };
  }

  isInSweetSpot(): boolean {
    return Math.abs(this.currentHeadAzimuth) < 15;
  }

  disconnect(): void {
    this.disableHeadTracking();
    for (const node of [
      this.input,
      this.output,
      this.splitter,
      this.merger,
      this.leftDirect,
      this.rightDirect,
      this.leftCancel,
      this.rightCancel,
      this.leftDelay,
      this.rightDelay,
    ]) {
      node.disconnect();
    }
  }

  private connectInternalGraph(): void {
    this.input.connect(this.splitter);
    this.splitter.connect(this.leftDirect, 0);
    this.splitter.connect(this.rightCancel, 0);
    this.splitter.connect(this.rightDirect, 1);
    this.splitter.connect(this.leftCancel, 1);
    this.leftCancel.connect(this.leftDelay);
    this.rightCancel.connect(this.rightDelay);
    this.leftDirect.connect(this.merger, 0, 0);
    this.leftDelay.connect(this.merger, 0, 0);
    this.rightDirect.connect(this.merger, 0, 1);
    this.rightDelay.connect(this.merger, 0, 1);
    this.merger.connect(this.output);
  }

  private startHeadTracking(): void {
    if (typeof window === 'undefined') return;
    this.orientationHandler = (event: DeviceOrientationEvent) => {
      if (event.alpha === null) return;
      const azimuth = event.alpha > 180 ? event.alpha - 360 : event.alpha;
      this.currentHeadAzimuth = azimuth;
      this.updateDelaysForGeometry(azimuth);
    };
    window.addEventListener('deviceorientation', this.orientationHandler);
    this.headTrackingEnabled = true;
  }

  private updateDelaysForGeometry(azimuthDegrees: number): void {
    const angleRadians = this.speakerAngle * (Math.PI / 180);
    const headRadians = azimuthDegrees * (Math.PI / 180);
    const baseDelay = Math.min(this.MAX_ITD, (this.earDistance / 343) * Math.sin(angleRadians));
    const headOffset = Math.sin(headRadians) * this.MAX_ITD * 0.5;
    this.leftDelay.delayTime.value = Math.max(0.00005, baseDelay + headOffset);
    this.rightDelay.delayTime.value = Math.max(0.00005, baseDelay - headOffset);
  }

  private validateSpeakerAngle(angleDegrees: number): number {
    if (!Number.isFinite(angleDegrees)) throw new Error('Speaker angle must be finite');
    if (angleDegrees < this.MIN_SPEAKER_ANGLE || angleDegrees > this.MAX_SPEAKER_ANGLE) {
      throw new Error(`Speaker angle must be between ${this.MIN_SPEAKER_ANGLE} and ${this.MAX_SPEAKER_ANGLE} degrees`);
    }
    return angleDegrees;
  }
}
