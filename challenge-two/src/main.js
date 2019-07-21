// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'vue-use-vuex'
import SuiVue from 'semantic-ui-vue'
import Vue from 'vue'
import store from './store'
import App from './App'

Vue.config.productionTip = false

Vue.use(SuiVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  store,
})
