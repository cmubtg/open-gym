import { Request, Response, NextFunction } from "express";
import config from "../config";
import { HttpStatus } from "../utils/constants";

declare module "express-session" {
  export interface SessionData {
    isAuthenticated: boolean;
  }
}

export const loginAuth = (req: Request, res: Response, next: NextFunction) => {
  console.log("=== Auth Middleware Debug ===");
  console.log("Session ID:", req.sessionID);
  console.log("Session:", req.session);
  console.log("Is authenticated:", req.session.isAuthenticated);
  console.log("Cookies:", req.cookies);
  console.log("Headers:", req.headers);
  console.log("=========================");

  // if (!config.isProduction) {
  //   // Allow unrestricted access in development mode only
  //   console.log("Development mode - bypassing auth");
  //   next();
  //   return;
  // }

  // Check for an active session indicating the user is logged in
  if (req.session.isAuthenticated) {
    console.log("User is authenticated, proceeding");
    next();
    return;
  }
  console.log("User is not authenticated");
  // If no session exists, deny access
  res.status(HttpStatus.Unauthorized).json({ error: "Unauthorized access" });
};
