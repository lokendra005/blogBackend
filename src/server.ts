// backend/src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import blogRoutes from './routes/blogRoutes';

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'your-frontend-vercel-url'],
  credentials: true
}));
app.use(express.json());

// For Vercel, we need to handle uploads differently
if (process.env.VERCEL) {
  // Use vercel tmp directory for uploads in production
  app.use('/uploads', express.static('/tmp/uploads'));
} else {
  // Use local uploads directory in development
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
}

// Create uploads directory
import fs from 'fs';
const uploadsDir = process.env.VERCEL ? '/tmp/uploads' : path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;

// For Vercel, we export the app instead of listening
if (process.env.VERCEL) {
  module.exports = app;
} else {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}