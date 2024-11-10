import { Request, Response } from 'express';
import Post from '../models/post.model';
import { postResponse } from '../utils/responses';
import {
  ContentType,
  IComment,
  ILike,
  IPost,
  IPostDoc,
} from '../interfaces/post.interface';
import { IRequest } from '../interfaces/response.interface';

const getPosts = async (req: Request, res: Response) => {
  try {
    const posts: IPostDoc[] = await Post.find()
      .populate('user likes')
      .select('-user.password');
    const resp: IPost[] = [];
    for (const post of posts) {
      resp.push(postResponse({ ...post }));
    }

    res.status(200).send({ message: 'success', data: resp });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).send({ message: `Internal Server Error` });
    }
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post: IPostDoc | null = await Post.findById(id)
      .populate('user likes')
      .select('-user.password')!;
    if (post) {
      const resp: IPost = postResponse({ ...post });
      res.status(200).send({ message: 'success', data: resp });
    } else {
      res.status(401).send({ message: `Post not found` });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).send({ message: `Internal Server Error` });
    }
  }
};

const createPost = async (req: IRequest, res: Response) => {
  try {
    const { title, body, contentType } = req.body;
    const newPost = new Post({
      title,
      body,
      contentType,
      user: req.user.userId,
    });
    newPost.save();
    res.status(201).send({ message: 'success' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).send({ message: `Internal Server Error` });
    }
  }
};

export { getPosts, getPostById, createPost };
