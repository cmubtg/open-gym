import { Application, Request, Response, NextFunction } from "express";
import { loginAuth } from "./loginAuth";

/**
 * @param app server state
 */
const mountMiddleware = (app: Application): void => {
  // Request logging middleware.
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });

  // Authentication middleware.
  app.use("/api", loginAuth);
};

export * from "./error";
export default mountMiddleware;
