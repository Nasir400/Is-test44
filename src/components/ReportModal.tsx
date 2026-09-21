import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';
import { Profile, ReportCategory } from '../types';

interface ReportModalProps {
  reportedProfile: Profile;
  onClose: () => void;
  onSubmit: (category: ReportCategory, description: string) => void;
}

const REPORT_OPTIONS: { category: ReportCategory; label: string; description: string }[] = [
  { category: 'scam', label: 'Financial Scam or Money Request', description: 'Asking for money, remittances, crypto, or investments' },
  { category: 'fake_profile', label: 'Fake Profile / Stolen Pictures', description: 'Using someone else\'s photos or celebrity pictures' },
  { category: 'harassment', label: 'Harassment or Disrespectful Behavior', description: 'Rude, offensive, or persistent unwanted behavior' },
  { category: 'inappropriate_content', label: 'Inappropriate Content or Photos', description: 'Explicit photos, sexually suggestive or vulgar material' },
  { category: 'underage_user', label: 'Suspected Underage (<18)', description: 'Isfaham is strictly for adults aged 18 and older' },
  { category: 'impersonation', label: 'Impersonation of Someone I Know', description: 'Pretending to be someone real without permission' },
  { category: 'other', label: 'Other Safety Concern', description: 'Any other violation of our community standards' }
];

export const ReportModal: React.FC<ReportModalProps> = ({
  reportedProfile,
  onClose,
  onSubmit
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ReportCategory>('scam');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(selectedCategory, details);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Report {reportedProfile.displayName}
                </h3>
                <p className="text-xs text-slate-500">
                  Your report is confidential and reviewed by the Trust & Safety team.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select Reason
                </label>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {REPORT_OPTIONS.map((opt) => (
                    <label
                      key={opt.category}
                      className={`block p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        selectedCategory === opt.category
                          ? 'border-[#FF5A67] bg-[#FFF1F3] text-slate-900 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="report-category"
                          value={opt.category}
                          checked={selectedCategory === opt.category}
                          onChange={() => setSelectedCategory(opt.category)}
                          className="accent-[#FF5A67]"
                        />
                        <span className="font-semibold">{opt.label}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 pl-5">
                        {opt.description}
                      </p>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Additional Details (Optional)
                </label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Describe what occurred, any messages exchanged, or links to evidence..."
                  rows={3}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5A67] focus:ring-1 focus:ring-[#FF5A67]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md transition-colors"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Report Received</h3>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Thank you for keeping Isfaham safe. Our moderation team has queued this case for immediate review.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
