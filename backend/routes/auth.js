import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { validateCredentials, validateUserId } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', validateCredentials, login);

// Protected route - requires user ID in request body
router.post('/me', validateUserId, getMe);

export default router;
