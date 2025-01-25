import { Application, Request, Response, NextFunction } from "express";

export const setupMiddleware = (app: Application): void => {
  // Request logging middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
};