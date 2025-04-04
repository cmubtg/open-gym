import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import config from "@/config";
import { HttpStatus, logger } from "@/utils";

const client = new OAuth2Client(config.googleOauthClientID);

interface LoginBody {
  token: string;
}

// Backend verifies Google token from frontend and sets session.
export const login = async (
  req: Request<unknown, unknown, LoginBody>,
  res: Response
) => {
  const { token } = req.body;
  logger.info("Login attempt received");

  try {
    logger.debug("Verifying Google token...");
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.googleOauthClientID,
    });

    const payload = ticket.getPayload();
    const email = payload?.email?.toLowerCase().trim();
    logger.debug("Email from token (normalized):", email);

    if (
      email &&
      (email.endsWith("@andrew.cmu.edu") || email.endsWith("@cmu.edu"))
    ) {
      req.session.isAuthenticated = true;

      // Log session and cookies
      logger.debug("Session:", req.session);
      logger.debug("Session ID:", req.sessionID);

      // Explicitly save the session and wait for it to complete
      await new Promise<void>((resolve, reject) => {
        req.session.save((err) => {
          if (err) {
            reject(err);
          } else {
            logger.debug("Session saved!");
            resolve();
          }
        });
      });

      // Verify session was saved
      const verifySession = await new Promise((resolve) => {
        req.sessionStore.get(req.sessionID, (err, session) => {
          if (err) logger.error("Error verifying session:", err);
          resolve(session);
        });
      });

      logger.debug("Session ID after save:", req.sessionID);
      logger.debug("Verified session in store:", verifySession);

      res.status(HttpStatus.OK).json({
        success: true,
        message: "Login successful",
      });
    } else {
      logger.debug("Invalid email domain");
      res.status(HttpStatus.Unauthorized).json({
        success: false,
        message: "Invalid email domain",
      });
    }
  } catch (error) {
    logger.error("Login error:", error);
    res.status(HttpStatus.BadRequest).json({
      success: false,
      message: "Invalid token",
    });
  }
};

// Deprecated - Moved to loginAuth in @/middleware/login/login-check-controller
export const checkLogin = (req: Request, res: Response) => {
  if (req.session.isAuthenticated) {
    res.status(HttpStatus.OK).json({ isAuthenticated: true });
  } else {
    res.status(HttpStatus.OK).json({ isAuthenticated: false });
  }
};

export const logout = (req: Request, res: Response) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        res
          .status(HttpStatus.InternalServerError)
          .json({ success: false, message: "Logout failed" });
      } else {
        res
          .status(HttpStatus.OK)
          .json({ success: true, message: "Logged out successfully" });
      }
    });
  } else {
    res
      .status(HttpStatus.OK)
      .json({ success: true, message: "Already logged out" });
  }
};
