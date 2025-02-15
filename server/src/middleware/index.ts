import { Application } from "express";
import morgan from "morgan";
import { loginAuth } from "@/middleware/auth";
import { logger } from "@/utils";

/**
 * @param app server state
 */
const mountMiddleware = (app: Application): void => {
  // Request logging middleware
  class MyStream {
    write(text: string) {
        logger.info(text.replace(/\n$/, '')); // Disable Morgan adding \n to end of stream
    }
  }
  let myStream = new MyStream()

  morgan.token('statusColor', (req, res): string => {
    // Evaluate whether the response has been sent
    const status: number | undefined = res.headersSent ? res.statusCode : undefined;
  
    // Determine the ANSI color code based on the HTTP status
    const color: number = status !== undefined
      ? (status >= 500 ? 31 // red
        : status >= 400 ? 33 // yellow
        : status >= 300 ? 36 // cyan
        : status >= 200 ? 32 // green
        : 0)
      : 0; // default to no color if status is undefined
  
    return `\x1b[${color}m${status}\x1b[0m`;
  });

  const morganFormat = `\x1b[36m[:date[clf]]\x1b[0m \x1b[36m:method\x1b[0m \x1b[36m:url\x1b[0m :statusColor \x1b[35m:response-time ms\x1b[0m | \x1b[30m:user-agent\x1b[0m`
      
  app.use(
      morgan(morganFormat, {stream: myStream})
    );


  // Authentication middleware.
  app.use("/api", loginAuth);
};

export * from "./error";
export default mountMiddleware;
