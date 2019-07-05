import axios from '../axios'

const state = {
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
}

const getters = {}

const mutations = {
  SET_USER (state, data) {
    Object.assign(state, data)
  },
  ADD_USER_TWEET_LIKE (state, data) {
    const tweet = state.Tweets.find(item => item.id === data.tweetId)
    tweet.LikedUsers.push({ id: data.accountId })
  },
  REMOVE_USER_TWEET_LIKE (state, data) {
    const tweet = state.Tweets.find(item => item.id === data.tweetId)
    const index = tweet.LikedUsers.findIndex(item => item.id === data.accountId)
    tweet.LikedUsers.splice(index, 1)
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
