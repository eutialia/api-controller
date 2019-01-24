import Axios from 'axios'
import Store from '../../store.js'
import Router from '../../router.js'

Axios.defaults.baseURL = Store.state.baseURL

Axios.interceptors.request.use(config => {
  if (Store.getters.isLoggedIn) {
    config.headers.Authorization = 'token ' + Store.state.token
  }
  return config
}, error => {
  return Promise.reject(error)
})

Axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        Store.commit('logout')
        Router.replace({
          path: '/login',
          query: { redirect: Router.currentRoute.fullPath }
        })
    }
  }
  return Promise.reject(error)
})

export default Axios
