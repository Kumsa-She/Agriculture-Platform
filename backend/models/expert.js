import mongoose from 'mongoose';

const expertSchema = new mongoose.Schema(
  {
    // REMOVE the _id field definition
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
      required: [true, 'Education is required'],
      trim: true,
    },
    language: {
      type: String,
      required: [true, 'Language is required'],
      trim: true,
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      trim: true,
      default: 'online',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    // REMOVE _id: false - let MongoDB handle _id automatically
  }
);

const Expert = mongoose.model('Expert', expertSchema);

export default Expert;
