<template>
<div class="admin-item users-admin">users</div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('getUserList')
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
