import React from 'react';
import { 
  X, 
  CheckCircle, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Languages, 
  Heart, 
  ShieldAlert, 
  Ban, 
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { Profile } from '../types';

interface ProfileModalProps {
  profile: Profile;
  onClose: () => void;
  onLike?: (userId: string) => void;
  onPass?: (userId: string) => void;
  onReport: (profile: Profile) => void;
  onBlock: (profile: Profile) => void;
  showActions?: boolean;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  profile,
  onClose,
  onLike,
  onPass,
  onReport,
  onBlock,
  showActions = true
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-md border-b border-slate-100">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">
              {profile.displayName}, {profile.age}
            </h2>
            {profile.verificationBadge && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                Verified
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto px-6 py-6 space-y-8 divide-y divide-slate-100">
          {/* Photos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {profile.photos.map((photo, index) => (
              <div key={photo.id || index} className="relative rounded-2xl overflow-hidden h-72 bg-slate-100 shadow-xs">
                <img
                  src={photo.url}
                  alt={`${profile.displayName} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {photo.isPrimary && (
                  <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-md">
                    Primary Photo
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Intention & Overview */}
          <div className="pt-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Relationship Goal & Foundation
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#FFF1F3] text-[#E83E5A] border border-[#FF5A67]/20 flex items-center gap-1.5">
                <Heart className="w-4 h-4 fill-[#E83E5A]" />
                Intention: {profile.relationshipIntention}
              </span>
              {profile.religion && (
                <span className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                  Faith: {profile.religion}
                </span>
              )}
              {profile.heightCm && (
                <span className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                  Height: {profile.heightCm} cm
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600 pt-1">
              <MapPin className="w-4 h-4 text-[#FF5A67]" />
              <span>Location: <strong>{profile.city}, {profile.country}</strong></span>
              {profile.approxDistanceKm && (
                <span className="text-slate-400">(~{profile.approxDistanceKm} km away)</span>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="pt-6 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              About Me
            </h3>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line text-sm">
              {profile.bio}
            </p>
          </div>

          {/* Career & Education */}
          <div className="pt-6 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Career & Education
            </h3>
            <div className="space-y-2 text-sm text-slate-700">
              {profile.profession && (
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  <span>Works as <strong>{profile.profession}</strong></span>
                </div>
              )}
              {profile.education && (
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  <span>Educated at <strong>{profile.education}</strong></span>
                </div>
              )}
              {profile.languages && (
                <div className="flex items-center gap-2">
                  <Languages className="w-4 h-4 text-slate-400" />
                  <span>Languages: {profile.languages.join(', ')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Lifestyle Preferences */}
          {profile.lifestyle && (
            <div className="pt-6 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Lifestyle & Outlook
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {profile.lifestyle.exercise && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-semibold block text-slate-900 mb-0.5">Physical Activity:</span>
                    {profile.lifestyle.exercise}
                  </div>
                )}
                {profile.lifestyle.drinking && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-semibold block text-slate-900 mb-0.5">Drinking:</span>
                    {profile.lifestyle.drinking}
                  </div>
                )}
                {profile.lifestyle.smoking && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-semibold block text-slate-900 mb-0.5">Smoking:</span>
                    {profile.lifestyle.smoking}
                  </div>
                )}
                {profile.lifestyle.relocate && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-semibold block text-slate-900 mb-0.5">Relocation:</span>
                    {profile.lifestyle.relocate}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Interests */}
          <div className="pt-6 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Interests & Passions
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Trust & Safety Options */}
          <div className="pt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <button
              onClick={() => onReport(profile)}
              className="flex items-center gap-1.5 text-rose-600 hover:text-rose-800 font-semibold transition-colors cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4" />
              Report this Profile
            </button>

            <button
              onClick={() => onBlock(profile)}
              className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 font-semibold transition-colors cursor-pointer"
            >
              <Ban className="w-4 h-4" />
              Block User
            </button>
          </div>
        </div>

        {/* Footer sticky action buttons */}
        {showActions && onLike && onPass && (
          <div className="sticky bottom-0 z-30 px-6 py-4 bg-white border-t border-slate-200 flex items-center justify-center gap-4">
            <button
              onClick={() => {
                onPass(profile.userId);
                onClose();
              }}
              className="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-colors"
            >
              Pass
            </button>
            <button
              onClick={() => {
                onLike(profile.userId);
                onClose();
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF5A67] to-[#E83E5A] text-white font-bold hover:opacity-95 shadow-md shadow-[#FF5A67]/20 transition-opacity"
            >
              Like Profile ❤️
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
