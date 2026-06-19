import {
  loginApi,
  logoutApi,
  refreshApi,
  registerApi,
} from './auth.api'
import { useApiClient } from '../useApiClient'
import { useMutation } from '@tanstack/react-query'
import { RefreshDTO, SigninDTO, SignupDTO } from '@/app/schema/auth.schema'

export const useLogin = () => {
  const api = useApiClient()

  return useMutation({
    mutationFn: (data: SigninDTO) => loginApi(api, data),
  });
}

export const useRegister = () => {
  const api = useApiClient()

  return useMutation({
    mutationFn: (data: SignupDTO) => registerApi(api, data),
  });
}

export const useRefreshToken = () => {
  const api = useApiClient()

  return useMutation({
    mutationFn: (data: RefreshDTO) =>
      refreshApi(api, data),
  })
}

export const useLogout = () => {
  const api = useApiClient()

  return useMutation({
    mutationFn: (refreshToken: string) =>
      logoutApi(api, refreshToken),
  })
}