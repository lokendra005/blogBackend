import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function clearUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');
    
    // Drop the users collection
    await mongoose.connection.collection('users').drop();
    console.log('Users collection cleared');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

clearUsers();