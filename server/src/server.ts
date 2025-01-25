import express, { Application } from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import OpenGymRoutes from "@/routes/routes";
import config from "@/config"
import startCronJobs from "@/jobs";
import { loginAuth } from "@/middleware/auth";
import { setupRoutes } from "@/routes";
import { setupMiddleware } from "@/middleware";
import { errorHandler } from "@/middleware/error";

export class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.app.set("trust proxy", 1);
  }

  private async connectToDatabase(): Promise<mongoose.Mongoose> {
    try {
      const connection = await mongoose.connect(config.databaseURL);
      console.log('Connected to database:', connection.connection.name);
      return connection;
    } catch (error) {
      console.error("Database connection failed:", error);
      throw error;
    }
  }

  private setupSession(mongooseConnection: mongoose.Mongoose): void {
    this.app.use(session(config.buildSessionConfig(mongooseConnection)));
  }

  private setupMiddleware(): void {
    this.app.use(cors(config.corsPolicy));
    this.app.use(express.json());
    setupMiddleware(this.app);
  }

  private setupErrorHandling(): void {
    this.app.use(errorHandler);
  }

  public async start(): Promise<void> {
    try {
      // Connect to database
      const connection = await this.connectToDatabase();

      // Initialize middleware
      this.setupMiddleware();
      this.setupSession(connection);

      // Start background jobs
      await startCronJobs();

      // Setup routes
      setupRoutes(this.app);

      // Setup error handling
      this.setupErrorHandling();

      // Start server
      this.app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
      });
    } catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
    }
  }
}