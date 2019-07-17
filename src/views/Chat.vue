<template lang="pug">
  div(id="content")
    div(class="container")
      div(id="messages")
      div(id="submit-bar")
        textarea(name="text" id="text" v-model="chatText")
        button(@click="sendSocket") Send
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      chatText: ''
    }
  },
  computed: {
    ...mapState('account', {
      account: state => state
    }),
    ...mapState('user', {
      user: state => state.user
    })
  },
  methods: {
    sendSocket () {
      this.$socket.emit('chat', {
        senderId: this.account.id,
        receiverId: this.user.id,
        content: this.chatText
      })
    }
  },
  sockets: {
    connect () {
      console.log('socket connected')
    },
    received (msg) {
      console.log(msg)
    }
  }
}
</script>

<style lang="scss" scoped>
  #content {
    height: 100%;
    .container {
      width: 60%;
      display: grid;
      grid-template-rows: 500px 60px;
      grid-row-gap: 40px;
      > #messages {
        border: 2px solid #a0cfee;
        border-radius: 4px;
        background-color: #fff;
      }
      > #submit-bar {
        display: grid;
        grid-template-columns: 1fr 80px;
        border: 2px solid #a0cfee;
        border-radius: 4px;
        > textarea {
          font-size: 16px;
          border: none;
          resize: none;
          outline: none;
        }
        > button {
          font-size: 16px;
          font-weight: 500;
          color: #fff;
          background-color: #1DA1F2;
          border: none;
          border-radius: 5px;
          &:hover {
            background-color: #006dbf;
            transition: all 0.2s linear;
          }
        }
      }
    }
  }
</style>
