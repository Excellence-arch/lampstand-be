import express from 'express';
import auth from '../middlewares/auth';
import {
  createPost,
  getPostById,
  getPosts,
} from '../controllers/post.controller';
import { AccountRole } from '../models/account.model';
import {
  deleteComment,
  likePost,
  makeComment,
  unlikePost,
} from '../controllers/comment.controller';

const router = express.Router();

router.get('/', auth(), getPosts);
router.get('/:id', auth(), getPostById);
router.post('/create-post', auth([AccountRole.USER]), createPost);
router.post('/like-post', auth(), likePost);
router.post('/unlike-post', auth(), unlikePost);
router.post('/comment', auth(), makeComment);
router.delete('/delete-comment', auth(), deleteComment);

export default router;
