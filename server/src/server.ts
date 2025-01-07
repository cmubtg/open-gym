import express from "express";
import cors from "cors";
import mongoose, { Mongoose } from "mongoose";
import session from "express-session";

import config from "./config";
import { initJobs } from "./jobs";
import { getHealthStatus } from "./controllers/health";

import OpenGymRoutes from "./routes/routes";
import { login, checkLogin, logout } from "./controllers/auth";
import { loginAuth, hmacAuth } from "./middleware";
import { createRecord } from "./controllers/controllers";

const app = express();
app.set("trust proxy", 1); // Trust first proxy

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
    app.get("/health", async (req, res) => {
      const [healthCheck, statusCode] = await getHealthStatus();
      res.status(statusCode).json(healthCheck);
    });

    // Auth Routes
    app.post("/auth/login", login); // eslint-disable-line @typescript-eslint/no-misused-promises
    app.post("/auth/logout", logout); // eslint-disable-line @typescript-eslint/no-misused-promises
    app.get("/auth/verify", checkLogin);

    // Sensor Data Route
    // hmac Auth to verify the request is coming from the sensor and
    // decrypt the data
    app.post("/:gym", hmacAuth, createRecord);

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
