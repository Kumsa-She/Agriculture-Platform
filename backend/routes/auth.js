import express from 'express';
import {
  register,
  login,
  getMe,
  expertLogin,
  getUserById, // Import the new function
  getExpertById, // Import the new function
  getAllUsers, // Import the new function
  getAllExperts, // Import the new function
} from '../controllers/authController.js';
import { validateCredentials, validateUserId } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', validateCredentials, login);
router.post('/expert-login', expertLogin);

// New public routes to get users/experts
router.get('/users/:id', getUserById); // Get user by ID
router.get('/experts/:id', getExpertById); // Get expert by ID
router.get('/users', getAllUsers); // Get all users
router.get('/experts', getAllExperts); // Get all experts

// Protected route - requires user ID in request body
router.post('/me', validateUserId, getMe);

export default router;
