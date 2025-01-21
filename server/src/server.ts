import express from "express";
import cors from "cors";
import mongoose, { Mongoose } from "mongoose";
import session from "express-session";
import OpenGymRoutes from "./routes/routes";
import config from "./config";
import { initJobs } from "./jobs";
import { login, checkLogin, logout } from "./controllers/auth";
import { loginAuth } from "./middleware/auth";
import { getHealthStatus } from "./controllers/health";
import * as controller from './controllers/controllers';

const app = express();
app.set('trust proxy', 1); // Trust first proxy

// middleware
app.use(cors(config.corsPolicy));
app.use(express.json());

// connect to database
mongoose
  .connect(config.databaseURL)
  .then((response: Mongoose) => {
    console.log("Connected to database");
    initJobs();

    app.use(session(config.buildSessionConfig(response)));

    app.use((req, res, next) => {
      console.log("request made to", req.path, req.method);
      next();
    });

    // Health Route
    app.get('/health', async (req, res) => {
      const [healthCheck, statusCode] = await getHealthStatus();
      res.status(statusCode).json(healthCheck);
    });

    // Auth Routes
    app.post("/auth/login", login); // eslint-disable-line @typescript-eslint/no-misused-promises
    app.post("/auth/logout", logout); // eslint-disable-line @typescript-eslint/no-misused-promises
    app.get("/auth/verify", checkLogin);

    // Moved outside of auth middleware for demo
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    app.post('/:gym', controller.createRecord);

    // Protected Data Routes
    app.use("/api/", loginAuth, OpenGymRoutes);

    // listen on port
    app.listen(config.port, () => {
      console.log("Listening on port", config.port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
