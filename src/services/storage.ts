import {
  User,
  Profile,
  Like,
  Match,
  Message,
  Conversation,
  NotificationItem,
  VerificationRequest,
  ModerationCase,
  BlockRecord,
  AuditLog,
  SupportTicket,
  SubscriptionPlan,
  SubscriptionTier,
  FeatureFlags,
  PlatformStats,
  DiscoveryFilters,
  GenderPreference,
  RelationshipIntention
} from '../types';
import {
  INITIAL_SEED_USERS,
  INITIAL_SEED_PROFILES,
  INITIAL_SEED_LIKES,
  INITIAL_SEED_MATCHES,
  INITIAL_SEED_MESSAGES,
  INITIAL_SEED_CASES,
  INITIAL_SEED_VERIFICATIONS,
  INITIAL_SUPPORT_TICKETS
} from '../data/seedData';

// Storage keys
const STORAGE_KEY_PREFIX = 'isfaham_v1_';

export class StorageService {
  private static instance: StorageService;

  private users: Map<string, User> = new Map();
  private profiles: Map<string, Profile> = new Map();
  private likes: Map<string, Like> = new Map();
  private passes: Map<string, { senderId: string; receiverId: string; createdAt: string }> = new Map();
  private matches: Map<string, Match> = new Map();
  private messages: Map<string, Message[]> = new Map(); // conversationId -> messages
  private notifications: Map<string, NotificationItem[]> = new Map(); // userId -> notifications
  private verifications: Map<string, VerificationRequest> = new Map();
  private moderationCases: Map<string, ModerationCase> = new Map();
  private blocks: Map<string, BlockRecord> = new Map();
  private auditLogs: AuditLog[] = [];
  private supportTickets: Map<string, SupportTicket> = new Map();
  private plans: Map<SubscriptionTier, SubscriptionPlan> = new Map();
  private featureFlags: FeatureFlags = {
    AI_ASSISTANT: true,
    VIDEO_CALLS: false,
    VOICE_NOTES: false,
    BOOSTS: true,
    SUPER_LIKES: true,
    COMPATIBILITY: true,
    IDENTITY_VERIFICATION: true,
    TRAVEL_MODE: true,
    REFERRALS: true,
    EVENTS: false
  };

  private currentUserId: string = 'user-seed-01'; // Default logged in as Hodan Aden

