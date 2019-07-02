import Vue from 'vue'
import Vuex from 'vuex'

import userModule from './modules/user.js'
import tweetModule from './modules/tweet'
import accountModule from './modules/account'
import topUsersModule from './modules/topUsers'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user: userModule,
    tweet: tweetModule,
    account: accountModule,
    topUsers: topUsersModule
  }
})
