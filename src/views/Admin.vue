<template lang="pug">
  main
    #panel-switch
      span Tweets
      //- span |
      span Users
    .container
      template(v-for="tweet in tweets")
        tweet(:tweet="tweet" :user="tweet.User" :account="account" :key="tweet.id")
</template>

<script>
import Tweet from '@/components/Tweet.vue'
import { mapState } from 'vuex'

export default {
  name: 'admin',
  component: {
    Tweet
  },
  data () {
    return {
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
  }
}

</script>

<style lang="scss" scoped>
  main {
    width: 80%;
    display: grid;
    grid-template-rows: 100px 20px auto;
    grid-template-areas: "panel-switch . panel";
    justify-self: center;
    #panel-switch {
      grid-area: "panel-switch";
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      span {
        padding: 0 15px;
        color: #1da1f2;
        cursor: pointer;
        font-size: 1.5em;
        &:hover {
          // background-color: #eaf5fd;
          color: #1da1f2;
          transition: background 0.2s linear;
          border-bottom: 1px solid #1da1f2;
        }
      }
    }
    .container {
      grid-area: "panel";
      display: grid;

    }
  }
</style>
