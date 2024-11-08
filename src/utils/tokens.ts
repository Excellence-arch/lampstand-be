import jwt, { JwtPayload } from 'jsonwebtoken';
import env from '../config/env';

const secretKey: string = env.JWT_SECRET_KEY!;

function generateToken(userId: string, role: string) {
  const token = jwt.sign({ userId, role }, secretKey, { expiresIn: '1h' });
  return token;
}

const decodeToken = (token: any) => {
  return jwt.verify(token, secretKey) as JwtPayload;
};

export { generateToken, decodeToken };
