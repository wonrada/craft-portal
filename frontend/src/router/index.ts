import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { hideNav: true },
    },
    {
      // Redirect root to login until auth guard is set up
      path: '/',
      redirect: '/login',
    },
  ],
})

export default router
