<template lang="pug">
  div(id="content")
    div(class="container")
      div(id="user-profile")
        div
          img(:src="user.image")
          h3 {{user.name}}
          p {{user.description}}
        div
          p Tweets {{tweets.length}}
          p Followings {{user.followings}}
          p Followers {{user.followers}}
          p like {{likes}}
        router-link(:to="`/users/${user.id}/edit`" tag="button") Edit Profile
      main
        div(id="user-tweets")
          h3  Tweets
          template(v-for="tweet in tweets")
            tweet(:tweet="tweet")
        div(id="replies")
          h3  Replies
          template(v-for="reply in replies")
            reply-card(:reply="reply" :key="reply.id")
        div(id="reply-input")
          textarea(name="text" id="text" cols="30" rows="10" v-model="replyContent")
          button(@click="postReply") Reply
</template>

<script>
import Tweet from '@/components/Tweet.vue'
import ReplyCard from '@/components/ReplyCard.vue'

export default {
  name: 'profile',
  components: {
    Tweet,
    ReplyCard
  },
  data () {
    return {
      user: {
        id: 1,
        name: 'miayang0513',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat et dicta laboriosam deleniti quidems.',
        image: 'https://picsum.photos/100',
        followings: 10,
        followers: 20
      },
      tweets: [
        {
          userId: 1,
          username: 'miayang0513',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo vel, nisi, aspernatur quae laudantium dolorum',
          image: 'https://picsum.photos/100',
          createdAt: new Date().toISOString(),
          replyCounts: 3,
          likeCounts: 10
        }
      ],
      replies: [
        {
          id: 1,
          tweetId: 1,
          userId: 1,
          username: 'miayang0513',
          comment:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo vel, nisi, aspernatur quae laudantium dolorum',
          image: 'https://picsum.photos/100',
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          tweetId: 1,
          userId: 1,
          username: 'miayang0513',
          comment:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo vel, nisi, aspernatur quae laudantium dolorum',
          image: 'https://picsum.photos/100',
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          tweetId: 1,
          userId: 1,
          username: 'miayang0513',
          comment:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo vel, nisi, aspernatur quae laudantium dolorum',
          image: 'https://picsum.photos/100',
          createdAt: new Date().toISOString()
        },
        {
          id: 4,
          tweetId: 1,
          userId: 1,
          username: 'miayang0513',
          comment:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo vel, nisi, aspernatur quae laudantium dolorum',
          image: 'https://picsum.photos/100',
          createdAt: new Date().toISOString()
        }
      ],
      replyContent: ''
    }
  },
  computed: {
    likes () {
      return this.tweets.map(tweet => tweet.likeCounts).reduce((a, b) => a + b)
    }
  },
  methods: {
    postReply () {
      const newReply = {
        id: 5,
        userId: 1,
        username: 'miayang0513',
        comment: this.replyContent,
        image: 'https://picsum.photos/100',
        createdAt: new Date().toISOString()
      }
      this.replies.unshift(newReply)
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
      color:#71a6d0;
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
    main {
      grid-column: 2;
      display: grid;
      grid-template-rows: 200px auto 300px 200px;
      grid-row-gap: 20px;
      #user-tweets {
        grid-row:1;
        display: grid;
        grid-template-rows: 27px 150px;
        grid-row-gap: 20px;

      }
      #replies {
        grid-row:2;
        height: 400px;
        display: grid;
        grid-template-rows: 27px auto;
        grid-row-gap: 10px;
        overflow-y: scroll;
      }
      #reply-input {
      grid-row: 3;
      display: grid;
      grid-auto-rows: 50px;
      grid-auto-flow: row;
      grid-row-gap: 30px;
        textarea {
          padding: 0;
          border: 2px solid #1da1f2;
          border-radius: 4px;
          width: 99%;
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
