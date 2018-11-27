import Vue from 'vue';
import Router from 'vue-router';
import AuthGuard from './guard';
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import Objects from '@/components/Objects.vue';
import History from '@/components/History.vue';
import Responsible from '@/components/Responsible.vue';
import Users from '@/components/Users.vue';
import Contracts from '@/components/Contracts.vue';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      name: 'home',
      component: Home,
      beforeEnter: AuthGuard,
    },
    {
      path: '/contracts',
      name: 'contracts',
      component: Contracts,
      beforeEnter: AuthGuard,
    },
    {
      path: '/objects/history',
      name: 'history',
      component: History,
      beforeEnter: AuthGuard,
    },
    {
      path: '/objects',
      name: 'objects',
      component: Objects,
      beforeEnter: AuthGuard,
    },
    {
      path: '/objects/responsible',
      name: 'responsible',
      component: Responsible,
      beforeEnter: AuthGuard,
    },
    {
      path: '/objects/users',
      name: 'users',
      component: Users,
      beforeEnter: AuthGuard,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
  mode: 'history',
});
