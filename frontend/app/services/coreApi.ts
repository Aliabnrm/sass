import axios from 'axios'
import { API_BASE_PATH } from '../entities/baseUrl'

const backendUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

export const coreApi = axios.create({
  baseURL: `${backendUrl}${API_BASE_PATH}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
  withCredentials: false,
})
