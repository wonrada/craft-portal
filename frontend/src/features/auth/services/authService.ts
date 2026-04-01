import { http } from '@/lib/httpClient'
import type { AuthResponse, LoginCredentials } from '../types/authTypes'

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await http.post<AuthResponse>('/auth/login', credentials)
    return data
  },

  async logout(): Promise<void> {
    await http.post('/auth/logout')
    localStorage.removeItem('cp-token')
  },

  async me(): Promise<AuthResponse['user']> {
    const { data } = await http.get<AuthResponse['user']>('/auth/me')
    return data
  },
}
