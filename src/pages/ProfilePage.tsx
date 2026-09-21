import React, { useState } from 'react';
import { 
  User as UserIcon, 
  CheckCircle, 
  Camera, 
  Sparkles, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  MapPin, 
  Heart,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { storage } from '../services/storage';
import { Profile, RelationshipIntention } from '../types';

interface ProfilePageProps {
  currentUserId: string;
  onNavigate: (route: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ currentUserId, onNavigate }) => {
  const currentUserData = storage.getCurrentUser();
  const initialProfile = currentUserData?.profile;

  const [profile, setProfile] = useState<Profile | null>(initialProfile || null);
  const [isEditing, setIsEditing] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!profile) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleAddPhoto = () => {
    if (!newPhotoUrl.trim()) return;
    const updatedPhotos = [
      ...profile.photos,
      {
        id: `photo-${Date.now()}`,
        url: newPhotoUrl.trim(),
        isPrimary: false,
        order: profile.photos.length + 1,
        moderationStatus: 'approved' as const
      }
    ];
    setProfile({ ...profile, photos: updatedPhotos });
    setNewPhotoUrl('');
  };

  const handleRemovePhoto = (id: string) => {
    if (profile.photos.length <= 1) {
      alert('You must keep at least one primary profile photo.');
      return;
    }
    const updated = profile.photos.filter(p => p.id !== id);
    setProfile({ ...profile, photos: updated });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              My Profile
            </h1>
            <p className="text-xs text-slate-500">
              Manage how potential matches see you across the platform.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 rounded-xl bg-[#FF5A67] text-white text-xs font-bold hover:bg-[#E83E5A] transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit Profile
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                Save Changes
              </button>
            )}
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">Profile updated successfully!</span>
          </div>
        )}

        {/* Profile Completion Meter */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">Profile Strength</span>
            <span className="text-xs font-extrabold text-[#E83E5A]">{profile.completionPercentage}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FF5A67] to-[#E83E5A] rounded-full transition-all duration-500"
              style={{ width: `${profile.completionPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Add more photos & detailed bio to reach 100%</span>
            {!profile.verificationBadge && (
              <button
                onClick={() => onNavigate('verification')}
                className="font-bold text-[#E83E5A] hover:underline"
              >
                Get Verified (+15%)
              </button>
            )}
          </div>
        </div>

        {/* Photos Grid */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-[#FF5A67]" />
              Photos ({profile.photos.length}/6)
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {profile.photos.map((p, idx) => (
              <div key={p.id} className="relative rounded-2xl overflow-hidden h-44 bg-slate-100 border border-slate-200 group">
                <img src={p.url} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                {p.isPrimary && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-bold bg-black/60 text-white backdrop-blur-md">
                    Primary
                  </span>
                )}
                {isEditing && (
                  <button
                    onClick={() => handleRemovePhoto(p.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {isEditing && profile.photos.length < 6 && (
            <div className="pt-2 flex gap-2">
              <input
                type="url"
                value={newPhotoUrl}
                onChange={(e) => setNewPhotoUrl(e.target.value)}
                placeholder="Paste new photo image URL (Unsplash or direct image)..."
                className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
              />
              <button
                type="button"
                onClick={handleAddPhoto}
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
              >
                Add Photo
              </button>
            </div>
          )}
        </div>

        {/* Bio & Details Form */}
        <form onSubmit={handleSave} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Display Name</label>
              <input
                type="text"
                disabled={!isEditing}
                value={profile.displayName}
                onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                className={`w-full text-xs p-2.5 rounded-xl border ${
                  isEditing ? 'border-slate-300 bg-white' : 'border-slate-100 bg-slate-50'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Relationship Intention</label>
              <select
                disabled={!isEditing}
                value={profile.relationshipIntention}
                onChange={(e) => setProfile({ ...profile, relationshipIntention: e.target.value as RelationshipIntention })}
                className={`w-full text-xs p-2.5 rounded-xl border font-semibold text-[#E83E5A] ${
                  isEditing ? 'border-slate-300 bg-white' : 'border-slate-100 bg-slate-50'
                }`}
              >
                <option value="Marriage">Marriage (Zawaj)</option>
                <option value="Serious Relationship">Serious Relationship</option>
                <option value="Getting to Know Someone">Getting to Know Someone</option>
                <option value="Friendship">Friendship</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">About Me (Bio)</label>
            <textarea
              rows={4}
              disabled={!isEditing}
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className={`w-full text-xs p-2.5 rounded-xl border leading-relaxed ${
                isEditing ? 'border-slate-300 bg-white' : 'border-slate-100 bg-slate-50'
              }`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Profession / Career</label>
              <input
                type="text"
                disabled={!isEditing}
                value={profile.profession || ''}
                onChange={(e) => setProfile({ ...profile, profession: e.target.value })}
                className={`w-full text-xs p-2.5 rounded-xl border ${
                  isEditing ? 'border-slate-300 bg-white' : 'border-slate-100 bg-slate-50'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Education</label>
              <input
                type="text"
                disabled={!isEditing}
                value={profile.education || ''}
                onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                className={`w-full text-xs p-2.5 rounded-xl border ${
                  isEditing ? 'border-slate-300 bg-white' : 'border-slate-100 bg-slate-50'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
              <input
                type="text"
                disabled={!isEditing}
                value={profile.city}
                onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                className={`w-full text-xs p-2.5 rounded-xl border ${
                  isEditing ? 'border-slate-300 bg-white' : 'border-slate-100 bg-slate-50'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Country</label>
              <input
                type="text"
                disabled={!isEditing}
                value={profile.country}
                onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                className={`w-full text-xs p-2.5 rounded-xl border ${
                  isEditing ? 'border-slate-300 bg-white' : 'border-slate-100 bg-slate-50'
                }`}
              />
            </div>
          </div>

          {isEditing && (
            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5A67] to-[#E83E5A] text-white font-bold text-xs shadow-md hover:opacity-95 transition-opacity"
              >
                Save Profile
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
