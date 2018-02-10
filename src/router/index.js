import Vue from 'vue'
import Router from 'vue-router'
import { Home, Register, Admin, TopicList, TopicDetail } from '@/components'
import { Users, Topics, Categories, CategoryAdd, TopicAdd } from '@/components/admin/index.js'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      // name: 'Home',
      component: Home,
      children: [
        {
          path: '',
          redirect: {
            name: 'TopicList',
            params: {
              _id: 'index'
            }
          }
        },
        {
          path: 'category/:_id',
          name: 'TopicList',
          component: TopicList,
          meta: {
            hasPage: true
          }
        },
        {
          path: 'detail/:_id',
          name: 'TopicDetail',
          component: TopicDetail,
          meta: {
            hasPage: true
          }
        }
      ]
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
          component: Users,
          meta: {
            hasPage: true
          }
        },
        {
          path: 'category',
          name: 'AdminCategory',
          component: Categories,
          meta: {
            hasPage: true
          }
        },
        {
          path: 'category_add',
          name: 'AdminCategoryAdd',
          component: CategoryAdd
        },
        {
          path: 'topics',
          name: 'AdminTopics',
          component: Topics,
          meta: {
            hasPage: true
          }
        },
        {
          path: 'topic_add',
          name: 'TopicAdd',
          component: TopicAdd
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let store = router.app.$options.components.App.store
  let state = store.state
  let userInfo = state.userInfo
  if (to.path !== from.path) { // 如果路由变化，还原到默认页码数设置
    store.commit('resetPage')
  }
  if (!Object.keys(to.query).length && to.meta.hasPage) {
    return next({
      path: to.path,
      query: {
        page: state.page,
        limit: state.limit
      }
    })
  }
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
