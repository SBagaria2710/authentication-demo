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
      meta: { loginRequired: false }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { loginRequired: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  // const { user } = useAuth() || {};

  // Not logged into a guarded route?
  // if ( to.meta.requiresAuth && !user?.value ) next({ name: 'login' })

  // Logged in for an auth route
  // else if ( (to.name == 'login' || to.name == 'register') && !user.value ) next({ name: 'home' })

  // Carry On...
  next()
})

export default router
