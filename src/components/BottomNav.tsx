import React from 'react';
import { Compass, Heart, Users, MessageCircle, User as UserIcon } from 'lucide-react';
import { Profile } from '../types';

interface BottomNavProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  unreadCount: number;
  currentProfile?: Profile;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentRoute,
  onNavigate,
  unreadCount,
  currentProfile
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 px-2 py-1 shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Discover */}
        <button
          id="bottom-nav-discover"
          onClick={() => onNavigate('discover')}
          className={`flex flex-col items-center justify-center w-16 py-1.5 transition-colors ${
            currentRoute === 'discover' ? 'text-[#FF5A67]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Compass className={`w-5 h-5 ${currentRoute === 'discover' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] font-medium mt-1">Discover</span>
        </button>

        {/* Likes You */}
        <button
          id="bottom-nav-likes-you"
          onClick={() => onNavigate('likes-you')}
          className={`flex flex-col items-center justify-center w-16 py-1.5 transition-colors ${
            currentRoute === 'likes-you' ? 'text-[#FF5A67]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Heart className={`w-5 h-5 ${currentRoute === 'likes-you' ? 'fill-[#FF5A67] text-[#FF5A67]' : 'stroke-2'}`} />
          <span className="text-[10px] font-medium mt-1">Likes</span>
        </button>

        {/* Matches */}
        <button
          id="bottom-nav-matches"
          onClick={() => onNavigate('matches')}
          className={`flex flex-col items-center justify-center w-16 py-1.5 transition-colors ${
            currentRoute === 'matches' ? 'text-[#FF5A67]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className={`w-5 h-5 ${currentRoute === 'matches' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] font-medium mt-1">Matches</span>
        </button>

        {/* Messages */}
        <button
          id="bottom-nav-messages"
          onClick={() => onNavigate('messages')}
          className={`relative flex flex-col items-center justify-center w-16 py-1.5 transition-colors ${
            currentRoute === 'messages' ? 'text-[#FF5A67]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <MessageCircle className={`w-5 h-5 ${currentRoute === 'messages' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] font-medium mt-1">Chat</span>
          {unreadCount > 0 && (
            <span className="absolute top-1 right-3 w-4 h-4 bg-[#FF5A67] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Profile */}
        <button
          id="bottom-nav-profile"
          onClick={() => onNavigate('profile')}
          className={`flex flex-col items-center justify-center w-16 py-1.5 transition-colors ${
            currentRoute === 'profile' ? 'text-[#FF5A67]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {currentProfile?.photos[0]?.url ? (
            <img
              src={currentProfile.photos[0].url}
              alt={currentProfile.displayName}
              className={`w-5 h-5 rounded-full object-cover border ${
                currentRoute === 'profile' ? 'border-[#FF5A67] ring-1 ring-[#FF5A67]' : 'border-slate-300'
              }`}
            />
          ) : (
            <UserIcon className="w-5 h-5 stroke-2" />
          )}
          <span className="text-[10px] font-medium mt-1">Profile</span>
        </button>
      </div>
    </div>
  );
};
