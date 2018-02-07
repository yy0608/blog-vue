<template>
<div class="admin-item category-admin">
  <div class="title-cont">
    <div class="title">分类列表</div>
    <el-button size="mini" @click="goAdd">添加分类</el-button>
  </div>
  <el-table :data="categoryList">
    <el-table-column prop="_id" label="_id" min-width="110px"></el-table-column>
    <el-table-column prop="name" label="分类名称"></el-table-column>
    <el-table-column prop="desc" label="分类描述"></el-table-column>
    <el-table-column label="创建时间">
      <template slot-scope="props">{{parseDate(props.row.created_ts)}}</template>
    </el-table-column>
    <el-table-column label="更新时间">
      <template slot-scope="props">{{props.row.updated_ts ? parseDate(props.row.updated_ts) : '未修改'}}</template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="props">
        <el-button size="mini" @click="editCategory(props.row._id)">编辑</el-button>
        <el-button size="mini" @click="deleteCategory(props.$index, props.row._id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <pagination :change="pageChange" :count="categoryCount"></pagination>
  <!-- <el-pagination
    layout="prev, pager, next"
    @current-change="pageChange"
    :page-size="2"
    :total="categoryCount">
  </el-pagination> -->
</div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '../Pagination.vue'
import { parseDate } from '@/utils'

export default {
  data () {
    return {
      parseDate
    }
  },
  computed: mapState([
    'page',
    'limit',
    'categoryList',
    'categoryCount'
  ]),
  components: {
    Pagination
  },
  methods: {
    getCategoryList () {
      this.$store.dispatch('getCategoryList')
        .then(() => {
        })
        .catch(err => {
          console.log(err)
          this.$message({
            message: '获取分类列表出错',
            type: 'error'
          })
        })
    },
    deleteCategory (index, _id) {
      this.$confirm('确认删除这条分类？', '提示')
        .then(() => {
          this.$store.dispatch('deleteCategory', {
            _id,
            index
          })
            .then(() => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
            })
            .catch(err => {
              console.log(err)
              this.$message({
                message: '删除分类失败',
                type: 'error'
              })
            })
        })
        .catch(() => {
        })
    },
    editCategory (_id) {
      this.$router.push({
        path: '/admin/category_add',
        query: { _id }
      })
    },
    goAdd () {
      this.$router.push({
        path: '/admin/category_add'
      })
    },
    pageChange (page) {
      this.getCategoryList()
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
