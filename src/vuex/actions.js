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
          var userInfo = res.data.user_info
          if (userInfo) {
            commit('setUserInfo', userInfo)
            resolve(userInfo)
          }
          reject(new Error())
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
          commit('decreaseUserCount')
          commit('changeUserList', { index: data.index })
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
          state.categoryList = res.data.category_list
          state.categoryCount = res.data.total_count
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default actions
