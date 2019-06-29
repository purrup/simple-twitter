<template lang="pug">
  div(class="user")
    img(:src="user.image")
    div
      router-link(:to="`/users/${user.id}/tweets`" tag="span") @{{user.name}}
      p {{user.description}}
      button Unfollow
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    user: Object
  }
}
</script>

<style lang="scss" scoped>
  .user {
    padding: 10px;
    display: grid;
    grid-template-columns: 100px 280px;
    grid-column-gap: 20px;
    border: 1px solid #B2B4B2;
    border-radius: 3px;

    > img {
      width: 100%;
      align-self: center;
    }
    > div {
      display: grid;
      grid-template-rows: 30px 50px 30px;
      grid-row-gap: 10px;
      > span {
        font-size: 18px;
        color: #4D85C2;
        font-weight: 600;
        text-align: left;
      }
      > p {
        margin: 0;
        font-size: 13px;
        text-align: justify;
        align-self: flex-end;
      }
      button {
        width: 50%;
        color: #113743;
        background-color: #71a6d0;
        border: none;
        font-weight: 600;
        justify-self: flex-end;
        border-radius: 4px;
        font-size: 15px;
      }
    }

  }
</style>
