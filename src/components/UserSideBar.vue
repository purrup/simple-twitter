<template lang="pug">
  div(id="user-profile")
    div
      img(:src="currentUser.avatar")
      h3 {{currentUser.name}}
      p {{currentUser.introduction.substring(0, 50)}}
    div
      p Tweets {{currentUser.Tweets.length}}
      p Followings {{currentUser.Followings.length}}
      p Followers {{currentUser.Followers.length}}
      p like {{currentUser.LikedTweets.length}}
    router-link(v-if="user.id === account.id" :to="`/users/${account.id}/edit`" tag="button") Edit Profile
    button(v-else-if="isFollowing" @click="removeFollowing({ UserId: currentUser.id})") Unfollow
    button(v-else @click="addFollowing({ UserId: currentUser.id})") Follow
</template>

<script>
import { mapState, mapActions } from 'vuex'

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
    ...mapActions('account', ['addFollowing', 'removeFollowing'])
  }

}
</script>

<style lang="scss" scoped>
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
      color: #3d8293;
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
      color: #4c4c4c;
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
</style>
