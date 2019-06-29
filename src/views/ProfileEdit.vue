<template lang="pug">
  div(id="content")
    div(class="container")
      div
        img(:src="user.image")
        button Browse files..
      div
        input(type="text" placeholder="name" id="name" v-model="user.name")
        textarea(name="description" id="description" v-model="user.description")
        button Update
</template>

<script>
export default {
  data () {
    return {
      user: {
        id: 1,
        name: 'miayang0513',
        image: 'https://picsum.photos/100',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat et dicta laboriosam deleniti quidems.'
      }
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
