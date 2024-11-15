import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization as string;

  // if (!authHeader) {
  //   return res.status(401).json({ message: 'Authorization header missing' });
  // }

  const token: string = authHeader.split(' ')[1]; 

  // if (!token) {
  //   return res.status(401).json({ message: 'Token missing in Authorization header' });
  // }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err);
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    req.user = decoded as JwtPayload;

    return next();
  });
};
