// src/dsp/nodes/CrossfadeOptimizer.ts [Experimental]

import type { DspNodeParams } from "../graph/DspNode";

export class CrossfadeOptimizer extends GainNode {
  readonly params: DspNodeParams;

  constructor(context: AudioContext, params: DspNodeParams) {
    super(context);
    this.params = params;
    this.gain.value = typeof params.gain === "number" ? Math.max(0, Math.min(1, params.gain)) : 1;
  }
}