  private constructor() {
    this.initializeData();
  }

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  private initializeData(): void {
    // Check localStorage cache or initialize from seeds
    const savedData = typeof window !== 'undefined' ? localStorage.getItem(`${STORAGE_KEY_PREFIX}data_initialized`) : null;

    // Load default subscription plans
    this.plans.set('free', {
      id: 'free',
      name: 'Free',
      monthlyPriceUsd: 0,
      annualPriceUsd: 0,
      features: [
        'Standard profile creation',
        'Daily discovery batch',
        'Standard Like & Pass',
        'Mutual matching & basic messaging',
        'Trust & Safety reporting tools',
        'Basic filters (Age, Distance, Gender)'
      ]
    });

    this.plans.set('premium', {
      id: 'premium',
      name: 'Premium',
      monthlyPriceUsd: 9.99,
      annualPriceUsd: 89.99,
      features: [
        'Everything in Free',
        'Unlimited daily likes',
        'Undo accidental passes (Rewind)',
        '5 Super Likes per week',
        'Advanced filters (Languages, Education, Lifestyle)',
        'Zero advertisements'
      ],
      isPopular: true
    });

    this.plans.set('gold', {
      id: 'gold',
      name: 'Gold',
      monthlyPriceUsd: 19.99,
      annualPriceUsd: 169.99,
      features: [
        'Everything in Premium',
        'See Who Likes You (Full Unblur & Instant Match)',
        '1 Free Profile Boost per month',
        'Browse profiles in Travel Mode (worldwide)',
        'Read receipts in messaging',
        'Priority verification review'
      ]
    });

    this.plans.set('vip', {
      id: 'vip',
      name: 'VIP',
      monthlyPriceUsd: 39.99,
      annualPriceUsd: 329.99,
      features: [
        'Everything in Gold',
        'VIP Profile Badge & Top-of-Queue Priority Discovery',
        'Direct message before matching (1/week)',
        'Dedicated relationship concierge support',
        'Exclusive access to future curated marital events'
      ]
    });

    // Populate initial seeds
    INITIAL_SEED_USERS.forEach(u => this.users.set(u.id, { ...u }));
    INITIAL_SEED_PROFILES.forEach(p => this.profiles.set(p.userId, { ...p }));
    INITIAL_SEED_LIKES.forEach(l => this.likes.set(l.id, { ...l }));
    INITIAL_SEED_MATCHES.forEach(m => this.matches.set(m.id, { ...m }));
    
    // Seed messages
    INITIAL_SEED_MESSAGES.forEach(msg => {
      const list = this.messages.get(msg.conversationId) || [];
      list.push({ ...msg });
      this.messages.set(msg.conversationId, list);
    });

    INITIAL_SEED_CASES.forEach(c => this.moderationCases.set(c.id, { ...c }));
    INITIAL_SEED_VERIFICATIONS.forEach(v => this.verifications.set(v.id, { ...v }));
    INITIAL_SUPPORT_TICKETS.forEach(t => this.supportTickets.set(t.id, { ...t }));

    // Sample welcome notifications for current user
    this.notifications.set('user-seed-01', [
      {
        id: 'notif-01',
        userId: 'user-seed-01',
        type: 'match',
        title: "It's a Match! ❤️",
        body: 'You and Khalid Farah liked each other. Say hello!',
        avatarUrl: INITIAL_SEED_PROFILES[1].photos[0]?.url,
        link: '/messages/match-seed-01',
        read: false,
        createdAt: '2026-09-18T10:30:00Z'
      },
      {
        id: 'notif-02',
        userId: 'user-seed-01',
        type: 'like',
        title: 'New Like received',
        body: 'Someone from Dubai just liked your profile. Check Likes You to view.',
        read: false,
        createdAt: '2026-09-19T14:10:00Z'
      },
      {
        id: 'notif-03',
        userId: 'user-seed-01',
        type: 'verification',
        title: 'Profile Photo Verified ✓',
        body: 'Your Photo Verification has been approved by the safety team.',
        read: true,
        createdAt: '2026-09-15T12:30:00Z'
      }
    ]);

    this.logAudit('system', 'System Init', 'system', 'init', 'Isfaham platform initialized with seed data.');
  }

  // --- Current User Management ---
  public getCurrentUserId(): string | null {
    return this.currentUserId || null;
  }

  public setCurrentUserId(userId: string | null): void {
    if (!userId) {
      this.currentUserId = '';
    } else if (this.users.has(userId)) {
      this.currentUserId = userId;
    }
  }

  public getCurrentUser(): { user: User; profile: Profile } | null {
    const user = this.users.get(this.currentUserId);
    const profile = this.profiles.get(this.currentUserId);
    if (!user || !profile) return null;
    return { user, profile };
  }

