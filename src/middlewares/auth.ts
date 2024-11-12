import { Request, Response, NextFunction } from 'express';
import { decodeToken } from '../utils/tokens';
import { AccountRole } from '../models/account.model';
import { Schema } from 'mongoose';

export interface CustomRequest extends Request {
  user?: {
    userId: Schema.Types.ObjectId;
    role: AccountRole;
  };
}

export interface IUser {
  userId: Schema.Types.ObjectId;
  role: AccountRole;
}

// Middleware to authenticate user via JWT and optionally check roles
const auth = (allowedRoles?: AccountRole[]) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    // Get the token from the authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res
        .status(401)
        .json({ message: 'No token provided, authorization denied' });
      return;
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];

    try {
      // Verify the token
      const decoded: IUser = await decodeToken(token);
      // Attach user information to the request object
      (req as CustomRequest).user = decoded;

      // If roles are specified, check if the user's role is allowed
      if (allowedRoles && !allowedRoles.includes(decoded.role)) {
        res
          .status(403)
          .json({ message: 'Access denied: insufficient permissions' });
        return;
      }

      // Proceed to the next middleware/route handler
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
};

export default auth;
