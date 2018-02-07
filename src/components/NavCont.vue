<template>
<div class="nav-cont">
  <div class="nav-inner">
    <div :class="[paramsId === item._id ? 'cur' : '', 'nav-item']" v-for="(item, index) in navData" :key="index" @click="switchCategory(item._id)">{{item.name}}</div>
    <!-- <router-link tag="div" class="nav-item" :to="{path: '/category', params: { _id: item._id }}" v-for="(item, index) in navData" :key="index">{{item.name}}</router-link> -->
  </div>
</div>
</template>

<script>
import axios from 'axios'
import { origin } from '@/config.js'

export default {
  data () {
    return {
      paramsId: '',
      navData: [{
        name: '首页',
        _id: 'index'
      }]
    }
  },
  created () {
    this.paramsId = this.$route.params._id
    this.$watch('$route', function (newVal, oldVal) {
      this.paramsId = newVal.params._id
    })
    this.getTopicList()
  },
  methods: {
    switchCategory (_id) {
      this.$router.push({
        name: 'TopicList',
        params: {
          _id: _id
        }
      })
    },
    getTopicList () {
      axios({
        url: origin + '/category/list',
        method: 'get',
        withCredentials: true
      })
        .then(res => {
          this.navData = this.navData.concat(res.data.category_list)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss">
.nav-cont {
  width: 1200px;
  margin: 0 auto;
  padding: 10px 0;
  .nav-inner {
    display: flex;
    justify-content: center;
  }
  .nav-item {
    padding: 10px;
    cursor: pointer;
    &:hover, &.cur {
      color: #14a0f3;
    }
  }
}
</style>
