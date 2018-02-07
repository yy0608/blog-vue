<template>
<div class="admin-container" :style="{height: winHeight + 'px'}">
  <div class="admin-header">
    <div class="router-cont">
      <router-link v-for="(item, index) in routerData" :key="index" :to="item.path" :class="[item.active ? 'active': '', 'router-link']" active-class="active">{{item.label}}</router-link>
    </div>
    <a href="javascript:void(0);" class="router-link" @click="goIndex">首页</a>
    <a href="javascript:void(0);" class="router-link" @click="logout">退出</a>
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
          label: '文章管理'
        }
      ]
    }
  },
  created () {
    this.winHeight = window.innerHeight
    this.checkPathHasString(this.$route.path)
    this.$watch('$route', function (newVal, oldVal) {
      this.checkPathHasString(newVal.path)
    })
  },
  methods: {
    logout () {
      this.$store.dispatch('setUserInfo', null)
      this.$cookie.delete('_id')
      this.$cookie.delete('_id.sig')
      this.$router.push({
        path: '/'
      })
    },
    checkPathHasString (path) {
      if (/category/.test(path)) {
        this.routerData[1].active = true
      } else {
        this.routerData[1].active = false
      }
      if (/topic/.test(path)) {
        this.routerData[2].active = true
      } else {
        this.routerData[2].active = false
      }
    },
    goIndex (e) {
      this.$router.push('/')
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
  flex-shrink: 0;
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
