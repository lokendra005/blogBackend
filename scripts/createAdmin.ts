// backend/scripts/createAdmin.ts
import mongoose from 'mongoose';
import User from '../src/models/Users';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

async function createAdminUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // First, delete existing admin if exists
    await User.deleteOne({ email: 'pdhblog@example.com' }); 
    console.log('Cleared existing admin user');

    // Create new admin user
    const adminUser = new User({
      email: 'pdhblog@example.com',
      password: 'pdhblog123',
      isAdmin: true
    });

    await adminUser.save();
    
    const token = jwt.sign(
      { id: adminUser._id, isAdmin: adminUser.isAdmin },
      process.env.JWT_SECRET!,
      { expiresIn: '30d' }
    );

    console.log('\nNew admin user created successfully!');
    console.log('Email:', adminUser.email);
    console.log('Password: pdhblog123');
    console.log('\nGenerated JWT Token:');
    console.log(token);

  } catch (error) {
    console.error('Error:', error);
    // Add more detailed error logging
    if (error instanceof mongoose.Error) {
      console.error('Mongoose Error Details:', error.message);
    }
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

createAdminUser();