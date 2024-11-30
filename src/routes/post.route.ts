import express, { Response } from 'express';
import auth, { CustomRequest } from '../middlewares/auth';
import {
  createPost,
  getPostById,
  getPostByTitle,
  getPosts,
  getUserPosts,
} from '../controllers/post.controller';
import { AccountRole } from '../models/account.model';
import {
  deleteComment,
  likePost,
  makeComment,
  unlikePost,
} from '../controllers/comment.controller';
import { IRequest } from '../interfaces/response.interface';

const postRouter = express.Router();

postRouter.get('/', getPosts);
postRouter.get('/user', auth(), (req, res) =>
  getUserPosts(req as IRequest, res)
);
// postRouter.get('/:id', auth(), getPostById);
postRouter.get('/:slug', getPostByTitle);
postRouter.post('/create-post', auth([AccountRole.USER]), (req, res) =>
  createPost(req as IRequest, res)
);
postRouter.post('/like-post', auth(), (req, res) =>
  likePost(req as IRequest, res)
);
postRouter.post('/unlike-post', auth(), (req, res) =>
  unlikePost(req as IRequest, res)
);
postRouter.post('/comment', auth(), (req, res) =>
  makeComment(req as IRequest, res)
);
postRouter.delete('/delete-comment', auth(), deleteComment);

export { postRouter };
