<template lang="pug">
  div(id="content")
    div(class="container")
      div(id="main")
        div(id="send-tweets")
          textarea(name="text" id="text" cols="30" rows="10" v-model="post")
          button(@click="postTweet") Tweet
        div(id="tweets")
          template(v-for="tweet in tweets")
            tweet(:tweet="tweet" :key="tweet.username")
      div(id="side-bar")
        h3 Popular
        div(id="users")
          template(v-for="user in users")
            user-card(:user="user" :key="user.id")
</template>

<script>
import Tweet from '@/components/Tweet.vue'
import UserCard from '@/components/UserCard.vue'

export default {
  name: 'home',
  components: {
    Tweet,
    UserCard
  },
  data () {
    return {
      tweets: [
        {
          userId: 1,
          username: 'miayang0513',
          text:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo vel, nisi, aspernatur quae laudantium dolorum',
          image: 'https://picsum.photos/100',
          createdAt: new Date().toISOString(),
          replyCounts: 3,
          likeCounts: 10
        },
        {
          userId: 2,
          username: 'ianyshuang',
          text:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo vel, nisi psum dolor sit amet',
          createdAt: new Date().toISOString(),
          image: 'https://picsum.photos/100',
          replyCounts: 5,
          likeCounts: 8
        },
        {
          userId: 3,
          username: 'jerry',
          text:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo vel, nisi psum dolor sit amet.',
          createdAt: new Date().toISOString(),
          image: 'https://picsum.photos/100',
          replyCounts: 8,
          likeCounts: 10
        },
        {
          userId: 1,
          username: 'miayang0513',
          text:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo vel, nisi psum dolor sit amet.',
          createdAt: new Date().toISOString(),
          image: 'https://picsum.photos/100',
          replyCounts: 10,
          likeCounts: 10
        },
        {
          userId: 2,
          username: 'ianyshuang',
          text:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo vel, nisi psum dolor sit amet.',
          createdAt: new Date().toISOString(),
          image: 'https://picsum.photos/100',
          replyCounts: 7,
          likeCounts: 7
        }
      ],
      users: [
        {
          id: 1,
          name: 'miayang0513',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat et dicta laboriosam deleniti quidems.',
          image: 'https://picsum.photos/100'
        },
        {
          id: 2,
          name: 'ianyshuang',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat et dicta laboriosam deleniti quidems.',
          image: 'https://picsum.photos/100'
        },
        {
          id: 3,
          name: 'jerry',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat et dicta laboriosam deleniti quidems.',
          image: 'https://picsum.photos/100'
        },
        {
          id: 4,
          name: 'bdotadot5',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat et dicta laboriosam deleniti quidems.',
          image: 'https://picsum.photos/100'
        },
        {
          id: 5,
          name: 'asdfghjkl',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat et dicta laboriosam deleniti quidems.',
          image: 'https://picsum.photos/100'
        }
      ],
      post: ''
    }
  },
  methods: {
    postTweet () {
      const newTweet = {
        userId: 1,
        username: 'miayang0513',
        text: this.post,
        image: 'https://picsum.photos/100',
        createdAt: new Date().toISOString(),
        replyCounts: 0,
        likeCounts: 0
      }
      this.tweets.unshift(newTweet)
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
      #users {
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
