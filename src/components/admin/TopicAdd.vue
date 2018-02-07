<template>
<div class="admin-item topic-add">
  <div class="title-cont">
    <div class="title">{{edit ? '修改文章' : '添加文章'}}</div>
    <el-button @click="goBack" size="mini" icon="el-icon-arrow-left">返回</el-button>
  </div>
  <el-form :model="form" ref="form" label-width="80px" label-position="left" :rules="rules">
    <el-form-item label="类别" prop="category">
      <el-select v-model="form.category">
        <el-option v-for="item in options" :key="item.name" :value="item._id" :label="item.name"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="文章标题" prop="title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="文章介绍" prop="intro">
      <el-input type="textarea" resize="none" :rows="3" v-model="form.intro" prop="intro"></el-input>
    </el-form-item>
    <el-form-item label="文章内容" prop="content">
      <el-input type="textarea" resize="none" :rows="5" v-model="form.content" prop="content"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="goBack" icon="el-icon-arrow-left">返回</el-button>
      <el-button type="primary" @click="submit">{{edit ? '确认修改' : '确认添加'}}</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import axios from 'axios'
import { origin } from '@/config'

export default {
  data () {
    return {
      edit: false,
      form: {
        category: '',
        title: '',
        intro: '',
        content: ''
      },
      options: [],
      rules: {
        category: [{
          required: true,
          message: '请选择文章类别'
        }],
        title: [{
          required: true,
          message: '请输入文章标题',
          trigger: 'blur'
        }],
        intro: [{
          required: true,
          message: '请输入文章介绍',
          trigger: 'blur'
        }],
        content: [{
          required: true,
          message: '请输入文章内容',
          trigger: 'blur'
        }]
      },
      topicData: {}
    }
  },
  created () {
    axios({
      url: origin + '/admin/category/list',
      method: 'get',
      withCredentials: true,
      params: {
        limit: 9999
      }
    })
      .then(res => {
        if (res.data.code) {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        } else {
          this.options = res.data.category_list
        }
      })
      .catch(() => {
        this.$message({
          message: '请求出错',
          type: 'error'
        })
      })
  },
  beforeRouteEnter (to, from, next) {
    let _id = to.query._id
    next(vm => {
      if (!_id) return
      vm.edit = true
      axios({
        url: origin + '/admin/topic/detail',
        method: 'get',
        withCredentials: true,
        params: { _id }
      })
        .then(res => {
          if (res.data.code) {
            vm.$message({
              message: res.data.msg,
              type: 'error'
            })
          } else {
            // vm.form = res.data.detail
            vm.form = Object.assign({}, res.data.detail)
            vm.topicData = res.data.detail
          }
        })
        .catch(() => {
          vm.$message({
            message: '请求出错',
            type: 'error'
          })
        })
    })
  },
  methods: {
    submit () {
      this.$refs.form.validate(valid => {
        if (!valid) return
        if (this.edit && JSON.stringify(this.form) === JSON.stringify(this.topicData)) {
          this.$message({
            message: '未做修改',
            type: 'error'
          })
          return
        }
        let url = this.edit ? origin + '/admin/topic/edit' : origin + '/admin/topic/add'
        axios({
          url,
          method: 'post',
          withCredentials: true,
          data: this.edit ? Object.assign({}, this.$route.query, this.form) : this.form
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
              message: '请求出错',
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
