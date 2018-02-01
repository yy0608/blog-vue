import { query } from '@/config.js'

const mutations = {
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
  },
  setUserList (state, userList) {
    state.userList = userList
  },
  changeUserList (state, index) { // 根据index删除1条数据
    state.userList.splice(index, 1)
  },
  decreaseUserCount (state) {
    state.userCount--
  },
  changePage (state, page) { // 改变全局的当前页码数
    state.page = page
  },
  changeLimit (state, limit) { // 改变全局的每页限制条数
    state.limit = limit
  },
  resetPage (state) {
    state.page = query.page
  }
}

export default mutations
