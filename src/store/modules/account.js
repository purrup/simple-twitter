import axios from '../axios.js'

const state = {}

const getters = {}

const mutations = {
  SET_ACCOUNT (state, data) {
    Object.assign(state, data)
  }
}
const actions = {
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
