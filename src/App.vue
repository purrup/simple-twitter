<template lang="pug">
  div(id="app")
    navbar(v-if="$route.path !== '/login'")
    router-view
    notification(:error="errorMsg" :success="successMsg")
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Notification from '@/components/Notification.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Navbar,
    Notification
  },
  computed: {
    ...mapState('notification', {
      successMsg: state => state.successMsg,
      errorMsg: state => state.errorMsg
    })
  },
  methods: {
    ...mapActions('notification', ['deleteMessage']),
    deleteMessage () {
      this.deleteMessage()
    }
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
  background-color: #E6ECF0;
}
#app {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  display: grid;
  grid-template-rows: 120px auto;
}
.container {
  width: 80%;
  height: 100%;
  margin: 0 auto;
}
</style>
