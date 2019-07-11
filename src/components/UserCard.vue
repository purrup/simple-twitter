<template lang="pug">
  div(class="user")
    img(:src="user.avatar" :alt="user.name")
    div
      router-link.user-profile-link(:to="`/users/${user.id}/tweets`" tag="span") @{{user.name}}
      p(v-if="user.introduction") {{user.introduction.substring(0, 50)}}
      p(v-else) no introduction yet
      button(v-if="isFollowing" @click="removeFollowing({UserId:user.id})") Unfollow
      button(v-else-if="account.id !== user.id" @click="addFollowing({UserId:user.id})") Follow
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'UserCard',
  props: {
    user: Object,
    account: Object
  },
  computed: {
    isFollowing () {
      return this.account.Followings.some(item => item.id === this.user.id)
    }
  },
  methods: {
    ...mapActions('account', ['addFollowing', 'removeFollowing'])
  }
}
</script>

<style lang="scss" scoped>
.user {
  background-color: #fff;
  padding: 10px;
  display: grid;
  grid-template-columns: 100px 280px;
  grid-column-gap: 20px;
  border: 1px solid #a0cfee;
  border-radius: 3px;
  max-height:140px;
  > img {
    border-radius: 50%;
    width: 90px;
    height: 90px;
    align-self: center;
  }
  > div {
    display: grid;
    grid-template-rows: 30px 50px 30px;
    grid-row-gap: 10px;
    .user-profile-link {
      cursor: pointer;
    }
    > span {
      font-size: 18px;
      color: #006dbf;
      font-weight: 600;
      text-align: left;
    }
    > p {
      margin: 0;
      font-size: 13px;
      text-align: justify;
    }
    button {
      &:hover {
        background-color: #006dbf;
        transition: background 0.2s linear;
      }
      width: 40%;
      font-size: 1.1em;
      cursor: pointer;
      border-radius: 10px;
      -moz-border-radius: 10px;
      -webkit-border-radius: 10px;
      // padding: 12px 20px;
      background-color: #1DA1F2;
      color: #fff;
      border: none;
      font-weight: 600;
      justify-self: flex-end;
    }
  }
}
</style>
