<template lang="pug">
  div(class="tweets")
    img(:src="tweet.image")
    div
      div
        router-link(:to="`/users/${tweet.userId}/tweets`" tag="span") @{{tweet.username}}
        span , {{tweet.createdAt}}
      p {{tweet.text}}
      div
        span(class="reply") Reply({{tweet.replyCounts}})
        span(class="like") Like({{tweet.likeCounts}})
</template>

<script>
export default {
  name: 'tweet',
  props: {
    tweet: Object
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
