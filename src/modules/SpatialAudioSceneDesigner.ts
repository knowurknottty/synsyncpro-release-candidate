/**
 * @module SpatialAudioSceneDesigner
 * @group Spatial Audio & Immersion (Group 5)
 * @evidenceGrade Speculative
 * @description Creates bounded 3D soundscapes with multiple moving audio sources using
 * Web Audio PannerNode. This is an engagement feature, not a clinical claim.
 */

export type MovementPattern = 'orbit' | 'spiral' | 'approach_recede' | 'random_walk_3d' | 'static' | 'guided_path';
export type ScenePresetId = 'concert' | 'forest' | 'ocean';

export interface SphericalPosition3D {
  azimuth: number;
  elevation: number;
  distance: number;
}

export interface CartesianPosition3D {
  x: number;
  y: number;
  z: number;
}

export type Position3D = SphericalPosition3D | CartesianPosition3D;

export interface MovementOptions {
  radius?: number;
  speed?: number;
  initialAzimuth?: number;
  elevation?: number;
  waypoints?: Position3D[];
}

export interface AudioSource {
  id: string;
  audioNode: AudioNode;
  panner: PannerNode;
  position: SphericalPosition3D;
  movementPattern: MovementPattern;
  options: MovementOptions;
  startTime: number;
  isActive: boolean;
}

export interface ListenerOrientation {
  forward: CartesianPosition3D;
  up: CartesianPosition3D;
}

const SCENE_PRESETS: Record<ScenePresetId, { position: SphericalPosition3D; pattern: MovementPattern; options: MovementOptions }[]> = {
  concert: [
    { position: { azimuth: -25, elevation: 0, distance: 2.5 }, pattern: 'static', options: {} },
    { position: { azimuth: 25, elevation: 0, distance: 2.5 }, pattern: 'static', options: {} },
  ],
  forest: [
    { position: { azimuth: -70, elevation: 18, distance: 3.5 }, pattern: 'random_walk_3d', options: { speed: 0.05 } },
    { position: { azimuth: 80, elevation: 8, distance: 4 }, pattern: 'orbit', options: { speed: 0.05, radius: 4 } },
  ],
  ocean: [
    { position: { azimuth: 0, elevation: -5, distance: 3.5 }, pattern: 'approach_recede', options: { speed: 0.05, radius: 3.5 } },
  ],
};

export class SpatialAudioSceneDesigner {
  public readonly input: GainNode;
  public readonly output: GainNode;

  private readonly context: AudioContext;
  private readonly listener: AudioListener;
  private readonly sources: Map<string, AudioSource> = new Map();
  private animationFrameId: number | null = null;
  private isRunning = false;
  private activePreset: ScenePresetId | null = null;

  private readonly MAX_SOURCES = 8;
  private readonly MAX_SPEED = 0.2;
  private readonly MAX_ELEVATION = 45;
  private readonly MIN_DISTANCE = 0.5;
  private readonly MAX_DISTANCE = 5;

  constructor(audioContext: AudioContext) {
    this.context = audioContext;
    this.listener = audioContext.listener;
    this.input = this.context.createGain();
    this.output = this.context.createGain();
    this.input.connect(this.output);
    this.updateListenerPosition({ x: 0, y: 0, z: 0 });
    this.updateListenerOrientation({
      forward: { x: 0, y: 0, z: -1 },
      up: { x: 0, y: 1, z: 0 },
    });
  }

  loadPreset(preset: ScenePresetId): void {
    if (!Object.hasOwn(SCENE_PRESETS, preset)) {
      throw new Error(`Unknown spatial scene preset: ${preset}`);
    }

    this.activePreset = preset;
  }

