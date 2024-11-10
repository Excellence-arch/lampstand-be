import express from 'express';
import auth from '../middlewares/auth';
import {
  createPost,
  getPostById,
  getPosts,
} from '../controllers/post.controller';
import { AccountRole } from '../models/account.model';

const router = express.Router();

router.get('/', auth(), getPosts);
router.get('/:id', auth(), getPostById);
router.post('/create-post', auth([AccountRole.USER]), createPost);

export default router;
