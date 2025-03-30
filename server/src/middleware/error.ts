// middleware/error.ts
import { Request, Response, NextFunction } from "express";
import { logger } from "@/utils";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = "AppError";
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message
    });
    return;
  }

  logger.error("Unhandled error:", err);
  res.status(500).json({
    status: "error",
    message: "Internal server error"
  });
};