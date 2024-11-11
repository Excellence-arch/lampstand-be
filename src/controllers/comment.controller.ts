import { Request, Response } from 'express';
import Comment from '../models/comment.model';
import { IRequest } from '../interfaces/response.interface';

const getCommentById = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const comments = await Comment.findById(_id).populate('likes post');
    res.status(200).send({ message: `success`, data: comments });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).send({ message: `Internal Server Error` });
    }
  }
};

const makeComment = async (req: IRequest, res: Response) => {
  try {
    const { body, post } = req.body;
    const user = req.user;
    const newComment = new Comment({ user, body, post });
    await newComment.save();
    res.status(201).send({ message: `success` });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).send({ message: `Internal Server Error` });
    }
  }
};

export { getCommentById, makeComment };
