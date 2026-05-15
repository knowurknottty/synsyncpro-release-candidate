// src/components/RoutineLibrary.tsx
// Library of saved routines - stored locally

import React, { useState, useEffect } from 'react';
import { BookMarked, Plus, Play, Trash2, Edit2, Download, Upload, Calendar, Clock, Target, Search } from 'lucide-react';
import { LocalStorageManager } from '../src/utils/local-storage-manager';
import type { SavedRoutine } from '../src/utils/local-storage-manager';

interface RoutineLibraryProps {
  onLoadRoutine: (routine: SavedRoutine) => void;
  onCreateNew: () => void;
}

/**
 * Saved routines library
 * Browse, search, and manage saved routines
 * All stored locally - privacy-first
 */
export const RoutineLibrary: React.FC<RoutineLibraryProps> = ({ onLoadRoutine, onCreateNew }) => {
  const [routines, setRoutines] = useState<SavedRoutine[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    loadRoutines();
  }, []);

  const loadRoutines = () => {
    setRoutines(LocalStorageManager.getSavedRoutines());
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this routine? This cannot be undone.')) {
      LocalStorageManager.deleteRoutine(id);
      loadRoutines();
    }
  };

  const handleStartEdit = (routine: SavedRoutine) => {
    setEditingId(routine.id);
    setEditName(routine.name);
  };

  const handleSaveEdit = (id: string) => {
    if (editName.trim()) {
      LocalStorageManager.updateRoutine(id, { name: editName.trim() });
      loadRoutines();
    }
    setEditingId(null);
  };

  const handleExport = (routine: SavedRoutine) => {
    const data = JSON.stringify(routine, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${routine.name.replace(/[^a-z0-9]/gi, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filter routines
  const filteredRoutines = routines.filter(routine => {
    const matchesSearch = searchTerm === '' ||
      routine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      routine.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTag = selectedTag === null || routine.tags?.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  // Get all unique tags
  const allTags = Array.from(new Set(routines.flatMap(r => r.tags || [])));

  const getProtocolCount = (routine: SavedRoutine) => {
    return (
      routine.routine.morning.length +
      routine.routine.afternoon.length +
      routine.routine.evening.length
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <BookMarked className="w-7 h-7 text-neuro-400" />
            My Routines
          </h2>
          <p className="text-sm text-gray-400">
            {routines.length} saved routine{routines.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={onCreateNew}
          className="px-4 py-2 bg-neuro-500 hover:bg-neuro-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create New
        </button>
      </div>

      {/* Search and Filter */}
      {routines.length > 0 && (
        <div className="space-y-3">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search routines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-11 bg-neuro-800 border border-neuro-700 rounded-lg text-white placeholder-gray-500 focus:border-neuro-500 focus:ring-1 focus:ring-neuro-500"
            />
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
          </div>

          {/* Tag Filter */}
          {allTags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-500 font-medium">Filter:</span>
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedTag === null
                    ? 'bg-neuro-500 text-white'
                    : 'bg-neuro-800 text-gray-400 hover:bg-neuro-700'
                }`}
              >
                All
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedTag === tag
                      ? 'bg-neuro-500 text-white'
                      : 'bg-neuro-800 text-gray-400 hover:bg-neuro-700'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Routines Grid */}
      {filteredRoutines.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRoutines.map(routine => (
            <div
              key={routine.id}
              className="p-5 rounded-lg bg-gradient-to-br from-neuro-900 to-neuro-800 border border-neuro-700 hover:border-neuro-600 transition-all group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                {editingId === routine.id ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onBlur={() => handleSaveEdit(routine.id)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(routine.id)}
                    className="flex-1 px-2 py-1 bg-neuro-800 border border-neuro-600 rounded text-white text-sm focus:ring-1 focus:ring-neuro-500"
                    autoFocus
                  />
                ) : (
                  <h3 className="font-semibold text-white text-lg flex-1">
                    {routine.name}
                  </h3>
                )}

                <div className="flex items-center gap-1 ml-2">
                  <button
                    onClick={() => handleStartEdit(routine)}
                    className="p-1.5 text-gray-500 hover:text-white transition-colors"
                    title="Rename"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleExport(routine)}
                    className="p-1.5 text-gray-500 hover:text-white transition-colors"
                    title="Export"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(routine.id)}
                    className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Target className="w-4 h-4 text-neuro-400" />
                  <span>{getProtocolCount(routine)} protocols</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4 text-neuro-400" />
                  <span>{routine.routine.totalDuration} min/day</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="w-4 h-4 text-neuro-400" />
                  <span>Created {new Date(routine.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Tags */}
              {routine.tags && routine.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {routine.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-neuro-800 text-gray-400 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Last Used */}
              {routine.lastUsed && (
                <p className="text-xs text-gray-500 mb-4">
                  Last used {new Date(routine.lastUsed).toLocaleDateString()}
                </p>
              )}

              {/* Load Button */}
              <button
                onClick={() => onLoadRoutine(routine)}
                className="w-full py-3 bg-neuro-500 hover:bg-neuro-600 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02]"
              >
                <Play className="w-4 h-4" />
                Load Routine
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neuro-800/50 mb-4">
            <BookMarked className="w-8 h-8 text-gray-600" />
          </div>
          <p className="text-lg text-gray-400 mb-2">
            {searchTerm || selectedTag ? 'No matching routines' : 'No saved routines yet'}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            {searchTerm || selectedTag
              ? 'Try different search terms or filters'
              : 'Create your first routine to get started'
            }
          </p>
          {!searchTerm && !selectedTag && (
            <button
              onClick={onCreateNew}
              className="px-6 py-3 bg-neuro-500 hover:bg-neuro-600 text-white font-medium rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Your First Routine
            </button>
          )}
        </div>
      )}

      {/* Privacy Notice */}
      <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
        <p className="text-xs text-blue-300 leading-relaxed">
          🔒 <strong>Privacy First:</strong> All your routines are stored locally on your device.
          Export them to backup or transfer to another device.
        </p>
      </div>
    </div>
  );
};
