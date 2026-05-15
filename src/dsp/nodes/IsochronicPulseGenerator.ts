// src/dsp/nodes/IsochronicPulseGenerator.ts [Experimental]

import type { DspNodeParams } from "../graph/DspNode";

export class IsochronicPulseGenerator extends GainNode {
  readonly params: DspNodeParams;
  private readonly oscillator: OscillatorNode;
  private readonly depth: GainNode;

  constructor(context: AudioContext, params: DspNodeParams) {
    super(context);
    this.params = params;
    this.gain.value = 0.5;

    this.depth = context.createGain();
    this.depth.gain.value = typeof params.depth === "number" ? Math.max(0, Math.min(0.5, params.depth)) : 0.35;

    this.oscillator = context.createOscillator();
    this.oscillator.type = "square";
    this.oscillator.frequency.value = typeof params.beatHz === "number" ? Math.max(0.1, params.beatHz) : 10;
    this.oscillator.connect(this.depth);
    this.depth.connect(this.gain);
    this.oscillator.start();
  }

  override disconnect(...args: [] | [AudioNode] | [AudioNode, number] | [AudioNode, number, number]): void {
    try {
      this.oscillator.stop();
    } catch {
      // Already stopped.
    }
    this.oscillator.disconnect();
    this.depth.disconnect();
    super.disconnect(...args);
  }
}
