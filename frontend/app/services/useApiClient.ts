import axios from 'axios'
import { useMemo } from 'react'
import { coreApi } from './coreApi'
import type { AxiosInstance, AxiosError } from 'axios'

type ApiErrorBody = {
  errorMessage?: string
  message?: string
  detail?: string
  title?: string
  errorCode?: string
  code?: string
}

type NormalizedApiError = {
  status: number
  message: string
  code?: string
}

export const useApiClient = (): AxiosInstance => {
  const api = useMemo(() => {
    // Create a fresh axios instance per hook usage to avoid stacking interceptors
    // on the shared coreApi instance.
    const instance = axios.create(coreApi.defaults)

    // REQUEST INTERCEPTOR
    instance.interceptors.request.use(config => {
      const token =
        typeof window !== 'undefined'
          ? window.localStorage.getItem('accessToken')
          : null

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      if (!(config.data instanceof FormData)) {
        config.headers['Content-Type'] = 'application/json'
      }

      config.headers.accept = '*/*'

      return config
    })

    // RESPONSE INTERCEPTOR
    instance.interceptors.response.use(
      res => ({
        ...res,
        data: res.data?.item ?? res.data,
      }),
      (error: AxiosError<ApiErrorBody> | NormalizedApiError) => {
        if ('status' in error && error.status) {
          return Promise.reject(error)
        }

        if (!error.response) {
          return Promise.reject({
            status: 0,
            message: 'Network error',
          })
        }

        const { status, data } = error.response

        // Unified Error Format
        const normalizedError = {
          status,
          message:
            data?.errorMessage ||
            data?.message ||
            data?.detail ||
            data?.title ||
            'Unknown error',
          code: data?.errorCode || data?.code,
        }

        if (status === 401) {
          window.localStorage.removeItem('accessToken')
        }

        if (status === 403) {
          console.warn('Permission denied')
        }

        return Promise.reject(normalizedError)
      },
    )

    return instance
  }, [])

  return api
}
