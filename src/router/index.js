import Vue from 'vue'
import Router from 'vue-router'

import Layout from '../ui/Layout.vue'
import Landing from '../views/Landing.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/main',
      name: 'Layout',
      component: Layout
    }
  ]
})
