import express from 'express';
import Notification from '../models/Notification.js';
import { validateCredentials } from '../middleware/auth.js';

const router = express.Router();

// Get notifications
router.get('/', validateCredentials, async (req, res) => {
  try {
    const userId = req.user._id;
    const userModel = req.user.role === 'farmer' ? 'Farmer' : 'Expert';

    const notifications = await Notification.find({
      recipientId: userId,
      recipientModel: userModel,
      read: false,
    }).sort({ timestamp: -1 });

    res.json({ success: true, notifications });
  } catch (error) {
    console.error('Error in /notifications:', error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to fetch notifications' });
  }
});

// Mark notification as read
router.put('/:id/read', validateCredentials, async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, {
      read: true,
    });
    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: 'Notification not found' });
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Error in /notifications/:id/read:', error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to mark notification as read' });
  }
});

export default router;
