import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Users, 
  CheckCircle, 
  AlertTriangle, 
  DollarSign, 
  TrendingUp, 
  Heart, 
  MessageCircle, 
  Search, 
  Filter, 
  RotateCcw, 
  Trash2, 
  ToggleLeft, 
  ToggleRight, 
  FileText, 
  Clock, 
  Check, 
  X,
  Sparkles
} from 'lucide-react';
import { storage } from '../services/storage';
import { 
  PlatformStats, 
  ModerationCase, 
  VerificationRequest, 
  User, 
  Profile, 
  AuditLog, 
  FeatureFlags 
} from '../types';

interface AdminDashboardProps {
  onNavigate: (route: string) => void;
  onSwitchUser: (userId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate, onSwitchUser }) => {
  const [activeTab, setActiveTab] = useState<'kpis' | 'moderation' | 'verifications' | 'users' | 'flags' | 'audit' | 'demo'>('kpis');
  
  // Data states
  const [stats, setStats] = useState<PlatformStats>(storage.getPlatformStats());
  const [cases, setCases] = useState<ModerationCase[]>(storage.getModerationCases());
  const [verifications, setVerifications] = useState<VerificationRequest[]>(storage.getVerificationRequests());
  const [usersList, setUsersList] = useState<{ user: User; profile?: Profile }[]>(storage.getAllUsers());
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(storage.getAuditLogs());
  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>(storage.getFeatureFlags());

  // Search & filter for users table
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Moderation action modal
  const [selectedCase, setSelectedCase] = useState<ModerationCase | null>(null);
  const [actionType, setActionType] = useState<'warning' | 'content_removed' | 'restricted' | 'suspended' | 'banned'>('warning');
  const [actionNotes, setActionNotes] = useState('');

  const refreshData = () => {
    setStats(storage.getPlatformStats());
    setCases(storage.getModerationCases());
    setVerifications(storage.getVerificationRequests());
    setUsersList(storage.getAllUsers());
    setAuditLogs(storage.getAuditLogs());
    setFeatureFlags(storage.getFeatureFlags());
  };

  const handleApplyModeration = () => {
    if (!selectedCase) return;
    storage.takeModerationAction(selectedCase.id, actionType, actionNotes, 'admin@isfaham.com');
    setSelectedCase(null);
    setActionNotes('');
    refreshData();
  };

  const handleReviewVerification = (reqId: string, approved: boolean) => {
    storage.reviewVerification(reqId, approved, 'admin@isfaham.com', approved ? undefined : 'Lighting too dark or pose misaligned');
    refreshData();
  };

  const handleUserStatusChange = (userId: string, status: any) => {
    storage.updateUserStatus(userId, status, 'admin@isfaham.com');
    refreshData();
  };

  const handleToggleFlag = (key: keyof FeatureFlags) => {
    const updated = { ...featureFlags, [key]: !featureFlags[key] };
    storage.updateFeatureFlags(updated);
    setFeatureFlags(updated);
  };

  const handleClearSeed = () => {
    if (window.confirm('Clear all seed data? Only manually created users will remain.')) {
      storage.clearSeedData();
      refreshData();
    }
  };

  const handleReloadSeed = () => {
    storage.reloadSeedData();
    refreshData();
  };

  // Filtered users
  const filteredUsers = usersList.filter(item => {
    const nameMatch = item.profile?.displayName.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const emailMatch = item.user.email?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const cityMatch = item.profile?.city.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const matchesSearch = nameMatch || emailMatch || cityMatch;

    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && item.user.status === statusFilter;
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF5A67] flex items-center justify-center text-white shadow-md">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  ISFAHAM Trust & Operations Center
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time safety moderation, verification workflows, and platform metrics.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={refreshData}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Refresh
            </button>
            <button
              onClick={() => onNavigate('discover')}
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold transition-colors"
            >
              Exit to Member App
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800 text-xs font-semibold">
          {[
            { id: 'kpis', label: 'Executive KPIs', count: undefined },
            { id: 'moderation', label: 'Moderation Queue', count: stats.openReports },
            { id: 'verifications', label: 'Verification Center', count: stats.verificationQueueCount },
            { id: 'users', label: 'User Directory', count: stats.totalUsers },
            { id: 'flags', label: 'Feature Flags', count: undefined },
            { id: 'audit', label: 'Audit Logs', count: auditLogs.length },
            { id: 'demo', label: 'Demo / Sandbox Tools', count: undefined }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-[#FF5A67] text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && tab.count > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  activeTab === tab.id ? 'bg-white text-[#FF5A67]' : 'bg-rose-500 text-white'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* TAB 1: EXECUTIVE KPIS */}
        {activeTab === 'kpis' && (
          <div className="space-y-6">
            {/* North Star Highlight Metric Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-950 via-slate-900 to-slate-900 border border-rose-900/50 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Core North Star Metric
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Meaningful Connections per Week
                </h3>
                <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                  Mutual matches who progressed into substantive, multi-message conversations (≥4 messages exchanged), signaling genuine matrimonial intent over superficial swipe fatigue.
                </p>
              </div>

              <div className="text-center sm:text-right bg-slate-950/80 p-5 rounded-2xl border border-rose-500/20 shrink-0">
                <span className="text-4xl sm:text-5xl font-extrabold text-rose-400 block">
                  {stats.meaningfulConnectionsPerWeek}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  +18% from last week
                </span>
              </div>
            </div>

            {/* Grid of Key SaaS & Safety Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                <span className="text-xs text-slate-400">Total Registered</span>
                <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
                <span className="text-[10px] text-emerald-400">+{stats.newUsersToday} today</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                <span className="text-xs text-slate-400">DAU / MAU Ratio</span>
                <p className="text-2xl font-bold text-white">{stats.activeUsersDAU} / {stats.activeUsersMAU}</p>
                <span className="text-[10px] text-slate-400">73% stickiness</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                <span className="text-xs text-slate-400">Match Rate</span>
                <p className="text-2xl font-bold text-white">{stats.matchRatePercent}%</p>
                <span className="text-[10px] text-slate-400">{stats.totalMatches} mutual matches</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                <span className="text-xs text-slate-400">Monthly Revenue (MRR)</span>
                <p className="text-2xl font-bold text-emerald-400">${stats.monthlyRevenueUsd}</p>
                <span className="text-[10px] text-slate-400">{stats.premiumSubscribers} paid members</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                <span className="text-xs text-slate-400">Photo Verified Members</span>
                <p className="text-2xl font-bold text-white">{stats.verifiedProfiles}</p>
                <span className="text-[10px] text-emerald-400">Level 2+ trust badge</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                <span className="text-xs text-slate-400">Messages Exchanged</span>
                <p className="text-2xl font-bold text-white">{stats.totalMessages}</p>
                <span className="text-[10px] text-slate-400">Across all chats</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                <span className="text-xs text-slate-400">Open Reports Queue</span>
                <p className="text-2xl font-bold text-rose-400">{stats.openReports}</p>
                <span className="text-[10px] text-rose-300">Requires review</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                <span className="text-xs text-slate-400">Pending Verifications</span>
                <p className="text-2xl font-bold text-amber-400">{stats.verificationQueueCount}</p>
                <span className="text-[10px] text-amber-300">Awaiting pose check</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MODERATION CENTER */}
        {activeTab === 'moderation' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">
                Safety Incident Reports ({cases.length})
              </h2>
              <span className="text-xs text-slate-400">
                Sorted by latest submission
              </span>
            </div>

            <div className="space-y-3">
              {cases.map((c) => (
                <div
                  key={c.id}
                  className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        c.severity === 'high' || c.severity === 'critical'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {c.severity.toUpperCase()}
                      </span>
                      <span className="text-xs font-bold text-white uppercase tracking-wide">
                        Category: {c.category.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-slate-400">• ID: {c.id}</span>
                    </div>

                    <p className="text-xs text-slate-300">
                      <strong>Reported:</strong> {c.reportedUserName} ({c.reportedUserId}) by {c.reporterName}
                    </p>
                    <p className="text-xs text-slate-400 italic">
                      "{c.description}"
                    </p>

                    {c.actionTaken && (
                      <p className="text-xs text-emerald-400">
                        <strong>Action Taken:</strong> {c.actionTaken} — Notes: {c.resolutionNotes}
                      </p>
                    )}
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {c.status !== 'resolved' ? (
                      <button
                        onClick={() => setSelectedCase(c)}
                        className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors"
                      >
                        Enforce Action
                      </button>
                    ) : (
                      <span className="px-3 py-1 rounded-xl bg-slate-700 text-slate-300 text-xs font-semibold">
                        Resolved ✓
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Enforcement Action Modal */}
            {selectedCase && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="bg-slate-900 rounded-3xl border border-slate-700 p-6 max-w-md w-full space-y-4">
                  <h3 className="text-base font-bold text-white">
                    Enforce Action on {selectedCase.reportedUserName}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Case: {selectedCase.category} — Reported by {selectedCase.reporterName}
                  </p>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Select Enforcement</label>
                    <select
                      value={actionType}
                      onChange={(e) => setActionType(e.target.value as any)}
                      className="w-full text-xs p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    >
                      <option value="warning">Official Warning</option>
                      <option value="content_removed">Remove Offending Content / Photos</option>
                      <option value="restricted">Restrict Account (Read Only)</option>
                      <option value="suspended">7-Day Account Suspension</option>
                      <option value="banned">Permanent Ban (Device & Identity)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Moderator Audit Notes</label>
                    <textarea
                      rows={3}
                      value={actionNotes}
                      onChange={(e) => setActionNotes(e.target.value)}
                      placeholder="Specify rationale for safety audit log..."
                      className="w-full text-xs p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setSelectedCase(null)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleApplyModeration}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
                    >
                      Apply Action & Log Audit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: VERIFICATION CENTER */}
        {activeTab === 'verifications' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">
                Pending Selfie Pose Verifications ({verifications.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {verifications.map((v) => (
                <div key={v.id} className="p-5 rounded-3xl bg-slate-800/90 border border-slate-700/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{v.userDisplayName}</h4>
                      <p className="text-[11px] text-slate-400">Level {v.level} • ID: {v.id}</p>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      v.status === 'verified'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : v.status === 'rejected'
                        ? 'bg-rose-500/20 text-rose-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {v.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Selfie Pose Photo */}
                  <div className="h-56 rounded-2xl bg-slate-950 overflow-hidden border border-slate-700">
                    <img
                      src={v.selfiePoseUrl}
                      alt="Submitted Pose"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {v.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReviewVerification(v.id, false)}
                        className="flex-1 py-2 rounded-xl bg-slate-700 hover:bg-rose-900/60 text-rose-200 text-xs font-bold transition-colors"
                      >
                        Reject Pose
                      </button>
                      <button
                        onClick={() => handleReviewVerification(v.id, true)}
                        className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                      >
                        Approve & Grant Badge ✓
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: USERS DIRECTORY */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by display name, email, or city..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#FF5A67]"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="py-2 px-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
              >
                <option value="all">All Account Statuses</option>
                <option value="active">Active</option>
                <option value="restricted">Restricted</option>
                <option value="suspended">Suspended</option>
                <option value="banned">Banned</option>
              </select>
            </div>

            {/* Users Table */}
            <div className="rounded-2xl border border-slate-800 bg-slate-800/60 overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-800 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-700">
                  <tr>
                    <th className="py-3 px-4">User / Profile</th>
                    <th className="py-3 px-4">Age / Gender</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Intention</th>
                    <th className="py-3 px-4">Tier</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredUsers.map(({ user, profile }) => (
                    <tr key={user.id} className="hover:bg-slate-800/80 transition-colors">
                      <td className="py-3 px-4 flex items-center gap-2.5">
                        <img
                          src={profile?.photos[0]?.url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                          alt={profile?.displayName || user.email}
                          className="w-8 h-8 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <p className="font-bold text-white flex items-center gap-1">
                            {profile?.displayName || 'Unknown'}
                            {profile?.verificationBadge && (
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                            )}
                          </p>
                          <p className="text-[10px] text-slate-400">{user.email || user.phone}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {user.age} yrs • {profile?.gender || 'N/A'}
                      </td>
                      <td className="py-3 px-4">
                        {profile?.city}, {profile?.country}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[#FF5A67] font-semibold">{profile?.relationshipIntention}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 uppercase">
                          {user.subscriptionTier}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          user.status === 'active'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={user.status}
                          onChange={(e) => handleUserStatusChange(user.id, e.target.value)}
                          className="bg-slate-900 border border-slate-700 text-white rounded-lg px-2 py-1 text-[11px]"
                        >
                          <option value="active">Active</option>
                          <option value="restricted">Restrict</option>
                          <option value="suspended">Suspend</option>
                          <option value="banned">Ban</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: FEATURE FLAGS */}
        {activeTab === 'flags' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-white">Dynamic Platform Feature Flags</h2>
            <p className="text-xs text-slate-400">
              Toggle capabilities instantly across the entire platform without downtime.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {Object.entries(featureFlags).map(([key, enabled]) => (
                <div
                  key={key}
                  className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-xs font-bold text-white">{key.replace(/_/g, ' ')}</h4>
                    <p className="text-[11px] text-slate-400">
                      {enabled ? 'Active for production members' : 'Disabled / In staging'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggleFlag(key as any)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      enabled
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {enabled ? 'Enabled ✓' : 'Disabled'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: AUDIT LOGS */}
        {activeTab === 'audit' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-white">Immutable Administrative Audit Trail</h2>
            <p className="text-xs text-slate-400">
              All staff actions, moderation enforcements, and status overrides are permanently recorded.
            </p>

            <div className="space-y-2">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span>{log.action}</span>
                      <span className="text-[10px] text-slate-400">• By {log.actorName}</span>
                    </p>
                    <p className="text-slate-300">{log.details}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: DEMO & TESTING CONTROLS */}
        {activeTab === 'demo' && (
          <div className="space-y-6">
            <h2 className="text-base font-bold text-white">Evaluator & Development Sandbox Tools</h2>
            <p className="text-xs text-slate-400">
              Easily reset or reload development seeds and instantaneously switch between authenticated member personas.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-slate-800 border border-slate-700 space-y-3">
                <h3 className="text-sm font-bold text-white">Reset / Reload Initial Seed Data</h3>
                <p className="text-xs text-slate-400">
                  Restores the full suite of initial members (Hodan, Khalid, Faduma, Mustafa, Amina) and interactions.
                </p>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleReloadSeed}
                    className="px-4 py-2 rounded-xl bg-[#FF5A67] hover:bg-[#E83E5A] text-white font-bold text-xs transition-colors"
                  >
                    Reload Seed Data
                  </button>
                  <button
                    onClick={handleClearSeed}
                    className="px-4 py-2 rounded-xl border border-rose-500/40 text-rose-300 hover:bg-rose-500/10 font-bold text-xs transition-colors"
                  >
                    Clear All Seeds
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-800 border border-slate-700 space-y-3">
                <h3 className="text-sm font-bold text-white">Instant Persona Switcher</h3>
                <p className="text-xs text-slate-400">
                  Select any profile to immediately experience the platform from their perspective:
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {usersList.map(({ user, profile }) => (
                    <button
                      key={user.id}
                      onClick={() => {
                        onSwitchUser(user.id);
                        onNavigate('discover');
                      }}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-slate-700 border border-slate-700 text-left text-xs transition-colors"
                    >
                      <p className="font-bold text-white">{profile?.displayName}</p>
                      <p className="text-[10px] text-slate-400">{profile?.city} • {profile?.age} yrs</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
