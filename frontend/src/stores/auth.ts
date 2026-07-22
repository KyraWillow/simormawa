import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authApi } from '@/services/api'

export interface User {
  id: string
  email: string
  name: string
  role: string
  isActive: boolean
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'))
  const token = ref<string | null>(localStorage.getItem('token'))
  const loading = ref(false)

  const isAuthenticated = () => !!token.value

  async function login(email: string, password: string) {
    loading.value = true
    try {
      const res = await authApi.login(email, password)
      token.value = res.token
      user.value = res.user
      localStorage.setItem('token', res.token)
      localStorage.setItem('user', JSON.stringify(res.user))
    } finally {
      loading.value = false
    }
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  function hasRole(...roles: string[]) {
    if (!user.value) return false
    return roles.includes(user.value.role)
  }

  return { user, token, loading, isAuthenticated, login, logout, hasRole }
})
