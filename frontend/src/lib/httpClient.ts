import axios from 'axios'

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true, // required for Laravel Sanctum cookie-based auth
})

// Attach Bearer token on every request when present
http.interceptors.request.use(config => {
  const token = localStorage.getItem('cp-token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
