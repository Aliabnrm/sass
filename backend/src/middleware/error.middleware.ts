import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";
import { logger } from "../logger/logger.js";

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error: AppError;

  if (err instanceof AppError) {
    error = err;
  } else if (err instanceof Error) {
    error = new AppError(err.message, 500, "INTERNAL_SERVER_ERROR");
  } else {
    error = new AppError("خطای داخلی سرور", 500, "INTERNAL_SERVER_ERROR");
  }

  logger.error({
    requestId: req.requestId,
    message: error.message,
    stack: err instanceof Error ? err.stack : undefined,
  });

  return res.status(error.statusCode).json({
    success: false,
    code: error.code,
    message: error.message,
    requestId: req.requestId,
  });
};
