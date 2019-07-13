<template lang="pug">
  main
    #panel-switch
      #switch
        span(@click="switchToTweets" :class="{ active: showTweets === true }") Tweets
        span(@click="switchToUsers" :class="{ active: showUsers === true }") Users
    #panel
      transition(name="fade" mode="in-out")
        #tweets(v-show="showTweets")
          template(v-for="tweet in tweets")
            tweet#tweet(:tweet="tweet" :user="tweet.User" :account="account" :key="tweet.id")
            .delete(@click="removeTweet(tweet)") Delete
      transition(name="fade" mode="in-out")
        #users(v-show="showUsers")
          span Name
          span Tweets
          span Follwers
          span Followings
          span Likes
          template(v-for="user in users")
            .user(:key="user.id")
              router-link.user-name(:to="`/users/${user.id}/tweets`") {{user.name}}
              router-link.user-tweets(:to="`/users/${user.id}/tweets`") {{isZero(user.Tweets)}}
              router-link.user-followers(:to="`/users/${user.id}/followers`") {{isZero(user.Followers)}}
              router-link.user-followings(:to="`/users/${user.id}/followings`") {{isZero(user.Followings)}}
              router-link.user-likes(:to="`/users/${user.id}/likes`") {{LikedUsers(user.Tweets)}}

</template>

<script>
import Tweet from '@/components/Tweet.vue'
import UserCard from '@/components/UserCard.vue'
import ReplyCard from '@/components/ReplyCard.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'admin',
  components: {
    Tweet,
    UserCard,
    ReplyCard
  },
  data () {
    return {
      showTweets: true,
      showUsers: false,
      showReplies: false
    }
  },
  computed: {
    ...mapState('tweet', {
      tweets: state => state.tweets
    }),
    ...mapState('account', {
      account: state => state
    }),
    ...mapState('user', {
      users: state => state.users
    })
  },
  methods: {
    ...mapActions('tweet', ['deleteTweet']),
    removeTweet (tweet) {
      this.deleteTweet(tweet)
    },
    switchToTweets () {
      this.showTweets = true
      this.showUsers = false
    },
    switchToUsers () {
      this.showTweets = false
      this.showUsers = true
    },
    isZero (data) {
      return !data ? 0 : data.length
    },
    LikedUsers (tweets) {
      let likeCounts = 0
      if (tweets) {
        tweets.forEach(tweet => {
          if (tweet.LikedUsers) {
            likeCounts = likeCounts + tweet.LikedUsers.length
          }
          return likeCounts
        })
      }
      return likeCounts
    }
  }
}

</script>

