// backend/src/routes/blogRoutes.ts
import express from 'express';
import { 
  createBlog, 
  getBlogs, 
  getBlogById, 
  updateBlog 
} from '../controllers/blogController';
import { protect, adminOnly } from '../middleware/auth';
import { upload } from '../config/multer';

const router = express.Router();

// Public routes
router.get('/', getBlogs);
router.get('/:id', getBlogById);

// Protected admin routes with file upload
router.post('/', protect, adminOnly, upload.single('image'), createBlog);
router.put('/:id', protect, adminOnly, upload.single('image'), updateBlog);

export default router;