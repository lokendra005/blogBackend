// backend/scripts/debugAuth.ts
import mongoose from 'mongoose';
import User from '../src/models/Users';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

async function debugAuth() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Find admin user
    const user = await User.findOne({ email: 'pdhblog@example.com' });
    
    if (user) {
      console.log('User found:');
      console.log('Email:', user.email);
      console.log('IsAdmin:', user.isAdmin);
      
      // Test password
      const testPassword = 'pdhblog123';
      const passwordMatch = await bcrypt.compare(testPassword, user.password);
      console.log('Password match test:', passwordMatch);
    } else {
      console.log('No user found with this email');
      
      // Create new admin
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('pdhblog123', salt);
      
      const newAdmin = new User({
        email: 'pdhblog@example.com',
        password: hashedPassword,
        isAdmin: true
      });
      
      await newAdmin.save();
      console.log('New admin created successfully');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

debugAuth();