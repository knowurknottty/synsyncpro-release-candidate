// src/audio/CuratedStackService.ts
// Service layer for playing curated protocol stacks.

import { CURATED_STACKS_BY_ID, type CuratedStack } from './curatedStacks';
import { PROTOCOLS } from './constants';
import type { Protocol } from '../../types';
import type { AudioEngine } from '../../services/AudioEngine';

/**
 * Service for managing and playing curated protocol stacks.
 * 
 * This provides a clean interface between your curated stacks metadata
 * and your existing audio engine/playback system.
 */
export class CuratedStackService {
  constructor(private readonly audioEngine?: AudioEngine) {}
  /**
   * Get a curated stack by its ID.
   * @param id - The stack ID (e.g., 'theta_meditation_plus_deep_sleep')
   * @returns The stack definition or undefined if not found
   */
  getStack(id: string): CuratedStack | undefined {
    return CURATED_STACKS_BY_ID[id];
  }

  /**
   * Validate that all protocols in a stack exist in the protocol library.
   * @param stackId - The stack ID to validate
   * @returns Array of missing protocol IDs (empty if all valid)
   */
  validateStack(stackId: string): string[] {
    const stack = this.getStack(stackId);
    if (!stack) {
      return [];
    }

    const missingProtocols: string[] = [];
    for (const protocolId of stack.protocolIds) {
      if (!PROTOCOLS[protocolId]) {
        missingProtocols.push(protocolId);
      }
    }

    return missingProtocols;
  }

  /**
   * Get the full protocol definitions for a stack.
   * @param stackId - The stack ID
   * @returns Array of protocol objects, or empty array if stack not found
   */
  getStackProtocols(stackId: string) {
    const stack = this.getStack(stackId);
    if (!stack) {
      return [];
    }

    return stack.protocolIds
      .map(id => PROTOCOLS[id])
      .filter(Boolean); // Remove any undefined protocols
  }

  /**
   * Calculate total duration of a stack in seconds.
   * For sequential stacks, sums all protocol durations.
   * For parallel stacks, takes the maximum duration.
   * @param stackId - The stack ID
   * @returns Total duration in seconds, or 0 if stack not found
   */
  getStackDuration(stackId: string): number {
    const stack = this.getStack(stackId);
    if (!stack) {
      return 0;
    }

    const protocols = this.getStackProtocols(stackId);
    if (protocols.length === 0) {
      return 0;
    }

    if (stack.renderMode === 'sequential') {
      // Sum all durations
      return protocols.reduce((total, protocol) => total + protocol.duration, 0);
    } else {
      // Take max duration
      return Math.max(...protocols.map(p => p.duration));
    }
  }

  /**
   * Check if a stack requires a safety gate based on evidence level or tier.
   * @param stackId - The stack ID
   * @returns True if safety gate should be shown
   */
  requiresSafetyGate(stackId: string): boolean {
    const stack = this.getStack(stackId);
    if (!stack) {
      return false;
    }

    // Show safety gate for experimental/speculative or high safety tier
    return (
      stack.evidenceLevel !== 'established' ||
      stack.safetyTier === 'high'
    );
  }

  /**
   * Get all stacks filtered by category.
   * @param category - The category to filter by
   * @returns Array of stacks matching the category
   */
  getStacksByCategory(category: CuratedStack['category']) {
    return Object.values(CURATED_STACKS_BY_ID).filter(
      stack => stack.category === category
    );
  }

  /**
   * Get all stacks filtered by experience level.
   * @param level - The user experience level
   * @returns Array of stacks appropriate for that level
   */
  getStacksByLevel(level: CuratedStack['suggestedUserLevel']) {
    return Object.values(CURATED_STACKS_BY_ID).filter(
      stack => stack.suggestedUserLevel === level
    );
  }

  async playStack(stackId: string): Promise<void> {
    const stack = this.getStack(stackId);
    if (!stack) {
      throw new Error(`Curated stack not found: ${stackId}`);
    }

    // Validate all protocols exist
    const missing = this.validateStack(stackId);
    if (missing.length > 0) {
      throw new Error(
        `Stack "${stack.title}" references missing protocols: ${missing.join(', ')}`
      );
    }

    if (!this.audioEngine) {
      throw new Error('CuratedStackService requires an AudioEngine instance for playback.');
    }

    if (stack.renderMode === 'sequential') {
      await this.playSequential(stack);
      return;
    }

    await this.playParallel(stack);
  }

  private async playSequential(stack: CuratedStack): Promise<void> {
    if (!this.audioEngine) return;

    for (const protocol of this.getStackProtocols(stack.id)) {
      await this.playProtocolToCompletion(protocol);
    }
  }

  private async playParallel(stack: CuratedStack): Promise<void> {
    throw new Error(
      `Stack "${stack.title}" is configured for parallel rendering, but the current AudioEngine exposes one active protocol at a time.`
    );
  }

  private async playProtocolToCompletion(protocol: Protocol): Promise<void> {
    if (!this.audioEngine) return;

    await new Promise<void>((resolve, reject) => {
      const previousComplete = this.audioEngine!.onComplete;
      const previousError = this.audioEngine!.onError;

      this.audioEngine!.onComplete = () => {
        previousComplete?.();
        this.audioEngine!.onComplete = previousComplete;
        this.audioEngine!.onError = previousError;
        resolve();
      };

      this.audioEngine!.onError = (error) => {
        previousError?.(error);
        this.audioEngine!.onComplete = previousComplete;
        this.audioEngine!.onError = previousError;
        reject(error);
      };

      this.audioEngine!.playProtocol(protocol).catch((error) => {
        this.audioEngine!.onComplete = previousComplete;
        this.audioEngine!.onError = previousError;
        reject(error);
      });
    });
  }
}

/**
 * Singleton instance for convenience.
 * You can also instantiate CuratedStackService in your app's service layer.
 */
export const curatedStackService = new CuratedStackService();
