// src/components/ResearchDataExport.tsx
// Granular, user-controlled export for research contribution

import React, { useState, useEffect } from 'react';
import { Upload, Eye, Shield, CheckCircle, AlertTriangle, Info, Download } from 'lucide-react';
import { LocalStorageManager } from '../src/utils/local-storage-manager';
import {
  getAnonymousUserId,
  anonymizeSession,
  validateResearchData,
  type ResearchDataExport,
  type ResearchUserProfile
} from '../src/utils/data-anonymization';

/**
 * Research data export component
 * User has granular control over what to share
 * All data anonymized before export
 */
export const ResearchDataExport: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [includeNotes, setIncludeNotes] = useState(false);
  const [includeDemographics, setIncludeDemographics] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<ResearchDataExport | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);

  // Optional demographic fields
  const [ageRange, setAgeRange] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [meditationExperience, setMeditationExperience] = useState<string>('');

  const availableCategories = [
    {
      id: 'sessions',
      label: 'Session History',
      description: 'Your completed sessions with ratings and outcomes',
      icon: '📊',
      details: 'Includes: protocol used, duration, completion status, ratings, side effects (if any)',
      excludes: 'Excludes: exact dates, times, personal notes (unless opted in)'
    },
    {
      id: 'effectiveness',
      label: 'Protocol Effectiveness',
      description: 'Which protocols worked best for you',
      icon: '⭐',
      details: 'Includes: ratings per protocol, completion rates, side effect frequencies',
      excludes: 'Excludes: any identifying information'
    },
    {
      id: 'patterns',
      label: 'Usage Patterns',
      description: 'When and how you use protocols',
      icon: '📅',
      details: 'Includes: time of day preferences, session frequency, streak data',
      excludes: 'Excludes: specific dates, just patterns (morning/evening, weekday/weekend)'
    },
    {
      id: 'goals',
      label: 'Goal Effectiveness',
      description: 'What goals you had and what worked',
      icon: '🎯',
      details: 'Includes: your goals, which protocols you used for them, how effective they were',
      excludes: 'Excludes: any personal details about why you have these goals'
    }
  ];

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const generatePreview = () => {
    const exportData = buildResearchExport();
    setPreviewData(exportData);

    // Validate for PII
    const validation = validateResearchData(exportData);
    setWarnings(validation.warnings);

    setShowPreview(true);
  };

  const buildResearchExport = (): ResearchDataExport => {
    const progress = LocalStorageManager.getProgressData();
    const sessions = LocalStorageManager.getSessionHistory();
    const preferences = JSON.parse(localStorage.getItem('synsync_user_preferences') || '{}');

    const exportData: ResearchDataExport = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      dataTypes: Array.from(selectedCategories),
      contributor: {
        anonymousUserId: getAnonymousUserId(),
        contributionCount: parseInt(localStorage.getItem('synsync_contribution_count') || '0') + 1
      }
    };

    // Add demographics if opted in
    if (includeDemographics && selectedCategories.has('demographics')) {
      exportData.userProfile = {
        anonymousUserId: getAnonymousUserId(),
        ageRange: ageRange || undefined,
        region: region || undefined,
        experienceLevel: preferences.experienceLevel || 'beginner',
        meditationExperience: meditationExperience as any,
        primaryGoals: preferences.subGoals?.slice(0, 3) || [],
        totalSessions: progress.totalSessions,
        totalDaysActive: 0, // Calculate from sessions
        averageSessionsPerWeek: 0, // Calculate
        longestStreak: progress.longestStreak,
        hasContraindications: (preferences.contraindications?.length || 0) > 0,
        contraindicationCategories: preferences.contraindications,
        preferredTimeOfDay: preferences.timeOfDay,
        evidencePreference: preferences.evidencePreference
      };
    }

    // Add sessions if opted in
    if (selectedCategories.has('sessions')) {
      const firstSession = sessions.length > 0 ? new Date(sessions[sessions.length - 1].startTime) : new Date();

      exportData.sessions = sessions
        .filter(s => s.completed) // Only completed sessions
        .map((session, index) => {
          const protocolSessionCount = sessions
            .slice(0, index + 1)
            .filter(s => s.protocolId === session.protocolId)
            .length;

          return anonymizeSession(
            session,
            firstSession,
            preferences.experienceLevel || 'beginner',
            index + 1,
            protocolSessionCount
          );
        })
        .map(session => {
          // Remove notes unless opted in
          if (!includeNotes) {
            delete session.userNotes;
          }
          return session;
        });
    }

    // Add protocol effectiveness if opted in
    if (selectedCategories.has('effectiveness')) {
      exportData.protocolStats = Object.entries(progress.protocolStats).map(([protocolId, stats]) => ({
        protocolId,
        protocolCategory: protocolId.includes('sleep') ? 'sleep' :
                         protocolId.includes('focus') ? 'focus' : 'other',
        evidenceGrade: 'experimental',
        totalSessions: stats.sessions,
        uniqueUsers: 1, // This user only
        averageRating: stats.averageRating || 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, // Would need to calculate
        completionRate: stats.completionRate,
        averageDuration: stats.totalDuration / stats.sessions,
        sideEffectsFrequency: {},
        effectivenessByExperience: {
          beginner: { avgRating: 0, n: 0 },
          intermediate: { avgRating: 0, n: 0 },
          advanced: { avgRating: 0, n: 0 }
        },
        effectivenessByGoal: {}
      }));
    }

    return exportData;
  };

  const handleExport = () => {
    if (!previewData) return;

    // Increment contribution count
    const count = parseInt(localStorage.getItem('synsync_contribution_count') || '0') + 1;
    localStorage.setItem('synsync_contribution_count', count.toString());

    // Export as JSON
    const blob = new Blob([JSON.stringify(previewData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `synsync_research_contribution_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    // Show success
    alert('Research data exported! Thank you for contributing to science! 🔬');
  };

  const dataSize = previewData ? new Blob([JSON.stringify(previewData)]).size : 0;
  const dataSizeKB = (dataSize / 1024).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-lg bg-gradient-to-br from-purple-800/20 to-blue-800/20 border border-purple-700/30">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-purple-500/20">
            <Upload className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Contribute to Research
            </h2>
            <p className="text-sm text-gray-300 mb-4">
              Help improve SynSync Pro for everyone by sharing anonymized data.
              You're in complete control of what you share.
            </p>
            <div className="flex items-center gap-2 text-xs text-purple-300">
              <Shield className="w-4 h-4" />
              <span>All data is anonymized before export • No personally identifying information</span>
            </div>
          </div>
        </div>
      </div>

      {/* Data Categories */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Choose What to Share
        </h3>
        <div className="space-y-3">
          {availableCategories.map(category => (
            <div
              key={category.id}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                selectedCategories.has(category.id)
                  ? 'bg-neuro-500/10 border-neuro-500'
                  : 'bg-neuro-800/30 border-neuro-700 hover:border-neuro-600'
              }`}
              onClick={() => toggleCategory(category.id)}
            >
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedCategories.has(category.id)
                    ? 'bg-neuro-500 border-neuro-500'
                    : 'border-gray-600'
                }`}>
                  {selectedCategories.has(category.id) && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{category.icon}</span>
                    <h4 className="font-semibold text-white">{category.label}</h4>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{category.description}</p>

                  <details className="text-xs text-gray-500">
                    <summary className="cursor-pointer hover:text-gray-400">
                      What's included?
                    </summary>
                    <div className="mt-2 space-y-1 pl-4 border-l-2 border-neuro-700">
                      <p className="text-green-400">✓ {category.details}</p>
                      <p className="text-red-400">✗ {category.excludes}</p>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optional: User Notes */}
      {selectedCategories.has('sessions') && (
        <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeNotes}
              onChange={(e) => setIncludeNotes(e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-gray-600 bg-gray-800 text-neuro-500"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold text-yellow-300 mb-1">
                Include Session Notes (Optional)
              </p>
              <p className="text-xs text-yellow-200 mb-2">
                Your notes will be sanitized to remove personal information (names, emails, etc.)
                but may still contain identifiable details. Only include if comfortable.
              </p>
              <p className="text-xs text-yellow-300">
                ⚠️ Review your notes before exporting if you choose this option
              </p>
            </div>
          </label>
        </div>
      )}

      {/* Optional: Demographics */}
      <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
        <label className="flex items-start gap-3 cursor-pointer mb-4">
          <input
            type="checkbox"
            checked={includeDemographics}
            onChange={(e) => setIncludeDemographics(e.target.checked)}
            className="mt-1 w-5 h-5 rounded border-gray-600 bg-gray-800 text-neuro-500"
          />
          <div className="flex-1">
            <p className="text-sm font-semibold text-blue-300 mb-1">
              Include Anonymous Demographics (Optional)
            </p>
            <p className="text-xs text-blue-200">
              Demographic data helps researchers understand which protocols work for which people.
              All fields are optional and anonymized.
            </p>
          </div>
        </label>

        {includeDemographics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pl-8">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Age Range</label>
              <select
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
                className="w-full px-3 py-2 bg-neuro-800 border border-neuro-700 rounded text-white text-sm"
              >
                <option value="">Prefer not to say</option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45-54">45-54</option>
                <option value="55-64">55-64</option>
                <option value="65+">65+</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Region</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3 py-2 bg-neuro-800 border border-neuro-700 rounded text-white text-sm"
              >
                <option value="">Prefer not to say</option>
                <option value="North America">North America</option>
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
                <option value="South America">South America</option>
                <option value="Africa">Africa</option>
                <option value="Oceania">Oceania</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Meditation Experience</label>
              <select
                value={meditationExperience}
                onChange={(e) => setMeditationExperience(e.target.value)}
                className="w-full px-3 py-2 bg-neuro-800 border border-neuro-700 rounded text-white text-sm"
              >
                <option value="">Prefer not to say</option>
                <option value="none">None</option>
                <option value="some">Some (&lt; 1 year)</option>
                <option value="regular">Regular (1-3 years)</option>
                <option value="advanced">Advanced (3+ years)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Preview / Export */}
      <div className="flex gap-3">
        <button
          onClick={generatePreview}
          disabled={selectedCategories.size === 0}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
            selectedCategories.size === 0
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-neuro-500 hover:bg-neuro-600 text-white'
          }`}
        >
          <Eye className="w-4 h-4" />
          Preview Data
        </button>

        {previewData && (
          <button
            onClick={handleExport}
            className="flex-1 py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export for Research
          </button>
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && previewData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-neuro-900 border border-neuro-700 rounded-xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Preview Header */}
            <div className="p-6 border-b border-neuro-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Preview Your Data</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>Size: {dataSizeKB} KB</span>
                <span>•</span>
                <span>Categories: {selectedCategories.size}</span>
                {previewData.sessions && (
                  <>
                    <span>•</span>
                    <span>Sessions: {previewData.sessions.length}</span>
                  </>
                )}
              </div>

              {/* Warnings */}
              {warnings.length > 0 && (
                <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-yellow-300 mb-1">
                        Potential Issues Detected
                      </p>
                      <ul className="text-xs text-yellow-200 space-y-1">
                        {warnings.map((warning, i) => (
                          <li key={i}>• {warning}</li>
                        ))}
                      </ul>
                      <p className="text-xs text-yellow-300 mt-2">
                        Review the data below before exporting
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <pre className="text-xs text-gray-300 bg-neuro-950 p-4 rounded-lg overflow-x-auto">
                {JSON.stringify(previewData, null, 2)}
              </pre>
            </div>

            {/* Preview Footer */}
            <div className="p-6 border-t border-neuro-700 flex gap-3">
              <button
                onClick={() => setShowPreview(false)}
                className="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleExport}
                className="flex-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export This Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="p-4 rounded-lg bg-neuro-800/30 border border-neuro-700">
        <div className="flex items-start gap-2 text-xs text-gray-400">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p><strong className="text-gray-300">How this helps:</strong> Your anonymized data helps us understand which protocols work for which people, allowing us to improve recommendations and protocol design.</p>
            <p><strong className="text-gray-300">What we do with it:</strong> Aggregate analysis only. Individual data is never published or sold.</p>
            <p><strong className="text-gray-300">Your control:</strong> You choose exactly what to share. Nothing is uploaded automatically.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
