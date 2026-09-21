import { User, Profile, Like, Match, Message, ModerationCase, VerificationRequest, SupportTicket } from '../types';

export const INITIAL_SEED_USERS: User[] = [
  {
    id: 'user-seed-01',
    email: 'hodan.aden@example.com',
    phone: '+252 61 555 1234',
    emailVerified: true,
    phoneVerified: true,
    dateOfBirth: '1998-05-14',
    age: 28,
    status: 'active',
    subscriptionTier: 'gold',
    createdAt: '2026-01-10T12:00:00Z',
    lastActiveAt: '2026-09-20T16:40:00Z',
    isSeed: true
  },
  {
    id: 'user-seed-02',
    email: 'khalid.farah@example.com',
    phone: '+44 7700 900123',
    emailVerified: true,
    phoneVerified: true,
    dateOfBirth: '1995-11-20',
    age: 30,
    status: 'active',
    subscriptionTier: 'vip',
    createdAt: '2026-01-12T14:30:00Z',
    lastActiveAt: '2026-09-20T17:05:00Z',
    isSeed: true
  },
  {
    id: 'user-seed-03',
    email: 'faduma.osman@example.com',
    phone: '+1 612 555 0192',
    emailVerified: true,
    phoneVerified: true,
    dateOfBirth: '2000-02-18',
    age: 26,
    status: 'active',
    subscriptionTier: 'free',
    createdAt: '2026-02-01T09:15:00Z',
    lastActiveAt: '2026-09-20T15:20:00Z',
    isSeed: true
  },
  {
    id: 'user-seed-04',
    email: 'mustafa.warsame@example.com',
    phone: '+971 50 123 4567',
    emailVerified: true,
    phoneVerified: true,
    dateOfBirth: '1994-08-03',
    age: 32,
    status: 'active',
    subscriptionTier: 'premium',
    createdAt: '2026-02-15T11:00:00Z',
    lastActiveAt: '2026-09-20T16:50:00Z',
    isSeed: true
  },
  {
    id: 'user-seed-05',
    email: 'samira.elmi@example.com',
    phone: '+1 416 555 0148',
    emailVerified: true,
    phoneVerified: true,
    dateOfBirth: '1997-09-25',
    age: 29,
    status: 'active',
    subscriptionTier: 'gold',
    createdAt: '2026-02-20T18:00:00Z',
    lastActiveAt: '2026-09-20T14:30:00Z',
    isSeed: true
  },
  {
    id: 'user-seed-06',
    email: 'liban.hassan@example.com',
    phone: '+254 712 345678',
    emailVerified: true,
    phoneVerified: true,
    dateOfBirth: '1996-03-12',
    age: 30,
    status: 'active',
    subscriptionTier: 'free',
    createdAt: '2026-03-01T10:00:00Z',
    lastActiveAt: '2026-09-20T11:20:00Z',
    isSeed: true
  },
  {
    id: 'user-seed-07',
    email: 'amina.jama@example.com',
    phone: '+46 70 123 4567',
    emailVerified: true,
    phoneVerified: true,
    dateOfBirth: '1999-12-05',
    age: 26,
    status: 'active',
    subscriptionTier: 'premium',
    createdAt: '2026-03-10T14:20:00Z',
    lastActiveAt: '2026-09-20T16:15:00Z',
    isSeed: true
  },
  {
    id: 'user-seed-08',
    email: 'abdirahman.yusuf@example.com',
    phone: '+1 614 555 0177',
    emailVerified: true,
    phoneVerified: true,
    dateOfBirth: '1993-07-22',
    age: 33,
    status: 'active',
    subscriptionTier: 'vip',
    createdAt: '2026-03-15T08:00:00Z',
    lastActiveAt: '2026-09-20T16:55:00Z',
    isSeed: true
  }
];

