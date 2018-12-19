import Vue from 'vue'
import App from './App.vue'
import LiquorTree from 'liquor-tree'
Vue.use(LiquorTree)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
