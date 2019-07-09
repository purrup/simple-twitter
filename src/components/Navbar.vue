<template lang="pug">
  div(id="navbar" v-if="$route.path !== '/login'")
    div(class="container")
      router-link.home(to="/tweets")
        i.fas.fa-home
      router-link.logo(to="/tweets")
        i.fab.fa-twitter.twitter-icon
      router-link(to="/admin/tweets" tag="span" v-if="account.role === 'admin' ") admin
      template(v-if="account.isLogin")
        router-link.user-profile-img(:to="`/users/${account.id}/tweets`")
          img(:src="account.avatar" :alt="account.name")
        button(@click="logout") Logout
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
        this.$store.dispatch('notification/setSuccessMessage', 'Log Out Successfully.')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#navbar {
  height: 50px;
  padding: 15px 0px;
  background-color: #fff;
  border-bottom: 1px solid rgba(0,0,0,0.25);
  .container {
    width: 80%;
    margin: 0 auto;
    display: grid;
    grid-template-rows: 50px;
    grid-template-columns: 150px 1.25fr 150px 0.75fr 100px 10px 100px;
    grid-template-areas: "home . left-logo . admin right-logo . button";
    a {
      align-self: center;
    }
    .home {
      grid-area: home;
      margin: 0;
      color: #1da1f2;
      font-size: 2.5em;
      cursor: pointer;
    }
    .logo {
      grid-area: left-logo;
      margin: 0;
      color: #1da1f2;
      font-size: 2.5em;
      cursor: pointer;
    }
    .user-profile-img {
      grid-area: right-logo;
    }
    img {
      align-self: center;
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    span {
      &:hover {
        background-color: #eaf5fd;
        color: #1da1f2;
        transition: background 0.2s linear;
        border: 1px solid #1da1f2;
      }
      padding: 10px 0;
      border-radius: 20px;
      grid-area: admin;
      font-size: 20px;
      font-weight: 600;
      align-self: center;
      color: #1da1f2;
      cursor: pointer;
    }
    button {
      grid-area: button;
      &:hover {
        background-color: #eaf5fd;
        color: #1da1f2;
        transition: background 0.2s linear;
      }
      font-size: 1em;
      cursor: pointer;
      border-radius: 100px;
      -moz-border-radius: 100px;
      -webkit-border-radius: 100px;
      padding: 12px;
      font-weight: 800;
      border: 1px solid #1da1f2;
      color: #1da1f2;
    }
  }
}
</style>
