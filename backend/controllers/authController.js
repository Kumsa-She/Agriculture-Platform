import User from '../models/User.js';
import Expert from '../models/expert.js';
import bcrypt from 'bcryptjs';

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password using bcrypt directly
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      message: 'Login successful',
      user: userResponse,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Expert login function
const expertLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if expert exists
    const expert = await Expert.findOne({ email });
    if (!expert) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, expert.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Remove password from response
    const expertResponse = expert.toObject();
    delete expertResponse.password;

    res.status(200).json({
      message: 'Expert login successful',
      expert: expertResponse,
    });
  } catch (error) {
    console.error('Expert login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Register a new user
const register = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password before creating user
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = await User.create({
      name,
      phone,
      email,
      password: hashedPassword,
    });

    // Remove password from response
    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: 'User created successfully',
      user: userResponse,
    });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'User already exists' });
    }
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: 'Validation error', errors });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user by ID
const getMe = async (req, res) => {
  try {
    // User is already validated by middleware
    const user = req.user;

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({ user: userResponse });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user by ID (without sensitive data)
// @route   GET /api/auth/user/:id
// @access  Public
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }

    // Find user by ID and exclude password
    const user = await User.findById(id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Error fetching user:', error);

    // Handle CastError (invalid ID format)
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while fetching user',
    });
  }
};

// @desc    Get expert by ID (without sensitive data)
// @route   GET /api/auth/expert/:id
// @access  Public
const getExpertById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Expert ID is required',
      });
    }

    // Find expert by ID and exclude password
    const expert = await Expert.findById(id).select('-password');

    if (!expert) {
      return res.status(404).json({
        success: false,
        message: 'Expert not found',
      });
    }

    res.json({
      success: true,
      data: expert,
    });
  } catch (error) {
    console.error('Error fetching expert:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid expert ID format',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while fetching expert',
    });
  }
};

// @desc    Get all users (without sensitive data)
// @route   GET /api/auth/users
// @access  Public
const getAllUsers = async (req, res) => {
  try {
    // Find all users and exclude password
    const users = await User.find().select('-password');

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users',
    });
  }
};

// @desc    Get all experts (without sensitive data)
// @route   GET /api/auth/experts
// @access  Public
const getAllExperts = async (req, res) => {
  try {
    // Find all experts and exclude password
    const experts = await Expert.find().select('-password');

    res.json({
      success: true,
      data: experts,
    });
  } catch (error) {
    console.error('Error fetching experts:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching experts',
    });
  }
};

export {
  register,
  login,
  getMe,
  expertLogin,
  getUserById,
  getExpertById,
  getAllUsers,
  getAllExperts,
};
