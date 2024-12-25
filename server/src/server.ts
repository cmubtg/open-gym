import express from "express";
import cors from "cors";
import mongoose, { Mongoose } from "mongoose";
import session from "express-session";
import OpenGymRoutes from "./routes/routes";
import config from "./config";
import { initJobs } from "./jobs";
import { login, checkLogin } from "./controllers/login";
import { loginAuth } from "./middleware/auth";

const app = express();

// middleware
app.use(express.json());

app.use(cors(config.corsPolicy));
// Configs and uses express sessions

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// connect to database
mongoose
  .connect(config.databaseURL)
  .then((response: Mongoose) => {
    console.log("Connected to database");
    initJobs();

    app.use(session(config.buildSessionConfig(response)));

    // routes
    app.use("/api/", loginAuth, OpenGymRoutes);

    // attempt to login
    app.post("/auth/login", login); // eslint-disable-line @typescript-eslint/no-misused-promises
    app.get("/auth/verify", checkLogin);

    // listen on port
    app.listen(config.port, () => {
      console.log("Listening on port", config.port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
