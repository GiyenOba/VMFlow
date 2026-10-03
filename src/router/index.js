import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import newBookingView from '@/views/newBookingView.vue'
import BookingsView from '../views/BookingsView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/bookings/new',
      name: 'new-booking',
      component: newBookingView,
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: BookingsView,
    },
  ],
})
export default router
