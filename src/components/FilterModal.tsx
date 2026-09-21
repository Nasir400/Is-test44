import React, { useState } from 'react';
import { X, SlidersHorizontal, Check, Sparkles, Shield } from 'lucide-react';
import { DiscoveryFilters, GenderPreference, RelationshipIntention } from '../types';

interface FilterModalProps {
  currentFilters: DiscoveryFilters;
  onClose: () => void;
  onApply: (filters: DiscoveryFilters) => void;
  isPremium?: boolean;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  currentFilters,
  onClose,
  onApply,
  isPremium = true
}) => {
  const [filters, setFilters] = useState<DiscoveryFilters>({ ...currentFilters });

  const handleReset = () => {
    const defaults: DiscoveryFilters = {
      minAge: 18,
      maxAge: 45,
      maxDistanceKm: 150,
      genderPreference: 'everyone',
      relationshipIntention: 'All',
      verifiedOnly: false,
      recentlyActiveOnly: false
    };
    setFilters(defaults);
  };

  const handleSave = () => {
    onApply(filters);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[#FF5A67]" />
            <h3 className="text-lg font-bold text-slate-900">Discovery Filters</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-6">
          {/* Age Range */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Age Range (18+)
              </label>
              <span className="text-xs font-semibold text-[#FF5A67]">
                {filters.minAge} — {filters.maxAge} years
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">18</span>
              <input
                type="range"
                min={18}
                max={65}
                value={filters.minAge}
                onChange={(e) => setFilters({ ...filters, minAge: parseInt(e.target.value) })}
                className="flex-1 accent-[#FF5A67]"
              />
              <input
                type="range"
                min={18}
                max={65}
                value={filters.maxAge}
                onChange={(e) => setFilters({ ...filters, maxAge: parseInt(e.target.value) })}
                className="flex-1 accent-[#FF5A67]"
              />
              <span className="text-xs text-slate-500">65+</span>
            </div>
          </div>

          {/* Max Distance */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Maximum Distance
              </label>
              <span className="text-xs font-semibold text-[#FF5A67]">
                Up to {filters.maxDistanceKm} km
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={1500}
              step={10}
              value={filters.maxDistanceKm}
              onChange={(e) => setFilters({ ...filters, maxDistanceKm: parseInt(e.target.value) })}
              className="w-full accent-[#FF5A67]"
            />
          </div>

          {/* Relationship Intention */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Relationship Intention
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['All', 'Marriage', 'Serious Relationship', 'Getting to Know Someone', 'Friendship'] as const).map(
                (intention) => (
                  <button
                    key={intention}
                    type="button"
                    onClick={() => setFilters({ ...filters, relationshipIntention: intention })}
                    className={`py-2 px-3 rounded-xl text-xs font-medium text-left border transition-all ${
                      filters.relationshipIntention === intention
                        ? 'border-[#FF5A67] bg-[#FFF1F3] text-[#E83E5A] font-bold'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {intention}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Verified Profiles Only */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              <div>
                <p className="text-xs font-bold text-slate-900">Verified Profiles Only</p>
                <p className="text-[11px] text-slate-500">Show only members with photo verification</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={filters.verifiedOnly || false}
              onChange={(e) => setFilters({ ...filters, verifiedOnly: e.target.checked })}
              className="w-4 h-4 accent-[#FF5A67] rounded cursor-pointer"
            />
          </div>

          {/* Recently Active Only */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-900">Recently Active</p>
              <p className="text-[11px] text-slate-500">Show users online in the last 48 hours</p>
            </div>
            <input
              type="checkbox"
              checked={filters.recentlyActiveOnly || false}
              onChange={(e) => setFilters({ ...filters, recentlyActiveOnly: e.target.checked })}
              className="w-4 h-4 accent-[#FF5A67] rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            Reset All
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#FF5A67] hover:bg-[#E83E5A] rounded-xl shadow-md transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
