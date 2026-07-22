import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: LoginView },
    {
      path: '/',
      component: DashboardLayout,
      beforeEnter: (_to: any, _from: any, next: any) => {
        const token = localStorage.getItem('token')
        if (!token) return next('/login')
        next()
      },
      children: [
        { path: 'dashboard', name: 'dashboard', component: () => import('@/views/DashboardView.vue') },
        { path: 'work-programs', name: 'work-programs', component: () => import('@/views/WorkProgramListView.vue') },
        { path: 'work-programs/create', name: 'work-program-create', component: () => import('@/views/WorkProgramFormView.vue') },
        { path: 'work-programs/:id', name: 'work-program-detail', component: () => import('@/views/WorkProgramDetailView.vue') },
        { path: 'work-programs/:id/lpj', name: 'work-program-lpj', component: () => import('@/views/LpjView.vue') },
        { path: 'work-programs/:id/edit', name: 'work-program-edit', component: () => import('@/views/WorkProgramFormView.vue') },
        { path: 'users', name: 'users', component: () => import('@/views/UserManagementView.vue') },
        { path: 'evaluations', name: 'evaluations', component: () => import('@/views/EvaluationView.vue') },
        { path: 'finance', name: 'finance', component: () => import('@/views/FinanceView.vue') },
        { path: 'notifications', name: 'notifications', component: () => import('@/views/NotificationsView.vue') },
      ],
    },
  ],
})

export default router
