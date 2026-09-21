/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { storage } from './services/storage';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';

// Pages
import { PublicHome } from './pages/PublicHome';
import { PublicPages } from './pages/PublicPages';
import { AuthPage } from './pages/AuthPage';
import { DiscoverPage } from './pages/DiscoverPage';
import { LikesYouPage } from './pages/LikesYouPage';
import { MatchesPage } from './pages/MatchesPage';
import { ChatPage } from './pages/ChatPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { VerificationPage } from './pages/VerificationPage';
import { PremiumPage } from './pages/PremiumPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [currentUserId, setCurrentUserId] = useState<string | null>(storage.getCurrentUserId());
  const [language, setLanguage] = useState<Language>('en');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  // Sync state when storage changes or on mount
  useEffect(() => {
    const id = storage.getCurrentUserId();
    setCurrentUserId(id);
  }, []);

  const handleNavigate = (route: string) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setCurrentRoute('auth');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = (userId: string) => {
    setCurrentUserId(userId);
    storage.setCurrentUserId(userId);
    setCurrentRoute('discover');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    storage.setCurrentUserId(null);
    setCurrentUserId(null);
    setCurrentRoute('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchUser = (userId: string) => {
    storage.setCurrentUserId(userId);
    setCurrentUserId(userId);
    // Reload or refresh state
  };

  const handleOpenChat = (conversationId: string) => {
    setActiveChatId(conversationId);
    setCurrentRoute('chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get active user data
  const currentUserData = storage.getCurrentUser();
  const currentUser = currentUserData?.user || null;
  const currentProfile = currentUserData?.profile || null;
  const unreadNotifCount = currentUserId
    ? storage.getNotifications(currentUserId).filter(n => !n.read).length
    : 0;

  // Render the active view
  const renderContent = () => {
    // 1. Informational Pages
    if (['about', 'safety', 'help', 'terms', 'privacy', 'how-it-works', 'community-guidelines', 'contact'].includes(currentRoute)) {
      return (
        <PublicPages
          page={currentRoute as any}
          onNavigate={handleNavigate}
          language={language}
        />
      );
    }

    // 2. Auth Flow
    if (currentRoute === 'auth') {
      return (
        <AuthPage
          initialMode={authMode}
          onSuccess={handleAuthSuccess}
          onNavigate={handleNavigate}
          language={language}
        />
      );
    }

    // 3. Public Home
    if (currentRoute === 'home' && !currentUserId) {
      return (
        <PublicHome
          onNavigate={handleNavigate}
          language={language}
        />
      );
    }

    // If logged out and trying to access private page -> show home
    if (!currentUserId && currentRoute !== 'admin') {
      return (
        <PublicHome
          onNavigate={handleNavigate}
          language={language}
        />
      );
    }

    // 4. Authenticated Pages
    switch (currentRoute) {
      case 'discover':
      case 'home':
        return currentUserId ? (
          <DiscoverPage
            currentUserId={currentUserId}
            onNavigate={handleNavigate}
            onOpenChat={handleOpenChat}
          />
        ) : (
          <PublicHome onNavigate={handleNavigate} language={language} />
        );

      case 'likes-you':
        return currentUserId ? (
          <LikesYouPage
            currentUserId={currentUserId}
            onNavigate={handleNavigate}
            onOpenChat={handleOpenChat}
          />
        ) : null;

      case 'matches':
        return currentUserId ? (
          <MatchesPage
            currentUserId={currentUserId}
            onOpenChat={handleOpenChat}
            onNavigate={handleNavigate}
          />
        ) : null;

      case 'chat':
        return currentUserId && activeChatId ? (
          <ChatPage
            conversationId={activeChatId}
            currentUserId={currentUserId}
            onBack={() => handleNavigate('matches')}
          />
        ) : (
          <MatchesPage
            currentUserId={currentUserId || ''}
            onOpenChat={handleOpenChat}
            onNavigate={handleNavigate}
          />
        );

      case 'notifications':
        return currentUserId ? (
          <NotificationsPage
            currentUserId={currentUserId}
            onNavigate={handleNavigate}
            onOpenChat={handleOpenChat}
          />
        ) : null;

      case 'verification':
        return currentUserId ? (
          <VerificationPage
            currentUserId={currentUserId}
            onNavigate={handleNavigate}
          />
        ) : null;

      case 'premium':
        return currentUserId ? (
          <PremiumPage
            currentUserId={currentUserId}
            onNavigate={handleNavigate}
          />
        ) : null;

      case 'settings':
        return currentUserId ? (
          <SettingsPage
            currentUserId={currentUserId}
            language={language}
            onLanguageChange={setLanguage}
            onLogout={handleLogout}
          />
        ) : null;

      case 'profile':
        return currentUserId ? (
          <ProfilePage
            currentUserId={currentUserId}
            onNavigate={handleNavigate}
          />
        ) : null;

      case 'admin':
        return (
          <AdminDashboard
            onNavigate={handleNavigate}
            onSwitchUser={handleSwitchUser}
          />
        );

      default:
        return (
          <DiscoverPage
            currentUserId={currentUserId || ''}
            onNavigate={handleNavigate}
            onOpenChat={handleOpenChat}
          />
        );
    }
  };

  const isChatRoute = currentRoute === 'chat';
  const isAdminRoute = currentRoute === 'admin';

  return (
    <div className={`min-h-screen flex flex-col ${isAdminRoute ? 'bg-slate-900' : 'bg-[#F8FAFC]'}`}>
      {/* Top Navbar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        language={language}
        onLanguageChange={setLanguage}
        currentUser={currentUserData}
        onLogout={handleLogout}
        onSwitchUser={handleSwitchUser}
      />

      {/* Main Content Area */}
      <main className={`flex-1 ${isChatRoute ? '' : 'pb-16 sm:pb-0'}`}>
        {renderContent()}
      </main>

      {/* Mobile Bottom Navigation (only shown for logged-in users when not in chat or admin) */}
      {currentUserId && !isChatRoute && !isAdminRoute && (
        <BottomNav
          currentRoute={currentRoute}
          onNavigate={handleNavigate}
          unreadCount={unreadNotifCount}
        />
      )}

      {/* Footer (only on public or info pages) */}
      {(!currentUserId || ['home', 'about', 'safety', 'help', 'terms', 'privacy'].includes(currentRoute)) && (
        <Footer
          onNavigate={handleNavigate}
          language={language}
          onLanguageChange={setLanguage}
        />
      )}
    </div>
  );
}
