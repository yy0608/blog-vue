<template>
<div class="admin-item topics-admin">
  <div class="title-cont">
    <div class="title">帖子列表</div>
    <el-button size="mini" @click="goAdd">添加帖子</el-button>
  </div>
  <el-table :data="topicList">
    <el-table-column prop="_id" label="_id" min-width="110px"></el-table-column>
    <el-table-column prop="title" label="标题"></el-table-column>
    <el-table-column label="分类">
      <template slot-scope="props">{{props.row.category.name}}</template>
    </el-table-column>
    <el-table-column label="创建时间">
      <template slot-scope="props">{{parseDate(props.row.created_ts)}}</template>
    </el-table-column>
    <el-table-column label="更新时间">
      <template slot-scope="props">{{props.row.updated_ts ? parseDate(props.row.updated_ts) : '未修改'}}</template>
    </el-table-column>
    <el-table-column label="操作" min-width="100px">
      <template slot-scope="props">
        <el-button size="mini" @click="editTopic(props.row._id)">修改</el-button>
        <el-button size="mini" @click="deleteTopic(props.$index, props.row._id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <pagination :count="topicCount" :change="pageChange"></pagination>
</div>
</template>

<script>
import { parseDate } from '@/utils.js'
import Pagination from '../Pagination.vue'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      parseDate: parseDate
    }
  },
  computed: mapState([
    'topicList',
    'topicCount'
  ]),
  components: {
    Pagination
  },
  methods: {
    getTopicList () {
      this.$store.dispatch('getTopicList')
        .then(() => {})
        .catch(err => {
          console.log(err)
          this.$message({
            message: '获取文章列表出错',
            type: 'error'
          })
        })
    },
    goAdd () {
      this.$router.push({
        path: '/admin/topic_add'
      })
    },
    editTopic (_id) {
      this.$router.push({
        path: '/admin/topic_add',
        query: { _id }
      })
    },
    pageChange () {
      this.getTopicList()
    },
    deleteTopic (index, _id) {
      this.$confirm('删除文章？', '提示')
        .then(() => {
          this.$store.dispatch('deleteTopic', {
            index,
            _id
          })
            .then((res) => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
            })
            .catch((err) => {
              console.log(err)
              this.$message({
                message: '请求失败',
                type: 'error'
              })
            })
        })
        .catch(() => {})
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
</style>
