// src/dsp/nodes/AmFmHybridModulator.ts [Experimental]

import type { DspNodeParams } from "../graph/DspNode";

export class AmFmHybridModulator extends GainNode {
  readonly params: DspNodeParams;
  private readonly oscillator: OscillatorNode;
  private readonly depth: GainNode;

  constructor(context: AudioContext, params: DspNodeParams) {
    super(context);
    this.params = params;
    this.gain.value = 1;

    this.depth = context.createGain();
    this.depth.gain.value = typeof params.depth === "number" ? Math.max(0, Math.min(0.45, params.depth)) : 0.15;

    this.oscillator = context.createOscillator();
    this.oscillator.type = "sine";
    this.oscillator.frequency.value = typeof params.modHz === "number" ? Math.max(0.01, params.modHz) : 0.25;
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
