import Vue from 'vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue' // { BootstrapVue, IconsPlugin }
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(BootstrapVue)

new Vue({
  render: h => h(App)
}).$mount('#app')

// const store = new Vuex.Store({
//     state: {
//         count: 0
//     },
//     mutations: {
//         increment (state) {
//         state.count++
//         }
//     }
// })
