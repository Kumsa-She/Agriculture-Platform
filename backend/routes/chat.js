import express from 'express';
import Message from '../models/Message.js';
import Notification from '../models/Notification.js';
import Farmer from '../models/User.js';
import Expert from '../models/expert.js';
import { validateUserId } from '../middleware/auth.js';

const router = express.Router();

// Initiate chat
router.post('/initiate', validateUserId, async (req, res) => {
  try {
    const { expertId } = req.body;
    const farmerId = req.user._id;

    const ids = [farmerId.toString(), expertId.toString()].sort();
    const chatRoomId = `${ids[0]}_${ids[1]}`;

    const existingChat = await Message.findOne({ chatRoomId });

    if (!existingChat) {
      const farmer = await Farmer.findById(farmerId);
      const expert = await Expert.findById(expertId);

      if (!farmer || !expert) {
        return res
          .status(404)
          .json({ success: false, message: 'User or expert not found' });
      }

      const notification = new Notification({
        recipientId: expertId,
        recipientModel: 'Expert',
        senderId: farmerId,
        senderModel: 'Farmer',
        type: 'chat_request',
        content: `New chat request from ${farmer.name}`,
        relatedChatRoomId: chatRoomId,
      });

      await notification.save();

      req.app
        .get('io')
        .to(`user_${expertId}`)
        .emit('newNotification', notification);
    }

    res.json({ success: true, chatRoomId });
  } catch (error) {
    console.error('Error in /initiate:', error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to initiate chat' });
  }
});

// Get chat history
router.get('/:chatRoomId', validateUserId, async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const userId = req.user._id;

    const messages = await Message.find({
      chatRoomId,
      $or: [{ senderId: userId }, { receiverId: userId }],
    }).sort({ timestamp: 1 });

    if (!messages.length) {
      return res
        .status(403)
        .json({ success: false, message: 'Unauthorized access to chat room' });
    }

    await Message.updateMany(
      { chatRoomId, receiverId: userId, read: false },
      { $set: { read: true } }
    );

    res.json({ success: true, messages });
  } catch (error) {
    console.error('Error in /:chatRoomId:', error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to fetch chat history' });
  }
});

// Send message
router.post('/send', validateUserId, async (req, res) => {
  try {
    const {
      chatRoomId,
      content,
      senderId,
      senderModel,
      receiverId,
      receiverModel,
    } = req.body;

    if (!content || content.trim().length === 0) {
      return res
        .status(400)
        .json({ success: false, message: 'Message content cannot be empty' });
    }
    if (content.length > 1000) {
      return res
        .status(400)
        .json({ success: false, message: 'Message content too long' });
    }

    const message = new Message({
      chatRoomId,
      content,
      senderId,
      senderModel,
      receiverId,
      receiverModel,
      timestamp: new Date(),
      read: false,
    });

    await message.save();

    const receiver = await (receiverModel === 'Farmer'
      ? Farmer
      : Expert
    ).findById(receiverId);
    const sender = await (senderModel === 'Farmer' ? Farmer : Expert).findById(
      senderId
    );

    if (!receiver || !sender) {
      return res
        .status(404)
        .json({ success: false, message: 'Sender or receiver not found' });
    }

    const notification = new Notification({
      recipientId: receiverId,
      recipientModel,
      senderId,
      senderModel,
      type: 'new_message',
      content: `New message from ${sender.name}`,
      relatedChatRoomId: chatRoomId,
    });

    await notification.save();

    req.app
      .get('io')
      .to(`user_${receiverId}`)
      .emit('newNotification', notification);
    req.app.get('io').to(chatRoomId).emit('receiveMessage', message);

    res.json({ success: true, message });
  } catch (error) {
    console.error('Error in /send:', error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
});

export default router;
