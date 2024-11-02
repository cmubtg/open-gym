import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import mongoose, { Mongoose } from 'mongoose';
dotenv.config(); // load env variables

export default {
  port: parseInt(process.env.PORT ?? '', 10),
  databaseURL: process.env.MONGO_URI ?? '',
  frontendURL: process.env.FRONTEND_URL ?? '',
  googleOauthClientID: process.env.GOOGLE_OAUTH_CLIENT_ID ?? '',
  corsPolicy: {
    origin: process.env.FRONTEND_URL ?? '',
    credentials: true
  },
  buildSessionConfig(mongoose: Mongoose) {
    return {
      secret: process.env.MONGODB_SESSION_SECRET ?? '',
      saveUninitialized: false, // don't create session until something stored
      resave: false, //don't save session if unmodified
      store: MongoStore.create({
        client: mongoose.connection.getClient(),
        touchAfter: 24 * 3600, // time period in seconds
        collectionName: 'sessions',
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day expiration, adjust as needed
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        httpOnly: true, // Helps prevent XSS attacks
      },
    };
  },
};

// TODO - Move to separate file
declare module 'express-session' {
  export interface SessionData {
    isAdmin: boolean;
    views: number;
  }
}
