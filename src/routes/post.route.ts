import express from 'express';
import auth from '../middlewares/auth';
import { createPost, getPosts } from '../controllers/post.controller';
import { AccountRole } from '../models/account.model';

const router = express.Router();

router.get('/', auth(), getPosts);
router.post('/create-post', auth([AccountRole.USER]), createPost);

export default router;
