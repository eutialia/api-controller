import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import Axios from './components/resource/interceptor.js'

Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.prototype.$http = Axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
