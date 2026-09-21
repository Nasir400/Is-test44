import React, { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Eye, 
  Globe, 
  Trash2, 
  Download, 
  Check, 
  Lock, 
  MapPin, 
  Bell,
  UserX,
  AlertTriangle
} from 'lucide-react';
import { storage } from '../services/storage';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface SettingsPageProps {
  currentUserId: string;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onLogout: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  currentUserId,
  language,
  onLanguageChange,
  onLogout
}) => {
  const t = translations[language];
  const currentUserData = storage.getCurrentUser();
  const user = currentUserData?.user;
  const profile = currentUserData?.profile;

  // Privacy toggles
  const [hideDistance, setHideDistance] = useState(false);
  const [hideOnlineStatus, setHideOnlineStatus] = useState(false);
  const [pauseDiscovery, setPauseDiscovery] = useState(false);

  // Notifications toggles
  const [notifyMatches, setNotifyMatches] = useState(true);
  const [notifyMessages, setNotifyMessages] = useState(true);
  const [notifyLikes, setNotifyLikes] = useState(true);

  // Status message
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const showSaved = (msg: string) => {
    setSavedMessage(msg);
    setTimeout(() => setSavedMessage(null), 2500);
  };

  const handleExportData = () => {
    const data = {
      user,
      profile,
      matches: storage.getMatches(currentUserId),
      notifications: storage.getNotifications(currentUserId),
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `isfaham-data-export-${user?.id || 'me'}.json`;
    a.click();
    showSaved('Your personal data archive has been downloaded.');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to permanently delete your Isfaham account? This action is irreversible.')) {
      storage.updateUserStatus(currentUserId, 'deleted', 'self');
      alert('Your account has been deleted. You will now be redirected.');
      onLogout();
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#E83E5A] to-[#FF5A67] flex items-center justify-center text-white">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Settings & Preferences
              </h1>
              <p className="text-xs text-slate-500">
                Manage your discovery visibility, privacy controls, and account settings.
              </p>
            </div>
          </div>
        </div>

        {savedMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">{savedMessage}</span>
          </div>
        )}

        {/* 1. Language Preference */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#FF5A67]" />
            <h3 className="text-sm font-bold text-slate-900">Language / Luqadda</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'en' as Language, label: 'English' },
              { id: 'so' as Language, label: 'Af-Soomaali' },
              { id: 'ar' as Language, label: 'العربية' }
            ].map((lang) => (
              <button
                key={lang.id}
                onClick={() => {
                  onLanguageChange(lang.id);
                  showSaved(`Language updated to ${lang.label}`);
                }}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                  language === lang.id
                    ? 'border-[#FF5A67] bg-[#FFF1F3] text-[#E83E5A]'
                    : 'border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Privacy & Safety Controls */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">Privacy Controls</h3>
          </div>

          <div className="space-y-3 divide-y divide-slate-100 text-xs">
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="font-bold text-slate-900">Hide Distance</p>
                <p className="text-slate-500 text-[11px]">Do not display estimated kilometers on my card</p>
              </div>
              <input
                type="checkbox"
                checked={hideDistance}
                onChange={(e) => {
                  setHideDistance(e.target.checked);
                  showSaved('Distance display setting updated.');
                }}
                className="w-4 h-4 accent-[#FF5A67] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <p className="font-bold text-slate-900">Hide Online Status</p>
                <p className="text-slate-500 text-[11px]">Do not show green active indicator to other members</p>
              </div>
              <input
                type="checkbox"
                checked={hideOnlineStatus}
                onChange={(e) => {
                  setHideOnlineStatus(e.target.checked);
                  showSaved('Online status visibility updated.');
                }}
                className="w-4 h-4 accent-[#FF5A67] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <p className="font-bold text-slate-900">Pause Discovery (Go Invisible)</p>
                <p className="text-slate-500 text-[11px]">Temporarily stop showing your profile to new matches</p>
              </div>
              <input
                type="checkbox"
                checked={pauseDiscovery}
                onChange={(e) => {
                  setPauseDiscovery(e.target.checked);
                  showSaved('Discovery status updated.');
                }}
                className="w-4 h-4 accent-[#FF5A67] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 3. Notifications */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">Notification Preferences</h3>
          </div>

          <div className="space-y-3 divide-y divide-slate-100 text-xs">
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="font-bold text-slate-900">Mutual Match Notifications</p>
                <p className="text-slate-500 text-[11px]">Instant alert when both members like each other</p>
              </div>
              <input
                type="checkbox"
                checked={notifyMatches}
                onChange={(e) => setNotifyMatches(e.target.checked)}
                className="w-4 h-4 accent-[#FF5A67] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <p className="font-bold text-slate-900">New Message Alerts</p>
                <p className="text-slate-500 text-[11px]">Alerts for private incoming messages</p>
              </div>
              <input
                type="checkbox"
                checked={notifyMessages}
                onChange={(e) => setNotifyMessages(e.target.checked)}
                className="w-4 h-4 accent-[#FF5A67] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <p className="font-bold text-slate-900">New Like Alerts</p>
                <p className="text-slate-500 text-[11px]">Notifications when someone likes your profile</p>
              </div>
              <input
                type="checkbox"
                checked={notifyLikes}
                onChange={(e) => setNotifyLikes(e.target.checked)}
                className="w-4 h-4 accent-[#FF5A67] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 4. Account Data & Danger Zone */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Data & Account Actions</h3>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleExportData}
              className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-500" />
              Download My Data (JSON)
            </button>

            <button
              onClick={handleDeleteAccount}
              className="flex-1 py-2.5 px-4 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-xs font-semibold text-rose-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4 text-rose-600" />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
