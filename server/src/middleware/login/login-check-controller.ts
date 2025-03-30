import { Request, Response, NextFunction } from "express";
import config from "@/config";
import { HttpStatus, logger } from "@/utils"; // Import logger from utils

declare module "express-session" {
  export interface SessionData {
    isAuthenticated: boolean;
  }
}

export const loginAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.debug("=== LOGIN Auth Middleware Debug ===", {
    sessionId: req.sessionID,
    isAuthenticated: req.session.isAuthenticated,
    path: req.path,
    method: req.method,
  });

  if (req.sessionID) {
    const session = await new Promise((resolve) => {
      req.sessionStore.get(req.sessionID, (err, session) => {
        if (err) {
          logger.error("Error fetching session", {
            error: err.message,
            sessionId: req.sessionID,
          });
        }
        resolve(session);
      });
    });
    // Use debug level for verbose session info
    logger.debug("Session from store:", { session });
  }

  if (!config.isProduction) {
    logger.info("Development mode - bypassing auth", {
      path: req.path,
      method: req.method,
    });
    next();
    return;
  }

  if (req.session.isAuthenticated) {
    logger.info("User is authenticated, proceeding", {
      sessionId: req.sessionID,
      path: req.path,
    });
    next();
    return;
  }

  logger.warn("Authentication failed - user is not authenticated", {
    sessionId: req.sessionID,
    path: req.path,
    ip: req.ip,
  });

  res.status(HttpStatus.Unauthorized).json({ error: "Unauthorized access" });
};
