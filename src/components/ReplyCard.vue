<template lang="pug">
  div(class="replies")
    img(:src="reply.User.avatar")
    div
      div
        router-link(:to="`/users/${reply.userId}/tweets`" tag="span") Replying to @{{reply.User.name}}
        br
        span {{reply.createdAt}}
      p {{reply.comment.substring(0, 50)}}

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
    background-color: #fff;
    font-size: 16px;
    border: 1px solid #B2B4B2;
    border-radius: 3px;
    padding: 10px;
    display: grid;
    grid-template-columns: 85px 1fr;
    grid-auto-rows: 85px;
    grid-column-gap: 20px;
    max-height: 120px;
    > img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
      align-self: center;
    }
    > div {
      display: grid;
      grid-template-rows: 1fr 2fr;
      grid-row-gap: 5px;
      justify-items: flex-start;
      > div {
        display: flex;
        flex-flow: row wrap;
        justify-content: start;
        align-content: space-around;
        :nth-child(1) {
          color: #4D85C2;
          font-weight: 600;
          &:hover {
            cursor: pointer;
          }
        }
        :nth-child(3) {
          color: #4D85C2;
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
