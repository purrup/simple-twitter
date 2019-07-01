import axios from '../axios.js'

const state = {
}

const getters = {}

const mutations = {
  SET_USER (state, data) {
    Object.keys(data).forEach(key => {
      state[key] = data[key]
    })
  }
}
const actions = {
  async login (context, params) {
    try {
      const result = await axios('/login', {
        method: 'post',
        data: JSON.stringify(params)
      })
      context.commit('SET_USER', result.data)
      return true
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
