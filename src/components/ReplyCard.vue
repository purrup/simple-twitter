<template lang="pug">
  div(class="replies")
    img(:src="reply.User.avatar")
    div
      div
        router-link(:to="`/users/${reply.userId}/tweets`" tag="span") @{{reply.User.name}}
        span , {{reply.createdAt}}
      p {{reply.comment}}

</template>

<script>
export default {
  name: 'ReplayCard',
  props: {
    reply: Object
  }
}
</script>

<style lang="scss" scoped>
  .replies {
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
