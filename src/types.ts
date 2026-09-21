/**
 * ISFAHAM Platform Types
 * Covers all entities required by the Master Specification
 */

export type Language = 'en' | 'so' | 'ar';

export type Gender = 'male' | 'female' | 'other';
export type GenderPreference = 'men' | 'women' | 'everyone';

export type RelationshipIntention = 
  | 'Marriage' 
  | 'Serious Relationship' 
  | 'Getting to Know Someone' 
  | 'Friendship';

export type VerificationLevel = 1 | 2 | 3;
export type VerificationStatus = 
  | 'not_started' 
  | 'pending' 
  | 'under_review' 
  | 'verified' 
  | 'rejected' 
  | 'needs_resubmission';

export type SubscriptionTier = 'free' | 'premium' | 'gold' | 'vip';

export type AdminRole = 
  | 'SUPER_ADMIN' 
  | 'OPERATIONS_ADMIN' 
  | 'TRUST_SAFETY_ADMIN' 
  | 'MODERATOR' 
  | 'SUPPORT_AGENT' 
  | 'FINANCE_ADMIN' 
  | 'ANALYST';

export type UserAccountStatus = 'active' | 'restricted' | 'suspended' | 'banned' | 'deleted';

export type ReportCategory = 
  | 'fake_profile'
  | 'impersonation'
  | 'scam'
  | 'money_request'
  | 'spam'
  | 'harassment'
  | 'hate_speech'
  | 'threat'
  | 'violence'
  | 'sexual_misconduct'
  | 'inappropriate_content'
  | 'underage_user'
  | 'privacy_violation'
  | 'other';

export type ReportSeverity = 'critical' | 'high' | 'medium' | 'low';
export type CaseStatus = 'unassigned' | 'assigned' | 'under_review' | 'resolved' | 'appealed';

export interface User {
  id: string; // UUID
  email?: string;
  phone?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  dateOfBirth: string; // YYYY-MM-DD
  age: number; // Server-calculated
  status: UserAccountStatus;
  role?: AdminRole;
  subscriptionTier: SubscriptionTier;
  subscriptionExpiresAt?: string;
  boostedUntil?: string;
  createdAt: string;
  lastActiveAt: string;
  isSeed?: boolean;
}

export interface ProfilePhoto {
  id: string;
  url: string;
  isPrimary: boolean;
  order: number;
  moderationStatus: 'approved' | 'pending' | 'rejected';
}

export interface Profile {
  userId: string;
  displayName: string;
  age: number;
  gender: Gender;
  interestedIn: GenderPreference;
  relationshipIntention: RelationshipIntention;
  country: string;
  city: string;
  approxDistanceKm?: number;
  bio: string;
  languages: string[];
  interests: string[];
  education?: string;
  profession?: string;
  religion?: string;
  heightCm?: number;
  lifestyle?: {
    drinking?: string;
    smoking?: string;
    exercise?: string;
    diet?: string;
    relocate?: string;
  };
  photos: ProfilePhoto[];
  verificationLevel: VerificationLevel;
  verificationStatus: VerificationStatus;
  verificationBadge: boolean;
  completionPercentage: number;
  isOnline: boolean;
  lastActiveFormatted: string;
  // Privacy options
  hideDistance?: boolean;
  hideOnlineStatus?: boolean;
  hideAge?: boolean;
}

export interface DiscoveryFilters {
  minAge: number;
  maxAge: number;
  maxDistanceKm: number;
  genderPreference: GenderPreference;
  relationshipIntention?: RelationshipIntention | 'All';
  country?: string;
  city?: string;
  verifiedOnly?: boolean;
  recentlyActiveOnly?: boolean;
  languages?: string[];
  education?: string;
}

export interface Like {
  id: string;
  senderId: string;
  receiverId: string;
  isSuperLike: boolean;
  createdAt: string;
}

export interface Match {
  id: string;
  user1Id: string;
  user2Id: string;
  createdAt: string;
  matchedProfile: Profile;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount?: number;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  imageUrl?: string;
  isIcebreaker?: boolean;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  createdAt: string;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  otherParticipant: Profile;
  lastMessage?: Message;
  updatedAt: string;
  isMuted?: boolean;
}

export interface NotificationItem {
  id: string;
  userId: string;
  type: 'like' | 'match' | 'message' | 'super_like' | 'verification' | 'safety' | 'subscription';
  title: string;
  body: string;
  avatarUrl?: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  userDisplayName: string;
  level: VerificationLevel;
  status: VerificationStatus;
  selfiePoseUrl: string;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}

export interface ModerationCase {
  id: string;
  reporterId: string;
  reporterName: string;
  reportedUserId: string;
  reportedUserName: string;
  category: ReportCategory;
  severity: ReportSeverity;
  status: CaseStatus;
  description: string;
  evidenceUrl?: string;
  assignedModerator?: string;
  resolutionNotes?: string;
  actionTaken?: 'none' | 'warning' | 'content_removed' | 'restricted' | 'suspended' | 'banned';
  createdAt: string;
  updatedAt: string;
}

export interface BlockRecord {
  id: string;
  blockerId: string;
  blockedUserId: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  actorId: string;
  actorName: string;
  action: string;
  resource: string;
  resourceId: string;
  details?: string;
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  category: 'account' | 'profile' | 'matches' | 'messages' | 'verification' | 'payments' | 'safety' | 'technical';
  priority: 'low' | 'medium' | 'high';
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionPlan {
  id: SubscriptionTier;
  name: string;
  monthlyPriceUsd: number;
  annualPriceUsd: number;
  features: string[];
  isPopular?: boolean;
}

export interface FeatureFlags {
  AI_ASSISTANT: boolean;
  VIDEO_CALLS: boolean;
  VOICE_NOTES: boolean;
  BOOSTS: boolean;
  SUPER_LIKES: boolean;
  COMPATIBILITY: boolean;
  IDENTITY_VERIFICATION: boolean;
  TRAVEL_MODE: boolean;
  REFERRALS: boolean;
  EVENTS: boolean;
}

export interface PlatformStats {
  totalUsers: number;
  activeUsersDAU: number;
  activeUsersMAU: number;
  newUsersToday: number;
  completedProfiles: number;
  verifiedProfiles: number;
  totalLikes: number;
  totalMatches: number;
  matchRatePercent: number;
  totalMessages: number;
  openReports: number;
  verificationQueueCount: number;
  premiumSubscribers: number;
  monthlyRevenueUsd: number;
  meaningfulConnectionsPerWeek: number; // North star metric
}
