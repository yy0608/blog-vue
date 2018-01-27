<template>
<div class="admin-item category-admin">
  <div class="title-cont">
    <div class="title">分类列表</div>
    <el-button size="mini">
      <router-link to="/admin/category_add">添加分类</router-link>
    </el-button>
  </div>
</div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.title-cont {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
