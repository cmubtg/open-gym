import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import { Mongoose } from 'mongoose';
dotenv.config(); // load env variables

const isProduction = (process.env.IS_PRODUCTION ?? '') === 'true';

export default {
  port: parseInt(process.env.PORT ?? '', 10),
  databaseURL: process.env.MONGO_URI ?? '',
  frontendURL: process.env.FRONTEND_URL ?? '',
  googleOauthClientID: process.env.GOOGLE_OAUTH_CLIENT_ID ?? '',
  isProduction: isProduction,
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
        collectionName: 'sessions',
      }),
      cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour expiration
        secure: isProduction, // Use secure cookies in production
        httpOnly: true, // Helps prevent XSS attacks
      },
    };
  },
};
