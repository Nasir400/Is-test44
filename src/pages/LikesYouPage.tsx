import React, { useState } from 'react';
import { Heart, Crown, Sparkles, CheckCircle, MapPin, Eye, Lock, ArrowRight } from 'lucide-react';
import { storage } from '../services/storage';
import { Profile, Match } from '../types';
import { MatchCelebrationModal } from '../components/MatchCelebrationModal';
import { ProfileModal } from '../components/ProfileModal';
import { ReportModal } from '../components/ReportModal';

interface LikesYouPageProps {
  currentUserId: string;
  onNavigate: (route: string) => void;
  onOpenChat: (convId: string) => void;
}

export const LikesYouPage: React.FC<LikesYouPageProps> = ({
  currentUserId,
  onNavigate,
  onOpenChat
}) => {
  const currentUserData = storage.getCurrentUser();
  const user = currentUserData?.user;
  const myProfile = currentUserData?.profile;

  const isGoldOrVip = user?.subscriptionTier === 'gold' || user?.subscriptionTier === 'vip';
  const incomingLikes = storage.getLikesYou(currentUserId);

  const [activeMatch, setActiveMatch] = useState<Match | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [reportTargetProfile, setReportTargetProfile] = useState<Profile | null>(null);

  const handleInstantMatch = (targetUserId: string) => {
    const result = storage.handleLike(currentUserId, targetUserId, false);
    if (result.isMatch && result.match) {
      setActiveMatch(result.match);
    }
  };

  const handlePass = (targetUserId: string) => {
    storage.handlePass(currentUserId, targetUserId);
    // Force re-render
    storage.undoLastAction(targetUserId); // removes target from incoming
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#E83E5A] to-[#FF5A67] flex items-center justify-center text-white">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Likes You
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-[#E83E5A]">
                {incomingLikes.length} People
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Members who liked your profile and want to connect.
            </p>
          </div>

          {!isGoldOrVip && (
            <button
              onClick={() => onNavigate('premium')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold shadow-md hover:brightness-105 transition-all"
            >
              <Crown className="w-4 h-4" />
              Upgrade to Gold to Unblur All
            </button>
          )}
        </div>

        {/* Incoming Likes Grid */}
        {incomingLikes.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-[#FF5A67] flex items-center justify-center mx-auto">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No New Likes Yet</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Keep your profile active and completed to 100% to maximize visibility, or use Profile Boost to appear first.
            </p>
            <button
              onClick={() => onNavigate('discover')}
              className="px-5 py-2.5 rounded-xl bg-[#FF5A67] text-white text-xs font-bold hover:bg-[#E83E5A] transition-colors"
            >
              Continue Discovering
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {incomingLikes.map(({ profile, like }) => (
              <div
                key={like.id}
                className="relative bg-white rounded-2xl overflow-hidden shadow-md border border-slate-200/80 group"
              >
                {/* Photo with Blur Check */}
                <div className="relative h-64 sm:h-72 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={profile.photos[0]?.url}
                    alt={profile.displayName}
                    className={`w-full h-full object-cover ${
                      !isGoldOrVip ? 'blur-xl scale-110' : 'group-hover:scale-105 transition-transform duration-300'
                    }`}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Super Like indicator */}
                  {like.isSuperLike && (
                    <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500 text-white flex items-center gap-1 shadow-sm">
                      <Sparkles className="w-3 h-3" /> Super Like
                    </span>
                  )}

                  {/* Unblurred Info for Gold/VIP */}
                  {isGoldOrVip ? (
                    <div className="absolute bottom-3 left-3 right-3 text-white z-10">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-bold text-base">{profile.displayName}</span>
                        <span className="text-sm font-light text-slate-300">{profile.age}</span>
                        {profile.verificationBadge && (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-300 flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-[#FF5A67]" />
                        {profile.city}, {profile.country}
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/80 text-white">
                        {profile.relationshipIntention}
                      </span>
                    </div>
                  ) : (
                    /* Blurred lock overlay for Free users */
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white z-10">
                      <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center mb-2 border border-white/20">
                        <Lock className="w-5 h-5 text-amber-300" />
                      </div>
                      <p className="text-xs font-bold">Someone in {profile.city}</p>
                      <p className="text-[10px] text-slate-300 mt-0.5">Likes your profile</p>
                      <button
                        onClick={() => onNavigate('premium')}
                        className="mt-3 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-[10px] shadow-sm transition-colors"
                      >
                        Unlock to View
                      </button>
                    </div>
                  )}
                </div>

                {/* Actions for Gold/VIP */}
                {isGoldOrVip && (
                  <div className="p-3 bg-white flex items-center justify-between gap-2 border-t border-slate-100">
                    <button
                      onClick={() => handlePass(profile.userId)}
                      className="flex-1 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      Pass
                    </button>
                    <button
                      onClick={() => handleInstantMatch(profile.userId)}
                      className="flex-1 py-1.5 rounded-xl bg-gradient-to-r from-[#FF5A67] to-[#E83E5A] text-xs font-bold text-white shadow-xs hover:brightness-105 transition-all flex items-center justify-center gap-1"
                    >
                      <Heart className="w-3.5 h-3.5 fill-white" />
                      Match
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

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

      {/* Profile Details Modal */}
      {selectedProfile && (
        <ProfileModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
          onLike={(uid) => {
            handleInstantMatch(uid);
            setSelectedProfile(null);
          }}
          onPass={(uid) => {
            handlePass(uid);
            setSelectedProfile(null);
          }}
          onReport={(p) => setReportTargetProfile(p)}
          onBlock={(p) => {
            storage.blockUser(currentUserId, p.userId);
            setSelectedProfile(null);
          }}
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
    </div>
  );
};
