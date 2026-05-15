// src/dsp/nodes/BinauralSpatializer.ts [Experimental]

import type { DspNodeParams } from "../graph/DspNode";

export class BinauralSpatializer extends GainNode {
  readonly params: DspNodeParams;

  constructor(context: AudioContext, params: DspNodeParams) {
    super(context);
    this.params = params;
    this.channelCount = 2;
    this.channelCountMode = "explicit";
    this.channelInterpretation = "speakers";
    this.gain.value = typeof params.width === "number" ? Math.max(0.2, Math.min(1.5, params.width)) : 1;
  }
}
