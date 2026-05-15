// src/components/ImprovedProtocolCard.tsx
// Enhanced protocol card with better visual hierarchy

import React, { useState } from 'react';
import { Clock, Calendar, TrendingUp, ChevronDown, ChevronUp, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { ProtocolEvidenceBadge } from './ProtocolEvidenceBadge';
import type { ProtocolRecommendation } from '../src/utils/protocol-matcher';

interface ImprovedProtocolCardProps {
  recommendation: ProtocolRecommendation;
  onViewDetails: () => void;
}

/**
 * Premium protocol card with better UX
 * Shows match quality, reasons, and warnings clearly
 */
export const ImprovedProtocolCard: React.FC<ImprovedProtocolCardProps> = ({
  recommendation,
  onViewDetails
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { protocol, matchScore, reasons, warnings, frequency } = recommendation;
  const hasWarnings = warnings.length > 0;
  const isHighMatch = matchScore >= 80;

  return (
    <div className={`relative border-2 rounded-xl bg-gradient-to-br from-neuro-900 to-neuro-800 transition-all duration-300 ${
      isExpanded
        ? 'border-neuro-500 shadow-xl shadow-neuro-500/20'
        : 'border-neuro-700 hover:border-neuro-600'
    } group`}>

      {/* Premium badge for high matches */}
      {isHighMatch && (
        <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg">
          <span className="text-xs font-bold text-white flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            TOP MATCH
          </span>
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          {/* Protocol icon/avatar */}
          <div className="p-3 rounded-xl bg-neuro-700 group-hover:bg-neuro-600 transition-all group-hover:scale-110">
            <div className="w-6 h-6 text-neuro-400">
              {/* Dynamic icon based on category */}
              {protocol.category === 'sleep' && '🌙'}
              {protocol.category === 'focus' && '🎯'}
              {protocol.category === 'meditation' && '🧘'}
              {protocol.category === 'performance' && '⚡'}
            </div>
          </div>

          {/* Title and description */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className="font-bold text-white text-lg leading-tight">
                {protocol.title}
              </h4>
              <ProtocolEvidenceBadge
                grade={protocol.evidenceGradeNew || 'speculative'}
                size="sm"
              />
            </div>
            <p className="text-sm text-gray-400 line-clamp-2">
              {protocol.description}
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-neuro-700">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Clock className="w-4 h-4 text-neuro-400" />
            <span className="font-medium">{Math.floor(protocol.duration / 60)} min</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Calendar className="w-4 h-4 text-neuro-400" />
            <span className="font-medium capitalize">{frequency}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <TrendingUp className="w-4 h-4 text-neuro-400" />
            <span className="font-medium">{matchScore}% match</span>
          </div>
        </div>

        {/* Match Quality Visualization */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-gray-500 font-medium">Match Quality</span>
            <span className={`font-bold ${
              matchScore >= 80 ? 'text-green-400' :
              matchScore >= 60 ? 'text-yellow-400' :
              'text-blue-400'
            }`}>
              {matchScore >= 80 ? 'Excellent' : matchScore >= 60 ? 'Good' : 'Moderate'}
            </span>
          </div>
          <div className="h-2.5 bg-neuro-950 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                matchScore >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                matchScore >= 60 ? 'bg-gradient-to-r from-yellow-500 to-amber-500' :
                'bg-gradient-to-r from-blue-500 to-cyan-500'
              }`}
              style={{ width: `${matchScore}%` }}
            />
          </div>
        </div>

        {/* Quick Preview of Reasons (when collapsed) */}
        {!isExpanded && reasons.length > 0 && (
          <div className="mb-3 p-3 rounded-lg bg-neuro-800/50">
            <p className="text-xs text-gray-400 flex items-start gap-2">
              <Info className="w-3 h-3 mt-0.5 flex-shrink-0 text-neuro-400" />
              <span>{reasons[0]}</span>
            </p>
          </div>
        )}

        {/* Warning Preview (when collapsed) */}
        {!isExpanded && hasWarnings && (
          <div className="mb-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
            <p className="text-xs text-yellow-300 flex items-start gap-2">
              <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span>{warnings.length} important note{warnings.length > 1 ? 's' : ''}</span>
            </p>
          </div>
        )}

        {/* Expanded Details */}
        {isExpanded && (
          <div className="space-y-4 mb-4 animate-slide-down">
            {/* Why Recommended */}
            <div className="p-4 rounded-lg bg-neuro-800/50 border border-neuro-700">
              <h5 className="text-xs font-semibold text-white mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-neuro-400" />
                Why This Protocol Was Recommended
              </h5>
              <ul className="space-y-2">
                {reasons.map((reason, i) => (
                  <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                    <span className="text-neuro-400 mt-1">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Warnings */}
            {hasWarnings && (
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <h5 className="text-xs font-semibold text-yellow-300 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Important Notes
                </h5>
                <ul className="space-y-2">
                  {warnings.map((warning, i) => (
                    <li key={i} className="text-xs text-yellow-200 leading-relaxed">
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* View Full Details Button */}
            <button
              onClick={onViewDetails}
              className="w-full py-3 px-4 bg-neuro-500 hover:bg-neuro-600 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              View Complete Protocol Details
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Expand/Collapse Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-2.5 text-sm text-neuro-400 hover:text-neuro-300 transition-colors flex items-center justify-center gap-1.5 font-medium"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Why Recommended?
            </>
          )}
        </button>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-neuro-500/0 to-purple-500/0 group-hover:from-neuro-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none" />
    </div>
  );
};
