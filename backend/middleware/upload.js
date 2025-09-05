import express from 'express';
import {
  sendMessage,
  getMessages,
  getConversations,
  markAsRead,
} from '../controllers/messageController.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory:', uploadsDir);
}

// Configure multer directly in the routes file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Use the absolute path
  },
  filename: (req, file, cb) => {
    // Clean filename to remove special characters and spaces
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + cleanName);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images, PDFs, and Word documents are allowed'));
    }
  },
});

const router = express.Router();

// POST /api/messages - Send a message
router.post('/', upload.single('attachment'), sendMessage);

// GET /api/messages - Get messages for a conversation
router.get('/', getMessages);

// GET /api/messages/conversations - Get user conversations
router.get('/conversations', getConversations);

// PATCH /api/messages/:messageId/read - Mark message as read
router.patch('/:messageId/read', markAsRead);

export default router;