export const INITIAL_SEED_PROFILES: Profile[] = [
  {
    userId: 'user-seed-01',
    displayName: 'Hodan Aden',
    age: 28,
    gender: 'female',
    interestedIn: 'men',
    relationshipIntention: 'Marriage',
    country: 'Somalia',
    city: 'Mogadishu',
    approxDistanceKm: 12,
    bio: 'Architect passionate about sustainable urban planning in the Horn of Africa. Loving family values, Somali poetry, morning espresso, and deep intellectual conversations. Looking for someone grounded in faith and kindness.',
    languages: ['Somali', 'English', 'Arabic'],
    interests: ['Architecture', 'Somali Poetry', 'Coffee Culture', 'Islamic Studies', 'Travel', 'Philanthropy'],
    education: 'M.Arch — University of Nairobi',
    profession: 'Senior Urban Architect',
    religion: 'Muslim',
    heightCm: 168,
    lifestyle: {
      drinking: 'Never',
      smoking: 'Never',
      exercise: 'Regularly (Pilates & Walking)',
      relocate: 'Open to relocating for the right partner'
    },
    photos: [
      {
        id: 'photo-01-1',
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
        isPrimary: true,
        order: 1,
        moderationStatus: 'approved'
      },
      {
        id: 'photo-01-2',
        url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80',
        isPrimary: false,
        order: 2,
        moderationStatus: 'approved'
      },
      {
        id: 'photo-01-3',
        url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80',
        isPrimary: false,
        order: 3,
        moderationStatus: 'approved'
      }
    ],
    verificationLevel: 2,
    verificationStatus: 'verified',
    verificationBadge: true,
    completionPercentage: 100,
    isOnline: true,
    lastActiveFormatted: 'Active now'
  },
  {
    userId: 'user-seed-02',
    displayName: 'Khalid Farah',
    age: 30,
    gender: 'male',
    interestedIn: 'women',
    relationshipIntention: 'Marriage',
    country: 'United Kingdom',
    city: 'London',
    approxDistanceKm: 450,
    bio: 'Software engineer & tech founder. Born in Hargeisa, raised in London. I value honesty, mutual ambition, and family gatherings. When not coding, I run half-marathons and mentor youth.',
    languages: ['English', 'Somali'],
    interests: ['Tech & AI', 'Long-distance Running', 'Reading History', 'Cooking Somali Dishes', 'Volunteering'],
    education: 'BSc Computer Science — King\'s College London',
    profession: 'Engineering Lead & Co-founder',
    religion: 'Muslim',
    heightCm: 185,
    lifestyle: {
      drinking: 'Never',
      smoking: 'Never',
      exercise: 'Daily workout',
      relocate: 'Open to travel and relocation'
    },
    photos: [
      {
        id: 'photo-02-1',
        url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80',
        isPrimary: true,
        order: 1,
        moderationStatus: 'approved'
      },
      {
        id: 'photo-02-2',
        url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80',
        isPrimary: false,
        order: 2,
        moderationStatus: 'approved'
      }
    ],
    verificationLevel: 2,
    verificationStatus: 'verified',
    verificationBadge: true,
    completionPercentage: 95,
    isOnline: true,
    lastActiveFormatted: 'Active now'
  },
  {
    userId: 'user-seed-03',
    displayName: 'Faduma Osman',
    age: 26,
    gender: 'female',
    interestedIn: 'men',
    relationshipIntention: 'Serious Relationship',
    country: 'United States',
    city: 'Minneapolis, MN',
    approxDistanceKm: 850,
    bio: 'Pediatric nurse with a passion for community health advocacy. Love baking, interior decorating, and hiking state parks in summer. Seeking someone with emotional maturity, humour, and steady character.',
    languages: ['English', 'Somali'],
    interests: ['Healthcare', 'Baking', 'Nature & Hiking', 'Interior Styling', 'Community Organizing'],
    education: 'BSN — University of Minnesota',
    profession: 'Registered Pediatric Nurse',
    religion: 'Muslim',
    heightCm: 165,
    lifestyle: {
      drinking: 'Never',
      smoking: 'Never',
      exercise: 'Pilates 3x/week',
      relocate: 'Prefer Midwest or East Coast'
    },
    photos: [
      {
        id: 'photo-03-1',
        url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1000&q=80',
        isPrimary: true,
        order: 1,
        moderationStatus: 'approved'
      },
      {
        id: 'photo-03-2',
        url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1000&q=80',
        isPrimary: false,
        order: 2,
        moderationStatus: 'approved'
      }
    ],
    verificationLevel: 2,
    verificationStatus: 'verified',
    verificationBadge: true,
    completionPercentage: 90,
    isOnline: false,
    lastActiveFormatted: 'Active 2h ago'
  },
  {
    userId: 'user-seed-04',
    displayName: 'Mustafa Warsame',
    age: 32,
    gender: 'male',
    interestedIn: 'women',
    relationshipIntention: 'Marriage',
    country: 'United Arab Emirates',
    city: 'Dubai',
    approxDistanceKm: 310,
    bio: 'Investment manager focused on emerging African & Middle Eastern markets. Dedicated to faith, fitness, and building an enduring family legacy. Looking for an intelligent, warm partner to share life\'s blessings.',
    languages: ['Arabic', 'Somali', 'English'],
    interests: ['Finance & Markets', 'Equestrian', 'World Travel', 'Book Clubs', 'Philanthropy'],
    education: 'MBA — London Business School',
    profession: 'Private Equity Director',
    religion: 'Muslim',
    heightCm: 182,
    lifestyle: {
      drinking: 'Never',
      smoking: 'Never',
      exercise: 'Gym & Swimming 5x/week',
      relocate: 'Open to UAE, UK, or Somalia'
    },
    photos: [
      {
        id: 'photo-04-1',
        url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=80',
        isPrimary: true,
        order: 1,
        moderationStatus: 'approved'
      }
    ],
    verificationLevel: 2,
    verificationStatus: 'verified',
    verificationBadge: true,
    completionPercentage: 90,
    isOnline: true,
    lastActiveFormatted: 'Active now'
  },
  {
    userId: 'user-seed-05',
    displayName: 'Samira Elmi',
    age: 29,
    gender: 'female',
    interestedIn: 'men',
    relationshipIntention: 'Marriage',
    country: 'Canada',
    city: 'Toronto, ON',
    approxDistanceKm: 920,
    bio: 'Corporate counsel & human rights advocate. Passionate about literature, art museums, and tea rituals. Valuing kindness, integrity, emotional intelligence, and shared spiritual grounding.',
    languages: ['English', 'Somali', 'French'],
    interests: ['Law & Policy', 'Contemporary Art', 'Literature', 'Tennis', 'Travel'],
    education: 'Juris Doctor (JD) — Osgoode Hall Law School',
    profession: 'Corporate Legal Counsel',
    religion: 'Muslim',
    heightCm: 172,
    lifestyle: {
      drinking: 'Never',
      smoking: 'Never',
      exercise: 'Tennis & Yoga',
      relocate: 'Flexible for serious commitment'
    },
    photos: [
      {
        id: 'photo-05-1',
        url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80',
        isPrimary: true,
        order: 1,
        moderationStatus: 'approved'
      },
      {
        id: 'photo-05-2',
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=80',
        isPrimary: false,
        order: 2,
        moderationStatus: 'approved'
      }
    ],
    verificationLevel: 2,
    verificationStatus: 'verified',
    verificationBadge: true,
    completionPercentage: 95,
    isOnline: false,
    lastActiveFormatted: 'Active 3h ago'
  },
  {
    userId: 'user-seed-06',
    displayName: 'Liban Hassan',
    age: 30,
    gender: 'male',
    interestedIn: 'women',
    relationshipIntention: 'Getting to Know Someone',
    country: 'Kenya',
    city: 'Nairobi',
    approxDistanceKm: 90,
    bio: 'Agronomist & climate adaptation researcher. Enjoy safari road trips, wildlife photography, and traditional acoustic oud music. Searching for an uplifting, family-oriented partner.',
    languages: ['Somali', 'Swahili', 'English'],
    interests: ['Agriculture', 'Photography', 'Wildlife', 'Acoustic Music', 'Community Building'],
    education: 'MSc Agricultural Sciences — University of Nairobi',
    profession: 'AgTech Research Specialist',
    religion: 'Muslim',
    heightCm: 178,
    lifestyle: {
      drinking: 'Never',
      smoking: 'Never',
      exercise: 'Active outdoor lifestyle',
      relocate: 'Open within East Africa and worldwide'
    },
    photos: [
      {
        id: 'photo-06-1',
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
        isPrimary: true,
        order: 1,
        moderationStatus: 'approved'
      }
    ],
    verificationLevel: 1,
    verificationStatus: 'verified',
    verificationBadge: true,
    completionPercentage: 85,
    isOnline: false,
    lastActiveFormatted: 'Active yesterday'
  },
  {
    userId: 'user-seed-07',
    displayName: 'Amina Jama',
    age: 26,
    gender: 'female',
    interestedIn: 'men',
    relationshipIntention: 'Marriage',
    country: 'Sweden',
    city: 'Stockholm',
    approxDistanceKm: 650,
    bio: 'Product Designer at a Nordic fintech. I adore Scandinavian minimalism, warm tea on chilly mornings, and discussing future dreams. Looking for someone with a kind heart and clear direction in life.',
    languages: ['Swedish', 'Somali', 'English'],
    interests: ['UI/UX Design', 'Nordic Cinema', 'Specialty Coffee', 'Baking', 'Graphic Arts'],
    education: 'BSc Interaction Design — KTH Royal Institute of Technology',
    profession: 'Senior Product Designer',
    religion: 'Muslim',
    heightCm: 170,
    lifestyle: {
      drinking: 'Never',
      smoking: 'Never',
      exercise: 'Pilates and cycling',
      relocate: 'Open to Europe, North America, or Gulf'
    },
    photos: [
      {
        id: 'photo-07-1',
        url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
        isPrimary: true,
        order: 1,
        moderationStatus: 'approved'
      }
    ],
    verificationLevel: 2,
    verificationStatus: 'verified',
    verificationBadge: true,
    completionPercentage: 92,
    isOnline: true,
    lastActiveFormatted: 'Active now'
  },
  {
    userId: 'user-seed-08',
    displayName: 'Abdirahman Yusuf',
    age: 33,
    gender: 'male',
    interestedIn: 'women',
    relationshipIntention: 'Marriage',
    country: 'United States',
    city: 'Columbus, OH',
    approxDistanceKm: 780,
    bio: 'Cardiologist fellow. Humble, curious, and dedicated to serving patients with compassion. Looking for a partner who shares deep spiritual grounding, loves learning, and values a warm home.',
    languages: ['English', 'Somali', 'Arabic'],
    interests: ['Medicine & Science', 'Islamic Philosophy', 'Long Walks', 'Basketball', 'Documentaries'],
    education: 'MD — The Ohio State University College of Medicine',
    profession: 'Cardiology Physician Fellow',
    religion: 'Muslim',
    heightCm: 188,
    lifestyle: {
      drinking: 'Never',
      smoking: 'Never',
      exercise: 'Gym 4x/week',
      relocate: 'Settled in US, open to discussing'
    },
    photos: [
      {
        id: 'photo-08-1',
        url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80',
        isPrimary: true,
        order: 1,
        moderationStatus: 'approved'
      }
    ],
    verificationLevel: 2,
    verificationStatus: 'verified',
    verificationBadge: true,
    completionPercentage: 98,
    isOnline: true,
    lastActiveFormatted: 'Active now'
  }
];

