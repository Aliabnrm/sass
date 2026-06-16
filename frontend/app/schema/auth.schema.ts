import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string(),
  email: z.email(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
})

export const RegisterDTOSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
})

export const LoginDTOSchema = z.object({
  email: z.email(),
  password: z.string(),
})

export const RefreshDTOSchema = z.object({
  refreshToken: z.string(),
})

export const AuthResponseSchema = z.object({
  user: UserSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
})

export const RefreshResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})

export type User = z.infer<typeof UserSchema>

export type LoginDTO = z.infer<typeof LoginDTOSchema>

export type RefreshDTO = z.infer<typeof RefreshDTOSchema>

export type RegisterDTO = z.infer<typeof RegisterDTOSchema>

export type AuthResponse = z.infer<typeof AuthResponseSchema>

export type RefreshResponse = z.infer<typeof RefreshResponseSchema>