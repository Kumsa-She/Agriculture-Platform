import User from '../models/User.js';

// Middleware to validate user credentials
const validateCredentials = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await user.correctPassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Remove password from user object
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    // Attach user to request for use in controller
    req.user = userWithoutPassword;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Middleware to validate user ID (for getMe endpoint)
const validateUserId = async (req, res, next) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('User ID validation error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export { validateCredentials, validateUserId };
