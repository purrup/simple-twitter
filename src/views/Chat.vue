<template lang="pug">
  div(id="content")
    div(class="container")
      div(id="messages")
        template(v-for="chat in account.Chats")
          message(v-if="isOwnedChat(chat.UserId)" :chat="chat" class="self-chat")
          message(v-else :chat="chat" class="other-chat")
      div(id="submit-bar")
        textarea(name="text" id="text" v-model="chatText")
        button(@click="sendSocket") Send
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Message from '@/components/Message.vue'

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
    }),
    roomId () {
      return this.account.Chats[0].RoomId
    }
  },
  components: {
    Message
  },
  methods: {
    ...mapMutations('account', ['ADD_CHAT']),
    sendSocket () {
      const data = {
        UserId: this.account.id,
        RoomId: this.roomId,
        receiverId: this.user.id,
        content: this.chatText
      }
      this.$socket.emit('chat', data)
      this.ADD_CHAT({
        ...data,
        User: this.account
      })
    },
    isOwnedChat (userId) {
      return this.account.id === userId
    }
  },
  beforeMount () {
    console.log('emitting message to server')
    console.log(this.$socket)
    this.$socket.emit('greet', this.account.id)
  },
  sockets: {
    received (data) {
      this.ADD_CHAT({
        ...data,
        User: this.user
      })
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
        padding: 5px;
        display: grid;
        grid-auto-rows: 50px;
        grid-row-gap: 5px;
        grid-auto-flow: row;
        overflow: scroll;
        border: 2px solid #a0cfee;
        border-radius: 4px;
        background-color: #fff;
        .self-chat {
          justify-self: flex-end;
        }
        .other-chat {
          justify-self: flex-start;
        }
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
