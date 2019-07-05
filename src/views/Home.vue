<template lang="pug">
  div(id="content")
    div(class="container")
      div(id="main")
        div(id="send-tweets")
          textarea(name="text" id="text" cols="30" rows="10" v-model="description")
          button(@click="checkBeforePost") Tweet
        div(id="tweets")
          template(v-for="tweet in tweets")
            tweet(:tweet="tweet" :user="tweet.User" :account="account" :key="tweet.id")
      div(id="side-bar")
        h3 Popular
        div(id="topUsers")
          template(v-for="user in topUsers")
            user-card(:user="user" :account="account" :key="user.id")
</template>

<script>
import Tweet from '@/components/Tweet.vue'
import UserCard from '@/components/UserCard.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    Tweet,
    UserCard
  },
  data () {
    return {
      description: ''
    }
  },
  computed: {
    ...mapState('tweet', {
      tweets: state => state.tweets
    }),
    ...mapState('account', {
      account: state => state
    }),
    ...mapState('topUsers', {
      topUsers: state => state
    })
  },
  methods: {
    ...mapActions('tweet', ['postTweet']),
    checkBeforePost () {
      if (this.description === '') {
        alert('請填入資訊！')
        return
      } else if (this.description.length > 140) {
        alert('長度必須小於140字！')
        return
      }
      this.postTweet({ description: this.description })
      this.description = ''
    }
  }
}
</script>

<style lang="scss" scoped>
#content {
  height: 100%;
  .container {
    display: grid;
    grid-template-columns: 3fr 80px 2fr;
    grid-template-areas: "left . right";

    #main {
      grid-area: left;
      display: grid;
      grid-template-rows: 250px 400px;
      grid-row-gap: 40px;
      #send-tweets {
        display: grid;
        grid-template-rows: 200px 30px;
        grid-row-gap: 20px;
        > textarea {
          padding: 0;
          border: 2px solid #a5cbde;
          border-radius: 4px;
          width: 100%;
          height: 100%;
          resize: none;
          outline: none;
          font-size: 20px;
          padding: 3px;
        }
        > button {
          font-size: 16px;
          color: #113743;
          background-color: #71a6d0;
          border-radius: 4px;
          line-height: 30px;
          width: 80px;
          justify-self: flex-end;
          font-weight: 500;
        }
      }
      #tweets {
        display: grid;
        grid-auto-rows: 150px;
        grid-auto-flow: row;
        grid-row-gap: 30px;
        overflow-y: scroll;
      }
    }
    #side-bar {
      grid-area: right;
      display: grid;
      grid-template-rows: 27px 643px;
      grid-row-gap: 20px;

      > h3 {
        font-size: 20px;
        margin: 0;
        color: #01687e;
        text-align: left;
      }
      #topUsers {
        display: grid;
        grid-auto-rows: 150px;
        grid-auto-flow: row;
        grid-row-gap: 20px;
        overflow-y: scroll;
      }
    }
  }
}
</style>
