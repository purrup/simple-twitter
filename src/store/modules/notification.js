// import axios from '../axios.js'

const state = {
  successMsg: [],
  errorMsg: []
}

const getters = {}

const mutations = {
  SET_SUCCESS (state, message) {
    console.log('mutations:', message)
    state.successMsg.push(message)
  },
  SET_ERROR (state, message) {
    console.log('mutations:', message)
    state.errorMsg.push(message)
  },
  DELETE_MESSAGE (state) {
    state.successMsg.length = 0
    state.errorMsg.length = 0
  }
}
const actions = {
  setSuccessMessage (context, message) {
    console.log('actions:', message)
    context.commit('SET_SUCCESS', message)
  },
  setErrorMessage (context, message) {
    console.log('actions:', message)
    context.commit('SET_ERROR', message)
  },
  deleteMessage (context) {
    context.commit('DELETE_MESSAGE')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
