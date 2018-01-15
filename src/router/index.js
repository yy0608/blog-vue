import Vue from 'vue'
import Router from 'vue-router'
import { Register } from '@/components'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
