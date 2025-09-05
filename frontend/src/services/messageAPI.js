import api from './api';

export const messageAPI = {
  // Send a message
  sendMessage: (messageData) => api.post('/messages', messageData),

  // Get messages for a conversation
  getMessages: (userId, receiverId, receiverModel) =>
    api.get(
      `/messages?userId=${userId}&receiverId=${receiverId}&receiverModel=${receiverModel}`
    ),

  // Get user conversations
  getConversations: (userId) =>
    api.get(`/messages/conversations?userId=${userId}`),

  // Mark message as read
  markAsRead: (messageId, userId, userModel = 'User') =>
    api.patch(`/messages/${messageId}/read`, { userId, userModel }),
};
