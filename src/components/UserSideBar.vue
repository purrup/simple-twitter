<template lang="pug">
  div(id="user-profile")
    div
      div(:style="`background-image: url(${currentUser.avatar})`")
      h3 {{currentUser.name}}
      p(v-if="user.introduction") {{user.introduction.substring(0, 50)}}
      p(v-else) no introduction yet
    div
      router-link(:to="`/users/${currentUser.id}/tweets`" tag="p") Tweets {{currentUser.Tweets.length}}
      router-link(:to="`/users/${currentUser.id}/followings`" tag="p") Followings {{currentUser.Followings.length}}
      router-link(:to="`/users/${currentUser.id}/followers`" tag="p") Followers {{currentUser.Followers.length}}
      router-link(:to="`/users/${currentUser.id}/likes`" tag="p") like {{currentUser.LikedTweets.length}}
    router-link(v-if="user.id === account.id" :to="`/users/${account.id}/edit`" tag="button") Edit Profile
    button(v-else-if="isFollowing" @click="unfollow") Unfollow
    button(v-else @click="follow") Follow
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  props: {
    user: Object
  },
  data () {
    return {
      currentUser: Object
    }
  },
  computed: {
    ...mapState('account', {
      account: state => state
    }),
    isFollowing () {
      return this.account.Followings.some(item => item.id === this.currentUser.id)
    }
  },
  beforeMount () {
    this.currentUser = this.user.id === this.account.id ? this.account : this.user
  },
  methods: {
    ...mapActions('account', ['addFollowing', 'removeFollowing']),
    ...mapMutations('user', ['ADD_FOLLOWER', 'REMOVE_FOLLOWER']),
    follow () {
      this.addFollowing({ UserId: this.currentUser.id })
      this.ADD_FOLLOWER(this.account)
    },
    unfollow () {
      this.REMOVE_FOLLOWER({ accountId: this.account.id })
      this.removeFollowing({ UserId: this.currentUser.id })
    }
  }

}
</script>

<style lang="scss" scoped>
#user-profile {
  // background-color: #fff;
  display: grid;
  grid-template-rows: 300px 130px 50px;
  grid-row-gap: 20px;

  > div:nth-child(1) {
    display: grid;
    grid-template-rows: 150px 30px 100px;
    grid-row-gap: 10px;
    justify-items: flex-start;
    > div {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      width: 100%;
    }
    > h3 {
      margin: 0;
      font-size: 22px;
      color: #1da1f2;
    }
    > p {
      margin: 0;
      line-height: 1;
      color: #719ece;
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
      cursor: pointer;
      color: #4c4c4c;
      font-weight: 500;
      font-size: 18px;
      margin: 0;
    }
  }
  > button {
    &:hover {
      background-color: #006dbf;
      transition: background 0.2s linear;
    }
    width: 90%;
    font-size: 1.3em;
    cursor: pointer;
    border-radius: 8px;
    -moz-border-radius: 8px;
    -webkit-border-radius: 8px;
    font-weight: 600;
    background-color: #1da1f2;
    color: #fff;
  }
}
</style>
