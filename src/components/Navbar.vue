<template lang="pug">
  div(id="navbar" v-if="$route.path !== '/login'")
    div(class="container")
      router-link.home(to="/tweets")
        i.fas.fa-home
      router-link.logo(to="/tweets")
        i.fab.fa-twitter.twitter-icon
      router-link.admin.far.fa-user-cog(to="/admin/tweets" tag="i" v-if="account.role === 'admin' ")
      template(v-if="account.isLogin")
        router-link.user-profile-img(:to="`/users/${account.id}/tweets`")
          img(:src="account.avatar" :alt="account.name")
        span.logout(@click="logout") Logout
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
  height: 46px;
  // padding: 15px 0px;
  background-color: #fff;
  border-bottom: 1px solid rgba(0,0,0,0.25);
  .container {
    width: 80%;
    margin: 0 auto;
    display: grid;
    grid-template-rows: 46px;
    grid-template-areas: "home . left-logo . admin . right-logo . logout";
    grid-template-columns: 60px 1fr 150px 1fr 60px 10px 80px 10px 80px;
    a {
      align-self: center;
    }
    .home {
      &:hover {
        color: #1c94e0;
        border-bottom: 2px solid #1c94e0;
        transition: all .15s ease-in-out;
      }
      grid-area: home;
      margin: 0;
      color: #66757f;
      font-size: 30px;
      cursor: pointer;
      line-height: 46px;
      height: 100%;
    }
    .logo {
      grid-area: left-logo;
      margin: 0;
      color: #1da1f2;
      font-size: 30px;
      cursor: pointer;
    }
    .user-profile-img {
      grid-area: right-logo;
      display: flex;
      justify-content: center;
      line-height: 46px;
      height: 100%;
      &:hover {
        color: #1c94e0;
        border-bottom: 2px solid #1c94e0;
        transition: all .15s ease-in-out;
      }
    }
    img {
      align-self: center;
      width: 38px;
      height: 38px;
      border-radius: 50%;
    }
    .admin {
      &:hover {
        color: #1c94e0;
        border-bottom: 2px solid #1c94e0;
        transition: all .15s ease-in-out;
      }
      grid-area: admin;
      line-height: 46px;
      height: 100%;
      font-size: 1.7em;
      font-weight: 600;
      align-self: center;
      color: #66757f;
      cursor: pointer;
    }
    .logout {
      grid-area: logout;
      &:hover {
        color: #1c94e0;
        border-bottom: 2px solid #1c94e0;
        transition: all .15s ease-in-out;
      }
      line-height: 46px;
      height: 100%;
      font-size: 1.2em;
      align-self: center;
      cursor: pointer;
      // padding: 6px 14px;
      font-weight: 800;
      // border: 1px solid #1da1f2;
      color: #66757f;
      text-align: center;
    }
  }
}
</style>
