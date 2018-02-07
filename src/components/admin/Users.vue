<template>
<div class="admin-item users-admin">
  <el-table :data="userList">
    <el-table-column
      prop="_id"
      label="_id"
      min-width="110px"
    />
    <el-table-column
      prop="username"
      label="用户名"
    />
    <el-table-column
      prop="password"
      label="密码"
    />
    <el-table-column
      label="是否管理员"
    >
      <template slot-scope="props">{{props.row.isAdmin ? '是' : '否'}}</template>
    </el-table-column>
    <el-table-column label="注册时间">
      <template slot-scope="props">{{parseDate(props.row.created_ts)}}</template>
    </el-table-column>
    <el-table-column
      label="操作"
    >
      <template slot-scope="props">
        <div class="handle-cont">
          <el-button @click="deleteUser(props.row._id, props.$index)">删除</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <pagination :count="userCount" :change="pageChange"></pagination>
  <!-- <el-pagination
    layout="prev, pager, next"
    @current-change="pageChange"
    :page-size="2"
    :total="userCount">
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
    'userList',
    'userCount'
  ]),
  components: {
    Pagination
  },
  methods: {
    getUserList () {
      this.$store.dispatch('getUserList', this.queryParams)
        .then(res => {
        })
        .catch(err => {
          console.log(err)
          this.$message({
            message: '获取用户列表失败',
            type: 'error'
          })
        })
    },
    deleteUser (_id, index) {
      this.$confirm('删除用户？', '提示')
        .then(() => {
          this.$store.dispatch('deleteUser', {
            _id,
            index
          }).then(data => {
            this.$message({
              message: '删除用户成功',
              type: 'success'
            })
          }).catch(err => {
            this.$message({
              message: '删除用户失败',
              type: 'error'
            })
            console.log(err)
          })
        })
        .catch(() => {})
    },
    pageChange () {
      this.getUserList()
    }
  }
}
</script>
