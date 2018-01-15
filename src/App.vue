<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">
body {
  font-size: 14px;
  color: #333;
  background-color: #f5f5f5;
}
a {
  text-decoration: none;
  color: #333;
}
.normal-button {
  display: block;
  width: 280px;
  line-height: 32px;
  text-align: center;
  border-radius: 4px;
  background-color: #14a0f3;
  color: #fff;
}
</style>
