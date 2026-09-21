import React, { useState, useEffect, useCallback } from 'react';
import { 
  SlidersHorizontal, 
  RotateCcw, 
  Sparkles, 
  Heart, 
  CheckCircle, 
  Compass, 
  RefreshCw,
  Search
} from 'lucide-react';
import { Profile, Match, DiscoveryFilters } from '../types';
import { storage } from '../services/storage';
import { ProfileCard } from '../components/ProfileCard';
import { ProfileModal } from '../components/ProfileModal';
import { MatchCelebrationModal } from '../components/MatchCelebrationModal';
import { FilterModal } from '../components/FilterModal';
import { ReportModal } from '../components/ReportModal';

interface DiscoverPageProps {
  currentUserId: string;
  onNavigate: (route: string) => void;
  onOpenChat: (conversationId: string) => void;
}

export const DiscoverPage: React.FC<DiscoverPageProps> = ({
  currentUserId,
  onNavigate,
  onOpenChat
}) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [reportTargetProfile, setReportTargetProfile] = useState<Profile | null>(null);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [activeMatch, setActiveMatch] = useState<Match | null>(null);

  const [filters, setFilters] = useState<DiscoveryFilters>({
    minAge: 18,
    maxAge: 45,
    maxDistanceKm: 250,
    genderPreference: 'everyone',
    relationshipIntention: 'All',
    verifiedOnly: false,
    recentlyActiveOnly: false
  });

  const currentUserData = storage.getCurrentUser();
  const myProfile = currentUserData?.profile;

  const loadProfiles = useCallback(() => {
    const list = storage.getDiscoveryProfiles(currentUserId, filters);
    setProfiles(list);
    setCurrentIndex(0);
  }, [currentUserId, filters]);

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  const currentCard = profiles[currentIndex];

  const handleLike = (targetUserId: string) => {
    const result = storage.handleLike(currentUserId, targetUserId, false);
    if (result.isMatch && result.match) {
      setActiveMatch(result.match);
    }
    setCurrentIndex(prev => prev + 1);
  };

  const handlePass = (targetUserId: string) => {
    storage.handlePass(currentUserId, targetUserId);
    setCurrentIndex(prev => prev + 1);
  };

  const handleSuperLike = (targetUserId: string) => {
    const result = storage.handleLike(currentUserId, targetUserId, true);
    if (result.isMatch && result.match) {
      setActiveMatch(result.match);
    }
    setCurrentIndex(prev => prev + 1);
  };

  const handleUndo = () => {
    const success = storage.undoLastAction(currentUserId);
    if (success && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      // Reload profiles
      loadProfiles();
    }
  };

  const handleReport = (profile: Profile) => {
    setReportTargetProfile(profile);
  };

  const handleBlock = (profile: Profile) => {
    if (window.confirm(`Are you sure you want to block ${profile.displayName}? You will not see each other again.`)) {
      storage.blockUser(currentUserId, profile.userId);
      setSelectedProfile(null);
      loadProfiles();
    }
  };

  // Keyboard shortcut navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProfile || reportTargetProfile || filterModalOpen || activeMatch) return;
      if (!currentCard) return;

      if (e.key === 'ArrowRight') {
        handleLike(currentCard.userId);
      } else if (e.key === 'ArrowLeft') {
        handlePass(currentCard.userId);
      } else if (e.key === 'ArrowUp') {
        handleSuperLike(currentCard.userId);
      } else if (e.key === 'z' || e.key === 'Z') {
        handleUndo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCard, selectedProfile, reportTargetProfile, filterModalOpen, activeMatch]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/70 py-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Top bar controls */}
        <div className="w-full max-w-sm sm:max-w-md flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#FF5A67]" />
              Discover Matches
            </span>
            {profiles.length > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold">
                {profiles.length - currentIndex} available
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              id="discover-filter-btn"
              onClick={() => setFilterModalOpen(true)}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#FF5A67] hover:border-[#FF5A67] transition-colors shadow-xs flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Card Arena */}
        {currentCard ? (
          <div className="w-full flex justify-center">
            <ProfileCard
              profile={currentCard}
              onLike={handleLike}
              onPass={handlePass}
              onSuperLike={handleSuperLike}
              onUndo={handleUndo}
              onViewDetails={(p) => setSelectedProfile(p)}
              canUndo={currentIndex > 0}
            />
          </div>
        ) : (
          /* Empty State */
          <div className="w-full max-w-md bg-white rounded-3xl p-10 text-center shadow-xl border border-slate-200/80 space-y-5 my-8">
            <div className="w-16 h-16 rounded-3xl bg-[#FFF1F3] text-[#E83E5A] flex items-center justify-center mx-auto border border-[#FF5A67]/20">
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">
                You've Explored All Profiles!
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                You've seen all compatible members matching your current criteria. Expand your radius or reset your filters to see more people.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setFilterModalOpen(true)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
              >
                Adjust Filters
              </button>
              <button
                onClick={() => {
                  storage.reloadSeedData();
                  loadProfiles();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#FF5A67] hover:bg-[#E83E5A] text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Discovery Batch
              </button>
            </div>
          </div>
        )}

        {/* Keyboard hints */}
        {currentCard && (
          <div className="hidden sm:flex items-center gap-6 text-[11px] text-slate-400 mt-4">
            <span>← Left arrow: Pass</span>
            <span>•</span>
            <span>↑ Up arrow: Super Like</span>
            <span>•</span>
            <span>→ Right arrow: Like</span>
            <span>•</span>
            <span>Z: Undo</span>
          </div>
        )}
      </div>

      {/* Profile Details Modal */}
      {selectedProfile && (
        <ProfileModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
          onLike={(uid) => {
            handleLike(uid);
            setSelectedProfile(null);
          }}
          onPass={(uid) => {
            handlePass(uid);
            setSelectedProfile(null);
          }}
          onReport={handleReport}
          onBlock={handleBlock}
        />
      )}

      {/* Report Modal */}
      {reportTargetProfile && (
        <ReportModal
          reportedProfile={reportTargetProfile}
          onClose={() => setReportTargetProfile(null)}
          onSubmit={(category, description) => {
            storage.submitReport({
              reporterId: currentUserId,
              reportedUserId: reportTargetProfile.userId,
              category,
              severity: 'medium',
              description
            });
          }}
        />
      )}

      {/* Filter Modal */}
      {filterModalOpen && (
        <FilterModal
          currentFilters={filters}
          onClose={() => setFilterModalOpen(false)}
          onApply={(newFilters) => {
            setFilters(newFilters);
          }}
        />
      )}

      {/* Mutual Match Celebration */}
      {activeMatch && myProfile && (
        <MatchCelebrationModal
          match={activeMatch}
          myProfile={myProfile}
          onSendMessage={(convId) => {
            setActiveMatch(null);
            onOpenChat(convId);
          }}
          onKeepDiscovering={() => setActiveMatch(null)}
        />
      )}
    </div>
  );
};
