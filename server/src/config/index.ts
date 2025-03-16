import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import { Mongoose } from "mongoose";

dotenv.config(); // load env variables

const isProduction = (process.env.IS_PRODUCTION ?? "") === "true";

export default {
  port: parseInt(process.env.PORT ?? "", 10),
  databaseURL:
    (isProduction ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV) ??
    "",
  frontendURL:
    (isProduction
      ? process.env.FRONTEND_URL_PROD
      : process.env.FRONTEND_URL_DEV) ?? "",
  googleOauthClientID: process.env.GOOGLE_OAUTH_CLIENT_ID ?? "",
  hmacSecret: process.env.HMAC_SECRET,
  requestExpiryMs: 5 * 60 * 1000, // 5 minutes
  encryptionKey: process.env.ENCRYPTION_KEY,
  ivLength: 16,
  isProduction: isProduction,
  corsPolicy: {
    origin:
      (isProduction
        ? process.env.FRONTEND_URL_PROD
        : process.env.FRONTEND_URL_DEV) ?? "",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  },
  adminEmailList: (process.env.ADMIN_EMAIL_LIST ?? "").split("|"),
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
        domain:
          (isProduction
            ? process.env.BACKEND_DOMAIN_PROD
            : process.env.BACKEND_DOMAIN_DEV) ?? "",
      },
    };
  },
};
