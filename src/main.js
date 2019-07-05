import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

router.beforeEach(async (to, from, next) => {
  if (to.path === '/logout') {
    console.log('success')
    next()
    return
  }
  try {
    await store.dispatch('account/getUser')
    next()
  } catch (error) {
    console.log('logout')
    next({ path: '/logout' })
    throw error
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
