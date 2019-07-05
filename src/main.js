import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

router.beforeEach(async (to, from, next) => {
  if (to.path === '/login' || to.path === '/logout' || to.path === '/signup') {
    next()
    return
  }
  try {
    await store.dispatch('account/getUser')
    next()
  } catch (error) {
    console.log('login')
    next({ path: '/login' })
    throw error
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
