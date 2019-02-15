import Vue from 'vue'
import Router from 'vue-router'
import { store } from '../store/index'

import Layout from '../ui/Layout.vue'
import UserMe from '../views/UserMe.vue'
import Landing from '../views/Landing.vue'
import Activity from '../views/Activity.vue'

import Groups from '../views/Groups.vue'
import GroupsNew from '../views/GroupsNew.vue'
import GroupsView from '../views/GroupsView.vue'
import GroupsUpdate from '../views/GroupsUpdate.vue'

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
      component: Layout,
      children: [
        {
          path: '/me',
          name: 'UserMe',
          component: UserMe,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/groups',
          name: 'Groups',
          component: Groups,
          meta: {
            requiresAuth: true
          },
          children: [
          ]
        },
        {
          path: '/activity',
          name: 'Activity',
          component: Activity
        },
        {
          path: '/groups/:id',
          name: 'GroupsView',
          component: GroupsView,
        },
        {
          path: '/groups/new',
          name: 'GroupsNew',
          component: GroupsNew,
        },
        {
          path: '/groups/:id/update',
          name: 'GroupsUpdate',
          component: GroupsUpdate,
        },
      ]
    }
  ]
})

// router.beforeEach((from, to, next) => {
//   console.log("Cambio de ruta");
//   console.log("Jwt is:", store.getters['getJwt']);
  

//   to.meta.requiresAuth
//   const jwt = store.getters['getJwt'];
//   const isLogged = jwt == '' ? false : true;

//   if(!isLogged && to.path !== '/') {
//     next('/');
//   } else {
//     next();
//   }

// });

export default router;