<style lang="scss" scoped>
  main {
    margin: 0 auto;
    width: 85%;
    height: 100%;
    display: grid;
    grid-template-rows: 80px 20px auto;
    grid-template-columns: 1fr;
    justify-self: center;
    #panel-switch {
      .active {
        color: #1da1f2;
        border-bottom: 1px solid #1da1f2;
      }
      grid-row: 1;
      display: flex;
      flex-flow: row nowrap;
      justify-content: start;
      align-items: center;
      #switch {
        width: 200px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-evenly;
      }
      span {
        color: #1da1f2;
        cursor: pointer;
        font-size: 1.5em;
        &:hover {
          color: #1da1f2;
          transition: background 0.2s linear;
          border-bottom: 1px solid #1da1f2;
        }
      }
    }
    #panel {
      grid-row: 3;
      height: 100%;
      // overflow-x: auto;
      padding-bottom: 5%;
    }
    #tweets {
      display: grid;
      grid-template-columns: 30% 20%;
      grid-auto-rows: auto;
      grid-row-gap: 50px;
      justify-content: center;
      justify-items: center;
      #tweet {
        width: 95%;
        height: auto;
        grid-column: 1;
      }
    }
    .delete {
      grid-column: 2;
      color: #FFF;
      width: 75px;
      height: 35px;
      align-self: self-start;
      margin-top: 10px;
      text-align: center;
      text-indent: 20px;
      padding: 0 10px;
      border-radius: 3px;
      line-height: 35px;
      box-shadow: 0px 0px 1px #213741;
      background: #f34642 url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBkPSJNNDI0LjU2MiA3OC4wMjJ2NDAuMDMySDg3LjQzOFY3OC4wMjJoOTQuOTM4YzE1LjQ2NCAwIDI4LTEyLjU0NiAyOC0yOC4wMjJoOTEuMjUgYzAgMTUuNSAxMi41IDI4IDI4IDI4LjAyMkg0MjQuNTYyeiBNNDA2LjMzNCAxNDguMDc5VjQ2MkgxMDUuNjY2VjE0OC4wNzlINDA2LjMzNHogTTE5Ny4zMzMgMjEwLjUgYzAtOC4yOTEtNi43MTYtMTUuMDEyLTE1LTE1LjAxMnMtMTUgNi43MjEtMTUgMTUuMDEydjE5MC4xNTNjMCA4LjMgNi43IDE1IDE1IDE1LjAxMnMxNS02LjcyMSAxNS0xNS4wMTJWMjEwLjQ2MnogTTI3MSAyMTAuNDYyYzAtOC4yOTEtNi43MTYtMTUuMDEyLTE1LTE1LjAxMnMtMTUgNi43MjEtMTUgMTUuMDEydjE5MC4xNTNjMCA4LjMgNi43IDE1IDE1IDE1LjAxMnMxNS02LjcyMSAxNS0xNS4wMTIgVjIxMC40NjJ6IE0zNDQuNjY3IDIxMC40NjJjMC04LjI5MS02LjcxNi0xNS4wMTItMTUtMTUuMDEycy0xNSA2LjcyMS0xNSAxNS4wMTJ2MTkwLjE1M2MwIDguMyA2LjcgMTUgMTUgMTUgczE1LTYuNzIxIDE1LTE1LjAxMlYyMTAuNDYyeiIgc3R5bGU9ImZpbGw6ICNGRkY7Ii8+PC9zdmc+") no-repeat 10px center;
      background-size: 17px;
      -webkit-transition: background 0.3s;
      -moz-transition: background 0.3s;
      -o-transition: background 0.3s;
      transition: background 0.3s;
      &:hover {
          background-color: #713031;
          cursor: pointer;
      }
    }
    .fade-enter-active, .fade-leave-active {
      transition: all 0.2s ease;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
    #users {
      width: 85%;
      margin: 0 auto;
      background-color: #fff;
      border-top: 1px solid rgba(0,0,0,0.25);
      border-left: 1px solid rgba(0,0,0,0.25);
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-areas: "Name Tweets Follwers Followings Likes";
      grid-template-rows: 50px auto;
      justify-content: center;
      align-items: center;
      justify-items: center;
      > span {
        border-right: 1px solid rgba(0,0,0,0.25);
        border-bottom: 1px solid rgba(0,0,0,0.25);
        color: #66757f;
        font-size: 1.2em;
      }
      > * {
        font-size: 1.5em;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &:nth-child(1) {
        grid-area: Name;
      }
      &:nth-child(2) {
        grid-area: Tweets;
      }
      &:nth-child(3) {
        grid-area: Follwers;
      }
      &:nth-child(4) {
        grid-area: Followings;
      }
      &:nth-child(5) {
        grid-area: Likes;
      }
      .user {
        &:hover {
          background-color: rgba(245, 248, 246, 0.993);
          // background-color: #1da0f2fb;
          transition: background 0.1s linear;
        }
        height: 100%;
        grid-column: 1 / span 5;
        height: 50px;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-areas: "Name Tweets Follwers Followings Likes";
        > * {
          border-bottom: 1px solid rgba(0,0,0,0.25);
          border-right: 1px solid rgba(0,0,0,0.25);
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: #1c94e0;
        }
        &:nth-child(1) {
          grid-area: Name;
        }
        &:nth-child(2) {
          grid-area: Tweets;
        }
        &:nth-child(3) {
          grid-area: Follwers;
        }
        &:nth-child(4) {
          grid-area: Followings;
        }
        &:nth-child(5) {
          grid-area: Likes;
        }
      }
    }
  }
</style>
