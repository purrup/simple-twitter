<template lang="pug">
  div(id="navbar")
    div(class="container")
      router-link(to="/tweets" tag="h3") Simple Twitter
      img(src="https://picsum.photos/100" alt="logo")
      span Logout
</template>

<script>
export default {
  name: 'navbar'
}
</script>

<style lang="scss" scoped>
  #navbar {
    padding: 5px 0px;
    background-color: rgba(44,161,242,0.9);
    .container {
      width: 80%;
      margin: 0 auto;
      display: grid;
      grid-template-rows: 60px;
      grid-template-columns: 150px 1fr 60px 10px 70px;
      grid-template-areas: "left-logo . right-logo . button";
      h3 {
        grid-area: left-logo;
        font-size: 20px;
      }
      img {
        grid-area: right-logo;
        height: 100%;
      }
      span {
        grid-area: button;
        font-size: 20px;
        font-weight: 600;
        align-self: center;
        color: #03697F
      }
    }
  }
</style>
