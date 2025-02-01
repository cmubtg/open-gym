import express, { Application } from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import config from "@/config";
import startCronJobs from "@/jobs";
import mountRoutes from "@/routes";
import mountMiddleware, { errorHandler } from "@/middleware";

export class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.app.set("trust proxy", 1);
    this.app.use(cors(config.corsPolicy));
    this.app.use(express.json());
  }

  private async connectToDatabase(): Promise<mongoose.Mongoose> {
    try {
      const connection = await mongoose.connect(config.databaseURL);
      console.log("Connected to database:", connection.connection.name);
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
    mountMiddleware(this.app);
  }

  private setupRoutes(): void {
    mountRoutes(this.app);
  }

  private setupErrorHandling(): void {
    this.app.use(errorHandler);
  }

  public async start(): Promise<void> {
    try {
      // Connect to database
      const connection = await this.connectToDatabase();

      this.setupSession(connection);

      // Start background jobs
      startCronJobs();

      // Initialize middleware, including logger
      this.setupMiddleware();

      // Setup routes
      this.setupRoutes();

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
