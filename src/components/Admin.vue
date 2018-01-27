<template>
<div class="admin-container" :style="{height: winHeight + 'px'}">
  <div class="admin-header">
    <div class="router-cont">
      <router-link v-for="(item, index) in routerData" :key="index" :to="item.path" :class="[item.active ? 'active': '', 'router-link']" active-class="active">{{item.label}}</router-link>
    </div>
    <a href="javascript:void(0);" class="router-link" @click="logout()">退出</a>
  </div>
  <router-view></router-view>
</div>
</template>

<script>
export default {
  data () {
    return {
      winHeight: 0,
      routerData: [
        {
          path: '/admin/users',
          label: '用户管理'
        },
        {
          path: '/admin/category',
          label: '分类管理'
        },
        {
          path: '/admin/topics',
          label: '帖子管理'
        }
      ]
    }
  },
  created () {
    this.winHeight = window.innerHeight
  },
  watch: {
    '$route': (route) => {
      if (/category/.test(route.path)) {
        console.log(this.$state)
        // this.routerData[1].active = true
      }
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('setUserInfo', null)
      this.$cookie.delete('_id')
      this.$cookie.delete('_id.sig')
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-container {
  display: flex;
  flex-direction: column;
}
.admin-header {
  display: flex;
  border-bottom: solid 1px #e6e6e6;
  background-color: #fff;
  background: linear-gradient(to bottom, #fff, #eaeaea);
}
.router-cont {
  display: flex;
  flex-grow: 1;
}
.router-link {
  position: relative;
  line-height: 60px;
  color: #888;
  margin: 0 5px;
  padding: 0 10px;
  transition: all ease .1s;
  &:hover, &.active {
    color: #333;
  }
  &.active:after {
    content: '';
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    height: 2px;
    background-color: #409eff;
  }
}
.admin-item {
  padding: 10px;
  flex-grow: 1;
  background-color: #fff;
}
</style>
