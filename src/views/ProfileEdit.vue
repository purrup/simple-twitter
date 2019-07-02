<template lang="pug">
  div(id="content")
    div(class="container")
      div
        img(:src="account.avatar")
        button Browse files..
      div
        input(type="text" placeholder="name" id="name" v-model="name")
        textarea(name="introduction" id="introduction" v-model="introduction")
        button(@click="checkBeforeUpdate") Update
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      name: '',
      introduction: ''
    }
  },
  beforeMount () {
    this.name = this.account.name
    this.introduction = this.account.introduction
  },
  computed: {
    ...mapState('account', {
      account: state => state
    })
  },
  methods: {
    ...mapActions('account', ['putUser']),
    checkBeforeUpdate () {
      if (this.name === '' || this.introduction === '') {
        alert('請填入資料！')
        return
      }
      this.putUser({
        name: this.name,
        introduction: this.introduction
      })
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    width: 75%;
    display: grid;
    grid-template-columns: 200px 700px;
    grid-column-gap: 80px;

    button {
      font-size: 18px;
      color: #113743;
      background-color: #71a6d0;
      font-weight: 500;
      border: none;
      border-radius: 8px;
    }

    > div:nth-child(1) {
      display: grid;
      grid-template-rows: 200px 40px;
      grid-row-gap: 30px;

      > img {
        width: 100%;
      }
    }
    > div:nth-child(2) {
      display: grid;
      grid-template-rows: 70px 300px 50px;
      grid-row-gap: 30px;
      > input, textarea {
        border: 2px solid #A5CBDE;
        border-radius: 5px;
        padding: 5px;
        font-size: 20px;
        outline: none;
        resize: none;
      }
      > button {
        width: 20%;
        justify-self: flex-end;
      }
    }
  }
</style>
