import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, MessageCircle, Sparkles, X } from 'lucide-react';
import { Match, Profile } from '../types';

interface MatchCelebrationModalProps {
  match: Match;
  myProfile: Profile;
  onSendMessage: (conversationId: string) => void;
  onKeepDiscovering: () => void;
}

export const MatchCelebrationModal: React.FC<MatchCelebrationModalProps> = ({
  match,
  myProfile,
  onSendMessage,
  onKeepDiscovering
}) => {
  useEffect(() => {
    // Trigger celebratory confetti burst
    const end = Date.now() + 1.5 * 1000;
    const colors = ['#FF5A67', '#E83E5A', '#FFD166', '#06D6A0'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  const partner = match.matchedProfile;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#1D2939] to-[#101828] text-white rounded-3xl p-8 text-center shadow-2xl border border-white/10">
        {/* Close Button */}
        <button
          onClick={onKeepDiscovering}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Floating Heart Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-[#E83E5A] to-[#FF5A67] flex items-center justify-center shadow-lg shadow-[#FF5A67]/40 mb-6 animate-bounce">
          <Heart className="w-8 h-8 fill-white text-white" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2 flex items-center justify-center gap-2">
          It's a Match!
        </h2>
        <p className="text-sm text-slate-300 mb-8 max-w-xs mx-auto">
          You and <span className="font-semibold text-rose-300">{partner.displayName}</span> liked each other.
        </p>

        {/* Overlapping Avatars */}
        <div className="flex items-center justify-center -space-x-5 mb-8">
          <div className="relative group">
            <img
              src={myProfile.photos[0]?.url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt={myProfile.displayName}
              className="w-24 h-24 rounded-full object-cover border-4 border-[#101828] shadow-xl"
            />
            <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#101828]"></span>
          </div>

          <div className="relative z-10">
            <div className="w-8 h-8 rounded-full bg-[#FF5A67] flex items-center justify-center shadow-md border-2 border-[#101828]">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="relative group">
            <img
              src={partner.photos[0]?.url || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80'}
              alt={partner.displayName}
              className="w-24 h-24 rounded-full object-cover border-4 border-[#101828] shadow-xl ring-2 ring-[#FF5A67]"
            />
            <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#101828]"></span>
          </div>
        </div>

        {/* Intention Pill */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-rose-300 border border-white/15">
            Mutual Goal: {partner.relationshipIntention}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            id="match-send-message-btn"
            onClick={() => onSendMessage(match.id)}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FF5A67] to-[#E83E5A] hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-[#FF5A67]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            Send a Message
          </button>

          <button
            id="match-keep-discovering-btn"
            onClick={onKeepDiscovering}
            className="w-full py-3 px-6 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-200 font-semibold text-sm transition-colors cursor-pointer"
          >
            Keep Discovering
          </button>
        </div>
      </div>
    </div>
  );
};
