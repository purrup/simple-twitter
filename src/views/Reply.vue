<template lang="pug">
  div(id="content")
    div(class="container")
      user-side-bar(:user="user")
      main
        div(id="user-tweets")
          h3  Tweets
          tweet(:tweet="tweet" :user="tweet.User" :account="account")
        div
          h3  Replies
          div(id="replies")
            template(v-for="reply in tweet.Replies")
              reply-card(:reply="reply" :key="reply.id")
          div(id="reply-input")
            textarea(name="text" id="text" cols="30" rows="10" v-model="replyContent")
            button(@click="checkBeforePost(tweet.id)") Reply
</template>

<script>
import Tweet from '@/components/Tweet.vue'
import ReplyCard from '@/components/ReplyCard.vue'
import UserSideBar from '@/components/UserSideBar.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'profile',
  components: {
    Tweet,
    ReplyCard,
    UserSideBar
  },
  computed: {
    ...mapState('tweet', {
      tweet: state => state.tweet
    }),
    ...mapState('user', {
      user: state => state
    }),
    ...mapState('account', {
      account: state => state
    }),
    likes () {
      return this.tweets.map(tweet => tweet.likeCounts).reduce((a, b) => a + b)
    }
  },
  data () {
    return {
      replyContent: ''
    }
  },
  methods: {
    ...mapActions('tweet', ['postReply']),
    checkBeforePost (tweetId) {
      if (this.replyContent === '') {
        alert('請填入資訊！')
        return
      }
      this.postReply({ id: tweetId, comment: this.replyContent, account: this.account })
      this.replyContent = ''
    }
  }
}
</script>

<style lang="scss" scoped>
#content {
  height: 100%;
  h3 {
    justify-self: self-start;
    margin: 0;
    font-size: 22px;
    color: #71a6d0;
  }
  .container {
    width: 75%;
    display: grid;
    grid-template-columns: 150px 690px;
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
  main {
    grid-column: 2;
    display: grid;
    grid-template-rows: 200px auto 300px 200px;
    grid-row-gap: 20px;
    h3 {
      padding-bottom: 15px;
      text-align: left;
    }
    #user-tweets {
      grid-row: 1;
      display: grid;
      grid-template-rows: 27px 150px;
      grid-row-gap: 20px;
    }
    #replies {
      grid-row: 2;
      display: grid;
      height: 350px;
      grid-template-rows: auto;
      grid-row-gap: 10px;
      overflow-y: scroll;
    }
    #reply-input {
      padding-top: 30px;
      grid-row: 3;
      display: grid;
      grid-auto-rows: 50px;
      grid-auto-flow: row;
      grid-row-gap: 30px;
      textarea {
        border: 2px solid #1da1f2;
        border-radius: 10px;
        width: 49%;
        height: 100%;
        resize: none;
        outline: none;
        font-size: 20px;
        padding: 3px;
      }
      button {
        width: 100px;
        height: 50px;
        &:hover {
          background-color: #eaf5fd;
          color: #1da1f2;
          transition: background 0.2s linear;
          text-align: center;
        }
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
}
</style>
