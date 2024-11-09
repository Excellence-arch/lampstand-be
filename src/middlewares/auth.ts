// import { Request, Response, NextFunction, RequestHandler } from 'express';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import { decodeToken } from '../utils/tokens';
// import { AccountRole } from '../models/account.model';

// interface AuthenticatedRequest extends Request {
//   user?: {
//     userId: string;
//     role: AccountRole;
//   };
// }

// // Middleware to authenticate the token and optionally check role
// const auth = (requiredRole?: string[]) => {
//   return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       res
//         .status(401)
//         .send({ message: 'No token provided, authorization denied' });
//       return;
//     }

//     // Check if authorization header is present and uses Bearer token
//     // if (authHeader && authHeader.startsWith('Bearer ')) {
//     const token = authHeader.split(' ')[1];

//     try {
//       const decodedToken: { userId: string; role: AccountRole } =
//         decodeToken(token);

//       // Attach user information to the request object
//       req.user = decodedToken;

//       // If requiredRole is specified, check the user's role
//       if (requiredRole && requiredRole.length > 0) {
//         if (!requiredRole.includes(decodedToken.role)) {
//           return res
//             .status(403)
//             .json({ message: 'Forbidden: Insufficient role' });
//         }
//       }
//       next();
//     } catch (error) {
//       return res.status(401).json({ message: 'Invalid or expired token' });
//     }
//     // }

//     // Proceed to the next middleware/route handler
//     next();
//   };
// };

// export default auth;

import { Request, Response, NextFunction } from 'express';
import { decodeToken } from '../utils/tokens';
import { AccountRole } from '../models/account.model';

// Secret key used for signing the JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export interface CustomRequest extends Request {
  user?: {
    userId: string;
    role: AccountRole;
  };
}

// Middleware to authenticate user via JWT and optionally check roles
const auth = (allowedRoles?: AccountRole[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
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
      const decoded: { userId: string; role: AccountRole } = decodeToken(token);
      // Attach user information to the request object
      req.user = decoded;

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
