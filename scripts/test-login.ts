import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/Users';
import jwt from 'jsonwebtoken';

dotenv.config();

const testLogin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    const user = await User.findOne({ email: 'admin@example.com' });
    
    if (!user) {
      console.log('Admin user not found!');
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET!,
      { expiresIn: '30d' }
    );

    console.log('\nLogin successful!');
    console.log('User:', user.email);
    console.log('\nJWT Token:');
    console.log(token);
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log('\nDecoded token:', decoded);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
};

testLogin();