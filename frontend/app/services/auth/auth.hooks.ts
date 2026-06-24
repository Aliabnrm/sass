import api from "../useApiClient";
import { useMutation } from "@tanstack/react-query";
import { loginApi, logoutApi, refreshApi, registerApi } from "./auth.api";
import { RefreshDTO, SigninDTO, SignupDTO } from "@/app/schema/auth.schema";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: SigninDTO) => loginApi(api, data),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: SignupDTO) => registerApi(api, data),
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: (data: RefreshDTO) => refreshApi(api, data),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: (refreshToken: string) => logoutApi(api, refreshToken),
  });
};
