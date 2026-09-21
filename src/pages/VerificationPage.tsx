import React, { useState } from 'react';
import { 
  CheckCircle, 
  Shield, 
  Camera, 
  Upload, 
  Sparkles, 
  AlertTriangle, 
  Clock, 
  Award,
  Check
} from 'lucide-react';
import { storage } from '../services/storage';
import { Profile, VerificationRequest } from '../types';

interface VerificationPageProps {
  currentUserId: string;
  onNavigate: (route: string) => void;
}

const SAMPLE_POSES = [
  { id: 'peace', title: 'Peace Sign near Cheek', instruction: 'Make a peace sign (two fingers) beside your right cheek and smile naturally.' },
  { id: 'chin', title: 'Hand under Chin', instruction: 'Place your open hand gently under your chin while facing directly forward.' },
  { id: 'thumbsup', title: 'Thumbs Up', instruction: 'Give a clear thumbs up next to your shoulder with bright lighting.' }
];

export const VerificationPage: React.FC<VerificationPageProps> = ({
  currentUserId,
  onNavigate
}) => {
  const currentUserData = storage.getCurrentUser();
  const profile = currentUserData?.profile;

  const [selectedPose, setSelectedPose] = useState(SAMPLE_POSES[0]);
  const [selfieUrl, setSelfieUrl] = useState(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  );
  const [submitting, setSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<VerificationRequest | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      const req = storage.submitVerificationRequest(currentUserId, 2, selfieUrl);
      setSubmittedRequest(req);
      setSubmitting(false);
    }, 600);
  };

  if (!profile) return null;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Trust & Verification Center
          </h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Build instant confidence and receive up to 300% more mutual matches by verifying your profile.
          </p>
        </div>

        {/* Current Verification Level Badge */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-600 text-white flex items-center justify-center shadow-md">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-slate-900">
                  Current Status: Level {profile.verificationLevel} Verified
                </h3>
                {profile.verificationBadge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Active Badge
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {profile.verificationLevel === 1 && 'Basic contact channels verified.'}
                {profile.verificationLevel === 2 && 'Photo pose verified by trust & safety team.'}
                {profile.verificationLevel === 3 && 'Government identity verified.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Clock className="w-4 h-4" />
            <span>Updated recently</span>
          </div>
        </div>

        {/* 3 Verification Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Level 1 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Level 1: Contact</span>
              <Check className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Email and phone verified via SMS security codes upon registration.
            </p>
            <span className="inline-block text-[10px] font-bold text-emerald-600">Completed ✓</span>
          </div>

          {/* Level 2 */}
          <div className="p-5 rounded-2xl bg-[#FFF1F3] border border-[#FF5A67]/30 space-y-2 relative">
            <span className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#FF5A67] text-white">
              Recommended
            </span>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Level 2: Photo Pose</span>
              <Camera className="w-4 h-4 text-[#FF5A67]" />
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Gesture selfie reviewed by human moderator to eliminate catfishing.
            </p>
            <span className="inline-block text-[10px] font-bold text-[#E83E5A]">In Progress / Verified</span>
          </div>

          {/* Level 3 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Level 3: Identity</span>
              <Award className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Optional official ID or passport confirmation for matrimonial trust.
            </p>
            <span className="inline-block text-[10px] font-bold text-slate-400">Available</span>
          </div>
        </div>

        {/* Level 2 Photo Verification Submission Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#FF5A67]" />
              Submit Photo Pose for Verification
            </h3>
            <p className="text-xs text-slate-500">
              Select one of the designated safety poses and take or upload a clear selfie.
            </p>
          </div>

          {/* Pose Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Step 1: Choose Your Gesture Pose
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SAMPLE_POSES.map((pose) => (
                <button
                  key={pose.id}
                  type="button"
                  onClick={() => setSelectedPose(pose)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedPose.id === pose.id
                      ? 'border-[#FF5A67] bg-[#FFF1F3] text-slate-900 shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <p className="font-bold text-xs">{pose.title}</p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">{pose.instruction}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Selfie Preview & Submission */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Step 2: Gesture Selfie Preview
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-36 h-48 rounded-2xl bg-slate-900 overflow-hidden shrink-0 border-2 border-[#FF5A67] shadow-md">
                  <img
                    src={selfieUrl}
                    alt="Selfie Pose"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2 text-xs text-slate-600">
                  <p className="font-semibold text-slate-900">Pose Selected: {selectedPose.title}</p>
                  <p>{selectedPose.instruction}</p>
                  <div className="pt-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      Upload New Selfie
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const url = URL.createObjectURL(e.target.files[0]);
                            setSelfieUrl(url);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {submittedRequest ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3">
                <CheckCircle className="w-5 h-5 shrink-0 text-emerald-600" />
                <div>
                  <p className="font-bold">Pose Submitted Successfully!</p>
                  <p className="text-[11px] text-emerald-700">
                    Your request (ID: {submittedRequest.id}) is in the moderation review queue. Approvals usually take 15–30 minutes.
                  </p>
                </div>
              </div>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF5A67] to-[#E83E5A] text-white font-bold text-xs shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-2"
              >
                {submitting ? 'Submitting...' : 'Submit Pose for Human Review'}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
