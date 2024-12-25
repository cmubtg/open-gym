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

  try {
    // Verify the token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.googleOauthClientID,
    });

    const email = ticket.getPayload()?.email;
    // TODO - Add list of accept andrew emails
    if (email && email.endsWith("@andrew.cmu.edu")) {
      req.session.isAuthenticated = true;
      res
        .status(HttpStatus.OK)
        .json({ success: true, message: "Login successful" });
    } else {
      res
        .status(HttpStatus.Unauthorized)
        .json({ success: false, message: "Invalid email domain" });
    }
  } catch (error) {
    res
      .status(HttpStatus.BadRequest)
      .json({ success: false, message: "Invalid token" });
  }
};

export const checkLogin = (req: Request, res: Response) => {
  if (req.session.isAuthenticated) {
    res.status(HttpStatus.OK).json({ isAuthenticated: true });
  } else {
    res.status(HttpStatus.OK).json({ isAuthenticated: false });
  }
};
