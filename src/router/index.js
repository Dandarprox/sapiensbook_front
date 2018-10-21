import Vue from 'vue'
import Router from 'vue-router'

import Layout from '../ui/Layout.vue'
import Landing from '../views/Landing.vue'
import { store } from '../store/index'

Vue.use(Router)

const router = new Router({
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

router.beforeEach((from, to, next) => {
  console.log("Cambio de ruta");
  console.log("Jwt is:", store.getters['getJwt']);
  
  const jwt = store.getters['getJwt'];
  const isLogged = jwt == '' ? false : true;

  if(!isLogged && to.path !== '/') {
    next('/');
  } else {
    next();
  }

});

export default router;