export const INITIAL_SEED_LIKES: Like[] = [
  // Hodan liked Khalid
  {
    id: 'like-seed-01',
    senderId: 'user-seed-01',
    receiverId: 'user-seed-02',
    isSuperLike: false,
    createdAt: '2026-09-18T10:00:00Z'
  },
  // Khalid liked Hodan -> mutual match!
  {
    id: 'like-seed-02',
    senderId: 'user-seed-02',
    receiverId: 'user-seed-01',
    isSuperLike: true,
    createdAt: '2026-09-18T10:30:00Z'
  },
  // Mustafa liked Hodan (pending on Hodan's side, visible in Likes You if Gold)
  {
    id: 'like-seed-03',
    senderId: 'user-seed-04',
    receiverId: 'user-seed-01',
    isSuperLike: false,
    createdAt: '2026-09-19T14:10:00Z'
  },
  // Liban liked Hodan
  {
    id: 'like-seed-04',
    senderId: 'user-seed-06',
    receiverId: 'user-seed-01',
    isSuperLike: false,
    createdAt: '2026-09-20T08:20:00Z'
  }
];

export const INITIAL_SEED_MATCHES: Match[] = [
  {
    id: 'match-seed-01',
    user1Id: 'user-seed-01',
    user2Id: 'user-seed-02',
    createdAt: '2026-09-18T10:30:00Z',
    matchedProfile: INITIAL_SEED_PROFILES[1],
    lastMessage: 'As-salamu alaykum Hodan, wonderful to connect with you here.',
    lastMessageAt: '2026-09-18T11:05:00Z',
    unreadCount: 0
  }
];

