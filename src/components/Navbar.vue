<template lang="pug">
  div(id="navbar")
    div(class="container")
      router-link(to="/tweets" tag="h3") Simple Twitter
      template(v-if="account.isLogin")
        img(:src="account.avatar" :alt="account.name")
        span(@click="logout") Logout
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'navbar',
  computed: {
    ...mapGetters('account', {
      account: 'getAccount'
    })
  },
  methods: {
    async logout () {
      try {
        await this.$store.dispatch('account/logout')
        this.$router.push('/login')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#navbar {
  padding: 5px 0px;
  background-color: rgba(44, 161, 242, 0.9);
  .container {
    width: 80%;
    margin: 0 auto;
    display: grid;
    grid-template-rows: 50px;
    grid-template-columns: 150px 1fr 60px 10px 70px;
    grid-template-areas: "left-logo . right-logo . button";
    h3 {
      grid-area: left-logo;
      align-self: center;
      margin: 0;
      font-size: 20px;
      cursor: pointer;
    }
    img {
      grid-area: right-logo;
      width: 100%;
    }
    span {
      grid-area: button;
      font-size: 20px;
      font-weight: 600;
      align-self: center;
      color: #03697f;
      cursor: pointer;
    }
  }
}
</style>
