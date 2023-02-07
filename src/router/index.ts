import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/goods',
    children: [{
      path: '/goods',
      name: 'Goods',
      meta: {
        isShow: true,
        title: "商品列表",
        icon: "ShoppingCart"
      },
      component: () => import(/* webpackChunkName: "goods" */ '../views/Goods.vue')
    },
    {
      path: '/user',
      name: 'User',
      meta: {
        isShow: true,
        title: "用户列表",
        icon: "User"
      },
      component: () => import(/* webpackChunkName: "goods" */ '../views/User.vue')
    },
    {
      path: '/role',
      name: 'Role',
      meta: {
        isShow: true,
        title: "角色列表",
        icon: "User"
      },
      component: () => import(/* webpackChunkName: "goods" */ '../views/Role.vue')
    },
    {
      path: '/auth',
      name: 'Authority',
      meta: {
        isShow: false,
        title: "权限列表",
        icon: "User"
      },
      component: () => import(/* webpackChunkName: "goods" */ '../views/Authority.vue')
    }]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const token: string | null = localStorage.getItem('token')
  if (!token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

export default router
