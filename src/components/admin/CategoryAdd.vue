<template>
<div class="admin-item category-add">
  <div class="title-cont">
    <div class="title">添加分类</div>
    <el-button @click="goBack" size="mini" icon="el-icon-arrow-left">返回</el-button>
  </div>
  <el-form :model="form" ref="form" label-width="80px" label-position="left" :rules="rules">
    <el-form-item label="分类名称" prop="name" required>
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="分类描述" prop="desc">
      <el-input v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">确认添加</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import { origin } from '@/config.js'
import axios from 'axios'

export default {
  data () {
    return {
      form: {
        name: '',
        desc: ''
      },
      rules: {
        name: [{
          required: true,
          message: '请输入分类名称',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate(valid => {
        if (!valid) return
        axios({
          method: 'post',
          data: this.form,
          url: origin + '/admin/category/add',
          withCredentials: true
        })
          .then(res => {
            if (res.data.code) {
              this.$message({
                message: '保存分类出错',
                type: 'error'
              })
            } else {
              this.$message({
                message: '保存分类成功',
                type: 'success'
              })
              this.$refs.form.resetFields()
            }
          })
          .catch(err => {
            console.log(err)
            this.$message({
              message: '保存分类出错',
              type: 'error'
            })
          })
        console.log(this.form)
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.title-cont {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-form {
  width: 500px;
  padding: 20px 0;
}
</style>
