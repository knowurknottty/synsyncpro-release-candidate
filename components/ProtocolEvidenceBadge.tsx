// src/components/ProtocolEvidenceBadge.tsx
// NEW transparent evidence grading system

import React from 'react';
import type { EvidenceGrade } from '../types';

interface ProtocolEvidenceBadgeProps {
  grade: EvidenceGrade;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

/**
 * Evidence badge configuration for transparent grading
 */
const EVIDENCE_CONFIG = {
  established: {
    icon: '✓',
    label: 'Established',
    shortLabel: 'Established Evidence',
    color: 'bg-green-500/20 text-green-400 border-green-500/30',
    description: 'Supported by peer-reviewed research'
  },
  experimental: {
    icon: '⚡',
    label: 'Experimental',
    shortLabel: 'Experimental',
    color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    description: 'Limited studies, promising signals'
  },
  speculative: {
    icon: '🔬',
    label: 'Exploratory',
    shortLabel: 'Exploratory',
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    description: 'Theoretical basis, needs validation'
  }
} as const;

/**
 * Transparent evidence badge - shows users what's validated vs. experimental
 *
 * This is our competitive advantage: honest grading instead of vague "clinical studies"
 */
export const ProtocolEvidenceBadge: React.FC<ProtocolEvidenceBadgeProps> = ({
  grade,
  size = 'md',
  showLabel = true
}) => {
  const config = EVIDENCE_CONFIG[grade];

  const sizeClasses = {
    sm: 'text-[9px] px-1.5 py-0.5 gap-1',
    md: 'text-xs px-2 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2'
  };

  return (
    <span
      className={`inline-flex items-center rounded-md border font-medium ${config.color} ${sizeClasses[size]}`}
      title={`${config.shortLabel}: ${config.description}`}
      aria-label={`Evidence grade: ${config.shortLabel}`}
    >
      <span>{config.icon}</span>
      {showLabel && <span>{config.label}</span>}
    </span>
  );
};

/**
 * Helper to get evidence badge for a protocol
 */
export const getEvidenceBadgeConfig = (grade: EvidenceGrade) => EVIDENCE_CONFIG[grade];
