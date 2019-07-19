<template lang="pug">
  div(id="content")
    div(class="container")
      user-side-bar#user-profile(:user="user")
      main
        h3  Follower
        div(id="followers")
          template(v-for="follower in followers")
            user-card(:user="follower" :account="account" :key="follower.id")

</template>

<script>
import Tweet from '@/components/Tweet.vue'
import UserSideBar from '@/components/UserSideBar.vue'
import UserCard from '@/components/UserCard.vue'
import { mapState } from 'vuex'

export default {
  name: 'follower',
  components: {
    Tweet,
    UserSideBar,
    UserCard
  },
  // data () {
  //   return {
  //  }
  // },
  computed: {
    ...mapState('user', {
      user: state => state.user
    }),
    ...mapState('account', {
      account: state => state
    }),
    followers () {
      return this.user.Followers
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  #content {
    height: 100%;
    h3 {
      padding-bottom: 15px;
      text-align: left;
      margin: 0;
      font-size: 22px;
      color:#1da1f2;
    }
    .container {
      width: 75%;
      display: grid;
      grid-template-columns: 150px auto;
      grid-column-gap: 90px;
    }

    #user-profile {
      display: grid;
      grid-template-rows: 300px 130px 50px;
      grid-row-gap: 20px;

      > div:nth-child(1) {
        display: grid;
        grid-template-rows: 150px 30px 100px;
        grid-row-gap: 10px;
        justify-items: flex-start;
        > img {
          width: 100%;
        }
        > h3 {
          margin: 0;
          font-size: 22px;
          color:#3D8293;
        }
        > p {
          margin: 0;
          line-height: 1;
          color: #719ECE;
          font-weight: 500;
          text-align: left;
        }
      }

      > div:nth-child(2) {
        display: grid;
        grid-template-rows: 25px 25px 25px 25px;
        grid-row-gap: 10px;
        justify-items: flex-start;
        > p {
          color: #4C4C4C;
          font-weight: 500;
          font-size: 18px;
          margin: 0;
        }
      }
      > button {
        width: 90%;
        font-size: 18px;
        color: #113743;
        background-color: #71a6d0;
        font-weight: 500;
        border: none;
        border-radius: 8px;
      }
    }
    #followers {
      grid-column: 1 / span 2;
      height: 70%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: 150px;
      grid-auto-flow: row;
      grid-column-gap: 20px;
      grid-row-gap: 15px;
      overflow-y: scroll;
    }
  }
</style>
