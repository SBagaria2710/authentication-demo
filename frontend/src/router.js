import { createRouter, createWebHistory } from 'vue-router'
import Home from "./views/Home.vue";
import Dashboard from './views/Dashboard.vue'

// const Home = { template: '<div>Home</div>' }
// const Dashboard = { template: '<div>About</div>' }

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: false }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    }
  ]
})

export default router
