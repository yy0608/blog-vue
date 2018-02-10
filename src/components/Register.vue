<template>
  <div class="join-cont">
    <div class="join-item">
      <div class="title">用户名：</div>
      <input type="text" v-model="data.username" placeholder="请输入用户名">
    </div>
    <div class="join-item">
      <div class="title">密码：</div>
      <input type="password" v-model="data.password" placeholder="请输入密码">
    </div>
    <div class="join-item">
      <div class="title">重复密码：</div>
      <input type="password" v-model="repeatPassword" @keyup.enter="register" placeholder="请再次输入密码">
    </div>
    <a class="normal-button" href="javascript:void(0);" @click="register">注册</a>
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
      },
      repeatPassword: ''
    }
  },
  methods: {
    register () {
      if (!this.data.password.trim() || !this.data.username.trim()) {
        this.$message({
          message: '用户名和密码不能为空',
          type: 'error'
        })
        return
      }
      if (this.data.password !== this.repeatPassword) {
        this.$message({
          message: '两次密码输入不相同',
          type: 'error'
        })
        return
      }
      axios.post(origin + '/api/user/register', { ...this.data })
        .then(res => {
          if (!res.data.code) {
            this.$emit('needChangeTab')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
