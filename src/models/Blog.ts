// backend/src/models/Blog.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  description: string;
  authorName: string;
  readTime: string;
  mediumLink: string;
  image?: string;
  createdAt: Date;
}

const BlogSchema: Schema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  authorName: { 
    type: String, 
    required: true 
  },
  readTime: { 
    type: String, 
    required: true 
  },
  mediumLink: { 
    type: String, 
    required: true 
  },
  image: {
    type: String 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model<IBlog>('Blog', BlogSchema);