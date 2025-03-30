// routes/index.ts
import { Application } from "express";
import * as controller from "@/controllers";
import OpenGymRoutes from "./routes";

const mountRoutes = (app: Application): void => {
  // Health check route.
  app.get("/health", async (req, res) => {
    const [healthCheck, statusCode] = await controller.getHealthStatus();
    res.status(statusCode).json(healthCheck);
  });

  // Auth routes.
  app.post("/auth/login", controller.login);
  app.post("/auth/logout", controller.logout);
  app.get("/auth/verify", controller.checkLogin);

  // Exposed for Demo Purposes.
  app.post("/log-record/:gym/new", controller.createLogRecord); // Scanner hits this route
  // app.post("/occupancy-record/:gym/new", controller.createOccupancyRecord);

  // Protected routes
  app.use("/api", OpenGymRoutes);
};

export default mountRoutes;
