import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import { Mongoose } from "mongoose";
dotenv.config(); // load env variables

const isProduction = (process.env.IS_PRODUCTION ?? "") === "true";

export default {
  port: parseInt(process.env.PORT ?? "", 10),
  databaseURL: process.env.MONGO_URI ?? "",
  frontendURL: process.env.FRONTEND_URL ?? "",
  googleOauthClientID: process.env.GOOGLE_OAUTH_CLIENT_ID ?? "",
  isProduction: isProduction,
  corsPolicy: {
    origin: process.env.FRONTEND_URL ?? "",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  },

  buildSessionConfig(mongoose: Mongoose) {
    return {
      secret: process.env.MONGODB_SESSION_SECRET ?? "",
      saveUninitialized: false,
      resave: false,
      store: MongoStore.create({
        client: mongoose.connection.getClient(),
        collectionName: "sessions",
        ttl: 60 * 60,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour
        sameSite: (isProduction ? "none" : "lax") as "none" | "lax",
        path: "/",
        secure: isProduction,
        httpOnly: true,
        domain: process.env.BACKEND_DOMAIN
      },
    };
  },
};
