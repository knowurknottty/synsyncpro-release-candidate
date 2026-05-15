// src/dsp/nodes/StochasticResonanceEnhancer.ts [Experimental]

import type { DspNodeParams } from "../graph/DspNode";

export class StochasticResonanceEnhancer extends GainNode {
  readonly params: DspNodeParams;
  private readonly source: AudioBufferSourceNode;
  private readonly noiseGain: GainNode;

  constructor(context: AudioContext, params: DspNodeParams) {
    super(context);
    this.params = params;
    this.gain.value = 1;

    const buffer = context.createBuffer(1, Math.floor(context.sampleRate), context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = ((Math.random() * 2) - 1) * 0.2;
    }

    this.source = context.createBufferSource();
    this.source.buffer = buffer;
    this.source.loop = true;

    this.noiseGain = context.createGain();
    this.noiseGain.gain.value = typeof params.amount === "number" ? Math.max(0, Math.min(0.08, params.amount)) : 0.01;
    this.source.connect(this.noiseGain);
    this.noiseGain.connect(this);
    this.source.start();
  }

  override disconnect(...args: [] | [AudioNode] | [AudioNode, number] | [AudioNode, number, number]): void {
    try {
      this.source.stop();
    } catch {
      // Already stopped.
    }
    this.source.disconnect();
    this.noiseGain.disconnect();
    super.disconnect(...args);
  }
}
