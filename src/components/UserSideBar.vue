<template lang="pug">
  div(id="user-profile")
    div
      img(:src="user.avatar")
      h3 {{user.name}}
      p {{user.introduction}}
    div
      p Tweets {{user.Tweets.length}}
      p Followings {{user.Followings.length}}
      p Followers {{user.Followers.length}}
      p like {{user.LikedTweets.length}}
    router-link(v-if="user.id === account.id" :to="`/users/${user.id}/edit`" tag="button") Edit Profile
    span(v-else) Follow/Unfollow
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    user: Object
  },
  computed: {
    ...mapState('account', {
      account: state => state
    })
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
</style>
