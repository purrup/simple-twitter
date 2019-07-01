<template lang="pug">
  main
    .container
      .login-wraper
        form(@submit.prevent="login")
          h1 Log in to Twitter
          .form-group
            label(for='email')
            input.form-control(type='email' placeholder='email' v-model="email" required)
          .form-group
            label(for='password')
            input.form-control(type='text' placeholder='Password' v-model="password" required)
          button(type="submit") Log in
      .footer
        .signup-helper
          span New to Twitter?
          a(href="/signup") Sign up now »
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login () {
      try {
        await this.$store.dispatch('user/login', { email: this.email, password: this.password })
        this.$router.push('/tweets')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  background-color: #e6ecf0;
  .container {
    width: 55%;
    height: 35%;
    margin: 10px auto 0 auto;
    background-color: white;
    display: grid;
    grid-template-columns: 10% auto 10%;
    grid-template-rows: 80% 20%;

    .login-wraper {
      grid-column: 2 / 3;
      grid-row: 1;
      form {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column wrap;
        align-items: flex-start;
        justify-content: space-evenly;
        .form-group input {
          width: 290px;
          height: 20px;
          padding: 4px;
          font-size: 1em;
          border-radius: 3px 3px 3px 3px;
          -moz-border-radius: 3px 3px 3px 3px;
          -webkit-border-radius: 3px 3px 3px 3px;
          border: 1px solid #e6ecf0;
          font-weight: 300;
        }
        button {
          &:hover {
            background-color: #006dbf;
            border-color: #006dbf;
          }
          cursor: pointer;
          border-radius: 100px;
          -moz-border-radius: 100px;
          -webkit-border-radius: 100px;
          width: 80px;
          padding: 6px 16px;
          border: 1px solid #1da1f2;
          background-color: #1da1f2;
          color: #fff;
          font-size: 14px;
          font-weight: bold;
        }
      }
    }

    .footer {
      display: grid;
      grid-template-columns: 10% auto 10%;
      grid-column: 1 / 4;
      grid-row: 2;
      background-color: #f5f8fa;
      width: 100%;
      height: 100%;
      .signup-helper {
        grid-column: 2 / 4;
        justify-self: start;
        align-self: center;
      }
    }
  }
}
</style>
