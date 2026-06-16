import { AuthResponseSchema, LoginDTO, LoginDTOSchema, RefreshDTO, RefreshDTOSchema, RefreshResponseSchema, RegisterDTO, RegisterDTOSchema } from '@/app/schema/auth.schema'
import type { AxiosInstance } from 'axios'

export const loginApi = async (
  api: AxiosInstance,
  body: LoginDTO,
) => {
  LoginDTOSchema.parse(body)

  const res = await api.post('/auth/login', body)

  return AuthResponseSchema.parse(res.data)
}

export const registerApi = async (
  api: AxiosInstance,
  body: RegisterDTO,
) => {
  RegisterDTOSchema.parse(body)

  const res = await api.post('/auth/register', body)

  return AuthResponseSchema.parse(res.data)
}

export const refreshApi = async (
  api: AxiosInstance,
  body: RefreshDTO,
) => {
  RefreshDTOSchema.parse(body)

  const res = await api.post('/auth/refresh', body)

  return RefreshResponseSchema.parse(res.data)
}

export const logoutApi = async (
  api: AxiosInstance,
  refreshToken: string,
) => {
  await api.post('/auth/logout', {
    refreshToken,
  })
}