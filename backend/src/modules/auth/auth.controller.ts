import type { Request, Response } from "express";
import * as authService from "./auth.service.js";
import { AppError } from "../../error/AppError.js";
import { catchAsync } from "../../utils/catchAsync.js";

const REFRESH_COOKIE_OPTIONS = {
  path: "/",
  httpOnly: true,
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  secure: process.env.NODE_ENV === "production",
};

export const register = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.register(req.body);

  res.cookie("refreshToken", result.refreshToken, REFRESH_COOKIE_OPTIONS);

  return res.status(201).json({
    user: result.user,
    accessToken: result.accessToken,
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);

  res.cookie("refreshToken", result.refreshToken, REFRESH_COOKIE_OPTIONS);

  return res.status(200).json({
    accessToken: result.accessToken,
  });
});

export const refresh = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new AppError("Refresh token not found", 401);
  }

  const result = await authService.refresh(refreshToken);

  /**
   * چون Token Rotation داریم،
   * Cookie باید با Token جدید جایگزین شود.
   */
  res.cookie("refreshToken", result.refreshToken, REFRESH_COOKIE_OPTIONS);

  return res.status(200).json({
    accessToken: result.accessToken,
  });
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    await authService.logout(refreshToken);
  }

  res.clearCookie("refreshToken", {
    path: "/",
  });

  return res.status(200).json({
    message: "Logged out successfully",
  });
});

export const getMe = catchAsync(async (req: Request, res: Response) => {
  return res.status(200).json({
    user: {
      id: req.user?.userId,
    },
  });
});
