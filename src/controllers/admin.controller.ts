import { Request, Response } from 'express';
import Account from '../models/account.model';
import { userData } from '../interfaces/user.interface';

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users: userData[] = await Account.find().select('.password');
    res.status(200).send({ message: `success`, data: users });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({ message: error.message });
    } else {
      return res.status(500).send({ message: `Internal Server Error` });
    }
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await Account.findById(id).select('-password');
    res.status(200).send({ message: 'success', data: user });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({ message: error.message });
    } else {
      return res.status(500).send({ message: `Internal Server Error` });
    }
  }
};

export { getUser, getAllUsers };
