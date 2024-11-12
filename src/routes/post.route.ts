import express, { Response } from 'express';
import auth, { CustomRequest } from '../middlewares/auth';
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
import { IRequest } from '../interfaces/response.interface';

const router = express.Router();

router.get('/', auth(), getPosts);
router.get('/:id', auth(), getPostById);
router.post('/create-post', auth([AccountRole.USER]), (req, res) =>
  createPost(req as IRequest, res)
);
router.post('/like-post', auth(), (req, res) => likePost(req as IRequest, res));
router.post('/unlike-post', auth(), (req, res) =>
  unlikePost(req as IRequest, res)
);
router.post('/comment', auth(), (req, res) =>
  makeComment(req as IRequest, res)
);
router.delete('/delete-comment', auth(), deleteComment);

export default router;
