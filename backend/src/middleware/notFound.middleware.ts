import type { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors/NotFoundError.js";

export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(new NotFoundError("مسیر مورد نظر"));
};
