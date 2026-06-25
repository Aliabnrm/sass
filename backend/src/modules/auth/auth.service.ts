import bcrypt from "bcrypt";
import {
  createUser,
  findUserByEmail,
  findRefreshToken,
  saveRefreshToken,
  revokeRefreshToken,
} from "./auth.repository.js";
import type { AuthResponse, LoginDTO, RegisterDTO } from "./auth.types.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";
import { AuthenticationError } from "../../errors/AuthenticationError.js";
import { ConflictError } from "../../errors/ConflictError.js";

export const register = async (data: RegisterDTO): Promise<AuthResponse> => {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new ConflictError("کاربری با این ایمیل وجود دارد");
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const user = await createUser(data, passwordHash);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await saveRefreshToken(user.id, refreshToken, expiresAt);

  return {
    user: {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    },
    accessToken,
    refreshToken,
  };
};

export const login = async (data: LoginDTO): Promise<AuthResponse> => {
  const user = await findUserByEmail(data.email);

  if (!user) {
    throw new AuthenticationError("ایمیل یا رمز عبور اشتباه است");
  }

  const isValid = await bcrypt.compare(data.password, user.password_hash);

  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await saveRefreshToken(user.id, refreshToken, expiresAt);

  return {
    user: {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    },
    accessToken,
    refreshToken,
  };
};

// refresh token
export const refresh = async (refreshToken: string) => {
  // 1. بررسی وجود در DB
  const storedToken = await findRefreshToken(refreshToken);

  if (!storedToken) {
    throw new Error("Invalid refresh token");
  }

  // 2. بررسی revoke
  if (storedToken.is_revoked) {
    throw new AuthenticationError("نشست کاربر نامعتبر است");
  }

  // 3. بررسی expiry
  if (new Date(storedToken.expires_at) < new Date()) {
    throw new AuthenticationError("نشست کاربر منقضی شده است");
  }

  const userId = storedToken.user_id;

  // 4. revoke token فعلی (rotation)
  await revokeRefreshToken(refreshToken);

  // 5. تولید توکن جدید
  const newAccessToken = generateAccessToken(userId);
  const newRefreshToken = generateRefreshToken(userId);

  // 6. ذخیره refresh جدید
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await saveRefreshToken(userId, newRefreshToken, expiresAt);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

// logout
export const logout = async (refreshToken: string) => {
  await revokeRefreshToken(refreshToken);
};
