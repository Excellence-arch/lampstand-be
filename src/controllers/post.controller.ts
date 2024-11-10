import { Request, Response } from 'express';
import Post from '../models/post.model';
import { postResponse } from '../utils/responses';
import { ContentType, IPost } from '../interfaces/post.interface';
import { Schema } from 'mongoose';
import { AccountDocument } from '../models/account.model';
import { userData } from '../interfaces/user.interface';

const getPosts = async (req: Request, res: Response) => {
  try {
    const posts: {
      _id: Schema.Types.ObjectId;
      title: string;
      body: string;
      contentType: ContentType;
      user: any;
    }[] = await Post.find().populate('user');
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
    const post: {
      _id: Schema.Types.ObjectId;
      title: string;
      body: string;
      contentType: ContentType;
      user: any;
    } | null = await Post.findById(id).populate('user')!;
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

export { getPosts, getPostById, createPost };
