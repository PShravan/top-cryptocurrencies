import Vue from 'vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue' // { BootstrapVue, IconsPlugin }
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(BootstrapVue)

const store = new Vuex.Store({
    state: {
        currencies: []
    },
    mutations: {
        set_data (state, data) {
            state.currencies = data
        }
    },
    actions: {
        set_data ({ commit }, data) {
            commit('set_data', data)
        }
    }
})
new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
