<template>
  <div class="register-cont">
    <div class="register-item">
      <div class="title">用户名：</div>
      <input type="text" v-model="data.username" placeholder="请输入用户名">
    </div>
    <div class="register-item">
      <div class="title">密码：</div>
      <input type="password" v-model="data.password" placeholder="请输入密码">
    </div>
    <div class="register-item">
      <div class="title">重复密码：</div>
      <input type="password" placeholder="请再次输入密码">
    </div>
    <div class="register-item">
      <a class="normal-button" href="javascript:void(0);" @click="register()">注册</a>
    </div>
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
    register () {
      console.log(this.data)
      axios.post(origin + '/api/user/register', { ...this.data })
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss">
.register-cont {
  padding: 20px;
  background-color: #fff;
}
.register-item {
  display: flex;
  padding: 10px;
  align-items: center;
  .title {
    width: 100px;
  }
  input {
    padding: 5px 4px;
  }
}
</style>
