// import axios from '../axios.js'

const state = {
  successMsg: '',
  errorMsg: ''
}

const getters = {}

const mutations = {
  SET_SUCCESS (state, message) {
    state.successMsg = message
  },
  SET_ERROR (state, message) {
    state.errorMsg = message
  },
  DELETE_MESSAGE (state) {
    state.successMsg = ''
    state.errorMsg = ''
  }
}
const actions = {
  addSuccess (context, message) {
    context.commit('SET_SUCCESS', message)
    setTimeout(() => {
      context.commit('SET_SUCCESS', '')
    }, 3000)
  },
  addError (context, message) {
    context.commit('SET_ERROR', message)
    setTimeout(() => {
      context.commit('SET_ERROR', '')
    }, 3000)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