  addSource(
    audioNode: AudioNode,
    initialPosition: Position3D,
    movementPattern: MovementPattern = 'static',
    options: MovementOptions = {}
  ): string | null {
    const position = this.normalizePosition(initialPosition);

    if (this.sources.size >= this.MAX_SOURCES) {
      console.warn(`Max sources (${this.MAX_SOURCES}) reached`);
      return null;
    }

    const panner = new PannerNode(this.context, {
      panningModel: 'HRTF',
      distanceModel: 'inverse',
      refDistance: 1,
      maxDistance: 10000,
      rolloffFactor: 1,
      coneInnerAngle: 360,
      coneOuterAngle: 360,
      coneOuterGain: 0,
    });

    audioNode.connect(panner);
    panner.connect(this.output);

    const sourceId = `source_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    const source: AudioSource = {
      id: sourceId,
      audioNode,
      panner,
      position,
      movementPattern,
      options: {
        radius: options.radius ?? position.distance,
        speed: Math.min(options.speed ?? 0.1, this.MAX_SPEED),
        initialAzimuth: options.initialAzimuth ?? position.azimuth,
        elevation: options.elevation ?? position.elevation,
        waypoints: options.waypoints ?? [],
      },
      startTime: this.context.currentTime,
      isActive: true,
    };

    this.sources.set(sourceId, source);
    this.setPosition(source, position);
    this.startScene();

    return sourceId;
  }

  removeSource(sourceId: string): void {
    const source = this.sources.get(sourceId);
    if (!source) return;

    source.audioNode.disconnect();
    source.panner.disconnect();
    this.sources.delete(sourceId);

    if (this.sources.size === 0) {
      this.stopScene();
    }
  }

  updateSourcePattern(sourceId: string, pattern: MovementPattern, options?: MovementOptions): void {
    const source = this.sources.get(sourceId);
    if (!source) return;

    source.movementPattern = pattern;
    source.options = {
      ...source.options,
      ...options,
      speed: Math.min(options?.speed ?? source.options.speed ?? 0.1, this.MAX_SPEED),
      waypoints: options?.waypoints ?? source.options.waypoints ?? [],
    };
    source.startTime = this.context.currentTime;
  }

  setStaticPosition(sourceId: string, position: Position3D): void {
    const source = this.sources.get(sourceId);
    if (!source) return;

    source.movementPattern = 'static';
    source.position = this.normalizePosition(position);
    this.setPosition(source, source.position);
  }

  updateListenerPosition(position: CartesianPosition3D): void {
    this.assertFiniteCartesian(position, 'listener position');
    this.listener.positionX.value = position.x;
    this.listener.positionY.value = position.y;
    this.listener.positionZ.value = position.z;
  }

  updateListenerOrientation(orientation: ListenerOrientation): void {
    this.assertFiniteCartesian(orientation.forward, 'listener forward vector');
    this.assertFiniteCartesian(orientation.up, 'listener up vector');
    this.listener.forwardX.value = orientation.forward.x;
    this.listener.forwardY.value = orientation.forward.y;
    this.listener.forwardZ.value = orientation.forward.z;
    this.listener.upX.value = orientation.up.x;
    this.listener.upY.value = orientation.up.y;
    this.listener.upZ.value = orientation.up.z;
  }

  startScene(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.updateScene();
  }

  stopScene(): void {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  clearScene(): void {
    this.sources.forEach((source) => {
      source.audioNode.disconnect();
      source.panner.disconnect();
    });
    this.sources.clear();
    this.stopScene();
  }

  disconnect(): void {
    this.clearScene();
    this.input.disconnect();
    this.output.disconnect();
  }

  getSourceCount(): number {
    return this.sources.size;
  }

  getSourceInfo(sourceId: string): AudioSource | undefined {
    return this.sources.get(sourceId);
  }

  toggleSource(sourceId: string, active: boolean): void {
    const source = this.sources.get(sourceId);
    if (source) {
      source.isActive = active;
    }
  }

  getActivePreset(): ScenePresetId | null {
    return this.activePreset;
  }

  private updateScene = (): void => {
    if (!this.isRunning) return;

    const currentTime = this.context.currentTime;
    this.sources.forEach((source) => {
      if (!source.isActive) return;

      const elapsed = currentTime - source.startTime;
      const newPosition = this.calculatePosition(source.movementPattern, elapsed, source.position, source.options);
      source.position = newPosition;
      this.setPosition(source, newPosition);
    });

    this.animationFrameId = requestAnimationFrame(this.updateScene);
  };

  private calculatePosition(
    pattern: MovementPattern,
    elapsed: number,
    currentPos: SphericalPosition3D,
    options: MovementOptions
  ): SphericalPosition3D {
    const radius = options.radius ?? currentPos.distance;
    const speed = Math.min(options.speed ?? 0.1, this.MAX_SPEED);
    const initialAzimuth = options.initialAzimuth ?? currentPos.azimuth;
    const elevation = options.elevation ?? currentPos.elevation;

    switch (pattern) {
      case 'orbit':
        return this.clampPosition({
          azimuth: ((initialAzimuth + elapsed * speed * 360 + 180) % 360) - 180,
          elevation,
          distance: radius,
        });
      case 'spiral':
        return this.clampPosition({
          azimuth: ((initialAzimuth + elapsed * speed * 360 + 180) % 360) - 180,
          elevation: (elapsed * speed * 60) % 60 - 30,
          distance: radius,
        });
      case 'approach_recede': {
        const phase = Math.sin(2 * Math.PI * speed * elapsed);
        return this.clampPosition({
          azimuth: initialAzimuth,
          elevation,
          distance: radius + phase * (radius * 0.5),
        });
      }
      case 'random_walk_3d':
        return this.clampPosition({
          azimuth: currentPos.azimuth + (Math.random() - 0.5) * 20,
          elevation: currentPos.elevation + (Math.random() - 0.5) * 10,
          distance: currentPos.distance + (Math.random() - 0.5) * 0.3,
        });
      case 'guided_path':
        if (options.waypoints?.length) {
          const waypointIndex = Math.floor((elapsed * speed) % options.waypoints.length);
          return this.normalizePosition(options.waypoints[waypointIndex]);
        }
        return currentPos;
      case 'static':
      default:
        return currentPos;
    }
  }

  private setPosition(source: AudioSource, position: SphericalPosition3D): void {
    const { azimuth, elevation, distance } = this.clampPosition(position);
    const azimuthRad = azimuth * (Math.PI / 180);
    const elevationRad = elevation * (Math.PI / 180);

    source.panner.positionX.value = distance * Math.sin(azimuthRad) * Math.cos(elevationRad);
    source.panner.positionY.value = distance * Math.sin(elevationRad);
    source.panner.positionZ.value = -distance * Math.cos(azimuthRad) * Math.cos(elevationRad);
  }

  private normalizePosition(position: Position3D): SphericalPosition3D {
    if ('x' in position) {
      this.assertFiniteCartesian(position, 'source position');
      const distance = Math.sqrt(position.x ** 2 + position.y ** 2 + position.z ** 2);
      const safeDistance = distance === 0 ? this.MIN_DISTANCE : distance;
      return this.clampPosition({
        azimuth: Math.atan2(position.x, -position.z) * (180 / Math.PI),
        elevation: Math.asin(position.y / safeDistance) * (180 / Math.PI),
        distance: safeDistance,
      });
    }

    if (!Number.isFinite(position.azimuth) || !Number.isFinite(position.elevation) || !Number.isFinite(position.distance)) {
      throw new RangeError('Spherical position must contain finite azimuth, elevation, and distance values.');
    }

    return this.clampPosition(position);
  }

  private clampPosition(position: SphericalPosition3D): SphericalPosition3D {
    return {
      azimuth: Math.max(-180, Math.min(180, position.azimuth)),
      elevation: Math.max(-this.MAX_ELEVATION, Math.min(this.MAX_ELEVATION, position.elevation)),
      distance: Math.max(this.MIN_DISTANCE, Math.min(this.MAX_DISTANCE, position.distance)),
    };
  }

  private assertFiniteCartesian(position: CartesianPosition3D, label: string): void {
    if (!Number.isFinite(position.x) || !Number.isFinite(position.y) || !Number.isFinite(position.z)) {
      throw new RangeError(`${label} must contain finite x, y, and z values.`);
    }
  }
}
