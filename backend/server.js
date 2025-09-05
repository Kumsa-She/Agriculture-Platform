import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

import connectDB from './config/database.js';
import authRoutes from './routes/auth.js';
import expertRouter from './routes/expert.js';
import chatRoutes from './routes/chat.js'; // Import chat routes
import notificationRoutes from './routes/notifications.js'; // Import notification routes

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
});

// Store socket.io instance in app
app.set('io', io);

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/support', expertRouter);
app.use('/api/experts', expertRouter);
app.use('/api/chat', chatRoutes); // Add chat routes
app.use('/api/notifications', notificationRoutes); // Add notification routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running!' });
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // User joins their personal room
  socket.on('joinUserRoom', (userId) => {
    socket.join(`user_${userId}`);
    console.log(`User ${userId} joined their room`);
  });

  // User joins chat room
  socket.on('joinChatRoom', (chatRoomId) => {
    socket.join(chatRoomId);
    console.log(`User joined chat room: ${chatRoomId}`);
  });

  // Handle sending messages
  socket.on('sendMessage', async (data) => {
    try {
      const {
        chatRoomId,
        senderId,
        senderModel,
        receiverId,
        receiverModel,
        content,
      } = data;

      // Import models
      const Message = (await import('./models/Message.js')).default;
      const Notification = (await import('./models/Notification.js')).default;
      const Farmer = (await import('./models/Farmer.js')).default;
      const Expert = (await import('./models/expert.js')).default;

      // Save message to database
      const message = new Message({
        senderId,
        senderModel,
        receiverId,
        receiverModel,
        content,
        chatRoomId,
      });

      await message.save();

      // Emit message to all users in the chat room
      io.to(chatRoomId).emit('receiveMessage', message);

      // Create notification if receiver is not in the room
      const clients = io.sockets.adapter.rooms.get(chatRoomId);
      const receiverInRoom =
        clients &&
        Array.from(clients).some((clientId) => {
          const clientSocket = io.sockets.sockets.get(clientId);
          return clientSocket && clientSocket.userId === receiverId;
        });

      if (!receiverInRoom) {
        let sender;
        if (senderModel === 'Farmer') {
          sender = await Farmer.findById(senderId);
        } else {
          sender = await Expert.findById(senderId);
        }

        const notification = new Notification({
          recipientId: receiverId,
          recipientModel: receiverModel,
          senderId,
          senderModel,
          type: 'new_message',
          content: `New message from ${sender.name}`,
          relatedChatRoomId: chatRoomId,
        });

        await notification.save();

        // Emit notification to receiver
        io.to(`user_${receiverId}`).emit('newNotification', notification);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
