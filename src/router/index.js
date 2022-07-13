import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: () => import('@/views/Welcome')
      },
      {
        path: '/users',
        component: () => import('@/views/Users')
      },
      {
        path: '/roles',
        component: () => import('@/views/Roles')
      },
      {
        path: '/rights',
        component: () => import('@/views/Rights')
      },
      {
        path: '/goods',
        component: () => import('@/views/Goods')
      },
      {
        name: 'add',
        path: '/goods/add',
        component: () => import('@/views/Goods/components/Add.vue')
      },
      {
        path: '/params',
        component: () => import('@/views/Params')
      },
      {
        path: '/categories',
        component: () => import('@/views/Categories')
      },
      {
        path: '/orders',
        component: () => import('@/views/Orders')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  if (token) {
    if (to.path === '/login') {
      next('/home')
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
