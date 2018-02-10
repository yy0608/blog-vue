<template>
<div class="topic-list">
  <template v-if="topicList && topicList.length">
    <div class="bf topic-item" v-for="(item, index) in topicList" :key="index">
      <div class="tc title">{{item.title}}</div>
      <div class="tags-cont">
        <div class="category">分类：{{item.category.name}}</div>
        <div class="author" v-if="item.author">作者：{{item.author.username}}</div>
        <div class="created-time">{{parseDate(item.created_ts)}}</div>
      </div>
      <div class="intro-cont">{{item.intro}}</div>
      <div class="see-detail">
        <a href="javascript:;" @click="goDetail(item._id)">阅读全文</a>
      </div>
    </div>
    <pagination :change="pageChange" :count="topicCount"></pagination>
  </template>
  <div class="bf tc no-data" v-else>无数据</div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { parseDate } from '@/utils.js'
import Pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      paramsId: '',
      parseDate: parseDate
    }
  },
  computed: mapState({
    'topicList': state => state.homeTopicList,
    'topicCount': state => state.homeTopicCount
  }),
  created () {
    this.getTopicList()
    this.paramsId = this.$route.params._id
    this.$watch('$route', function (newVal, oldVal) {
      this.paramsId = newVal.params._id
      this.getTopicList()
    })
  },
  components: {
    Pagination
  },
  methods: {
    getTopicList () {
      let options = this.paramsId === 'index' ? {} : { _id: this.paramsId }
      this.$store.dispatch('getHomeTopicList', options)
        .then(() => {})
        .catch(err => {
          console.log(err)
          this.$message({
            message: '获取文章列表出错',
            type: 'error'
          })
        })
    },
    goDetail (_id) {
      this.$router.push({
        name: 'TopicDetail',
        params: { _id }
      })
    },
    pageChange () {
      this.getTopicList()
    }
  }
}
</script>

<style lang="scss" scoped>
.topic-list {
  flex-grow: 1;
  margin-right: 10px;
}
.topic-item {
  padding: 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
  }
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
  .category, .author, .created-time {
    margin-right: 15px;
  }
  .created-time {
    font-size: 12px;
  }
}
.intro-cont {
  text-align: justify;
  font-size: 16px;
  line-height: 26px;
}
.see-detail {
  text-align: right;
  a {
    color: #005a90;
  }
}
.no-data {
  line-height: 290px;
  border-bottom: 1px solid #e0e0e0;
}
</style>
