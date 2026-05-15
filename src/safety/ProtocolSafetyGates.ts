// src/lib/safety/ProtocolSafetyGates.ts

import type { ProtocolSafetyGateSpec } from '../types'
import React from 'react'

export interface SafetyCheckResult {
  passed: boolean
  blocked: boolean
  warnings: string[]
  requiresConsent: boolean
}

export class SafetyGateValidator {
  /**
   * Validate photosensitivity risk for strobe/flicker frequencies
   * Per Space instructions: <3Hz extreme, 3-30Hz high, >30Hz safe
   */
  static checkPhotosensitivity(
    frequencies: number[],
    gateSpec?: ProtocolSafetyGateSpec['photosensitivity']
  ): SafetyCheckResult {
    if (!gateSpec?.checkRequired) {
      return { passed: true, blocked: false, warnings: [], requiresConsent: false }
    }

    const warnings: string[] = []
    let blocked = false
    const [warnMin, warnMax] = gateSpec.warningThreshold || [3, 30]
    const [blockMin, blockMax] = gateSpec.blockingThreshold || [8, 12]

    frequencies.forEach(freq => {
      if (blockMin && blockMax && freq >= blockMin && freq <= blockMax) {
        blocked = true
        warnings.push(
          `⛔ BLOCKED: ${freq}Hz falls in seizure-risk zone (${blockMin}-${blockMax}Hz).`
        )
      }
      else if (freq >= warnMin && freq <= warnMax) {
        warnings.push(
          `⚠️ WARNING: ${freq}Hz in photosensitivity range (${warnMin}-${warnMax}Hz).`
        )
      }
      else if (freq < 3) {
        warnings.push(
          `⚠️ WARNING: ${freq}Hz is <3Hz (extreme low flicker).`
        )
      }
    })

    return {
      passed: warnings.length === 0,
      blocked,
      warnings,
      requiresConsent: warnings.length > 0 && !blocked
    }
  }

  /**
   * Validate sound pressure level (SPL) safety
   */
  static checkVolumeSafety(
    currentSPL: number,
    sessionDurationMin: number,
    gateSpec?: ProtocolSafetyGateSpec['volumeCalibration']
  ): SafetyCheckResult {
    if (!gateSpec?.calibrationRequired) {
      return { passed: true, blocked: false, warnings: [], requiresConsent: false }
    }

    const maxSPL = gateSpec.maxSPL || 85
    const warnings: string[] = []
    let blocked = false

    const safeExposureHours = 8 * Math.pow(2, (85 - currentSPL) / 3)
    const safeExposureMin = safeExposureHours * 60

    if (currentSPL > 90) {
      blocked = true
      warnings.push(
        `⛔ BLOCKED: ${currentSPL}dB exceeds 90dB damage threshold.`
      )
    } else if (currentSPL > maxSPL && sessionDurationMin > safeExposureMin) {
      warnings.push(
        `⚠️ WARNING: ${currentSPL}dB exceeds safe limit for ${sessionDurationMin}min session.`
      )
    }

    return {
      passed: warnings.length === 0,
      blocked,
      warnings,
      requiresConsent: warnings.length > 0 && !blocked
    }
  }

  /**
   * Check contraindications against user profile
   */
  static checkContraindications(
    userConditions: string[],
    protocolContraindications?: string[]
  ): SafetyCheckResult {
    if (!protocolContraindications || protocolContraindications.length === 0) {
      return { passed: true, blocked: false, warnings: [], requiresConsent: false }
    }

    const warnings: string[] = []
    const matches = userConditions.filter(condition =>
      protocolContraindications.some(contra =>
        condition.toLowerCase().includes(contra.toLowerCase())
      )
    )

    if (matches.length > 0) {
      warnings.push(
        `⚠️ CONTRAINDICATION: Your profile includes: ${matches.join(', ')}.`
      )
    }

    return {
      passed: warnings.length === 0,
      blocked: false,
      warnings,
      requiresConsent: warnings.length > 0
    }
  }

  /**
   * Master safety check - validates all gates
   */
  static async validateProtocol(
    protocolId: string,
    safetyGates: ProtocolSafetyGateSpec,
    context: {
      visualFrequencies?: number[]
      audioFrequencies?: number[]
      currentSPL?: number
      sessionDurationMin?: number
      userConditions?: string[]
    }
  ): Promise<SafetyCheckResult> {
    const results: SafetyCheckResult[] = []

    if (context.visualFrequencies) {
      results.push(
        this.checkPhotosensitivity(context.visualFrequencies, safetyGates.photosensitivity)
      )
    }

    if (context.currentSPL && context.sessionDurationMin) {
      results.push(
        this.checkVolumeSafety(
          context.currentSPL,
          context.sessionDurationMin,
          safetyGates.volumeCalibration
        )
      )
    }

    if (context.userConditions) {
      results.push(
        this.checkContraindications(
          context.userConditions,
          safetyGates.contraindications?.conditions
        )
      )
    }

    const allWarnings = results.flatMap(r => r.warnings)
    const anyBlocked = results.some(r => r.blocked)
    const anyRequireConsent = results.some(r => r.requiresConsent)

    return {
      passed: allWarnings.length === 0,
      blocked: anyBlocked,
      warnings: allWarnings,
      requiresConsent: anyRequireConsent && !anyBlocked
    }
  }
}

/**
 * React hook for safety validation
 */
export function useSafetyGates(protocolId: string) {
  const [safetyResult, setSafetyResult] = React.useState<SafetyCheckResult | null>(null)
  const [consentGiven, setConsentGiven] = React.useState(false)

  const validateSafety = async (
    safetyGates: ProtocolSafetyGateSpec,
    context: Parameters<typeof SafetyGateValidator.validateProtocol>[2]
  ) => {
    const result = await SafetyGateValidator.validateProtocol(
      protocolId,
      safetyGates,
      context
    )
    setSafetyResult(result)
    return result
  }

  const canProceed = !safetyResult?.blocked && 
                     (!safetyResult?.requiresConsent || consentGiven)

  return {
    safetyResult,
    consentGiven,
    setConsentGiven,
    validateSafety,
    canProceed
  }
}
