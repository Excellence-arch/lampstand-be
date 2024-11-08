import jwt, { JwtPayload } from 'jsonwebtoken';
import env from '../config/env';
import { Schema } from 'mongoose';

const secretKey: string = env.JWT_SECRET_KEY!;

function generateToken(userId: Schema.Types.ObjectId, role: string) {
  const token: string = jwt.sign({ userId, role }, secretKey, {
    expiresIn: '1h',
  });
  return token;
}

const decodeToken = (token: any) => {
  return jwt.verify(token, secretKey) as JwtPayload;
};

export { generateToken, decodeToken };
