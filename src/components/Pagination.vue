<template>
<el-pagination
  layout="total, sizes, prev, pager, next, jumper"
  @current-change="pageChange"
  @size-change="sizeChange"
  :page-sizes="[2, 4, 6, 8]"
  :current-page="page"
  :page-size="limit"
  :total="count">
</el-pagination>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState([
    'page',
    'limit'
  ]),
  created () {
    let query = this.$route.query
    if (Object.keys(query).sort().toString() === ['page', 'limit'].sort().toString()) {
      let page = parseInt(query.page)
      let limit = parseInt(query.limit)
      if (!isNaN(page) && !isNaN(limit)) {
        this.$store.commit('changePage', page)
        this.$store.commit('changeLimit', limit)
      }
    }
    this.change()
  },
  props: [ 'count', 'change' ],
  methods: {
    pageChange (val) {
      this.$store.commit('changePage', val)
      this.$router.push({
        path: this.$route.path,
        query: { page: this.page, limit: this.limit }
      })
      this.change()
    },
    sizeChange (val) {
      this.$store.commit('changeLimit', val)
      this.$router.push({
        path: this.$route.path,
        query: { page: this.page, limit: this.limit }
      })
      this.change()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-pagination {
  padding: 20px 0;
}
</style>
