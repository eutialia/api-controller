import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    baseURL: ''
  },
  mutations: {
    auth_success: (state, token) => {
      state.status = 'success'
      state.token = token
      localStorage.setItem('token', token)
    },
    auth_error: (state) => {
      state.status = 'error'
    },
    logout: (state) => {
      state.status = ''
      state.token = ''
    },
    set_url: (state, url) => {
      state.baseURL = url
    }
  },
  actions: {
  },
  getters: {
    isLoggedIn: state => state.token,
    authStatus: state => state.status
  }
})
