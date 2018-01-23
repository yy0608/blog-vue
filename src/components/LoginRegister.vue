<template>
<div class="bf login-register">
  <template v-if="!userInfo || !userInfo.username">
    <div class="tabs-cont">
      <div :class="[tabName === 'login' ? 'current' : '', 'tab-item' ]" @click="switchTab()">登录</div>
      <div :class="[tabName === 'register' ? 'current' : '', 'tab-item' ]" @click="switchTab()">注册</div>
    </div>
    <register v-if="tabName === 'register'" @needChangeTab="switchTab()"></register>
    <login v-if="tabName === 'login'"></login>
  </template>
  <!-- <div>{{userInfo}}</div> -->
  <div v-else class="user-info">
    <div class="username">{{userInfo.username}}</div>
    <div class="welcome"><span v-if="userInfo.isAdmin">管理员，</span>欢迎光临我的博客</div>
    <router-link v-if="userInfo.isAdmin" class="normal-button" to="/admin">进入后台</router-link>
    <a class="ghost-button" href="javascript:void(0);" @click="logout()">退出</a>
  </div>
</div>
</template>

<script>
import Register from './Register.vue'
import Login from './Login.vue'
import { mapState } from 'vuex'

export default {
  name: 'LoginRegister',
  data () {
    return {
      tabName: 'login'
    }
  },
  computed: mapState([
    'userInfo'
  ]),
  components: {
    register: Register,
    login: Login
  },
  created () {
    this.checkLoginByCookie()
  },
  methods: {
    switchTab () {
      this.tabName = this.tabName === 'login' ? 'register' : 'login'
    },
    logout () {
      this.$store.dispatch('setUserInfo', null)
      this.$cookie.delete('_id')
      this.$cookie.delete('_id.sig')
    },
    checkLoginByCookie () {
      var _id = this.$cookie.get('_id')
      if (!_id) return
      this.$store.dispatch('setUserInfoByCookie', _id)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs-cont {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #e0e0e0;
}
.tab-item {
  padding: 15px;
  cursor: pointer;
  color: #888;
  &.current {
    color: #14a0f3;
  }
}
.user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 341px;
  height: 290px;
  padding: 20px;
  box-sizing: border-box;
  .username, .welcome {
    text-align: center;
    font-size: 18px;
    margin-bottom: 30px;
  }
}
</style>
