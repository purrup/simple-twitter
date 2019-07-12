<template lang="pug">
  span.success(v-if="success" @click="DELETE_MESSAGE" :class="{ disappear: success === '' }") {{success}}
  span.error(v-else-if="error" @click="DELETE_MESSAGE" :class="{ disappear: !error }") {{error}}
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
@keyframes appear {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
}
@keyframes disappear {
  100% {
    transform: translateX(0%);
  }
  0% {
    transform: translateX(100%);
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
    animation: appear 0.3s;
  }
  .success {
    border-left: 6px solid #1da1f2;
  }
  .error {
    border-left: 6px solid rgba(194, 48, 48, 0.85);
  }
</style>
