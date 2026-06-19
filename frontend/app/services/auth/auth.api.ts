import {
  SigninDTO,
  SignupDTO,
  RefreshDTO,
  SigninSchema,
  SignupSchema,
  RefreshSchema,
  AuthResponseSchema,
  RefreshResponseSchema,
} from "@/app/schema/auth.schema";
import type { AxiosInstance } from "axios";

export const loginApi = async (api: AxiosInstance, body: SigninDTO) => {
  SigninSchema.parse(body);

  const res = await api.post("/auth/login", body);

  return AuthResponseSchema.parse(res.data);
};

export const registerApi = async (api: AxiosInstance, body: SignupDTO) => {
  SignupSchema.parse(body);

  const res = await api.post("/auth/register", body);

  return AuthResponseSchema.parse(res.data);
};

export const refreshApi = async (api: AxiosInstance, body: RefreshDTO) => {
  RefreshSchema.parse(body);

  const res = await api.post("/auth/refresh", body);

  return RefreshResponseSchema.parse(res.data);
};

export const logoutApi = async (api: AxiosInstance, refreshToken: string) => {
  await api.post("/auth/logout", { refreshToken });
};