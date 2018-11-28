import Vue from 'vue';
import Vuex from 'vuex';
import common from './common';
import user from './user';
import objects from './objects';
import persons from './persons';
import contracts from './contracts';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    user,
    persons,
    contracts,
    objects,
  },
});
