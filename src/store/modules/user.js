import axios from '../axios'

const state = {
  user: {
    isLogin: false,
    id: 0,
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
  },
  users: [{
    isLogin: false,
    id: 0,
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
  }]
}

const getters = {}

const mutations = {
  SET_USER (state, data) {
    Object.assign(state.user, data)
  },
  SET_USERS (state, data) {
    data.sort((a, b) => b.Tweets.length - a.Tweets.length)
    Object.assign(state.users, data)
  },
  ADD_USER_TWEET_LIKE (state, data) {
    const tweet = state.user.Tweets.find(item => item.id === data.tweetId)
    console.log('tweet.LikedUsers', tweet.LikedUsers)
    tweet.LikedUsers.push({ id: data.accountId })
  },
  REMOVE_USER_TWEET_LIKE (state, data) {
    const tweet = state.user.Tweets.find(item => item.id === data.tweetId)
    console.log('tweet.LikedUsers', tweet.LikedUsers)
    const index = tweet.LikedUsers.findIndex(item => item.id === data.accountId)
    tweet.LikedUsers.splice(index, 1)
  },
  ADD_FOLLOWER (state, data) {
    state.user.Followers.push({id: data.accountId})
  },
  REMOVE_FOLLOWER (state, data) {
    const index = state.user.Followers.findIndex(item => item.id === data.accountId)
    state.user.Followers.splice(index, 1)
  }
}

const actions = {
  async getUser (context, id) {
    try {
      const result = await axios(`/users/${id}`, {
        method: 'get'
      })
      context.commit('SET_USER', result.data)
    } catch (error) {
      throw error
    }
  },
  async getAllUsers (context) {
    try {
      const result = await axios(`/admin/users`, {
        method: 'get'
      })
      context.commit('SET_USERS', result.data)
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
