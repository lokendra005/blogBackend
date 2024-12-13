// backend/scripts/resetDatabase.ts
import mongoose from 'mongoose';
import User from '../src/models/Users';
import dotenv from 'dotenv';

dotenv.config();

async function resetDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Drop users collection
    await mongoose.connection.collection('users').drop();
    console.log('Dropped users collection');

    // Create new admin
    const admin = new User({
      email: 'pdhblog@example.com',
      password: 'pdhblog123',
      isAdmin: true
    });

    await admin.save();
    console.log('Created new admin user:');
    console.log('Email:', admin.email);
    console.log('Password: pdhblog123');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

resetDatabase();