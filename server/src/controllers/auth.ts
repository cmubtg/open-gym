import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import config from "../config";
import { HttpStatus } from "../utils/constants";

const client = new OAuth2Client(config.googleOauthClientID);

interface LoginBody {
  token: string;
}
export const login = async (
  req: Request<unknown, unknown, LoginBody>,
  res: Response
) => {
  const { token } = req.body;
  req.session.isAuthenticated = false;

  console.log("Login attempt received");

  try {
    console.log("Verifying Google token...");
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.googleOauthClientID,
    });

    const payload = ticket.getPayload();
    const email = payload?.email;
    console.log("Email from token:", email);

    if (email && email.endsWith("@andrew.cmu.edu")) {
      console.log("Valid CMU email, setting session");
      req.session.isAuthenticated = true;

      // Log session and cookies
      console.log("Session:", req.session);
      console.log("Session ID:", req.sessionID);

      // Explicitly save the session and wait for it to complete
      await new Promise<void>((resolve, reject) => {
        req.session.save((err) => {
          if (err) {
            console.error("Session save error:", err);
            reject(err);
          } else {
            resolve();
          }
        });
      });

      console.log("Session saved:", req.session);
      console.log("Cookies being set:", res.getHeader("set-cookie"));

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
