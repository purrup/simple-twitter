<template lang="pug">
  main
    .container
      .signup-wraper
        form(action="/signup" method='POST')
          h1 Sign Up to Twitter
          .form-group
            label(for='email')
            input.form-control(type='email', name='email', placeholder='email', required='')
          .form-group
            label(for='password')
            input.form-control(type='text', name='password', placeholder='Password', required='')
          button(type="submit") Sign Up
      .footer
        .signup-helper
          span Already have an account?
          a(href="/login") Log in now »

</template>

<script>
export default {
  name: 'Signup'
}
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  background-color: #E6ECF0;
  .container {
    width: 55%;
    height: 35%;
    margin: 10px auto 0 auto;
    background-color:white;
    display: grid;
    grid-template-columns: 10% auto 10%;
    grid-template-rows: 80% 20%;

    .signup-wraper {
      grid-column: 2 / 3;
      grid-row: 1;
      form {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column wrap;
        align-items: flex-start;
        justify-content: space-evenly;
        .form-group input  {
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
          width: 90px;
          height: 40px;
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
      background-color: #F5F8FA;
      width: 100%;
      height: 100%;
      .signup-helper{
        grid-column: 2 / 4;
        justify-self: start;
        align-self: center;
      }
    }
  }
}
</style>
