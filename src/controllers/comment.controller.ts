import { Request, Response } from 'express';
import Comment from '../models/comment.model';

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

export { getCommentById };
