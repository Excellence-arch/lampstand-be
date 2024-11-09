import { Request, Response } from 'express';
import Post from '../models/post.model';

const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.status(200).send({ message: 'success', data: posts });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).send({ message: `Internal Server Error` });
    }
  }
};

const createPost = async (req: Request, res: Response) => {
  try {
    const { title, body, contentType } = req.body;
    const newPost = new Post({
      title,
      body,
      contentType,
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

export { getPosts, createPost };
