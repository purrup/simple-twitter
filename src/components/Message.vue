<template lang="pug">
  div(id="content")
    div(:style="`background-image: url(${chat.User.avatar})`" class="avatar")
    div(class="message") {{chat.content}}
</template>

<script>
export default {
  props: {
    chat: Object
  }
}
</script>

<style lang="scss" scoped>
  #content {
    width: 200px;
    display: grid;
    grid-template-columns: 50px 1fr;
    grid-column-gap: 10px;
    .avatar {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      width: 100%;
      border-radius: 50%;
    }
    .message {
      font-size: 18px;
      font-weight: 400;
      align-self: center;
      justify-self: flex-start;
    }
  }
</style>
