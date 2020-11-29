import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CurrencyDetail from '../views/CurrencyDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { 
    path: '/currency/:id',
    name: 'currency_detail', 
    component: CurrencyDetail, 
    props: true 
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
