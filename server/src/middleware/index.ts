import { Application, Request, Response, NextFunction } from "express";
import { loginAuth } from "./login/login-check-controller";
import { hmacAuth } from "./hmac/hmac-controller";

/**
 * @param app server state
 * 
 * Warning: Ensure middleware is mounted before routes.
 */
const mountMiddleware = (app: Application): void => {
  // Request logging middleware.
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });

  // Middleware check authenticity of caller and integrity of message
  app.use("/log-record/:gym/new", hmacAuth);

  // Authentication middleware.
  app.use("/api", loginAuth);
};

export * from "./error";
export default mountMiddleware;
