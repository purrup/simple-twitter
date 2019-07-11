<template lang="pug">
  span.success(v-if="success" @click="DELETE_MESSAGE") {{success}}
  span.error(v-else-if="error" @click="DELETE_MESSAGE") {{error}}
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'notification',
  props: {
    error: String,
    success: String
  },
  methods: {
    ...mapMutations('notification', ['DELETE_MESSAGE'])
  }
}
</script>

<style lang="scss" scoped>
@keyframes openUp {
  0% {
    transform: translateX(100%) scale(0);
    opacity: 0;
  }
  100% {
    transform: translateX(0%) scale(1);
    opacity: 1;
  }
}
  span {
    font-size: 1.2em;
    position: absolute;
    top: 90px;
    right: 20px;
    padding: 10px 70px;
    z-index: 99;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
    background-color: white;
    animation: openUp 0.2s;
  }
  .success {
    border-left: 4px solid #1da1f2;
  }
  .error {
    border-left: 4px solid rgba(194, 48, 48, 0.85);
  }
</style>
