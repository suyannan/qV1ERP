// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from 'axios'
Vue.use(ElementUI, axios)
Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  mode: 'history',
  el: '#app',
  router,
  render: h => h(App),
  template: '<App/>',
  components: { App }
})
