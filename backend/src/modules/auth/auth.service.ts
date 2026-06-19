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

export const register = async (data: RegisterDTO): Promise<AuthResponse> => {
 console.log("REGISTER DATA:");
 console.log(data);
  console.log("PASSWORD:", data?.password);
  
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const user = await createUser(data, passwordHash);

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

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
    throw new Error("Invalid credentials");
  }

  const isValid = await bcrypt.compare(data.password, user.password_hash);

  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

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
    throw new Error("Token revoked");
  }

  // 3. بررسی expiry
  if (new Date(storedToken.expires_at) < new Date()) {
    throw new Error("Token expired");
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