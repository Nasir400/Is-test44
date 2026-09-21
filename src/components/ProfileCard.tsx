import React, { useState } from 'react';
import { 
  Heart, 
  X, 
  Star, 
  RotateCcw, 
  Info, 
  CheckCircle, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  ChevronLeft, 
  ChevronRight,
  Shield
} from 'lucide-react';
import { Profile } from '../types';

interface ProfileCardProps {
  profile: Profile;
  onLike: (profileId: string) => void;
  onPass: (profileId: string) => void;
  onSuperLike: (profileId: string) => void;
  onUndo: () => void;
  onViewDetails: (profile: Profile) => void;
  canUndo?: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onLike,
  onPass,
  onSuperLike,
  onUndo,
  onViewDetails,
  canUndo = true
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const photos = profile.photos && profile.photos.length > 0
    ? profile.photos
    : [{ id: 'p1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80', isPrimary: true, order: 1, moderationStatus: 'approved' as const }];

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="relative w-full max-w-sm sm:max-w-md mx-auto bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden flex flex-col select-none">
      {/* Photo Stage */}
      <div 
        className="relative h-[440px] sm:h-[480px] w-full bg-slate-900 cursor-pointer overflow-hidden group"
        onClick={() => onViewDetails(profile)}
      >
        <img
          src={photos[photoIndex]?.url}
          alt={profile.displayName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />

        {/* Multi-Photo Progress Indicators */}
        {photos.length > 1 && (
          <div className="absolute top-3 left-4 right-4 z-20 flex gap-1.5">
            {photos.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 flex-1 rounded-full transition-all ${
                  idx === photoIndex ? 'bg-white shadow-sm' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        )}

        {/* Photo Navigation Click Zones */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Badges on Top */}
        <div className="absolute top-6 left-4 z-20 flex flex-wrap gap-2 pointer-events-none">
          {profile.verificationBadge && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-slate-900 shadow-sm">
              <CheckCircle className="w-3.5 h-3.5 text-[#12B76A]" />
              Verified Level {profile.verificationLevel}
            </span>
          )}

          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E83E5A]/90 backdrop-blur-md text-white shadow-sm">
            {profile.relationshipIntention}
          </span>
        </div>

        {/* Profile Info Overlay on bottom of photo */}
        <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
          <div className="flex items-baseline gap-2 mb-1">
            <h2 className="text-2xl font-bold tracking-tight">
              {profile.displayName}
            </h2>
            <span className="text-2xl font-normal text-slate-200">
              {profile.age}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-300 mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#FF5A67]" />
            <span>{profile.city}, {profile.country}</span>
            {profile.approxDistanceKm && (
              <>
                <span>•</span>
                <span>~{profile.approxDistanceKm} km away</span>
              </>
            )}
          </div>

          {profile.profession && (
            <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-2">
              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate">{profile.profession}</span>
            </div>
          )}

          <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed mb-3">
            {profile.bio}
          </p>

          {/* Interests Pills */}
          <div className="flex flex-wrap gap-1.5">
            {profile.interests.slice(0, 3).map((item, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/20 backdrop-blur-md text-white border border-white/10"
              >
                {item}
              </span>
            ))}
            {profile.interests.length > 3 && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-white/10 text-slate-300">
                +{profile.interests.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Controls Bar */}
      <div className="px-6 py-4 bg-white flex items-center justify-between">
        {/* Undo (Rewind) */}
        <button
          id="btn-discover-undo"
          onClick={onUndo}
          disabled={!canUndo}
          className={`w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center transition-all ${
            canUndo
              ? 'text-amber-500 hover:bg-amber-50 hover:border-amber-300 cursor-pointer shadow-xs'
              : 'text-slate-300 border-slate-100 cursor-not-allowed'
          }`}
          title="Undo last action"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        {/* Pass (✕) */}
        <button
          id="btn-discover-pass"
          onClick={() => onPass(profile.userId)}
          className="w-14 h-14 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-[#F04438] border border-slate-200 hover:border-rose-200 flex items-center justify-center transition-all shadow-md hover:scale-105 cursor-pointer"
          title="Pass"
        >
          <X className="w-7 h-7 stroke-[2.5]" />
        </button>

        {/* Super Like (⭐) */}
        <button
          id="btn-discover-superlike"
          onClick={() => onSuperLike(profile.userId)}
          className="w-11 h-11 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-500 border border-blue-200 flex items-center justify-center transition-all shadow-xs hover:scale-105 cursor-pointer"
          title="Super Like"
        >
          <Star className="w-5 h-5 fill-blue-500" />
        </button>

        {/* Like (❤️) */}
        <button
          id="btn-discover-like"
          onClick={() => onLike(profile.userId)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#E83E5A] to-[#FF5A67] hover:brightness-110 text-white flex items-center justify-center transition-all shadow-lg shadow-[#FF5A67]/30 hover:scale-105 cursor-pointer"
          title="Like"
        >
          <Heart className="w-7 h-7 fill-white stroke-[2.5]" />
        </button>

        {/* Info (Full Profile) */}
        <button
          id="btn-discover-info"
          onClick={() => onViewDetails(profile)}
          className="w-11 h-11 rounded-full border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-center transition-all shadow-xs cursor-pointer"
          title="View full profile"
        >
          <Info className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
