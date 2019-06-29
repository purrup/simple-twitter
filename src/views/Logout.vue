<template lang="pug">

  .container#logout
    .left-side
      .background-img
      .features
        i.fas.fa-search.fa-3x   Follow your interests.
        i.fas.fa-user-friends.fa-3x  Hear what people are talking about.
        i.fas.fa-comment.fa-3x  Join the conversation.
    .right-side
      .login-form
        form(action="/login" method='POST')
          .form-group
            label(for='email')
            input.form-control(type='email', name='email', placeholder='email', required='')
          .form-group
            label(for='password')
            input.form-control(type='text', name='password', placeholder='Password', required='')
          button(type="submit") Log in
      .singup-area
        .singup-title
          i.fab.fa-twitter.twitter-icon
          h1 See what’s happening in the world right now
        .singup-button
          h3 Join Twitter today.
          a(href="/signup")
            button Sign Up
          a(href="/login")
            button Log in

    .footer
      .description
        span © 2019 Simple Twitter
        span Developers: miayang ianhuang jerrytsai

</template>

<script>
export default {
  name: 'Logout'
}
</script>

<style lang='scss' scoped>
$twitter-bird: url("https://upload.wikimedia.org/wikipedia/zh/9/9f/Twitter_bird_logo_2012.svg");

.container#logout {
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
      z-index: 1;
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
      -webkit-clip-path:polygon(0% 100px, 0% 100%,50% 100%,50% 100px);
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
      z-index: -1;
    }

  }
  .right-side {
    grid-column: 2;
    grid-row: 1 / span 2;
    display: grid;
    grid-template-columns: 30% 70%;
    grid-template-rows: 120px auto;
    .login-form {
      grid-column: 2;
      grid-row: 1;
      justify-self: start;
      align-self: center;
      form {
        height: 100%;
        display: flex;
        flex-flow: row nowrap;
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
          cursor: pointer;
          border-radius: 100px;
          -moz-border-radius: 100px;
          -webkit-border-radius: 100px;
          width: auto;
          padding: 12px;
          font-weight: 800;
          border: 1px solid #1da1f2;
          color: #1da1f2;
        }
      }
    }
    .singup-area {
      grid-column: 2;
      grid-row: 2;
      width: 45%;
      justify-self: start;
      align-self: center;
      font-weight: bold;

      .singup-title {
        display: flex;
        flex-flow: row wrap;
        h2 {
          justify-self: flex-start;
        }
        i {
          color: #1da1f2;
          font-size: 2.5em;
        }
      }
      .singup-button {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        a {
          width: 100%;
          text-decoration: none;
        }
        button {
          width: 100%;
          border-radius: 100px;
          cursor: pointer;
          font-size: 14px;
          font-weight: bold;
          line-height: 20px;
          padding: 8px 16px;
          background-color: #1da1f2;
          border: 1px solid #1da1f2;
          color: #fff;
          margin-bottom: 20px;
        }
        :nth-child(2) {
          button {
            &:hover {
              background-color: #006dbf;
              border-color: #006dbf;
            }
          }
        }
        :nth-child(3) {
          button {
            &:hover {
              background-color: #eaf5fd;
              color: #1da1f2;
              transition: background 0.2s linear;
            }
            background-color: white;
            cursor: pointer;
            border-radius: 100px;
            -moz-border-radius: 100px;
            -webkit-border-radius: 100px;
            width: 100%;
            border: 1px solid #1da1f2;
            color: #1da1f2;
          }
        }
      }
    }
  }
  .footer {
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
