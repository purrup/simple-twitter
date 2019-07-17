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
    ...mapActions('notification', ['addError']),
    checkBeforePost () {
      if (this.description === '') {
        this.addError('Please tweet something before submit.')
        return
      } else if (this.description.length > 140) {
        this.addError('長度必須小於140字！')
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
      grid-template-rows: 200px 460px;
      grid-row-gap: 30px;
      justify-content: center;
      #send-tweets {
        display: grid;
        grid-auto-columns: 1fr;
        grid-template-rows: 110px 50px;
        grid-row-gap: 20px;
        width: 100%;
        // justify-items: center;
        // justify-content: center;
        justify-self: center;
        > textarea {
          padding: 0;
          border: 1px solid #a0cfee ;
          border-radius: 10px;
          -moz-border-radius: 10px;
          -webkit-border-radius: 10px;
          width: 100%;
          height: 100%;
          resize: none;
          outline: none;
          font-size: 1.2em;
          padding: 3px;
          &:focus {
            border-color: rgba(0,132,180,0.5);
          }
        }
        > button {
          &:hover {
            background-color: #006dbf;
            transition: background 0.2s linear;
          }
          font-size: 1.3em;
          cursor: pointer;
          border-radius: 100px;
          -moz-border-radius: 100px;
          -webkit-border-radius: 100px;
          padding: 12px 20px;
          font-weight: 600;
          background-color: #1DA1F2;
          color: #fff;
          justify-self: flex-end;
          // border: 1px solid #1da1f2;
        }
      }
      #tweets {
        display: grid;
        grid-auto-rows: 120px;
        grid-auto-flow: row;
        grid-row-gap: 30px;
        overflow-y: scroll;
        justify-content: center;
      }
    }
    #side-bar {
      grid-area: right;
      display: grid;
      grid-template-rows: 27px 643px;
      grid-row-gap: 20px;
      width: 500px;

      > h3 {
        font-size: 1.5em;
        margin: 0;
        color: #1da1f2;
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
