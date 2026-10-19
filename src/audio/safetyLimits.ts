/**
 * Master-gain safety policy. These values are normalized signal gain, not dB SPL.
 * Acoustically safe playback still depends on output devices and system volume.
 */
export const MAX_MASTER_GAIN = 0.7;

/** A non-finite request fails closed to silence. */
export function clampMasterGain(value: number): number {
  return Number.isFinite(value) ? Math.max(0, Math.min(MAX_MASTER_GAIN, value)) : 0;
}
