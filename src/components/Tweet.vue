<template lang="pug">
  div(class="tweets")
    img(:src="user.avatar")
    div
      div
        router-link(:to="`/users/${user.id}/tweets`" tag="span") @{{user.name}}
        span , {{tweet.createdAt}}
      p {{tweet.description}}
      div
        router-link(:to="`/tweets/${tweet.id}/replies`" class="reply" tag="span") Reply({{tweet.Replies.length}})
        span(class="like") Like({{tweet.LikedUsers.length}})
</template>

<script>
export default {
  name: 'tweet',
  props: {
    tweet: Object,
    user: Object
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
