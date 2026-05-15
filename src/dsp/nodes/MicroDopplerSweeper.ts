// src/dsp/nodes/MicroDopplerSweeper.ts [Experimental]

import type { DspNodeParams } from "../graph/DspNode";

export class MicroDopplerSweeper extends GainNode {
  readonly params: DspNodeParams;
  private readonly oscillator: OscillatorNode;
  private readonly depth: GainNode;

  constructor(context: AudioContext, params: DspNodeParams) {
    super(context);
    this.params = params;
    this.gain.value = 1;

    this.depth = context.createGain();
    this.depth.gain.value = typeof params.depth === "number" ? Math.max(0, Math.min(0.08, params.depth)) : 0.02;

    this.oscillator = context.createOscillator();
    this.oscillator.type = "sine";
    this.oscillator.frequency.value = typeof params.rateHz === "number" ? Math.max(0.01, params.rateHz) : 0.1;
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
