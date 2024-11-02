import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import config from '../config';

const client = new OAuth2Client(config.googleOauthClientID);

export const login = async (req: Request, res: Response) => {
  const { token } = req.body;

  try {
    // Verify the token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.googleOauthClientID,
    });

    // Get the user’s email

    // @ts-ignore: Testing
    const payload = ticket.getPayload();
    // @ts-ignore: Testing
    const email = payload.email;

    // Check if the email domain matches the university domain

    // @ts-ignore: Testing
    if (email.endsWith('@andrew.cmu.edu')) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid email domain' });
    }
  } catch (error) {
    console.error('Error verifying Google ID token:', error);
    res.status(400).json({ success: false, message: 'Invalid token' });
  }
};
