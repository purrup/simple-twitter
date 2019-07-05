<template lang="pug">
  div(id="app")
    navbar(v-if="$route.path !== '/logout'")
    router-view
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
#app {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  display: grid;
  grid-template-rows: 60px auto;
  grid-row-gap: 30px;
}
.container {
  width: 80%;
  height: 100%;
  margin: 0 auto;
}
</style>
