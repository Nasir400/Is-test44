import React, { useState } from 'react';
import { 
  Heart, 
  Shield, 
  Sparkles, 
  Crown, 
  MessageCircle, 
  Bell, 
  User as UserIcon, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Globe, 
  Flame, 
  CheckCircle,
  Users,
  Compass
} from 'lucide-react';
import { Language, User, Profile } from '../types';
import { translations } from '../i18n/translations';
import { storage } from '../services/storage';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  currentUser: { user: User; profile: Profile } | null;
  onLogout: () => void;
  onSwitchUser: (userId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  language,
  onLanguageChange,
  currentUser,
  onLogout,
  onSwitchUser
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const t = translations[language];
  const allUsers = storage.getAllUsers();
  const unreadCount = currentUser ? storage.getNotifications(currentUser.user.id).filter(n => !n.read).length : 0;

  const isRTL = language === 'ar';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button 
              id="nav-brand-logo-btn"
              onClick={() => onNavigate(currentUser ? 'discover' : 'home')}
              className="flex items-center gap-2 group cursor-pointer text-left"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#E83E5A] to-[#FF5A67] flex items-center justify-center shadow-md shadow-[#FF5A67]/20 group-hover:scale-105 transition-transform duration-200">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-[#101828] group-hover:text-[#FF5A67] transition-colors">
                  ISFAHAM
                </span>
                <span className="hidden sm:block text-[10px] uppercase font-semibold tracking-wider text-[#E83E5A]">
                  Dating & Marriage
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {!currentUser ? (
              <>
                <button
                  id="nav-home-btn"
                  onClick={() => onNavigate('home')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentRoute === 'home' ? 'text-[#FF5A67] bg-[#FFF1F3]' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {t.navHome}
                </button>
                <button
                  id="nav-how-btn"
                  onClick={() => onNavigate('how-it-works')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentRoute === 'how-it-works' ? 'text-[#FF5A67] bg-[#FFF1F3]' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {t.footerHow}
                </button>
                <button
                  id="nav-safety-btn"
                  onClick={() => onNavigate('safety')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentRoute === 'safety' ? 'text-[#FF5A67] bg-[#FFF1F3]' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {t.navSafety}
                </button>
                <button
                  id="nav-premium-btn"
                  onClick={() => onNavigate('premium')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentRoute === 'premium' ? 'text-[#FF5A67] bg-[#FFF1F3]' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {t.navPremium}
                </button>
              </>
            ) : (
              <>
                <button
                  id="nav-discover-btn"
                  onClick={() => onNavigate('discover')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentRoute === 'discover' ? 'text-[#FF5A67] bg-[#FFF1F3]' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Compass className="w-4 h-4" />
                  {t.navDiscover}
                </button>
                <button
                  id="nav-likes-you-btn"
                  onClick={() => onNavigate('likes-you')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentRoute === 'likes-you' ? 'text-[#FF5A67] bg-[#FFF1F3]' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  {t.navLikesYou}
                </button>
                <button
                  id="nav-matches-btn"
                  onClick={() => onNavigate('matches')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentRoute === 'matches' ? 'text-[#FF5A67] bg-[#FFF1F3]' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  {t.navMatches}
                </button>
                <button
                  id="nav-messages-btn"
                  onClick={() => onNavigate('messages')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentRoute === 'messages' ? 'text-[#FF5A67] bg-[#FFF1F3]' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  {t.navMessages}
                </button>
                <button
                  id="nav-notifications-btn"
                  onClick={() => onNavigate('notifications')}
                  className={`relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors ${
                    currentRoute === 'notifications' ? 'text-[#FF5A67] bg-[#FFF1F3]' : ''
                  }`}
                  title={t.navNotifications}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-[#FF5A67] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <button
                  id="nav-premium-upgrade-btn"
                  onClick={() => onNavigate('premium')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors"
                >
                  <Crown className="w-3.5 h-3.5 text-amber-600" />
                  {currentUser.user.subscriptionTier.toUpperCase()}
                </button>
              </>
            )}
          </nav>

          {/* Right Action Controls: Language, Switch Persona, Admin, Profile */}
          <div className="flex items-center gap-2">
            {/* Language Picker */}
            <div className="relative">
              <button
                id="language-selector-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>
                  {language === 'en' ? 'English' : language === 'so' ? 'Soomaali' : 'العربية'}
                </span>
              </button>

              {langDropdownOpen && (
                <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-1.5 w-32 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50`}>
                  <button
                    onClick={() => {
                      onLanguageChange('en');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center justify-between ${
                      language === 'en' ? 'font-bold text-[#FF5A67]' : 'text-slate-700'
                    }`}
                  >
                    <span>English</span>
                    {language === 'en' && <CheckCircle className="w-3.5 h-3.5 text-[#FF5A67]" />}
                  </button>
                  <button
                    onClick={() => {
                      onLanguageChange('so');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center justify-between ${
                      language === 'so' ? 'font-bold text-[#FF5A67]' : 'text-slate-700'
                    }`}
                  >
                    <span>Af-Soomaali</span>
                    {language === 'so' && <CheckCircle className="w-3.5 h-3.5 text-[#FF5A67]" />}
                  </button>
                  <button
                    onClick={() => {
                      onLanguageChange('ar');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center justify-between ${
                      language === 'ar' ? 'font-bold text-[#FF5A67]' : 'text-slate-700'
                    }`}
                  >
                    <span>العربية</span>
                    {language === 'ar' && <CheckCircle className="w-3.5 h-3.5 text-[#FF5A67]" />}
                  </button>
                </div>
              )}
            </div>

            {/* Quick Demo Persona Switcher (Allows instantaneous testing across seed users) */}
            {currentUser && (
              <div className="hidden lg:block relative">
                <select
                  id="persona-switcher-select"
                  value={currentUser.user.id}
                  onChange={e => onSwitchUser(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#FF5A67]"
                  title="Switch Persona for testing"
                >
                  {allUsers.map(({ user, profile }) => (
                    <option key={user.id} value={user.id}>
                      {profile ? `${profile.displayName} (${profile.city})` : user.email}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Admin link button */}
            <button
              id="nav-admin-console-btn"
              onClick={() => onNavigate('admin')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1 ${
                currentRoute === 'admin'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
              }`}
            >
              <Shield className="w-3 h-3 text-[#FF5A67]" />
              <span className="hidden sm:inline">Admin</span>
            </button>

            {/* User Avatar / Auth Buttons */}
            {!currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  id="nav-login-btn"
                  onClick={() => onNavigate('auth-login')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  {t.navLogin}
                </button>
                <button
                  id="nav-signup-btn"
                  onClick={() => onNavigate('auth-signup')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#FF5A67] to-[#E83E5A] hover:opacity-95 rounded-xl shadow-xs transition-opacity"
                >
                  {t.heroCtaJoin}
                </button>
              </div>
            ) : (
              <div className="relative">
                <button
                  id="user-profile-menu-btn"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-[#FF5A67]/30 transition-all"
                >
                  <img
                    src={currentUser.profile.photos[0]?.url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                    alt={currentUser.profile.displayName}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                  />
                </button>

                {userMenuOpen && (
                  <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50`}>
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        {currentUser.profile.displayName}
                        {currentUser.profile.verificationBadge && (
                          <CheckCircle className="w-3.5 h-3.5 text-[#12B76A]" />
                        )}
                      </p>
                      <p className="text-xs text-slate-500">{currentUser.profile.city}, {currentUser.profile.country}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-[#E83E5A]">
                        {currentUser.profile.relationshipIntention}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        onNavigate('profile');
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <UserIcon className="w-4 h-4 text-slate-400" />
                      View & Edit Profile
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('verification');
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4 text-[#12B76A]" />
                      Get Verified Badge
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('settings');
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      {t.navSettings}
                    </button>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={() => {
                        onLogout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      {t.navLogout}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-1 shadow-lg">
          {!currentUser ? (
            <>
              <button
                onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
                className="w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-[#FF5A67]"
              >
                {t.navHome}
              </button>
              <button
                onClick={() => { onNavigate('how-it-works'); setMobileMenuOpen(false); }}
                className="w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-[#FF5A67]"
              >
                {t.footerHow}
              </button>
              <button
                onClick={() => { onNavigate('safety'); setMobileMenuOpen(false); }}
                className="w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-[#FF5A67]"
              >
                {t.navSafety}
              </button>
              <button
                onClick={() => { onNavigate('premium'); setMobileMenuOpen(false); }}
                className="w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-[#FF5A67]"
              >
                {t.navPremium}
              </button>
              <div className="pt-3 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => { onNavigate('auth-login'); setMobileMenuOpen(false); }}
                  className="flex-1 py-2 text-center text-xs font-semibold text-slate-800 bg-slate-100 rounded-lg"
                >
                  {t.navLogin}
                </button>
                <button
                  onClick={() => { onNavigate('auth-signup'); setMobileMenuOpen(false); }}
                  className="flex-1 py-2 text-center text-xs font-semibold text-white bg-[#FF5A67] rounded-lg"
                >
                  {t.heroCtaJoin}
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => { onNavigate('discover'); setMobileMenuOpen(false); }}
                className="w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-[#FF5A67] flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                {t.navDiscover}
              </button>
              <button
                onClick={() => { onNavigate('likes-you'); setMobileMenuOpen(false); }}
                className="w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-[#FF5A67] flex items-center gap-2"
              >
                <Heart className="w-4 h-4" />
                {t.navLikesYou}
              </button>
              <button
                onClick={() => { onNavigate('matches'); setMobileMenuOpen(false); }}
                className="w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-[#FF5A67] flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                {t.navMatches}
              </button>
              <button
                onClick={() => { onNavigate('messages'); setMobileMenuOpen(false); }}
                className="w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-[#FF5A67] flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                {t.navMessages}
              </button>
              <button
                onClick={() => { onNavigate('verification'); setMobileMenuOpen(false); }}
                className="w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-[#FF5A67] flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4 text-[#12B76A]" />
                {t.navVerification}
              </button>
              <button
                onClick={() => { onNavigate('settings'); setMobileMenuOpen(false); }}
                className="w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-[#FF5A67] flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                {t.navSettings}
              </button>
              <button
                onClick={() => { onNavigate('admin'); setMobileMenuOpen(false); }}
                className="w-full text-left py-2 text-sm font-medium text-slate-900 flex items-center gap-2"
              >
                <Shield className="w-4 h-4 text-[#FF5A67]" />
                Admin Dashboard
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};
