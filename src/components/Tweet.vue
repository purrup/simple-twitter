<template lang="pug">
  div(class="tweets")
    img(:src="user.avatar" :alt="user.name")
    div
      div
        router-link(:to="`/users/${user.id}/tweets`" tag="span") @{{user.name}}
        span , {{tweet.createdAt}}
      p {{tweet.description.substring(0, 50)}}
      div
        router-link(v-if="tweet.Replies.length !== 0" :to="`/tweets/${tweet.id}/replies`" class="reply" tag="span") Reply({{tweet.Replies.length}})
        router-link(v-else :to="`/tweets/${tweet.id}/replies`" class="reply" tag="span") Reply(0)
        span(v-if="isLiked" @click="deleteLike(account.id, tweet.id)" class="like") Unlike({{tweet.LikedUsers.length}})
        span(v-else @click="postLike(account.id, tweet.id)" class="like") Like({{tweet.LikedUsers.length}})
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'tweet',
  props: {
    tweet: Object,
    user: Object,
    account: Object
  },
  computed: {
    isLiked () {
      return this.account.LikedTweets.some(item => item.id === this.tweet.id)
    }
  },
  methods: {
    ...mapMutations('account', ['ADD_ACCOUNT_LIKE', 'REMOVE_ACCOUNT_LIKE']),
    ...mapMutations('tweet', ['ADD_TWEET_LIKE', 'REMOVE_TWEET_LIKE', 'ADD_TWEETS_LIKE', 'REMOVE_TWEETS_LIKE']),
    ...mapMutations('user', ['ADD_USER_TWEET_LIKE', 'REMOVE_USER_TWEET_LIKE']),
    ...mapActions('tweet', ['addLike', 'removeLike']),
    postLike (accountId, tweetId) {
      if (this.$route.path === '/tweets') {
        console.log('add like in homepage')
        this.ADD_TWEETS_LIKE({ accountId, tweetId })
      } else if (this.$route.path.includes('users')) {
        console.log('add like in profile')
        this.ADD_USER_TWEET_LIKE({ accountId, tweetId })
      } else {
        console.log('add like in reply')
        this.ADD_TWEET_LIKE({ accountId })
      }
      this.ADD_ACCOUNT_LIKE({ id: tweetId })
      this.addLike({ accountId, tweetId })
    },
    deleteLike (accountId, tweetId) {
      if (this.$route.path === '/tweets') {
        console.log('remove like in homepage')
        this.REMOVE_TWEETS_LIKE({ accountId, tweetId })
      } else if (this.$route.path.includes('users')) {
        console.log('remove like in profile')
        this.REMOVE_USER_TWEET_LIKE({ accountId, tweetId })
      } else {
        console.log('remove like in reply')
        this.REMOVE_TWEET_LIKE({ accountId })
      }
      this.REMOVE_ACCOUNT_LIKE({ tweetId })
      this.removeLike({ accountId, tweetId })
    }
  }
}
</script>

<style lang="scss" scoped>
.tweets {
  width: 500px;
  font-size: 16px;
  background-color: #fff;
  border: 1px solid #a0cfee;
  border-radius: 5px;
  padding: 10px;
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-column-gap: 20px;

  > img {
    width: 100%;
    align-self: center;
  }
  > div {
    display: grid;
    grid-template-rows: 1fr 2fr 1fr;
    grid-row-gap: 5px;
    justify-items: flex-start;
    > div {
      span {
        color: #006dbf;
        font-weight: 600;
        cursor: pointer;
      }
    }
    > p {
      margin: 0;
      text-align: justify;
    }
    > div {
      .reply {
        color: #006dbf;
        padding-right: 10px;
      }
      .like {
        color: #fc7e82;
      }
    }
  }
}
</style>
