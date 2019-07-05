<template lang="pug">
  div(id="user-profile")
    div
      img(:src="currentUser.avatar" :alt="user.name")
      h3 {{currentUser.name}}
      p(v-if="user.introduction") {{user.introduction.substring(0, 50)}}
      p(v-else) no introduction yet
    div
      router-link(:to="`/users/${currentUser.id}/tweets`" tag="p") Tweets {{currentUser.Tweets.length}}
      router-link(:to="`/users/${currentUser.id}/followings`" tag="p") Followings {{currentUser.Followings.length}}
      router-link(:to="`/users/${currentUser.id}/followers`" tag="p") Followers {{currentUser.Followers.length}}
      router-link(:to="`/users/${currentUser.id}/likes`" tag="p") like {{currentUser.LikedTweets.length}}
    router-link(v-if="user.id === account.id" :to="`/users/${account.id}/edit`" tag="button") Edit Profile
    span(v-else) Follow/Unfollow
</template>

<script>
import { mapState } from 'vuex'

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
    })
  },
  beforeMount () {
    this.currentUser = this.user.id === this.account.id ? this.account : this.user
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
      cursor: pointer;
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