export const INITIAL_SEED_MESSAGES: Message[] = [
  {
    id: 'msg-seed-01',
    conversationId: 'match-seed-01',
    senderId: 'user-seed-02',
    text: 'As-salamu alaykum Hodan, wonderful to connect with you here! Your architectural work sounds truly inspiring.',
    status: 'read',
    createdAt: '2026-09-18T11:05:00Z'
  },
  {
    id: 'msg-seed-02',
    conversationId: 'match-seed-01',
    senderId: 'user-seed-01',
    text: 'Wa alaykumu s-salam Khalid! Thank you so much. It is an honor. I saw your focus on mentorship and tech leadership—truly commendable.',
    status: 'read',
    createdAt: '2026-09-18T11:15:00Z'
  },
  {
    id: 'msg-seed-03',
    conversationId: 'match-seed-01',
    senderId: 'user-seed-02',
    text: 'Barakallahu feeki. Family and purposeful work are what keep me anchored. What is a core value you look for most in building a lifelong partnership?',
    isIcebreaker: true,
    status: 'read',
    createdAt: '2026-09-18T11:25:00Z'
  }
];

export const INITIAL_SEED_CASES: ModerationCase[] = [
  {
    id: 'case-seed-01',
    reporterId: 'user-seed-03',
    reporterName: 'Faduma Osman',
    reportedUserId: 'user-seed-09-bad',
    reportedUserName: 'Suspicious Account 102',
    category: 'scam',
    severity: 'high',
    status: 'under_review',
    description: 'User initiated an external message request asking for financial remittances to an overseas account.',
    assignedModerator: 'moderator@isfaham.com',
    createdAt: '2026-09-19T09:12:00Z',
    updatedAt: '2026-09-19T10:00:00Z'
  },
  {
    id: 'case-seed-02',
    reporterId: 'user-seed-05',
    reporterName: 'Samira Elmi',
    reportedUserId: 'user-seed-10-bad',
    reportedUserName: 'Unverified Duplicate',
    category: 'impersonation',
    severity: 'medium',
    status: 'resolved',
    description: 'Claimed to be someone in Toronto using photos found on an Instagram portfolio.',
    assignedModerator: 'safety-lead@isfaham.com',
    resolutionNotes: 'Verified duplicate identity against original holder. Account permanently suspended.',
    actionTaken: 'suspended',
    createdAt: '2026-09-17T14:45:00Z',
    updatedAt: '2026-09-17T16:20:00Z'
  }
];

