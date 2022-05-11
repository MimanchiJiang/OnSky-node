import Vue from 'vue'
import App from './App'
import router from './router'
import sidebar from './components/sidebar'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  sidebar,
  components: { App },
  template: '<App/>'
})
