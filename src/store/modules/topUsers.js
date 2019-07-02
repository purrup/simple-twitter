import axios from '../axios'

const state = {}

const getters = {}

const mutations = {
  SET_USERS (state, data) {
    Object.assign(state, data)
  }
}

const actions = {
  async getTopUsers (context) {
    try {
      const result = await axios('/users/top', {
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
