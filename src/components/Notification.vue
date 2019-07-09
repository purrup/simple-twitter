<template lang="pug">
  span.success(v-if="success.length !== 0" @click="deleteMsg") {{success[0]}}
  span.error(v-else-if="error.length !== 0" @click="deleteMsg") {{error[0]}}
</template>

<script>

export default {
  name: 'notification',
  props: {
    error: Array,
    success: Array
  },
  computed: {
  },
  methods: {
    deleteMsg () {
      this.$emit('deleteMsg')
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes openUp {
  0% {
    transform: translateX(100%);
    // opacity: 0;
  }
  100% {
    transform: translateX(0%);
    // opacity: 1;
  }
}
  span {
    font-size: 1.2em;
    font-weight: 700;
    position: absolute;
    top: 90px;
    right: 20px;
    width: auto;
    padding: 10px 30px;
    z-index: 99;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
    background-color: white;
    animation: openUp 0.3s;
  }
  .success {
    border-left: 6px solid #1da1f2;
  }
  .error {
    border-left: 6px solid rgba(194, 48, 48, 0.85);
  }
</style>
