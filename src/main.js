import Vue from 'vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue' // { BootstrapVue, IconsPlugin }
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(BootstrapVue)

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
        state.count++
        }
    }
})
new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
