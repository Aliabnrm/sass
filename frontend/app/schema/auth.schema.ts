import { z } from "zod";

// ========================
// USER
// ========================
export const UserSchema = z.object({
  id: z.string(),
  email: z.email(),
  first_name: z.string().nullable().optional(),
  last_name: z.string().nullable().optional(),
});

// ========================
// SIGN UP
// ========================
export const SignupSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
});

// ========================
// SIGN IN
// ========================
export const SigninSchema = z.object({
  email: z.email(),
  password: z.string(),
});

// ========================
// REFRESH
// ========================
export const RefreshSchema = z.object({
  refreshToken: z.string(),
});

// ========================
// RESPONSE
// ========================
export const AuthResponseSchema = z.object({
  user: UserSchema,
  accessToken: z.string(),
  refreshToken: z.string().optional(),
});

export const RefreshResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

// ========================
// TYPES
// ========================
export type User = z.infer<typeof UserSchema>;

export type SignupDTO = z.infer<typeof SignupSchema>;
export type SigninDTO = z.infer<typeof SigninSchema>;
export type RefreshDTO = z.infer<typeof RefreshSchema>;

export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type RefreshResponse = z.infer<typeof RefreshResponseSchema>;
