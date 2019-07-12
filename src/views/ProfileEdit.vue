<template lang="pug">
  div(id="content")
    div(class="container")
      div
        div(:style="`background-image: url(${account.avatar})`")
        input(type="file" id="image" ref="file" @change="parseImage")
        label(for="image") Browse Files...
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
      introduction: '',
      file: ''
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
    ...mapActions('notification', ['addSuccess', 'addError']),
    checkBeforeUpdate () {
      console.log('sending...')
      if (this.name === '' || this.introduction === '') {
        this.addError('請填入資料！')
        return
      }
      let formData = new FormData()
      formData.append('file', this.file)
      formData.append('name', this.name)
      formData.append('introduction', this.introduction)
      this.putUser(formData)
      this.$router.go(-1)
      this.addSuccess('修改完成！')
    },
    parseImage () {
      this.file = this.$refs.file.files[0] // 從 FileList 拿第一個 file
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

    > div:nth-child(1) {
      display: grid;
      grid-template-rows: 200px 40px;
      grid-row-gap: 30px;

      > div {
        width: 100%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }

      #image {
        display: none;
      }

      label {
        &:hover {
            background-color: #006dbf;
            transition: background 0.2s linear;
          }
          font-size: 1.3em;
          cursor: pointer;
          border-radius: 8px;
          -moz-border-radius: 8px;
          -webkit-border-radius: 8px;
          font-weight: 600;
          background-color: #1DA1F2;
          color: #fff;
          line-height: 40px;
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
          &:hover {
            background-color: #006dbf;
            transition: background 0.2s linear;
          }
          width: 20%;
          font-size: 1.3em;
          cursor: pointer;
          border-radius: 8px;
          -moz-border-radius: 8px;
          -webkit-border-radius: 8px;
          font-weight: 600;
          background-color: #1DA1F2;
          color: #fff;
          justify-self: flex-end;
      }
    }
  }
</style>
