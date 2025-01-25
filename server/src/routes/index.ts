// routes/index.ts
import { Application } from "express";
import * as controller from "@/controllers";
import { loginAuth } from "@/middleware/auth";
import OpenGymRoutes from "./routes";

export const setupRoutes = (app: Application): void => {
  
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
  app.post("/:gym", controller.createLogRecord);

  // Protected routes
  app.use("/api", loginAuth, OpenGymRoutes);
}