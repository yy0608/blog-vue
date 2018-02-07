<template>
<div class="home-container">
  <div class="bf header-cont">
    <!-- <div class="top-bg"></div> -->
    <nav-cont></nav-cont>
  </div>
  <div class="center-cont">
    <router-view></router-view>
    <!-- <topic-list></topic-list> -->
    <login-register></login-register>
  </div>
</div>
</template>

<script>
import LoginRegister from '@/components/LoginRegister'
// import TopicList from '@/components/TopicList'
import NavCont from '@/components/NavCont'

export default {
  components: {
    LoginRegister,
    // TopicList,
    NavCont
  }
}
</script>

<style lang="scss">
.home-container {
  display: flex;
  flex-direction: column;
  .center-cont {
    display: flex;
    width: 1200px;
    margin: 0 auto;
    margin-top: 10px;
  }
}
</style>
