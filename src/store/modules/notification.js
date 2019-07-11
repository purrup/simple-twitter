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
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
