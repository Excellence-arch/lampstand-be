import { Request, Response } from 'express';
import Post from '../models/post.model';
import { postResponse } from '../utils/responses';
import {
  ContentType,
  IComment,
  ILike,
  IPost,
  IPostDoc,
  IPostFull,
} from '../interfaces/post.interface';
import { IRequest } from '../interfaces/response.interface';

const getPosts = async (req: Request, res: Response) => {
  try {
    const posts: IPostDoc[] = await Post.find()
      .populate('user likes')
      .select('-user.password -role');
    // const resp: IPost[] = [];
    // for (const post of posts) {
    //   resp.push(
    //     postResponse({
    //       _id: post._id,
    //       title: post.title,
    //       body: post.body,
    //       contentType: post.contentType,
    //       user: post.user,
    //       likes: post.likes,
    //       comments: post.comments,
    //     })
    //   );
    // }

    res.status(200).send({ message: 'success', posts });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).send({ message: `Internal Server Error` });
    }
  }
};

const getUserPosts = async (req: IRequest, res: Response) => {
  try {
    const userId = req.user.userId;
    const posts: IPostFull[] = await Post.find({ user: userId })
      .populate('likes comments')
      .select('-user.password');
    res.status(200).send({ message: 'success', data: posts });
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
      // const resp: IPost = postResponse({ ...post });
      res.status(200).send({ message: 'success', data: post });
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
    await newPost.save();
    res.status(201).send({ message: 'success' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).send({ message: `Internal Server Error` });
    }
  }
};

export { getPosts, getPostById, createPost, getUserPosts };
