import axios from 'axios'
import { origin } from '@/config.js'

const actions = {
  setUserInfo ({ commit }, userInfo) {
    commit('setUserInfo', userInfo)
  },
  setUserInfoByCookie ({ commit }) {
    return new Promise((resolve, reject) => {
      axios({
        url: origin + '/api/user/getUserInfoById',
        method: 'post',
        withCredentials: true
      })
        .then(res => {
          // if (res.data.code) reject(new Error('请求成功，但返回的code不为0'))
          var userInfo = res.data.user_info
          if (userInfo) {
            commit('setUserInfo', userInfo)
            resolve(userInfo)
          }
        })
        .catch(err => {
          console.log('从cookie获取userInfo出错，错误信息是：' + err)
          reject(err)
        })
    })
  },
  getUserList ({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios({
        url: origin + '/admin/user/list',
        method: 'get',
        params: {
          page: state.page,
          limit: state.limit
        },
        withCredentials: true
      })
        .then(res => {
          if (res.data.code) reject(new Error('请求成功，但返回的code不为0'))
          commit('setUserList', res.data.user_list)
          state.userCount = res.data.total_count
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  deleteUser ({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: origin + '/admin/user/delete',
        data: { _id: data._id },
        method: 'post',
        withCredentials: true
      })
        .then(res => {
          if (res.data.code) reject(new Error('请求成功，但返回的code不为0'))
          commit('decreaseUserCount')
          commit('changeUserList', data.index)
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getCategoryList ({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        withCredentials: true,
        params: {
          page: state.page,
          limit: state.limit
        },
        url: origin + '/admin/category/list'
      })
        .then(res => {
          if (res.data.code) reject(new Error('请求成功，但返回的code不为0'))
          state.categoryList = res.data.category_list
          state.categoryCount = res.data.total_count
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  deleteCategory ({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: origin + '/admin/category/delete',
        data: { _id: data._id },
        method: 'post',
        withCredentials: true
      })
        .then(res => {
          if (res.data.code) reject(new Error('请求成功，但返回的code不为0'))
          commit('decreaseCategoryCount')
          commit('changeCategoryList', data.index)
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getTopicList ({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios({
        url: origin + '/admin/topic/list',
        method: 'get',
        withCredentials: true,
        params: {
          page: state.page,
          limit: state.limit
        }
      })
        .then(res => {
          if (res.data.code) reject(new Error('请求成功，但返回的code不为0'))
          state.topicList = res.data.topic_list
          state.topicCount = res.data.total_count
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  deleteTopic ({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: origin + '/admin/topic/delete',
        data: { _id: data._id },
        method: 'post',
        withCredentials: true
      })
        .then(res => {
          if (res.data.code) reject(new Error('请求成功，但返回的code不为0'))
          commit('decreaseTopicCount')
          commit('changeTopicList', data.index)
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getHomeTopicList ({ commit, state }, options) {
    return new Promise((resolve, reject) => {
      axios({
        url: origin + '/topic/list',
        method: 'get',
        withCredentials: true,
        params: Object.assign({}, {
          page: state.page,
          limit: state.limit
        }, options)
      })
        .then(res => {
          if (res.data.code) reject(new Error('请求成功，但返回的code不为0'))
          state.homeTopicList = res.data.topic_list
          state.homeTopicCount = res.data.total_count
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default actions
