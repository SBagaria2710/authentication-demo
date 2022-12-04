import { createRouter, createWebHistory } from 'vue-router'
import Home from "./views/Home.vue";
import Dashboard from './views/Dashboard.vue'
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";

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
      path: '/login',
      name: 'login',
      component: Login,
      meta: { loginRequired: false }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { loginRequired: false }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { loginRequired: true }
    },
  ]
});

router.beforeEach((to, from, next) => {
  // const { user } = useAuth() || {};

  // Not logged into a guarded route?
  // if ( to.meta.loginRequired && !user?.value ) next({ name: 'login' })

  // Logged in for an auth route
  // else if ( (to.name == 'login' || to.name == 'register') && !user.value ) next({ name: 'home' })

  // Carry On...
  next()
})

export default router
