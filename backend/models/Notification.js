import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'recipientModel',
  },
  recipientModel: {
    type: String,
    required: true,
    enum: ['Farmer', 'Expert'],
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'senderModel',
  },
  senderModel: {
    type: String,
    required: true,
    enum: ['Farmer', 'Expert'],
  },
  type: {
    type: String,
    enum: ['new_message', 'chat_request'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  },
  relatedChatRoomId: {
    type: String,
    required: true,
  },
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
