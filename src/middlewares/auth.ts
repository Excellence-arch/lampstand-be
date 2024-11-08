import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { decodeToken } from '../utils/tokens';

interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
}

// Middleware to authenticate the token and optionally check role
function auth(requiredRole?: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // Check if authorization header is present and uses Bearer token
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];

      try {
        const decodedToken = decodeToken(token);

        // Attach user information to the request object
        req.user = decodedToken;

        // If requiredRole is specified, check the user's role
        if (requiredRole && requiredRole.length > 0) {
          if (!requiredRole.includes(decodedToken.role)) {
            return res
              .status(403)
              .json({ message: 'Forbidden: Insufficient role' });
          }
        }
      } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }
    } else if (requiredRole && requiredRole.length > 0) {
      // For routes that require authentication, enforce it
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Proceed to the next middleware/route handler
    next();
  };
}

export default auth;
