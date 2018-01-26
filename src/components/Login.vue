<template>
  <div class="join-cont">
    <div class="join-item">
      <div class="title">用户名：</div>
      <input type="text" v-model="data.username" placeholder="请输入用户名">
    </div>
    <div class="join-item">
      <div class="title">密码：</div>
      <input type="password" v-model="data.password" @keyup.enter="login" placeholder="请输入密码">
    </div>
    <a class="normal-button" href="javascript:void(0);" @click="login">登录</a>
  </div>
</template>

<script>
import axios from 'axios'
import { origin } from '@/config.js'

export default {
  data () {
    return {
      data: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      if (!this.data.password.trim() || !this.data.username.trim()) {
        console.log('用户名和密码不能为空')
        return
      }
      axios({
        url: origin + '/api/user/login',
        method: 'post',
        data: { ...this.data },
        withCredentials: true
      })
        .then(res => {
          console.log(res.data)
          if (res.data.user_info) {
            this.$store.dispatch('setUserInfo', res.data.user_info)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
