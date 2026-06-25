import { v4 as uuid } from "uuid";
import type { NextFunction, Request, Response } from "express";

export const requestIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const requestId = uuid();

  req.requestId = requestId;

  res.setHeader("X-Request-Id", requestId);

  next();
};
