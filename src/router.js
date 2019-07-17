import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
// import store from '@/store'

Vue.use(Router)

export default new Router({
  // mode: 'hash',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      beforeEnter (to, from, next) {
        next({ path: '/tweets' })
      }
    },
    {
      path: '/tweets',
      name: 'Home',
      component: () => import('./views/Home.vue'),
      async beforeEnter (to, from, next) {
        try {
          await store.dispatch('tweet/getTweets')
          await store.dispatch('topUsers/getTopUsers')
          next()
        } catch (error) {
          next({ path: '/login' })
          throw error
        }
      }
    },
    {
      path: '/users/:id/tweets',
      name: 'Profile',
      component: () => import('./views/Profile.vue'),
      async beforeEnter (to, from, next) {
        try {
          await store.dispatch('user/getUser', to.params.id)
          next()
        } catch (error) {
          throw error
        }
      }
    },
    {
      path: '/users/:id/edit',
      name: 'ProfileEdit',
      component: () => import('./views/ProfileEdit.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/tweets/:id/replies',
      name: 'reply',
      component: () => import('./views/Reply.vue'),
      async beforeEnter (to, from, next) {
        try {
          console.log('success')
          const userId = await store.dispatch('tweet/getTweet', to.params.id)
          await store.dispatch('user/getUser', userId)
          next()
        } catch (error) {
          throw (error)
        }
      }
    },
    {
      path: '/users/:id/chats',
      name: 'chat',
      component: () => import('./views/Chat.vue'),
      async beforeEnter (to, from, next) {
        try {
          await store.dispatch('user/getUser', to.params.id)
          next()
        } catch (error) {
          throw error
        }
      }
    },
    {
      path: '/users/:id/followings',
      name: 'following',
      component: () => import('./views/Following.vue'),
      async beforeEnter (to, from, next) {
        try {
          await store.dispatch('user/getUser', to.params.id)
          next()
        } catch (error) {
          throw error
        }
      }
    },
    {
      path: '/users/:id/followers',
      name: 'follower',
      component: () => import('./views/Follower.vue'),
      async beforeEnter (to, from, next) {
        try {
          await store.dispatch('user/getUser', to.params.id)
          next()
        } catch (error) {
          throw error
        }
      }
    },
    {
      path: '/users/:id/likes',
      name: 'like',
      component: () => import('./views/Like.vue'),
      async beforeEnter (to, from, next) {
        try {
          await store.dispatch('tweet/getTweets')
          await store.dispatch('user/getUser', to.params.id)
          next()
        } catch (error) {
          throw error
        }
      }
    },
    {
      path: '/admin/tweets',
      name: 'admin',
      component: () => import('./views/Admin.vue'),
      async beforeEnter (to, from, next) {
        try {
          const role = store.state.account.role
          if (role !== 'admin') {
            await store.dispatch('notification/addError', 'Not Authorized to Access.')
            next({ path: '/tweets' })
          }
          await store.dispatch('tweet/getTweets')
          await store.dispatch('user/getAllUsers')
          next()
        } catch (error) {
          throw error
        }
      }
    }
  ]
})
