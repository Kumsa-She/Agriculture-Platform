import User from '../models/User.js';

// Register a new user
const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const newUser = await User.create({ email, password });

    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
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

// Login user
const login = async (req, res) => {
  try {
    // User is already validated by middleware
    const user = req.user;

    res.status(200).json({
      message: 'Login successful',
      user: user,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user by ID
const getMe = async (req, res) => {
  try {
    // User is already validated by middleware
    const user = req.user;

    res.status(200).json({ user: user });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export { register, login, getMe };
