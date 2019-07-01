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
        h3  Following
        div(id="followings")
          template(v-for="following in followings")
            user-card(:user="following")

</template>

<script>
import Tweet from '@/components/Tweet.vue'
import UserCard from '@/components/UserCard.vue'

export default {
  name: 'profile',
  components: {
    Tweet,
    UserCard
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
      followings: [
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
      ]
    }
  },
  computed: {
    likes () {
      return this.tweets.map(tweet => tweet.likeCounts).reduce((a, b) => a + b)
    }
  }
}
</script>

<style lang="scss" scoped>
  #content {
    height: 100%;
    h3 {
      padding-bottom: 15px;
      text-align: left;
      margin: 0;
      font-size: 22px;
      color:#71a6d0;
    }
    .container {
      width: 75%;
      display: grid;
      grid-template-columns: 150px auto;
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
    #followings {
      grid-column: 1 / span 2;
      height: 70%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 20px;
      grid-row-gap: 15px;
      overflow-y: scroll;
    }
  }
</style>
