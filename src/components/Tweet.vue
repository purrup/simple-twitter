<template lang="pug">
  div(class="tweets")
    img(:src="user.avatar")
    div
      div
        router-link(:to="`/users/${user.id}/tweets`" tag="span") @{{user.name}}
        span , {{tweet.createdAt}}
      p {{tweet.description.substring(0, 50)}}
      div
        router-link(:to="`/tweets/${tweet.id}/replies`" class="reply" tag="span") Reply({{tweet.Replies.length}})
        span(v-if="isLiked" @click="deleteLike(account.id, tweet.id)" class="like") Unlike({{likedUsers.length}})
        span(v-else @click="postLike(account.id, tweet.id)" class="like") Like({{likedUsers.length}})
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'tweet',
  props: {
    tweet: Object,
    user: Object,
    account: Object
  },
  data () {
    return {
      likedTweets: [],
      likedUsers: []
    }
  },
  beforeMount () {
    this.likedTweets = this.account.LikedTweets.slice()
    this.likedUsers = this.tweet.LikedUsers
  },
  computed: {
    isLiked () {
      return this.likedTweets.some(item => item.id === this.tweet.id)
    }
  },
  methods: {
    ...mapActions('tweet', ['addLike', 'removeLike']),
    postLike (accountId, tweetId) {
      this.likedUsers.push({ id: accountId })
      this.likedTweets.push({ id: tweetId })
      this.addLike({ accountId, tweetId })
    },
    deleteLike (accountId, tweetId) {
      const tweetIndex = this.likedTweets.findIndex(item => item.id === tweetId)
      this.likedTweets.splice(tweetIndex, 1)
      const userIndex = this.likedUsers.findIndex(item => item.id === accountId)
      this.likedUsers.splice(userIndex, 1)
      this.removeLike({ accountId, tweetId })
    }
  }
}
</script>

<style lang="scss" scoped>
  .tweets {
    font-size: 16px;
    border: 1px solid #B2B4B2;
    border-radius: 3px;
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
          color: #4D85C2;
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
          color: #76A9D1;
          padding-right: 10px;
        }
        .like {
          color: #FC7E82;
        }
      }

    }
  }
</style>
