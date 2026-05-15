// src/components/ProtocolDisclaimer.tsx
// Shows transparent disclaimers for each protocol

import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import type { Protocol, EvidenceGrade } from '../types';
import { ProtocolEvidenceBadge } from './ProtocolEvidenceBadge';

interface ProtocolDisclaimerProps {
  protocol: Protocol;
}

/**
 * Universal disclaimer shown for ALL protocols
 */
const UNIVERSAL_DISCLAIMER = `⚠️ EXPERIMENTAL TECHNOLOGY

This protocol has not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease. Individual results vary significantly.

Not a substitute for professional medical advice. Consult healthcare provider for medical conditions.`;

/**
 * Evidence-specific disclaimer text
 */
const EVIDENCE_DISCLAIMERS: Record<EvidenceGrade, string> = {
  established: 'Based on peer-reviewed research showing modest effects. Individual results still vary. Not a substitute for medical treatment.',
  experimental: 'Limited research evidence. Individual results vary significantly. Help us validate by tracking your outcomes.',
  speculative: 'Based on neuroscience theory. Human efficacy not established. Your feedback helps us learn what works.'
};

/**
 * Comprehensive disclaimer component - our transparency advantage
 */
export const ProtocolDisclaimer: React.FC<ProtocolDisclaimerProps> = ({ protocol }) => {
  const evidenceGrade = protocol.evidenceGradeNew || 'speculative';
  const hasSpecificDisclaimer = protocol.disclaimer;
  const hasContraindications = protocol.contraindications && protocol.contraindications.length > 0;
  const isSevere = protocol.contraindicationsSeverity === 'severe';

  return (
    <div className="space-y-4 p-4 rounded-lg bg-neuro-900/40 border border-neuro-700/50">
      {/* Evidence Badge */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Info className="w-4 h-4" />
          Important Information
        </h3>
        <ProtocolEvidenceBadge grade={evidenceGrade} size="md" />
      </div>

      {/* Protocol-Specific Disclaimer */}
      {hasSpecificDisclaimer && (
        <div className={`p-3 rounded-md border ${
          isSevere
            ? 'bg-red-500/10 border-red-500/30 text-red-300'
            : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300'
        }`}>
          <p className="text-xs leading-relaxed whitespace-pre-line">
            {protocol.disclaimer}
          </p>
        </div>
      )}

      {/* Evidence-Level Disclaimer */}
      <div className="p-3 rounded-md bg-blue-500/5 border border-blue-500/20">
        <p className="text-xs text-blue-300 leading-relaxed">
          <strong>Evidence Level:</strong> {EVIDENCE_DISCLAIMERS[evidenceGrade]}
        </p>
      </div>

      {/* Contraindications */}
      {hasContraindications && (
        <div className={`p-3 rounded-md border ${
          isSevere
            ? 'bg-red-500/10 border-red-500/30'
            : 'bg-orange-500/10 border-orange-500/30'
        }`}>
          <div className="flex items-start gap-2">
            <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
              isSevere ? 'text-red-400' : 'text-orange-400'
            }`} />
            <div className="space-y-1">
              <p className={`text-xs font-semibold ${
                isSevere ? 'text-red-300' : 'text-orange-300'
              }`}>
                {isSevere ? 'CRITICAL WARNINGS' : 'Contraindications'}
              </p>
              <ul className="text-xs text-gray-300 space-y-1">
                {protocol.contraindications.map((item, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Universal Disclaimer */}
      <div className="p-3 rounded-md bg-gray-800/50 border border-gray-700/50">
        <p className="text-[10px] text-gray-400 leading-relaxed whitespace-pre-line font-mono">
          {UNIVERSAL_DISCLAIMER}
        </p>
      </div>

      {/* Help Us Validate */}
      {protocol.validationStatus === 'needs-validation' && (
        <div className="p-3 rounded-md bg-purple-500/10 border border-purple-500/30">
          <p className="text-xs text-purple-300">
            <strong>🔬 Help Us Validate:</strong> Track your results and share feedback.
            You're participating in experimental research to understand what actually works.
          </p>
        </div>
      )}
    </div>
  );
};
