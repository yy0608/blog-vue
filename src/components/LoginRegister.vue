<template>
<div class="bf login-register">
  <div class="inner-cont">
    <template v-if="!userInfo || !userInfo.username">
      <div class="tabs-cont">
        <div :class="[tabName === 'login' ? 'current' : '', 'tab-item' ]" @click="switchTab(0)">登录</div>
        <div :class="[tabName === 'register' ? 'current' : '', 'tab-item' ]" @click="switchTab(1)">注册</div>
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
  <div class="blank-cont"></div>
</div>
</template>

<script>
import Register from './Register.vue'
import Login from './Login.vue'
import { mapState } from 'vuex'
import axios from 'axios'
import { origin } from '@/config.js'

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
    switchTab (index) {
      this.tabName = index ? 'register' : 'login'
    },
    logout () {
      this.$store.dispatch('setUserInfo', null)
      axios({
        url: origin + '/api/user/logout',
        method: 'post',
        withCredentials: true
      })
        .then(res => {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
        })
        .catch(() => {
          this.$message({
            message: '退出失败',
            type: 'error'
          })
        })
      this.$cookie.delete('_id')
      this.$cookie.delete('_id.sig')
    },
    checkLoginByCookie () {
      var _id = this.$cookie.get('_id')
      this.$store.dispatch('setUserInfoByCookie', _id)
    }
  }
}
</script>

<style lang="scss" scoped>
.login-register {
  display: flex;
  flex-direction: column;
}
.inner-cont {
  flex-grow: 1;
}
.blank-cont {
  height: 78px;
  border-top: 1px solid #e0e0e0;
  background-color: #f5f5f5;
}
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
