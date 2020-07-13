import Vue from 'vue'
import App from './App.vue'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {path: '/', component: Login},
  {path: '/home', component: Home}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => {
    return h(App)
  }
});
