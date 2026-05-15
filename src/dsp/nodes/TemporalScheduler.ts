// src/dsp/nodes/TemporalScheduler.ts [Experimental]

import type { DspNodeParams } from "../graph/DspNode";

export class TemporalSchedulerNode extends GainNode {
  readonly params: DspNodeParams;

  constructor(context: AudioContext, params: DspNodeParams) {
    super(context);
    this.params = params;
    const startGain = typeof params.startGain === "number" ? params.startGain : 1;
    this.gain.setValueAtTime(Math.max(0, Math.min(1, startGain)), context.currentTime);
  }
}
