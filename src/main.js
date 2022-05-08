import Vue from 'vue'
import App from './App'
import router from './router'
import sidebar from './components/sidebar'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  sidebar,
  components: { App },
  template: '<App/>'
})
