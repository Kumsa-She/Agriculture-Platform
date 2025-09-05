import Expert from '../models/expert.js';
import bcrypt from 'bcryptjs';

// Get all experts
export const getAllExperts = async (req, res) => {
  try {
    const experts = await Expert.find().select('-password');
    res.status(200).json({
      success: true,
      count: experts.length,
      data: experts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Get single expert by ID
export const getExpertById = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id).select('-password');

    if (!expert) {
      return res.status(404).json({
        success: false,
        message: 'Expert not found',
      });
    }

    res.status(200).json({
      success: true,
      data: expert,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid expert ID',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Create new expert
export const createExpert = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      specialty,
      experience,
      desc,
      education,
      language,
      status,
    } = req.body;

    // Check if expert already exists
    const existingExpert = await Expert.findOne({ email });
    if (existingExpert) {
      return res.status(400).json({
        success: false,
        message: 'Expert with this email already exists',
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create expert
    const expert = await Expert.create({
      name,
      email,
      password: hashedPassword,
      specialty,
      experience,
      desc,
      education,
      language,
      status,
    });

    // Remove password from response
    const expertResponse = expert.toObject();
    delete expertResponse.password;

    res.status(201).json({
      success: true,
      data: expertResponse,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Update expert
export const updateExpert = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;

    // If password is being updated, hash it
    if (password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(password, saltRounds);
    }

    const expert = await Expert.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!expert) {
      return res.status(404).json({
        success: false,
        message: 'Expert not found',
      });
    }

    res.status(200).json({
      success: true,
      data: expert,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages,
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid expert ID',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Delete expert
export const deleteExpert = async (req, res) => {
  try {
    const expert = await Expert.findByIdAndDelete(req.params.id);

    if (!expert) {
      return res.status(404).json({
        success: false,
        message: 'Expert not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Expert deleted successfully',
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid expert ID',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};
