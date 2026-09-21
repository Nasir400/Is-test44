import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { storage } from './src/services/storage';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'ISFAHAM Core API',
      timestamp: new Date().toISOString()
    });
  });

  // Current User
  app.get('/api/current-user', (req: Request, res: Response) => {
    const data = storage.getCurrentUser();
    if (!data) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(data);
  });

  // Auth: Register (with 18+ check)
  app.post('/api/auth/register', (req: Request, res: Response) => {
    const result = storage.registerUser(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    res.json(result);
  });

  // Auth: Switch persona/login
  app.post('/api/auth/switch-user', (req: Request, res: Response) => {
    const { userId } = req.body;
    storage.setCurrentUserId(userId);
    const data = storage.getCurrentUser();
    res.json({ success: true, ...data });
  });

  // Discover Profiles
  app.get('/api/discover', (req: Request, res: Response) => {
    const userId = (req.query.userId as string) || storage.getCurrentUserId() || '';
    const profiles = storage.getDiscoveryProfiles(userId, {
      minAge: req.query.minAge ? parseInt(req.query.minAge as string) : undefined,
      maxAge: req.query.maxAge ? parseInt(req.query.maxAge as string) : undefined,
      verifiedOnly: req.query.verifiedOnly === 'true',
      relationshipIntention: req.query.intention as any
    });
    res.json({ count: profiles.length, profiles });
  });

  // Like action (Idempotent & triggers mutual match)
  app.post('/api/likes', (req: Request, res: Response) => {
    const { senderId, receiverId, isSuperLike } = req.body;
    const result = storage.handleLike(senderId || storage.getCurrentUserId() || '', receiverId, !!isSuperLike);
    res.json(result);
  });

  // Pass action
  app.post('/api/pass', (req: Request, res: Response) => {
    const { senderId, receiverId } = req.body;
    storage.handlePass(senderId || storage.getCurrentUserId() || '', receiverId);
    res.json({ success: true });
  });

  // Undo action (Rewind)
  app.post('/api/undo', (req: Request, res: Response) => {
    const { senderId } = req.body;
    const success = storage.undoLastAction(senderId || storage.getCurrentUserId() || '');
    res.json({ success });
  });

  // Likes You (Gold/VIP)
  app.get('/api/likes-you', (req: Request, res: Response) => {
    const userId = (req.query.userId as string) || storage.getCurrentUserId() || '';
    const list = storage.getLikesYou(userId);
    res.json({ count: list.length, items: list });
  });

  // Matches
  app.get('/api/matches', (req: Request, res: Response) => {
    const userId = (req.query.userId as string) || storage.getCurrentUserId() || '';
    const matches = storage.getMatches(userId);
    res.json({ count: matches.length, matches });
  });

  // Messages
  app.get('/api/messages/:conversationId', (req: Request, res: Response) => {
    const { conversationId } = req.params;
    const messages = storage.getMessages(conversationId);
    res.json({ count: messages.length, messages });
  });

  app.post('/api/messages', (req: Request, res: Response) => {
    const { conversationId, senderId, text, isIcebreaker, imageUrl } = req.body;
    const msg = storage.sendMessage(
      conversationId,
      senderId || storage.getCurrentUserId() || '',
      text,
      isIcebreaker,
      imageUrl
    );
    res.json({ success: true, message: msg });
  });

  // Notifications
  app.get('/api/notifications', (req: Request, res: Response) => {
    const userId = (req.query.userId as string) || storage.getCurrentUserId() || '';
    const items = storage.getNotifications(userId);
    res.json({ count: items.length, notifications: items });
  });

  app.post('/api/notifications/read', (req: Request, res: Response) => {
    const userId = req.body.userId || storage.getCurrentUserId() || '';
    storage.markAllNotificationsAsRead(userId);
    res.json({ success: true });
  });

  // Verification
  app.post('/api/verification/submit', (req: Request, res: Response) => {
    const { userId, level, selfieUrl } = req.body;
    const reqItem = storage.submitVerificationRequest(userId || storage.getCurrentUserId(), level || 2, selfieUrl);
    res.json({ success: true, request: reqItem });
  });

  // Safety: Report
  app.post('/api/safety/report', (req: Request, res: Response) => {
    const { reporterId, reportedUserId, category, severity, description, evidenceUrl } = req.body;
    const modCase = storage.submitReport({
      reporterId: reporterId || storage.getCurrentUserId(),
      reportedUserId,
      category,
      severity,
      description,
      evidenceUrl
    });
    res.json({ success: true, case: modCase });
  });

  // Safety: Block
  app.post('/api/safety/block', (req: Request, res: Response) => {
    const { blockerId, blockedUserId } = req.body;
    storage.blockUser(blockerId || storage.getCurrentUserId(), blockedUserId);
    res.json({ success: true });
  });

  // Subscriptions
  app.get('/api/subscriptions/plans', (req: Request, res: Response) => {
    res.json(storage.getPlans());
  });

  app.post('/api/subscriptions/upgrade', (req: Request, res: Response) => {
    const { userId, tier } = req.body;
    const updated = storage.updateSubscription(userId || storage.getCurrentUserId(), tier);
    res.json({ success: true, user: updated });
  });

  app.post('/api/subscriptions/boost', (req: Request, res: Response) => {
    const { userId } = req.body;
    const success = storage.activateBoost(userId || storage.getCurrentUserId());
    res.json({ success });
  });

  // Admin Operations
  app.get('/api/admin/stats', (req: Request, res: Response) => {
    res.json(storage.getPlatformStats());
  });

  app.get('/api/admin/users', (req: Request, res: Response) => {
    res.json(storage.getAllUsers());
  });

  app.post('/api/admin/users/status', (req: Request, res: Response) => {
    const { userId, status, moderator } = req.body;
    const success = storage.updateUserStatus(userId, status, moderator || 'admin@isfaham.com');
    res.json({ success });
  });

  app.get('/api/admin/moderation', (req: Request, res: Response) => {
    res.json(storage.getModerationCases());
  });

  app.post('/api/admin/moderation/action', (req: Request, res: Response) => {
    const { caseId, action, notes, moderator } = req.body;
    const success = storage.takeModerationAction(caseId, action, notes, moderator || 'admin@isfaham.com');
    res.json({ success });
  });

  app.get('/api/admin/verifications', (req: Request, res: Response) => {
    res.json(storage.getVerificationRequests());
  });

  app.post('/api/admin/verifications/review', (req: Request, res: Response) => {
    const { reqId, approved, moderator, reason } = req.body;
    const success = storage.reviewVerification(reqId, approved, moderator || 'admin@isfaham.com', reason);
    res.json({ success });
  });

  app.get('/api/admin/audit-logs', (req: Request, res: Response) => {
    res.json(storage.getAuditLogs());
  });

  app.post('/api/admin/seed/clear', (req: Request, res: Response) => {
    storage.clearSeedData();
    res.json({ success: true, message: 'All seed data cleared' });
  });

  app.post('/api/admin/seed/reload', (req: Request, res: Response) => {
    storage.reloadSeedData();
    res.json({ success: true, message: 'Seed data reloaded' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ISFAHAM] Platform API & Web running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('[ISFAHAM] Fatal startup error:', err);
});
