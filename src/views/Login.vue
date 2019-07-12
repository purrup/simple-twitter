<template lang="pug">

  .container#login
    .left-side
      .background-img
      .features
        i.fas.fa-search.fa-3x   Follow your interests.
        i.fas.fa-user-friends.fa-3x  Hear what people are talking about.
        i.fas.fa-comment.fa-3x  Join the conversation.
    .right-side
      .login-form
        form(@submit.prevent="login")
          .form-group
            label(for='email')
            input.form-control(type='email', placeholder='email', v-model="email", required)
          .form-group
            label(for='password')
            input.form-control(type='password', placeholder='Password', v-model="password", required)
          button(type="submit") Log in
      .signup-area(v-show="show")
        .signup-title
          i.fab.fa-twitter.twitter-icon
          h1 See what’s happening in the world right now
        .signup-button
          h3 Join Twitter today.
          button(@click="show = !show") Sign Up
      transition(name="fade" mode="out-in")
        div.signup-area(v-show="!show")
          .signup-wraper
            .signup-title
              i.fab.fa-twitter.twitter-icon
              h1 Sign Up to Twitter
            form(@submit.prevent="signup")
              .form-group
                label(for='name')
                input.form-control(type='name', name='name', placeholder='name', v-model="name", required='')
              .form-group
                label(for='email')
                input.form-control(type='email', name='email', placeholder='email', v-model="email", required='')
              .form-group
                label(for='password')
                input.form-control(type='password', name='password',v-model="password", placeholder='Password', required='')
              button(type="submit") Sign Up

    .footer
      .description
        span © 2019 Simple Twitter
        span Developers: miayang ianhuang jerrytsai

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      show: true,
      name: '',
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters('account', {
      account: 'getAccount'
    })
  },
  methods: {
    ...mapActions('notification', ['addSuccess', 'addError']),
    async login () {
      try {
        await this.$store.dispatch('account/login', { email: this.email, password: this.password })
        this.$router.push('/tweets')
        const msg = `Log in successfully! Hello ${this.account.name}!`
        this.addSuccess(msg)
      } catch (error) {
        if (error.response.status === 401) {
          this.addError('Incorrect Password!')
        } else if (error.response.status === 404) {
          this.addError('Account not found, Please Register first.')
        }
      }
    },
    async signup () {
      try {
        await this.$store.dispatch('account/signup', { name: this.name, email: this.email, password: this.password })
        this.$router.push('/login')
        const msg = 'Sign up successfully! Please log in now.'
        this.SET_SUCCESS(msg)
      } catch (error) {
        if (error.response.status === 406) {
          this.SET_ERROR('This Email had been registered!')
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
$twitter-bird: url("https://upload.wikimedia.org/wikipedia/zh/9/9f/Twitter_bird_logo_2012.svg");

.container#login {
  // background-color: #fff;
  grid-row: 1 / span 2;
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 120px auto 45px;
  .left-side {
    height: 100%;
    grid-column: 1;
    grid-row: 2;
    display: grid;
    grid-template-rows: repeat(4,25%);
    .features {
      width: 60%;
      height: 100%;
      grid-row: 2 / 4;
      z-index: 2;
      place-self: center;
      font-size: 0.5em;
      color: white;
      font-weight: bold;
      display: flex;
      flex-flow: column;
      align-items: flex-start;
      justify-content: space-evenly;
      .fa-search:before {
        margin-right: 12px;
      }
      .fa-user-friends:before {
        margin-right: 12px;
      }
      .fa-comment:before {
        margin-right: 12px;
      }
    }
    .background-img {
      -webkit-clip-path:polygon(0% 0%, 0% 100%,50% 100%,50% 0%);
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      background-color: rgba(44,161,242,0.8);
      background-image: $twitter-bird;
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-size: auto 140%;
      background-position: -70% 50%;
      z-index: 1;
    }

  }
  .right-side {
    background-color: #fff;
    grid-column: 2;
    grid-row: 1 / span 2;
    display: grid;
    grid-template-columns: 20% 70%;
    grid-template-rows: 120px auto;
    .login-form {
      width: 100%;
      grid-column: 2;
      grid-row: 1;
      justify-self: start;
      align-self: center;
      form {
        height: 100%;
        display: grid;
        grid-column-gap: 15px;
        grid-template-columns: 40% 40% 18%;
        .form-group input  {
          width: 90%;
          padding: 12px;
          font-size: 1.1em;
          border-radius: 3px 3px 3px 3px;
          -moz-border-radius: 3px 3px 3px 3px;
          -webkit-border-radius: 3px 3px 3px 3px;
          border: 1px solid #e6ecf0;
          font-weight: 300;
        }
        button {
          &:hover {
            background-color: #eaf5fd;
            color: #1da1f2;
            transition: background 0.2s linear;
          }
          font-size: 1.2em;
          cursor: pointer;
          border-radius: 100px;
          -moz-border-radius: 100px;
          -webkit-border-radius: 100px;
          padding: 12px;
          font-weight: 800;
          border: 1px solid #1da1f2;
          color: #1da1f2;
        }
      }
    }
    .signup-area {
      grid-column: 2;
      grid-row: 2;
      height: 30%;
      width: 60%;
      justify-self: start;
      align-self: center;
      font-weight: bold;
      button {
        &:hover {
          background-color: #006dbf;
          border-color: #006dbf;
        }
        font-size: 1.4em;
        width: 100%;
        border-radius: 100px;
        cursor: pointer;
        // font-size: 14px;
        font-weight: bold;
        line-height: 20px;
        padding: 8px 16px;
        background-color: #1da1f2;
        border: 1px solid #1da1f2;
        color: #fff;
        margin-bottom: 20px;
      }
      .signup-title {
        display: flex;
        flex-flow: row wrap;
        h1 {
          text-align: left;
        }
        i {
          color: #1da1f2;
          font-size: 2.5em;
          max-height: 40px;
          width: 100%;
          text-align: left;
        }
      }
      .signup-button {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
      }
      .signup-wraper {
        height: 100%;
        grid-column: 2;
        grid-row: 2;
          form {
            width: 100%;
            height: 100%;
            display: grid;
            grid-auto-rows: 60px;
            grid-row-gap: 5px;
            .form-group input  {
              width: 93%;
              padding: 12px;
              font-size: 1em;
              border-radius: 3px 3px 3px 3px;
              -moz-border-radius: 3px 3px 3px 3px;
              -webkit-border-radius: 3px 3px 3px 3px;
              border: 1px solid #e6ecf0;
              font-weight: 300;
            }
          }
        }
      }
  }
    // signup transtion
  .fade-enter-active {
    transition: all 1s ease;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .footer {
    z-index: 10;
    grid-column: 1 / span 2;
    grid-row: 3;
    background-color: white;
    width: 100%;
    height: 100%;
    .description {
      color: #aab8c2;
      font-size: 12px;
      min-height: 45px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-evenly;
      align-items: center;
    }
  }
}
</style>
