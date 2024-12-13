// backend/scripts/checkAdmin.ts
import mongoose from 'mongoose';
import User from '../src/models/Users';
import dotenv from 'dotenv';

dotenv.config();

async function checkAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    const admin = await User.findOne({ email: 'pdhblog@example.com' });
    
    if (admin) {
      console.log('Admin user found:');
      console.log('Email:', admin.email);
      console.log('Is Admin:', admin.isAdmin);
    } else {
      console.log('No admin user found');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

checkAdmin();