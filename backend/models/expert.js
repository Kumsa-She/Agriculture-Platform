import mongoose from 'mongoose';

const expertSchema = new mongoose.Schema(
  {
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    specialty: {
      type: String,
      required: [true, 'Specialty is required'],
      trim: true,
    },
    experience: {
      type: Number,
      required: [true, 'Experience is required'],
      min: [0, 'Experience must be positive'],
    },
    desc: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    education: {
      type: String,
      required: [true, 'Status is required'],
      trim: true,
    },

    language: {
      type: String,
      required: [true, 'Language is required'],
      trim: true,
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const Expert = mongoose.model('Expert', expertSchema);

export default Expert;
