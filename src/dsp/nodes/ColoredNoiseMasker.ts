// src/dsp/nodes/ColoredNoiseMasker.ts [Experimental]

import type { DspNodeParams } from "../graph/DspNode";

export class ColoredNoiseMasker extends GainNode {
  readonly params: DspNodeParams;
  private readonly source: AudioBufferSourceNode;
  private readonly noiseGain: GainNode;

  constructor(context: AudioContext, params: DspNodeParams) {
    super(context);
    this.params = params;
    this.gain.value = 1;

    const buffer = context.createBuffer(1, Math.floor(context.sampleRate * 2), context.sampleRate);
    const data = buffer.getChannelData(0);
    const type = String(params.type ?? "pink");
    let accumulator = 0;

    for (let i = 0; i < data.length; i++) {
      const white = (Math.random() * 2) - 1;
      if (type === "brown") {
        accumulator = (accumulator * 0.985) + (white * 0.015);
        data[i] = accumulator * 4;
      } else if (type === "white") {
        data[i] = white * 0.25;
      } else {
        accumulator = (accumulator * 0.92) + (white * 0.08);
        data[i] = ((white * 0.35) + accumulator) * 0.35;
      }
    }

    this.source = context.createBufferSource();
    this.source.buffer = buffer;
    this.source.loop = true;

    this.noiseGain = context.createGain();
    this.noiseGain.gain.value = typeof params.mix === "number" ? Math.max(0, Math.min(0.3, params.mix)) : 0.04;
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
