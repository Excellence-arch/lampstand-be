import { Request, Response } from 'express';
import Account, { AccountDocument, AccountRole } from '../models/account.model';
import { generateToken } from '../utils/tokens';
import { userData } from '../interfaces/user.interface';
import { CustomRequest } from '../middlewares/auth';

const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const role: AccountRole = req.body.role;
    const newUser: AccountDocument = new Account({
      email,
      password,
      username: name,
      name,
      role: AccountRole[role],
    });
    await newUser.save();
    res.status(201).send({ message: `success` });
  } catch (error: unknown) {
    res
      .status(500)
      .send({
        message:
          error instanceof Error ? error.message : `Internal Server Error`,
      });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const password = req.body.password;
    const username = req.body.username!;
    const email = req.body.email!;
    let account: AccountDocument | null;
    if (username) {
      account = await Account.findOne({ username });
      if (!account) {
        res.status(400).send({ message: `Username does not exist` });
      }
    } else if (email) {
      account = await Account.findOne({ email });
      if (!account) {
        res.status(400).send({ message: `Email does not exist` });
      }
    }
    if (account!!) {
      const isMatch = await account?.comparePassword(password);
      if (isMatch) {
        const token = generateToken(account?._id, account?.role);
        res.status(200).send({ message: `success`, token });
      } else {
        res.status(400).send({ message: `Incorrect password` });
      }
    }
  } catch (error) {
    res
      .status(500)
      .send({
        message:
          error instanceof Error ? error.message : `Internal Server Error`,
      });
  }
};

const getProfile = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.user?.userId;
    const user: userData | null = await Account.findById(id).select(
      '-password'
    );
    res.status(200).send({ message: `success`, user });
  } catch (error) {
    res
      .status(500)
      .send({
        message:
          error instanceof Error ? error.message : `Internal Server Error`,
      });
  }
};

export { login, register, getProfile };
