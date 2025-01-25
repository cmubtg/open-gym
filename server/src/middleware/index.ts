import { Application, Request, Response, NextFunction } from "express";

/**
 * @param app server state
 */
const mountMiddleware = (app: Application): void => {
  // Request logging middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
};

export * from "./error";
export default mountMiddleware;