import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token && !config.url?.includes('/auth/login')) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && !window.location.pathname.includes('/login')) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  },
)

export default api

export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }).then((r) => r.data),
}

export const userApi = {
  list: () => api.get('/users').then((r) => r.data),
  create: (data: any) => api.post('/users', data).then((r) => r.data),
  update: (id: string, data: any) => api.put(`/users/${id}`, data).then((r) => r.data),
  deactivate: (id: string) => api.patch(`/users/${id}/deactivate`).then((r) => r.data),
  delete: (id: string) => api.delete(`/users/${id}`).then((r) => r.data),
  byId: (id: string) => api.get(`/users/${id}`).then((r) => r.data),
}

export const workProgramApi = {
  list: () => api.get('/work-programs').then((r) => r.data),
  byId: (id: string) => api.get(`/work-programs/${id}`).then((r) => r.data),
  create: (data: any) => api.post('/work-programs', data).then((r) => r.data),
  update: (id: string, data: any) => api.put(`/work-programs/${id}`, data).then((r) => r.data),
  updateStatus: (id: string, status: string) =>
    api.patch(`/work-programs/${id}/status`, { status }).then((r) => r.data),
  assignPic: (id: string, picId: string) =>
    api.patch(`/work-programs/${id}/assign-pic`, { picId }).then((r) => r.data),
  delete: (id: string) => api.delete(`/work-programs/${id}`).then((r) => r.data),
  dashboard: () => api.get('/work-programs/dashboard').then((r) => r.data),
  lpj: (id: string) => api.get(`/work-programs/${id}/lpj`).then((r) => r.data),
}

export const evaluationApi = {
  list: (workProgramId?: string) =>
    api.get('/evaluations', { params: { workProgramId } }).then((r) => r.data),
  byId: (id: string) => api.get(`/evaluations/${id}`).then((r) => r.data),
  create: (data: any) => api.post('/evaluations', data).then((r) => r.data),
  submit: (id: string, data: any) =>
    api.patch(`/evaluations/${id}/submit`, data).then((r) => r.data),
  dashboard: () => api.get('/evaluations/dashboard').then((r) => r.data),
}

export const budgetApi = {
  list: (workProgramId?: string) =>
    api.get('/budgets', { params: { workProgramId } }).then((r) => r.data),
  byId: (id: string) => api.get(`/budgets/${id}`).then((r) => r.data),
  create: (data: any) => api.post('/budgets', data).then((r) => r.data),
  submit: (id: string, notes?: string) =>
    api.patch(`/budgets/${id}/submit`, { notes }).then((r) => r.data),
  approve: (id: string, action: string, notes?: string) =>
    api.patch(`/budgets/${id}/approve`, { action, notes }).then((r) => r.data),
  dashboard: () => api.get('/budgets/dashboard').then((r) => r.data),
}

export const progressReportApi = {
  create: (data: any) => api.post('/progress-reports', data).then((r) => r.data),
  list: () => api.get('/progress-reports').then((r) => r.data),
  byWorkProgram: (wpId: string) => api.get('/progress-reports/by-work-program/' + wpId).then((r) => r.data),
}

export const kasApi = {
  find: () => api.get('/kas').then((r) => r.data),
  recordTransaction: (data: any) => api.patch('/kas/transaction', data).then((r) => r.data),
}

export const documentApi = {
  upload: (formData: FormData) =>
    api.post('/documents/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data),
  byWorkProgram: (wpId: string) => api.get('/documents/by-work-program/' + wpId).then((r) => r.data),
  download: (id: string) => api.get('/documents/download/' + id, { responseType: 'blob' }).then((r) => r.data),
}

export const notificationApi = {
  list: (limit?: number, offset?: number) =>
    api.get('/notifications', { params: { limit, offset } }).then((r) => r.data),
  unreadCount: () => api.get('/notifications/unread/count').then((r) => r.data),
  unreadList: () => api.get('/notifications/unread/list').then((r) => r.data),
  markRead: (id: string) => api.patch(`/notifications/${id}/read`).then((r) => r.data),
}

export const KAK_DOWNLOAD_URL = (import.meta.env.VITE_API_BASE_URL || '/api') + '/kak/template'
