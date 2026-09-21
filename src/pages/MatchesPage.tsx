import React from 'react';
import { 
  Users, 
  MessageCircle, 
  CheckCircle, 
  Heart, 
  Compass, 
  Sparkles, 
  MoreVertical,
  ShieldAlert,
  Ban
} from 'lucide-react';
import { storage } from '../services/storage';
import { Match } from '../types';

interface MatchesPageProps {
  currentUserId: string;
  onOpenChat: (conversationId: string) => void;
  onNavigate: (route: string) => void;
}

export const MatchesPage: React.FC<MatchesPageProps> = ({
  currentUserId,
  onOpenChat,
  onNavigate
}) => {
  const matches = storage.getMatches(currentUserId);

  // Split into "New Matches" (no messages yet) and "Active Conversations"
  const newMatches = matches.filter(m => !m.lastMessage);
  const activeChats = matches.filter(m => !!m.lastMessage);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#E83E5A] to-[#FF5A67] flex items-center justify-center text-white">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Your Matches & Chats
              </h1>
              <p className="text-xs text-slate-500">
                {matches.length} mutual connections ready for meaningful conversation.
              </p>
            </div>
          </div>
        </div>

        {matches.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-[#FF5A67] flex items-center justify-center mx-auto">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Matches Yet</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Explore Discover and like profiles that match your values. When you both like each other, your match will appear here!
            </p>
            <button
              onClick={() => onNavigate('discover')}
              className="px-5 py-2.5 rounded-xl bg-[#FF5A67] text-white text-xs font-bold hover:bg-[#E83E5A] transition-colors"
            >
              Start Discovering
            </button>
          </div>
        ) : (
          <>
            {/* New Matches Tray */}
            {newMatches.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    New Matches ({newMatches.length})
                  </h2>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-3 pt-1 scrollbar-none">
                  {newMatches.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => onOpenChat(m.id)}
                      className="flex flex-col items-center space-y-1.5 shrink-0 group cursor-pointer"
                    >
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-[#FF5A67] to-[#E83E5A] group-hover:scale-105 transition-transform duration-200">
                          <img
                            src={m.matchedProfile.photos[0]?.url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                            alt={m.matchedProfile.displayName}
                            className="w-full h-full rounded-full object-cover border-2 border-white"
                          />
                        </div>
                        {m.matchedProfile.verificationBadge && (
                          <CheckCircle className="absolute bottom-0 right-0 w-4 h-4 text-emerald-500 bg-white rounded-full" />
                        )}
                      </div>
                      <span className="text-xs font-bold text-slate-800 group-hover:text-[#FF5A67] transition-colors truncate max-w-[70px]">
                        {m.matchedProfile.displayName}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Active Conversations List */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900">
                  Messages & Conversations
                </h2>
                <span className="text-xs text-slate-500">
                  {activeChats.length} active
                </span>
              </div>

              {activeChats.length === 0 ? (
                <div className="p-8 text-center text-slate-500 space-y-2">
                  <p className="text-xs">No active chats yet. Select a match above to start speaking!</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {activeChats.map((m) => {
                    const profile = m.matchedProfile;
                    const dateFormatted = m.lastMessageAt
                      ? new Date(m.lastMessageAt).toLocaleDateString([], { month: 'short', day: 'numeric' })
                      : '';

                    return (
                      <div
                        key={m.id}
                        onClick={() => onOpenChat(m.id)}
                        className="px-6 py-4 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative shrink-0">
                            <img
                              src={profile.photos[0]?.url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                              alt={profile.displayName}
                              className="w-12 h-12 rounded-full object-cover border border-slate-200"
                            />
                            {profile.isOnline && (
                              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <h3 className="text-sm font-bold text-slate-900 truncate">
                                {profile.displayName}
                              </h3>
                              {profile.verificationBadge && (
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              )}
                              <span className="text-xs text-slate-400">• {profile.age}</span>
                            </div>

                            <p className="text-xs text-slate-600 truncate mt-0.5">
                              {m.lastMessage || 'Say hello with an icebreaker...'}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-[10px] text-slate-400 block">{dateFormatted}</span>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-[#E83E5A]">
                            {profile.relationshipIntention}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
