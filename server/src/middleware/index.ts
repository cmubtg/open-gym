import { Application } from "express";
import morgan from "morgan";
import { loginAuth } from "@/middleware/login/login-check-controller";
import { logger } from "@/utils";

/**
 * @param app server state
 *
 * Warning: Ensure middleware is mounted before routes.
 */
const mountMiddleware = (app: Application): void => {
  // Request logging middleware
  class MyStream {
    write(text: string) {
      logger.info(text.replace(/\n$/, "")); // Disable Morgan adding \n to end of stream
    }
  }
  const myStream = new MyStream();

  // Define a format string using the built-in :status token
  const morganFormat = `\x1b[36m[:date[clf]]\x1b[0m \x1b[36m:method\x1b[0m \x1b[36m:url\x1b[0m \x1b[0m:status \x1b[35m:response-time ms\x1b[0m | \x1b[30m:user-agent\x1b[0m`;

  // Use morgan for logging HTTP requests
  app.use(morgan(morganFormat, { stream: myStream }));

  // Authentication middleware.
  app.use("/api", loginAuth);
};

export * from "./error";
export default mountMiddleware;
