import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Send, 
  Sparkles, 
  Image as ImageIcon, 
  MoreVertical, 
  CheckCircle, 
  Check, 
  ShieldAlert, 
  Ban, 
  Trash2,
  Heart,
  Info
} from 'lucide-react';
import { storage } from '../services/storage';
import { Message, Profile, Match } from '../types';
import { ProfileModal } from '../components/ProfileModal';
import { ReportModal } from '../components/ReportModal';

interface ChatPageProps {
  conversationId: string;
  currentUserId: string;
  onBack: () => void;
}

const ISFAHAM_ICEBREAKERS = [
  "What values are most important in your ideal family life?",
  "How do you like to spend your quiet weekends?",
  "What are your thoughts on balancing career and family aspirations?",
  "What is your favorite cultural or childhood tradition you wish to carry forward?",
  "If you could travel to any place in Somalia or globally next year, where would you go?",
  "What does mutual understanding (Isfaham) mean to you in a marriage?",
  "What books, podcasts, or mentors have influenced your worldview the most?"
];

export const ChatPage: React.FC<ChatPageProps> = ({
  conversationId,
  currentUserId,
  onBack
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [showIcebreakers, setShowIcebreakers] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load matches
  const match = storage.getMatches(currentUserId).find(m => m.id === conversationId);
  const partnerProfile = match?.matchedProfile;

  const loadMessages = () => {
    const list = storage.getMessages(conversationId);
    setMessages([...list]);
  };

  useEffect(() => {
    loadMessages();
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (textToSend?: string, isIcebreaker = false) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    storage.sendMessage(conversationId, currentUserId, text.trim(), isIcebreaker);
    setInputText('');
    setShowIcebreakers(false);
    loadMessages();
  };

  const handleUnmatch = () => {
    if (window.confirm('Are you sure you want to unmatch? This conversation will be removed.')) {
      storage.unmatch(currentUserId, conversationId);
      onBack();
    }
  };

  const handleBlock = () => {
    if (partnerProfile && window.confirm(`Block ${partnerProfile.displayName}? You will never see each other again.`)) {
      storage.blockUser(currentUserId, partnerProfile.userId);
      onBack();
    }
  };

  if (!match || !partnerProfile) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <p className="text-slate-600">Conversation not found or has been unmatched.</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-[#FF5A67] text-white text-xs font-bold rounded-xl"
        >
          Return to Matches
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col">
      {/* Header Bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Avatar and name */}
          <div 
            onClick={() => setSelectedProfile(partnerProfile)}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="relative">
              <img
                src={partnerProfile.photos[0]?.url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                alt={partnerProfile.displayName}
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
              />
              {partnerProfile.isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-bold text-slate-900 group-hover:text-[#FF5A67] transition-colors">
                  {partnerProfile.displayName}
                </h2>
                {partnerProfile.verificationBadge && (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                )}
              </div>
              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                <span>{partnerProfile.isOnline ? 'Online now' : 'Active recently'}</span>
                <span>•</span>
                <span className="text-[#E83E5A] font-semibold">{partnerProfile.relationshipIntention}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-40 text-xs text-slate-700">
              <button
                onClick={() => {
                  setSelectedProfile(partnerProfile);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2"
              >
                <Info className="w-4 h-4 text-slate-400" />
                View Full Profile
              </button>
              <button
                onClick={() => {
                  setReportModalOpen(true);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-slate-50 text-rose-600 flex items-center gap-2"
              >
                <ShieldAlert className="w-4 h-4" />
                Report User
              </button>
              <button
                onClick={() => {
                  handleBlock();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-600 flex items-center gap-2"
              >
                <Ban className="w-4 h-4" />
                Block User
              </button>
              <div className="border-t border-slate-100 my-1" />
              <button
                onClick={() => {
                  handleUnmatch();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Unmatch
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 space-y-4 overflow-y-auto">
        {/* Match celebration badge at conversation start */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 text-center max-w-md mx-auto space-y-2 shadow-xs my-4">
          <div className="w-8 h-8 rounded-full bg-[#FFF1F3] text-[#E83E5A] flex items-center justify-center mx-auto">
            <Heart className="w-4 h-4 fill-[#E83E5A]" />
          </div>
          <p className="text-xs font-bold text-slate-900">
            You and {partnerProfile.displayName} matched!
          </p>
          <p className="text-[11px] text-slate-500">
            Connected on mutual interest. Keep it respectful, sincere, and dignified.
          </p>
        </div>

        {/* Message bubbles */}
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUserId;
          const time = new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] sm:max-w-md rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-xs ${
                  isMe
                    ? 'bg-gradient-to-r from-[#FF5A67] to-[#E83E5A] text-white rounded-br-xs'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                }`}
              >
                {msg.isIcebreaker && (
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold mb-1 px-1.5 py-0.5 rounded-full ${
                    isMe ? 'bg-white/20 text-white' : 'bg-rose-50 text-[#E83E5A]'
                  }`}>
                    <Sparkles className="w-2.5 h-2.5" /> Isfaham Icebreaker
                  </span>
                )}
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>

              {/* Timestamp & Read ticks */}
              <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400 px-1">
                <span>{time}</span>
                {isMe && (
                  <span className="text-slate-400">
                    <Check className="w-3 h-3 inline" />
                  </span>
                )}
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Isfaham Icebreakers Drawer */}
      {showIcebreakers && (
        <div className="bg-[#FFF1F3] border-t border-[#FF5A67]/20 p-3 max-w-4xl mx-auto w-full space-y-2 animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#E83E5A] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Culturally Thoughtful Icebreakers (Tap to send)
            </span>
            <button
              onClick={() => setShowIcebreakers(false)}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              Close
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {ISFAHAM_ICEBREAKERS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt, true)}
                className="shrink-0 max-w-xs p-2.5 rounded-xl bg-white border border-[#FF5A67]/30 text-left text-xs text-slate-800 hover:border-[#FF5A67] hover:bg-rose-50/50 transition-all shadow-xs"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Input Bar */}
      <div className="sticky bottom-0 bg-white border-t border-slate-200 p-3 sm:p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="max-w-4xl mx-auto flex items-center gap-2"
        >
          {/* Icebreaker button */}
          <button
            type="button"
            onClick={() => setShowIcebreakers(!showIcebreakers)}
            className={`p-2.5 rounded-xl border transition-colors ${
              showIcebreakers ? 'border-[#FF5A67] bg-[#FFF1F3] text-[#E83E5A]' : 'border-slate-200 text-slate-500 hover:text-[#FF5A67]'
            }`}
            title="Isfaham Icebreakers"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Message ${partnerProfile.displayName}...`}
            className="flex-1 text-xs sm:text-sm p-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#FF5A67] focus:ring-1 focus:ring-[#FF5A67]"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim()}
            className={`p-3 rounded-2xl transition-all ${
              inputText.trim()
                ? 'bg-gradient-to-r from-[#FF5A67] to-[#E83E5A] text-white shadow-md cursor-pointer hover:opacity-95'
                : 'bg-slate-100 text-slate-300 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Full Profile Modal */}
      {selectedProfile && (
        <ProfileModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
          onReport={() => {
            setSelectedProfile(null);
            setReportModalOpen(true);
          }}
          onBlock={() => {
            handleBlock();
            setSelectedProfile(null);
          }}
          showActions={false}
        />
      )}

      {/* Report Modal */}
      {reportModalOpen && (
        <ReportModal
          reportedProfile={partnerProfile}
          onClose={() => setReportModalOpen(false)}
          onSubmit={(category, description) => {
            storage.submitReport({
              reporterId: currentUserId,
              reportedUserId: partnerProfile.userId,
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
