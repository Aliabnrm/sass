import * as authService from "./auth.service.js";
import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";

export const register = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.register(req.body);

  return res.status(201).json(result);
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);

  return res.status(200).json(result);
});

export const refresh = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.refresh(req.body.refreshToken);

  return res.status(200).json(result);
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  await authService.logout(req.body.refreshToken);

  return res.status(200).json({
    message: "Logged out",
  });
});

export const getMe = catchAsync(async (req: Request, res: Response) => {
  return res.status(200).json({
    userId: req.user?.userId,
  });
});