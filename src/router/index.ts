import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/sql',
      name: 'sql',
      component: () => import('@/views/HomePage.vue')
    },
    {
      path: '/csv',
      name: 'csv',
      component: () => import('@/views/CsvReader.vue')
    }
  ]
})

export default router
