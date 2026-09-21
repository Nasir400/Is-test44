import React, { useState } from 'react';
import { Bell, Heart, MessageCircle, Shield, CheckCircle, Crown, Check } from 'lucide-react';
import { storage } from '../services/storage';
import { NotificationItem } from '../types';

interface NotificationsPageProps {
  currentUserId: string;
  onNavigate: (route: string) => void;
  onOpenChat: (convId: string) => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({
  currentUserId,
  onNavigate,
  onOpenChat
}) => {
  const [filter, setFilter] = useState<'all' | 'likes' | 'matches' | 'safety'>('all');
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    storage.getNotifications(currentUserId)
  );

  const handleMarkAllRead = () => {
    storage.markAllNotificationsAsRead(currentUserId);
    setNotifications(storage.getNotifications(currentUserId));
  };

  const filtered = notifications.filter(n => {
    if (filter === 'likes') return n.type === 'like' || n.type === 'super_like';
    if (filter === 'matches') return n.type === 'match';
    if (filter === 'safety') return n.type === 'verification' || n.type === 'safety';
    return true;
  });

  const handleClick = (notif: NotificationItem) => {
    notif.read = true;
    if (notif.link) {
      if (notif.link.startsWith('/messages/')) {
        const id = notif.link.replace('/messages/', '');
        onOpenChat(id);
      } else {
        onNavigate(notif.link.replace('/', ''));
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#E83E5A] to-[#FF5A67] flex items-center justify-center text-white">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Notifications
              </h1>
              <p className="text-xs text-slate-500">
                Activity, matches, and safety updates.
              </p>
            </div>
          </div>

          <button
            onClick={handleMarkAllRead}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1"
          >
            <Check className="w-3.5 h-3.5" />
            Mark all read
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 border-b border-slate-200 pb-2">
          {(['all', 'likes', 'matches', 'safety'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                filter === tab
                  ? 'bg-white text-[#FF5A67] shadow-xs border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Notification List */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200/80 shadow-xs">
            <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-500">No notifications in this view.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((item) => {
              const time = new Date(item.createdAt).toLocaleDateString([], {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={item.id}
                  onClick={() => handleClick(item)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                    item.read
                      ? 'bg-white border-slate-200/80'
                      : 'bg-[#FFF1F3]/50 border-[#FF5A67]/30 shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      {item.type === 'match' && <Heart className="w-4 h-4 text-[#FF5A67] fill-[#FF5A67]" />}
                      {item.type === 'like' && <Heart className="w-4 h-4 text-rose-500" />}
                      {item.type === 'message' && <MessageCircle className="w-4 h-4 text-blue-500" />}
                      {item.type === 'verification' && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                      {item.type === 'subscription' && <Crown className="w-4 h-4 text-amber-500" />}
                      {item.type === 'safety' && <Shield className="w-4 h-4 text-purple-500" />}
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{item.body}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{time}</span>
                    </div>
                  </div>

                  {!item.read && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A67] shrink-0 mt-1" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
