<template>
<div class="home-container">
  <topic-list></topic-list>
  <login-register></login-register>
</div>
</template>

<script>
import LoginRegister from '@/components/LoginRegister'
import TopicList from '@/components/TopicList'

export default {
  components: {
    LoginRegister,
    TopicList
  }
}
</script>

<style lang="scss">
.home-container {
  display: flex;
}
</style>
