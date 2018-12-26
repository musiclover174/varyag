import Vue from 'vue';
import Router from 'vue-router';
import AuthGuard from './guard';
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import Objects from '@/components/Objects.vue';
import History from '@/components/History/History.vue';
import HistoryElem from '@/components/History/HistoryElem.vue';
import Responsible from '@/components/Responsible.vue';
import Users from '@/components/Users.vue';
import Contracts from '@/components/Contracts/Contracts.vue';
import Contract from '@/components/Contracts/Contract.vue';
import ContractPayment from '@/components/Contracts/ContractPayment.vue';

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
      path: '/contracts/:id',
      props: true,
      name: 'contract',
      component: Contract,
      beforeEnter: AuthGuard,
      meta: {
        breadcrumb: [
          { name: 'Договоры', link: 'contracts' },
        ],
      },
    },
    {
      path: '/contracts/:id/payment',
      props: true,
      name: 'contractPayment',
      component: ContractPayment,
      beforeEnter: AuthGuard,
      meta: {
        breadcrumb: [
          { name: 'Договоры', link: 'contracts' },
        ],
      },
    },
    {
      path: '/objects/history',
      name: 'history',
      component: History,
      beforeEnter: AuthGuard,
    },
    {
      path: '/objects/history/:id',
      props: true,
      name: 'historyElem',
      component: HistoryElem,
      beforeEnter: AuthGuard,
      meta: {
        breadcrumb: [
          { name: 'Объекты', link: 'objects' },
        ],
      },
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