export const INITIAL_SEED_VERIFICATIONS: VerificationRequest[] = [
  {
    id: 'verif-seed-01',
    userId: 'user-seed-06',
    userDisplayName: 'Liban Hassan',
    level: 2,
    status: 'under_review',
    selfiePoseUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    submittedAt: '2026-09-20T10:00:00Z'
  },
  {
    id: 'verif-seed-02',
    userId: 'user-seed-03',
    userDisplayName: 'Faduma Osman',
    level: 2,
    status: 'verified',
    selfiePoseUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
    submittedAt: '2026-09-15T12:00:00Z',
    reviewedAt: '2026-09-15T12:30:00Z',
    reviewedBy: 'safety-team@isfaham.com'
  }
];

export const INITIAL_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'ticket-seed-01',
    userId: 'user-seed-01',
    userName: 'Hodan Aden',
    userEmail: 'hodan.aden@example.com',
    category: 'verification',
    priority: 'medium',
    subject: 'Question on Photo Verification approval timeframe',
    description: 'Submitted pose selfie yesterday, wanted to inquire about typical approval SLA.',
    status: 'resolved',
    createdAt: '2026-09-16T10:00:00Z',
    updatedAt: '2026-09-16T11:00:00Z'
  },
  {
    id: 'ticket-seed-02',
    userId: 'user-seed-02',
    userName: 'Khalid Farah',
    userEmail: 'khalid.farah@example.com',
    category: 'payments',
    priority: 'low',
    subject: 'Receipt request for Annual VIP subscription',
    description: 'Need VAT invoice for personal records.',
    status: 'open',
    createdAt: '2026-09-20T14:00:00Z',
    updatedAt: '2026-09-20T14:00:00Z'
  }
];
