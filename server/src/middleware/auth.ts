import { Request, Response, NextFunction } from 'express';
import config from "../config";
import { HttpStatus } from '../utils/constants';

declare module 'express-session' {
  export interface SessionData {
    isAuthenticated: boolean;
  }
}

export const loginAuth = (req: Request, res: Response, next: NextFunction) => {
  if (config.isProduction) {
    // Allow unrestricted access in development mode
    next();
    return;
  }

  // Check for an active session indicating the user is logged in
  if (req.session.isAuthenticated) {
    next();
    return;
  }

  // If no session exists, deny access
  res.status(HttpStatus.Unauthorized).json({ error: 'Unauthorized access' });
};