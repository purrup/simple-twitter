import axios from '../axios.js'
import Vue from 'vue'

const state = {
  isLogin: false,
  id: 2,
  email: '',
  name: '',
  avatar: '',
  introduction: '',
  role: null,
  createdAt: '',
  updatedAt: '',
  Tweets: [],
  Followers: [],
  Followings: [],
  LikedTweets: []
}

const getters = {
  getAccount () {
    return state
  },
  getIsLogin () {
    return state.isLogin
  }
}

const mutations = {
  SET_ACCOUNT (state, data) {
    Object.keys(data).forEach(key => {
      state[key] = data[key]
    })
    Vue.set(state, 'isLogin', true)
  },
  CLEAR_ACCOUNT (state) {
    Object.keys(state).forEach(key => {
      delete state[key]
    })
    Vue.set(state, 'isLogin', false)
    console.log('logout')
  },
  ADD_FOLLOWING (state, data) {
    state.Followings.push({ id: data.UserId })
  },
  REMOVE_FOLLOWING (state, data) {
    const index = state.Followings.findIndex(item => item.id === data.UserId)
    state.Followings.splice(index, 1)
  },
  ADD_ACCOUNT_LIKE (state, data) {
    state.LikedTweets.push(data)
  },
  REMOVE_ACCOUNT_LIKE (state, data) {
    const index = state.LikedTweets.findIndex(item => item.id === data.tweetId)
    state.LikedTweets.splice(index, 1)
  }
}
const actions = {
  async signup (context, params) {
    try {
      const result = await axios('/register', {
        method: 'post',
        data: JSON.stringify(params)
      })
      context.commit('SET_ACCOUNT', result.data)
      return true
    } catch (error) {
      throw error
    }
  },
  async login (context, params) {
    try {
      const result = await axios('/login', {
        method: 'post',
        data: JSON.stringify(params)
      })
      context.commit('SET_ACCOUNT', result.data)
      return true
    } catch (error) {
      throw error
    }
  },
  async logout (context) {
    try {
      context.commit('CLEAR_ACCOUNT')
      await axios('/logout', {
        method: 'get'
      })
    } catch (error) {
      throw error
    }
  },
  async getUser (context) {
    const result = await axios('/users', {
      method: 'get'
    })
    context.commit('SET_ACCOUNT', result.data)
  },
  async putUser (context, params) {
    try {
      context.commit('SET_ACCOUNT', params)
      await axios('/users', {
        method: 'put',
        data: JSON.stringify(params)
      })
    } catch (error) {
      throw error
    }
  },
  async addFollowing (context, params) {
    try {
      context.commit('ADD_FOLLOWING', params)
      await axios('/followships', {
        method: 'post',
        data: JSON.stringify(params)
      })
    } catch (error) {
      throw error
    }
  },
  async removeFollowing (context, params) {
    try {
      context.commit('REMOVE_FOLLOWING', params)
      await axios(`/followships/${params.UserId}`, {
        method: 'delete'
      })
    } catch (error) {
      throw error
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
