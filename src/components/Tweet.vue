<template lang="pug">
  #tweets
    div(class="tweet")
      img(:src="user.avatar" :alt="user.name")
      div
        div
          router-link(:to="`/users/${user.id}/tweets`" tag="span") @{{user.name}}
          span , {{date}}, {{time}}
        p {{tweet.description.substring(0, 50)}}
        div
          .reply-like
            router-link(:to="`/tweets/${tweet.id}/replies`" class="reply" tag="span") Reply({{tweet.Replies.length}})
            span(v-if="isLiked" @click="deleteLike(account.id, tweet.id)" class="like") Unlike({{tweet.LikedUsers.length}})
            span(v-else @click="postLike(account.id, tweet.id)" class="like") Like({{tweet.LikedUsers.length}})
      button.drop-down(
        v-if="tweet.Replies.length !== 0 && this.$route.path.includes('admin')"
        @click="showReplies = !showReplies")
        i(v-if="showReplies === false").fas.fa-angle-left
        i(v-else-if="showReplies === true").fas.fa-angle-down
    transition(name="reply-fade")
      #replies(v-show="showReplies")
          template(v-for="reply in tweet.Replies")
            reply-card(:reply="reply" :key="reply.id")
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import ReplyCard from '@/components/ReplyCard.vue'

export default {
  name: 'tweet',
  props: {
    tweet: Object,
    user: Object,
    account: Object
  },
  components: {
    ReplyCard
  },
  data () {
    return {
      showReplies: false
    }
  },
  computed: {
    isLiked () {
      return this.account.LikedTweets.some(item => item.id === this.tweet.id)
    },
    date () {
      const dateObj = new Date(this.tweet.createdAt)
      const month = (dateObj.getMonth() + 1) < 10 ? '0' + (dateObj.getMonth() + 1) : (dateObj.getMonth() + 1)
      return dateObj.getFullYear() + '-' + month + '-' + dateObj.getDate()
    },
    time () {
      const dateObj = new Date(this.tweet.createdAt)
      return dateObj.getHours() + ':' + dateObj.getMinutes()
    }
  },
  methods: {
    ...mapMutations('account', ['ADD_ACCOUNT_LIKE', 'REMOVE_ACCOUNT_LIKE']),
    ...mapMutations('tweet', ['ADD_TWEET_LIKE', 'REMOVE_TWEET_LIKE', 'ADD_TWEETS_LIKE', 'REMOVE_TWEETS_LIKE']),
    ...mapMutations('user', ['ADD_USER_TWEET_LIKE', 'REMOVE_USER_TWEET_LIKE']),
    ...mapActions('tweet', ['addLike', 'removeLike']),
    postLike (accountId, tweetId) {
      if (this.$route.path === '/tweets' ||
      this.$route.path.includes('likes') ||
      this.$route.path.includes('admin')) {
        console.log('add like in homepage or Like page or admin page')
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
      if (this.$route.path === '/tweets' ||
      this.$route.path.includes('likes') ||
      this.$route.path.includes('admin')) {
        console.log('remove like in homepage or Like page or admin page')
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
    },
    toggleReplies () {
      this.showReplies = !this.showReplies
    }
  }
}
</script>

<style lang="scss" scoped>
.tweet {
  grid-row: 1;
  min-width: 390px;
  max-height: 150px;
  width: 450px;
  font-size: 16px;
  background-color: #fff;
  border: 1px solid #a0cfee;
  border-radius: 5px;
  padding: 10px;
  display: grid;
  grid-template-columns: 85px 1fr 40px;
  grid-auto-rows: 85px;
  grid-column-gap: 20px;
  align-content: center;

  > img {
    border-radius: 50%;
    width: 75px;
    height: 75px;
    align-self: center;
  }
  > div {
    width: 100%;
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
      width: 100％;
      // display: grid;
      // grid-template-columns: 40% 10%;
      // grid-column-gap: 50%;
      // display: flex;
      // flex-flow: row nowrap;
      // justify-content: space-between;
      align-items: center;
      .reply-like {
        grid-column: 1;
      }
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
.drop-down {
  &:hover {
    cursor: pointer;
  }
  align-self: flex-end;
  grid-column: 3;
  font-size: 1.3em;
  padding: 0 10px 0 10px;
  border: none;
  outline: none;
  color: #666;
}
#replies {
  width: 490px;
  grid-row: 2;
  grid-auto-rows: 120px;
}
.reply-fade-enter-active, .reply-fade-leave-active {
  transition: all 0.3s ease;
}
.reply-fade-enter, .reply-fade-leave-to {
  opacity: 0;
}
.reply-fade-enter-to, .reply-fade-leave {
  opacity: 1;
}
</style>
