import Vue from 'vue';
import Router from 'vue-router';
import AuthGuard from './guard';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
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
