import Vue from 'vue'
import Router from 'vue-router'
import { Home, Register, Admin } from '@/components'
import { Users, Topics } from '@/components/admin/index.js'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/admin',
      component: Admin,
      children: [
        {
          path: '',
          redirect: {
            name: 'AdminUsers'
          }
        },
        {
          path: 'users',
          name: 'AdminUsers',
          component: Users
        },
        {
          path: 'topics',
          name: 'AdminTopics',
          component: Topics
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let store = router.app.$options.components.App.store
  let userInfo = store.state.userInfo
  if (!/admin/.test(to.path)) {
    return next()
  }
  if (userInfo) {
    if (userInfo.isAdmin) return next()
    return next('/')
  } else {
    store.dispatch('setUserInfoByCookie')
      .then(res => {
        if (res.isAdmin) return next()
        return next('/')
      })
      .catch(() => {
        return next('/')
      })
  }
})

export default router
