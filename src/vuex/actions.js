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
  getUserList ({ commit }) {
    return new Promise((resolve, reject) => {
      axios({
        url: origin + '/admin/user_list',
        method: 'get',
        withCredentials: true
      })
        .then(res => {
          commit('setUserList', res.data.user_list)
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
        url: origin + '/admin/user_delete',
        data: { _id: data._id },
        method: 'post',
        withCredentials: true
      })
        .then(res => {
          commit('changeUserList', { index: data.index })
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default actions
