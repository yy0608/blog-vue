const mutations = {
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
  },
  setUserList (state, userList) {
    state.userList = userList
  },
  changeUserList (state, index) { // 根据index删除1条数据
    state.userList.splice(index, 1)
  }
}

export default mutations
