<template>
<div class="admin-item category-add">
  <div class="title-cont">
    <div class="title">{{edit ? '修改分类' : '添加分类'}}</div>
    <el-button @click="goBack" size="mini" icon="el-icon-arrow-left">返回</el-button>
  </div>
  <el-form :model="form" ref="form" label-width="80px" label-position="left" :rules="rules">
    <el-form-item label="分类名称" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="分类描述" prop="desc">
      <el-input v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="goBack" icon="el-icon-arrow-left">返回</el-button>
      <el-button type="primary" @click="submit">{{edit ? '确认修改' : '确认添加'}}</el-button>
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
      edit: false,
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
      },
      categoryData: {}
    }
  },
  beforeRouteEnter (to, from, next) {
    var _id = to.query._id
    next(vm => {
      if (!_id) return
      vm.edit = true
      axios({
        url: origin + '/admin/category/detail',
        params: { _id },
        withCredentials: true,
        method: 'get'
      })
        .then(res => {
          if (res.data.code) {
            vm.$message({
              message: res.data.msg,
              type: 'error'
            })
          } else {
            vm.categoryData = res.data.detail
            vm.form.name = vm.categoryData.name
            vm.form.desc = vm.categoryData.desc
          }
        })
        .catch(() => {
          vm.$message({
            message: '请求数据出错',
            type: 'error'
          })
        })
    })
  },
  methods: {
    submit () {
      this.$refs.form.validate(valid => {
        if (!valid) return
        if (this.edit) {
          if (JSON.stringify({ // 未做修改的判断
            name: this.categoryData.name,
            desc: this.categoryData.desc
          }) === JSON.stringify(this.form)) {
            this.$message({
              message: '未做修改',
              type: 'error'
            })
            return
          }
        }
        var url = this.edit ? origin + '/admin/category/edit' : origin + '/admin/category/add'
        axios({
          method: 'post',
          data: this.edit ? Object.assign({}, this.$route.query, this.form) : this.form,
          url: url,
          withCredentials: true
        })
          .then(res => {
            if (res.data.code) {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            } else {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              setTimeout(() => {
                this.$router.go(-1)
              }, 1000)
            }
          })
          .catch(err => {
            console.log(err)
            this.$message({
              message: '添加分类出错',
              type: 'error'
            })
          })
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
