import api from './api'
import Cookies from 'js-cookie'
import { AuthUser, LoginFormData } from '@/types'

const COOKIE_OPTIONS = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
}

export const authService = {
  async login(data: LoginFormData) {
    const response = await api.post('/auth/login', data)
    const { user, accessToken, refreshToken } = response.data.data

    // Salvar tokens em cookies seguros
    Cookies.set('accessToken', accessToken, {
      ...COOKIE_OPTIONS,
      expires: 1 / 96, // 15 minutos
    })

    Cookies.set('refreshToken', refreshToken, {
      ...COOKIE_OPTIONS,
      expires: 7, // 7 dias
    })

    Cookies.set('user', JSON.stringify(user), {
      ...COOKIE_OPTIONS,
      expires: 7,
    })

    return { user, accessToken, refreshToken }
  },

  async logout() {
    try {
      await api.post('/auth/logout')
    } catch {
      // Ignorar erros no logout
    } finally {
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
      Cookies.remove('user')
    }
  },

  async getProfile(): Promise<AuthUser> {
    const response = await api.get('/auth/profile')
    return response.data.data
  },

  async refreshTokens(refreshToken: string) {
    const response = await api.post('/auth/refresh', { refreshToken })
    return response.data.data
  },

  getCurrentUser(): AuthUser | null {
    try {
      const userCookie = Cookies.get('user')
      if (!userCookie) return null
      return JSON.parse(userCookie) as AuthUser
    } catch {
      return null
    }
  },

  isAuthenticated(): boolean {
    return !!Cookies.get('accessToken')
  },

  getAccessToken(): string | undefined {
    return Cookies.get('accessToken')
  },
}
