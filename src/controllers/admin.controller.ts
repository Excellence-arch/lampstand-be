import { Request, Response } from 'express';
import Account, { AccountDocument } from '../models/account.model';
import { userData } from '../interfaces/user.interface';

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users: userData[] = await Account.find().select('-password');
    res.status(200).send({ message: `success`, data: users });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).send({ message: `Internal Server Error` });
    }
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await Account.findById(id)
      .select('-password')
      .populate('posts comments likes');
    res.status(200).send({ message: 'success', data: user });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).send({ message: `Internal Server Error` });
    }
  }
};

const banUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user: AccountDocument = await Account.findById(id).select('-password')!;
    user.active = false;
    await user?.save();
    res.status(200).send({ message: 'success', data: user });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).send({ message: `Internal Server Error` });
    }
  }
};

export { getUser, getAllUsers, banUser };
