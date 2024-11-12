import jwt, { JwtPayload } from 'jsonwebtoken';
import env from '../config/env';
import { Schema } from 'mongoose';
import { AccountRole } from '../models/account.model';
import { IUser } from '../middlewares/auth';

const secretKey: string = env.JWT_SECRET_KEY!;

function generateToken(userId: Schema.Types.ObjectId, role: AccountRole) {
  const token: string = jwt.sign({ userId, role }, secretKey, {
    expiresIn: '1h',
  });
  return token;
}

const decodeToken = async (token: any) => {
  return await jwt.verify(token, secretKey) as IUser;
};

export { generateToken, decodeToken };
