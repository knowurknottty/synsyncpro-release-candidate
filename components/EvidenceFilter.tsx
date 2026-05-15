// src/components/EvidenceFilter.tsx
// Filter protocols by evidence level - transparency in action

import React from 'react';
import { Filter } from 'lucide-react';
import type { EvidenceGrade } from '../types';

interface EvidenceFilterProps {
  selectedGrades: EvidenceGrade[];
  onToggle: (grade: EvidenceGrade) => void;
  protocolCounts?: Partial<Record<EvidenceGrade, number>>;
}

const GRADE_CONFIG = {
  established: {
    icon: '✓',
    label: 'Established',
    color: 'bg-green-500/20 text-green-400 border-green-500/30',
    activeColor: 'bg-green-500 text-white border-green-600',
    description: 'Peer-reviewed studies'
  },
  experimental: {
    icon: '⚡',
    label: 'Experimental',
    color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    activeColor: 'bg-yellow-500 text-black border-yellow-600',
    description: 'Limited evidence'
  },
  speculative: {
    icon: '🔬',
    label: 'Exploratory',
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    activeColor: 'bg-blue-500 text-white border-blue-600',
    description: 'Theoretical basis'
  }
} as const;

/**
 * Evidence filter - lets users choose evidence levels
 * Competitive advantage: transparency over hiding behind vague claims
 */
export const EvidenceFilter: React.FC<EvidenceFilterProps> = ({
  selectedGrades,
  onToggle,
  protocolCounts
}) => {
  const allGrades: EvidenceGrade[] = ['established', 'experimental', 'speculative'];
  const allSelected = selectedGrades.length === allGrades.length;

  return (
    <div className="space-y-3 p-4 rounded-lg bg-neuro-900/40 border border-neuro-700/50">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter by Evidence Level
        </h3>
        {!allSelected && (
          <button
            onClick={() => allGrades.forEach(g => {
              if (!selectedGrades.includes(g)) onToggle(g);
            })}
            className="text-xs text-neuro-400 hover:text-neuro-300 transition-colors"
          >
            Show All
          </button>
        )}
      </div>

      <div className="space-y-2">
        {allGrades.map(grade => {
          const config = GRADE_CONFIG[grade];
          const isSelected = selectedGrades.includes(grade);
          const count = protocolCounts?.[grade] || 0;

          return (
            <button
              key={grade}
              onClick={() => onToggle(grade)}
              className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                isSelected ? config.activeColor : config.color
              } hover:scale-[1.02]`}
              title={config.description}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{config.icon}</span>
                <div className="text-left">
                  <p className="text-sm font-semibold">{config.label}</p>
                  <p className={`text-xs ${isSelected ? 'opacity-90' : 'opacity-70'}`}>
                    {config.description}
                  </p>
                </div>
              </div>
              {count > 0 && (
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  isSelected ? 'bg-white/20' : 'bg-black/20'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="pt-2 border-t border-neuro-700/50">
        <p className="text-[10px] text-gray-500 leading-relaxed">
          <strong>Our Advantage:</strong> We're the only platform that grades evidence transparently.
          Competitors hide behind vague "clinical studies" - we tell you exactly what's validated vs. theoretical.
        </p>
      </div>
    </div>
  );
};
