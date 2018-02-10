<template>
<div class="bf topic-detail">
  <div class="tc title">{{dataInfo.title}}</div>
  <div class="tags-cont">
    <div class="category">分类：{{dataInfo.category && dataInfo.category.name}}</div>
    <div class="author" v-if="dataInfo.author">作者：{{dataInfo.author.username}}</div>
    <div class="view-cont">阅读数：{{dataInfo.view_count}}</div>
    <div class="created-time">{{parseDate(dataInfo.created_ts)}}</div>
  </div>
  <div class="intro" v-html="dataInfo.intro && changeEnter(dataInfo.intro)"></div>
  <!-- <div class="content">{{dataInfo.content && replaceStr(dataInfo.content)}}</div> -->
  <div class="content" v-html="dataInfo.content && changeEnter(dataInfo.content)"></div>
  <el-form class="form-cont" :model="form" v-if="userInfo">
    <el-form-item>
      <el-input type="textarea" v-model="form.comment" :rows="5" resize="none"></el-input>
    </el-form-item>
    <el-form-item class="submit-item">
      <el-button type="primary" @click="submit">提交评论</el-button>
    </el-form-item>
  </el-form>
  <div class="pls-login" v-else>请先登录再评论</div>
  <div class="comments-cont" v-if="commentsList">
    <div class="comment-item" v-for="(item, index) in commentsList" :key="index">
      <div class="author-info">
        <div class="comment-author">{{item.author_id.username}}</div>
        <div class="time">{{parseDate(item.created_ts)}}</div>
      </div>
      <div class="comment">{{item.comment}}</div>
    </div>
  </div>
  <pagination v-if="commentsCount" :count="commentsCount" :change="pageChange"></pagination>
</div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import { origin } from '@/config.js'
import { parseDate } from '@/utils.js'
import Pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      dataInfo: {},
      parseDate: parseDate,
      form: {
        comment: ''
      }
    }
  },
  computed: mapState([
    'userInfo',
    'commentsList',
    'commentsCount',
    'page',
    'limit'
  ]),
  created () {
    this.getTopicDetail()
  },
  components: {
    Pagination
  },
  methods: {
    getTopicDetail () {
      var _id = this.$route.params._id
      axios({
        url: origin + '/topic/detail',
        method: 'get',
        withCredentials: true,
        params: {
          _id,
          limit: this.limit,
          page: this.page
        }
      })
        .then(res => {
          if (res.data.code) {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          } else {
            this.dataInfo = res.data.detail
            this.$store.commit('setCommentsList', res.data.comments)
            this.$store.commit('setCommentsCount', res.data.comments_count)
          }
        })
        .catch(() => {
          this.$message({
            message: '请求出错',
            type: 'error'
          })
        })
    },
    replaceStr (str) {
      return str.replace(/\r\n/ig, '<br>')
    },
    changeEnter (str) {
      var resStr = str.replace(/<\s*/g, '&lt;')
      resStr = resStr.replace(/&lt;\s*/g, '&lt; ')
      resStr = resStr.replace(/\n/g, '<br>')
      return resStr
    },
    submit () {
      if (!this.form.comment.trim()) {
        this.$message({
          message: '评论内容不能为空',
          type: 'error'
        })
      }
      let commentData = {
        topic_id: this.$route.params._id,
        author_id: this.userInfo._id,
        comment: this.form.comment
      }
      axios({
        url: origin + '/topic/comment',
        method: 'post',
        withCredentials: true,
        data: commentData
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
            let localComment = {
              comment: this.form.comment,
              author_id: {
                username: this.userInfo.username
              },
              created_ts: Date.now()
            }
            this.$store.commit('insertComment', localComment)
            this.$store.commit('increaseCommentsCount')
            this.form = {}
          }
        })
        .catch(() => {
          this.$message({
            message: '请求出错',
            type: 'error'
          })
        })
    },
    pageChange () {
      this.getTopicDetail()
    }
  }
}
</script>

<style lang="scss" scoped>
.topic-detail {
  flex-grow: 1;
  padding: 20px;
  margin-right: 10px;
  line-height: 26px;
  font-size: 15px;
  text-align: justify;
}
.title {
  font-size: 18px;
  font-weight: bold;
  color: #666;
}
.tags-cont {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
  color: #888;
  .category, .author, .created-time, .view-cont {
    margin-right: 15px;
  }
  .created-time {
    font-size: 12px;
  }
}
.intro {
  margin-bottom: 20px;
}
.form-cont {
  margin-top: 50px;
}
.comment-item {
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}
.author-info {
  display: flex;
  justify-content: space-between;
  .comment-author {
    font-size: 16px;
  }
  .time {
    font-size: 12px;
    color: #888;
  }
}
.comment {
  margin-top: 10px;
  font-size: 16px;
}
.pls-login {
  margin-top: 30px;
  padding: 30px;
  border-top: 1px solid #e0e0e0;
  text-align: center;
}
.submit-item {
  text-align: right;
}
</style>