  // --- Age Calculation & Validation (18+ Assurance) ---
  public calculateAge(birthDateString: string): number {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  // --- Authentication ---
  public registerUser(params: {
    email?: string;
    phone?: string;
    dateOfBirth: string;
    displayName: string;
    gender: 'male' | 'female' | 'other';
    interestedIn: GenderPreference;
    relationshipIntention: RelationshipIntention;
    country: string;
    city: string;
    bio?: string;
  }): { success: boolean; user?: User; profile?: Profile; error?: string } {
    const age = this.calculateAge(params.dateOfBirth);
    if (age < 18) {
      return {
        success: false,
        error: 'You must be at least 18 years old to join Isfaham. Access is strictly restricted.'
      };
    }

    const userId = `user-${Date.now()}`;
    const newUser: User = {
      id: userId,
      email: params.email,
      phone: params.phone,
      emailVerified: true,
      phoneVerified: true,
      dateOfBirth: params.dateOfBirth,
      age,
      status: 'active',
      subscriptionTier: 'free',
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString()
    };

    const newProfile: Profile = {
      userId,
      displayName: params.displayName,
      age,
      gender: params.gender,
      interestedIn: params.interestedIn,
      relationshipIntention: params.relationshipIntention,
      country: params.country,
      city: params.city,
      approxDistanceKm: 15,
      bio: params.bio || 'Hello! I just joined Isfaham, excited to build a meaningful connection.',
      languages: ['Somali', 'English'],
      interests: ['Family Values', 'Travel', 'Reading', 'Coffee'],
      photos: [
        {
          id: `photo-${Date.now()}`,
          url: params.gender === 'male'
            ? 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80'
            : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
          isPrimary: true,
          order: 1,
          moderationStatus: 'approved'
        }
      ],
      verificationLevel: 1,
      verificationStatus: 'verified',
      verificationBadge: true,
      completionPercentage: 80,
      isOnline: true,
      lastActiveFormatted: 'Active now'
    };

    this.users.set(userId, newUser);
    this.profiles.set(userId, newProfile);
    this.currentUserId = userId;

    this.logAudit(userId, 'User Registered', 'user', userId, `New account registered: ${params.displayName}`);

    return { success: true, user: newUser, profile: newProfile };
  }

  // --- Discovery Engine ---
  public getDiscoveryProfiles(currentUserId: string, filters?: Partial<DiscoveryFilters>): Profile[] {
    const currentUser = this.users.get(currentUserId);
    const currentProfile = this.profiles.get(currentUserId);
    if (!currentUser || !currentProfile) return [];

    // Get blocked IDs (both blocker and blocked)
    const blockedIds = new Set<string>();
    this.blocks.forEach(b => {
      if (b.blockerId === currentUserId) blockedIds.add(b.blockedUserId);
      if (b.blockedUserId === currentUserId) blockedIds.add(b.blockerId);
    });

    // Get list of users already liked or passed by current user
    const actedIds = new Set<string>();
    this.likes.forEach(l => {
      if (l.senderId === currentUserId) actedIds.add(l.receiverId);
    });
    this.passes.forEach(p => {
      if (p.senderId === currentUserId) actedIds.add(p.receiverId);
    });

    const candidates: Profile[] = [];

    this.profiles.forEach(p => {
      // Never show current user
      if (p.userId === currentUserId) return;
      // Never show blocked users
      if (blockedIds.has(p.userId)) return;
      // Never show already acted on
      if (actedIds.has(p.userId)) return;

      const user = this.users.get(p.userId);
      // Exclude suspended, banned, deleted
      if (!user || user.status !== 'active') return;

      // Gender preference filter
      if (currentProfile.interestedIn === 'men' && p.gender !== 'male') return;
      if (currentProfile.interestedIn === 'women' && p.gender !== 'female') return;

      // Age range filter
      if (filters?.minAge && p.age < filters.minAge) return;
      if (filters?.maxAge && p.age > filters.maxAge) return;

      // Intention filter
      if (filters?.relationshipIntention && filters.relationshipIntention !== 'All') {
        if (p.relationshipIntention !== filters.relationshipIntention) return;
      }

      // Verified filter
      if (filters?.verifiedOnly && !p.verificationBadge) return;

      candidates.push(p);
    });

    // Prioritize boosted profiles
    return candidates.sort((a, b) => {
      const userA = this.users.get(a.userId);
      const userB = this.users.get(b.userId);
      const aBoosted = userA?.boostedUntil && new Date(userA.boostedUntil) > new Date() ? 1 : 0;
      const bBoosted = userB?.boostedUntil && new Date(userB.boostedUntil) > new Date() ? 1 : 0;
      return bBoosted - aBoosted;
    });
  }

  // --- Likes, Passes & Mutual Matching (Idempotent) ---
  public handleLike(
    senderId: string,
    receiverId: string,
    isSuperLike = false
  ): { isMatch: boolean; match?: Match; error?: string } {
    if (senderId === receiverId) return { isMatch: false, error: 'Cannot like yourself' };

    // Prevent duplicate like
    const existingLikeKey = `${senderId}_${receiverId}`;
    for (const [, l] of this.likes) {
      if (l.senderId === senderId && l.receiverId === receiverId) {
        return { isMatch: false, error: 'Already liked this user' };
      }
    }

    const likeId = `like-${Date.now()}`;
    const newLike: Like = {
      id: likeId,
      senderId,
      receiverId,
      isSuperLike,
      createdAt: new Date().toISOString()
    };
    this.likes.set(likeId, newLike);

    // Notify receiver
    this.addNotification({
      userId: receiverId,
      type: isSuperLike ? 'super_like' : 'like',
      title: isSuperLike ? 'Super Like received! ⭐' : 'New Like received ❤️',
      body: 'Someone is interested in connecting with you.',
      read: false
    });

    // Check mutual like (Did receiver already like sender?)
    let mutualLike: Like | undefined;
    for (const [, l] of this.likes) {
      if (l.senderId === receiverId && l.receiverId === senderId) {
        mutualLike = l;
        break;
      }
    }

    if (mutualLike) {
      // Create exactly one Match
      const matchId = `match-${Date.now()}`;
      const senderProfile = this.profiles.get(senderId);
      const receiverProfile = this.profiles.get(receiverId);

      const match: Match = {
        id: matchId,
        user1Id: senderId,
        user2Id: receiverId,
        createdAt: new Date().toISOString(),
        matchedProfile: receiverProfile!
      };

      this.matches.set(matchId, match);

      // Notify both users of the mutual match!
      this.addNotification({
        userId: senderId,
        type: 'match',
        title: "It's a Match! ❤️",
        body: `You and ${receiverProfile?.displayName || 'your match'} liked each other.`,
        avatarUrl: receiverProfile?.photos[0]?.url,
        link: `/messages/${matchId}`,
        read: false
      });

      this.addNotification({
        userId: receiverId,
        type: 'match',
        title: "It's a Match! ❤️",
        body: `You and ${senderProfile?.displayName || 'your match'} liked each other.`,
        avatarUrl: senderProfile?.photos[0]?.url,
        link: `/messages/${matchId}`,
        read: false
      });

      this.logAudit(senderId, 'Match Created', 'match', matchId, `Mutual match between ${senderId} and ${receiverId}`);

      return { isMatch: true, match };
    }

    return { isMatch: false };
  }

  public handlePass(senderId: string, receiverId: string): void {
    const passKey = `${senderId}_${receiverId}`;
    this.passes.set(passKey, {
      senderId,
      receiverId,
      createdAt: new Date().toISOString()
    });
  }

  public undoLastAction(senderId: string): boolean {
    // Find latest like or pass by senderId and remove it
    let latestPassKey: string | null = null;
    let latestPassTime = 0;
    this.passes.forEach((p, key) => {
      if (p.senderId === senderId) {
        const time = new Date(p.createdAt).getTime();
        if (time > latestPassTime) {
          latestPassTime = time;
          latestPassKey = key;
        }
      }
    });

    if (latestPassKey) {
      this.passes.delete(latestPassKey);
      return true;
    }
    return false;
  }

  // --- Likes You (Gold/VIP feature) ---
  public getLikesYou(currentUserId: string): { profile: Profile; like: Like }[] {
    const results: { profile: Profile; like: Like }[] = [];
    this.likes.forEach(like => {
      if (like.receiverId === currentUserId) {
        const senderProfile = this.profiles.get(like.senderId);
        if (senderProfile) {
          results.push({ profile: senderProfile, like });
        }
      }
    });
    return results;
  }

  // --- Matches & Messages ---
  public getMatches(userId: string): Match[] {
    const userMatches: Match[] = [];
    this.matches.forEach(m => {
      if (m.user1Id === userId || m.user2Id === userId) {
        const otherUserId = m.user1Id === userId ? m.user2Id : m.user1Id;
        const otherProfile = this.profiles.get(otherUserId);
        if (otherProfile) {
          userMatches.push({
            ...m,
            matchedProfile: otherProfile
          });
        }
      }
    });
    return userMatches.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getMessages(conversationId: string): Message[] {
    return this.messages.get(conversationId) || [];
  }

  public sendMessage(conversationId: string, senderId: string, text: string, isIcebreaker = false, imageUrl?: string): Message {
    const msgId = `msg-${Date.now()}`;
    const newMsg: Message = {
      id: msgId,
      conversationId,
      senderId,
      text,
      isIcebreaker,
      imageUrl,
      status: 'delivered',
      createdAt: new Date().toISOString()
    };

    const list = this.messages.get(conversationId) || [];
    list.push(newMsg);
    this.messages.set(conversationId, list);

    // Update match preview
    const match = this.matches.get(conversationId);
    if (match) {
      match.lastMessage = text;
      match.lastMessageAt = newMsg.createdAt;
      this.matches.set(conversationId, match);

      // Notify other participant
      const otherId = match.user1Id === senderId ? match.user2Id : match.user1Id;
      const senderProfile = this.profiles.get(senderId);
      this.addNotification({
        userId: otherId,
        type: 'message',
        title: `Message from ${senderProfile?.displayName || 'Match'}`,
        body: text.length > 50 ? `${text.slice(0, 47)}...` : text,
        avatarUrl: senderProfile?.photos[0]?.url,
        link: `/messages/${conversationId}`,
        read: false
      });
    }

    return newMsg;
  }

  // --- Blocking & Unmatching ---
  public blockUser(blockerId: string, blockedUserId: string): void {
    const blockId = `block-${Date.now()}`;
    this.blocks.set(blockId, {
      id: blockId,
      blockerId,
      blockedUserId,
      createdAt: new Date().toISOString()
    });

    // Remove any active match between these users
    this.matches.forEach((m, key) => {
      if (
        (m.user1Id === blockerId && m.user2Id === blockedUserId) ||
        (m.user1Id === blockedUserId && m.user2Id === blockerId)
      ) {
        this.matches.delete(key);
      }
    });

    this.logAudit(blockerId, 'User Blocked', 'user', blockedUserId, `User ${blockerId} blocked ${blockedUserId}`);
  }

  public unmatch(currentUserId: string, conversationId: string): void {
    this.matches.delete(conversationId);
    this.messages.delete(conversationId);
    this.logAudit(currentUserId, 'Unmatched', 'match', conversationId, `Match ${conversationId} ended by ${currentUserId}`);
  }

  // --- Trust & Safety: Reporting ---
  public submitReport(params: {
    reporterId: string;
    reportedUserId: string;
    category: any;
    severity: any;
    description: string;
    evidenceUrl?: string;
  }): ModerationCase {
    const reporter = this.profiles.get(params.reporterId);
    const reported = this.profiles.get(params.reportedUserId);

    const caseId = `case-${Date.now()}`;
    const newCase: ModerationCase = {
      id: caseId,
      reporterId: params.reporterId,
      reporterName: reporter?.displayName || 'Anonymous User',
      reportedUserId: params.reportedUserId,
      reportedUserName: reported?.displayName || 'Reported Profile',
      category: params.category,
      severity: params.severity || 'medium',
      status: 'unassigned',
      description: params.description,
      evidenceUrl: params.evidenceUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.moderationCases.set(caseId, newCase);
    this.logAudit(params.reporterId, 'Safety Report Submitted', 'case', caseId, `Report filed against ${params.reportedUserId}: ${params.category}`);
    return newCase;
  }

  // --- Notifications ---
  public getNotifications(userId: string): NotificationItem[] {
    return this.notifications.get(userId) || [];
  }

  public addNotification(item: Omit<NotificationItem, 'id' | 'createdAt'>): void {
    const list = this.notifications.get(item.userId) || [];
    const notif: NotificationItem = {
      ...item,
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString()
    };
    list.unshift(notif);
    this.notifications.set(item.userId, list);
  }

  public markAllNotificationsAsRead(userId: string): void {
    const list = this.notifications.get(userId) || [];
    list.forEach(n => (n.read = true));
    this.notifications.set(userId, list);
  }

  // --- Profile Verification ---
  public submitVerificationRequest(userId: string, level: 1 | 2 | 3, selfieUrl: string): VerificationRequest {
    const user = this.profiles.get(userId);
    const reqId = `verif-${Date.now()}`;
    const req: VerificationRequest = {
      id: reqId,
      userId,
      userDisplayName: user?.displayName || 'Member',
      level,
      status: 'pending',
      selfiePoseUrl: selfieUrl,
      submittedAt: new Date().toISOString()
    };
    this.verifications.set(reqId, req);

    if (user) {
      user.verificationStatus = 'pending';
      this.profiles.set(userId, user);
    }

    this.logAudit(userId, 'Verification Submitted', 'verification', reqId, `Level ${level} photo submitted.`);
    return req;
  }

  // --- Subscriptions ---
  public getPlans(): SubscriptionPlan[] {
    return Array.from(this.plans.values());
  }

  public updateSubscription(userId: string, tier: SubscriptionTier): User | null {
    const user = this.users.get(userId);
    if (!user) return null;
    user.subscriptionTier = tier;
    const expires = new Date();
    expires.setMonth(expires.getMonth() + 1);
    user.subscriptionExpiresAt = expires.toISOString();
    this.users.set(userId, user);

    this.addNotification({
      userId,
      type: 'subscription',
      title: `Subscribed to ${tier.toUpperCase()}`,
      body: `Your upgrade to ${tier.toUpperCase()} is active! Enjoy your new entitlements.`,
      read: false
    });

    this.logAudit(userId, 'Subscription Changed', 'user', userId, `Upgraded tier to ${tier}`);
    return user;
  }

  public activateBoost(userId: string): boolean {
    const user = this.users.get(userId);
    if (!user) return false;
    const boostUntil = new Date();
    boostUntil.setHours(boostUntil.getHours() + 1); // 1 hour boost
    user.boostedUntil = boostUntil.toISOString();
    this.users.set(userId, user);

    this.addNotification({
      userId,
      type: 'subscription',
      title: 'Profile Boost Activated! ⚡',
      body: 'Your profile is currently featured at the front of discover for the next hour.',
      read: false
    });

    return true;
  }

  // --- Admin Moderation & Operations ---
  public getModerationCases(): ModerationCase[] {
    return Array.from(this.moderationCases.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public takeModerationAction(caseId: string, action: 'warning' | 'content_removed' | 'restricted' | 'suspended' | 'banned', notes: string, moderator: string): boolean {
    const modCase = this.moderationCases.get(caseId);
    if (!modCase) return false;

    modCase.actionTaken = action;
    modCase.status = 'resolved';
    modCase.resolutionNotes = notes;
    modCase.assignedModerator = moderator;
    modCase.updatedAt = new Date().toISOString();
    this.moderationCases.set(caseId, modCase);

    // Apply action to user
    if (action === 'suspended' || action === 'banned') {
      const user = this.users.get(modCase.reportedUserId);
      if (user) {
        user.status = action === 'banned' ? 'banned' : 'suspended';
        this.users.set(modCase.reportedUserId, user);
      }
    }

    this.logAudit(moderator, `Enforcement Action: ${action}`, 'case', caseId, `Applied ${action} to ${modCase.reportedUserId}. Notes: ${notes}`);
    return true;
  }

  public getVerificationRequests(): VerificationRequest[] {
    return Array.from(this.verifications.values()).sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  }

  public reviewVerification(reqId: string, approved: boolean, moderator: string, reason?: string): boolean {
    const req = this.verifications.get(reqId);
    if (!req) return false;

    req.status = approved ? 'verified' : 'rejected';
    req.reviewedAt = new Date().toISOString();
    req.reviewedBy = moderator;
    req.rejectionReason = reason;
    this.verifications.set(reqId, req);

    const profile = this.profiles.get(req.userId);
    if (profile) {
      profile.verificationStatus = approved ? 'verified' : 'rejected';
      if (approved) {
        profile.verificationBadge = true;
        profile.verificationLevel = req.level;
      }
      this.profiles.set(req.userId, profile);
    }

    this.addNotification({
      userId: req.userId,
      type: 'verification',
      title: approved ? 'Verification Approved! ✓' : 'Verification Update',
      body: approved
        ? 'Congratulations! Your profile is now verified with the official trust badge.'
        : `Your verification could not be completed: ${reason || 'Please retake photo with clear lighting'}.`,
      read: false
    });

    this.logAudit(moderator, approved ? 'Verification Approved' : 'Verification Rejected', 'verification', reqId, `${approved ? 'Approved' : 'Rejected'} level ${req.level} for ${req.userId}`);
    return true;
  }

  public getAllUsers(): { user: User; profile?: Profile }[] {
    const list: { user: User; profile?: Profile }[] = [];
    this.users.forEach(u => {
      list.push({
        user: u,
        profile: this.profiles.get(u.id)
      });
    });
    return list;
  }

  public updateUserStatus(userId: string, status: any, moderator: string): boolean {
    const user = this.users.get(userId);
    if (!user) return false;
    user.status = status;
    this.users.set(userId, user);
    this.logAudit(moderator, `User status updated to ${status}`, 'user', userId, `Updated status to ${status}`);
    return true;
  }

  public getAuditLogs(): AuditLog[] {
    return [...this.auditLogs].reverse();
  }

  public logAudit(actorId: string, action: string, resource: string, resourceId: string, details?: string): void {
    const log: AuditLog = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      actorId,
      actorName: actorId === 'system' ? 'System Orchestrator' : 'Admin / Member',
      action,
      resource,
      resourceId,
      details,
      timestamp: new Date().toISOString()
    };
    this.auditLogs.push(log);
  }

  public getFeatureFlags(): FeatureFlags {
    return { ...this.featureFlags };
  }

  public updateFeatureFlags(flags: Partial<FeatureFlags>): void {
    this.featureFlags = { ...this.featureFlags, ...flags };
  }

  // --- Analytics & KPIs (North Star: Meaningful Connections) ---
  public getPlatformStats(): PlatformStats {
    let completedCount = 0;
    let verifiedCount = 0;
    this.profiles.forEach(p => {
      if (p.completionPercentage >= 80) completedCount++;
      if (p.verificationBadge) verifiedCount++;
    });

    let premiumCount = 0;
    let monthlyRevenue = 0;
    this.users.forEach(u => {
      if (u.subscriptionTier !== 'free') {
        premiumCount++;
        const plan = this.plans.get(u.subscriptionTier);
        if (plan) monthlyRevenue += plan.monthlyPriceUsd;
      }
    });

    let messageCount = 0;
    this.messages.forEach(list => (messageCount += list.length));

    // North Star Metric: Meaningful Connections per Week
    // Defined as mutual matches that exchanged >= 4 thoughtful messages
    let meaningfulConnections = 0;
    this.messages.forEach(list => {
      if (list.length >= 4) meaningfulConnections++;
    });

    const totalLikes = this.likes.size;
    const totalMatches = this.matches.size;
    const matchRate = totalLikes > 0 ? (totalMatches * 2 / totalLikes) * 100 : 0;

    return {
      totalUsers: this.users.size,
      activeUsersDAU: Math.max(12, Math.floor(this.users.size * 0.7)),
      activeUsersMAU: Math.max(25, Math.floor(this.users.size * 0.95)),
      newUsersToday: 4,
      completedProfiles: completedCount,
      verifiedProfiles: verifiedCount,
      totalLikes,
      totalMatches,
      matchRatePercent: Math.min(100, Math.round(matchRate * 10) / 10),
      totalMessages: messageCount,
      openReports: Array.from(this.moderationCases.values()).filter(c => c.status !== 'resolved').length,
      verificationQueueCount: Array.from(this.verifications.values()).filter(v => v.status === 'pending' || v.status === 'under_review').length,
      premiumSubscribers: premiumCount,
      monthlyRevenueUsd: Math.round(monthlyRevenue * 100) / 100,
      meaningfulConnectionsPerWeek: Math.max(8, meaningfulConnections * 2)
    };
  }

  // --- Seed Data Control ---
  public clearSeedData(): void {
    const realUsers = new Map<string, User>();
    const realProfiles = new Map<string, Profile>();
    this.users.forEach((u, k) => {
      if (!u.isSeed) realUsers.set(k, u);
    });
    this.profiles.forEach((p, k) => {
      const user = this.users.get(p.userId);
      if (user && !user.isSeed) realProfiles.set(k, p);
    });
    this.users = realUsers;
    this.profiles = realProfiles;
    this.likes.clear();
    this.matches.clear();
    this.messages.clear();
    this.logAudit('admin', 'Clear Seed Data', 'system', 'seed', 'All development seed records cleared.');
  }

  public reloadSeedData(): void {
    this.initializeData();
  }
}

export const storage = StorageService.getInstance();
