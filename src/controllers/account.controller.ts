import { Request, Response } from 'express';
import Account from '../models/account.model';

async function login(req: Request, res: Response) {
  const password = req.body.password;
  const username = req.body.username!;
  const email = req.body.email!;
  const account = await Account.findOne({ username });
  if (!account) {
    throw new Error('Account not found');
  }

  const isMatch = await account.comparePassword(password);
  if (isMatch) {
    console.log('Login successful');
  } else {
    console.log('Invalid password');
  }
}
