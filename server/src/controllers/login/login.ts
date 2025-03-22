import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import config from "@/config";
import { HttpStatus } from "@/utils";

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
  console.log("Login attempt received");

  try {
    console.log("Verifying Google token...");
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.googleOauthClientID,
    });

    const payload = ticket.getPayload();
    const email = payload?.email?.toLowerCase().trim();
    console.log("Email from token (normalized):", email);

    if (email && (email.endsWith("@andrew.cmu.edu") || email.endsWith("@cmu.edu"))) {
      console.log("Valid CMU email, setting session");
      req.session.isAuthenticated = true;

      // Log session and cookies
      console.log("Session:", req.session);
      console.log("Session ID:", req.sessionID);

      // Explicitly save the session and wait for it to complete
      await new Promise<void>((resolve, reject) => {
        req.session.save((err) => {
          if (err) {
            reject(err);
          } else {
            console.log("Session saved!");
            resolve();
          }
        });
      });

      // Verify session was saved
      const verifySession = await new Promise((resolve) => {
      req.sessionStore.get(req.sessionID, (err, session) => {
          if (err) console.error("Error verifying session:", err);
          resolve(session);
      });
      });

      console.log("Session ID after save:", req.sessionID);
      console.log("Verified session in store:", verifySession);

      res.status(HttpStatus.OK).json({
        success: true,
        message: "Login successful",
      });
    } else {
      console.log("Invalid email domain");
      res.status(HttpStatus.Unauthorized).json({
        success: false,
        message: "Invalid email domain",
      });
    }
  } catch (error) {
    console.error("Login error:", error);
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
