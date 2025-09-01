import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/database.js';
import authRoutes from './routes/auth.js';
import expertRouter from './routes/expert.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
