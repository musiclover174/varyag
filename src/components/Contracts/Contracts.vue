<template>
  <div class="container">
    <aside
      class="content__side"
      :class="{ open: sideFlag }"
    >
      <button
        class="content__side-close"
        type="button"
        @click="sideClose"
      ></button>
      <nav class="content__side-nav">
        <ul class="content__side-list">
          <li
            class="content__side-item"
            v-for="contract of contracts"
            :key="contract.id"
          >
            <router-link
              :to="'/contracts/' + contract.number"
              class="content__side-href"
              active-class="active"
              exact
            >
              № {{ contract.number }} от {{ contract.date | moment("Do MMMM YYYY")}} г.
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>
    <span class="content__side-overlay"></span>

    <div class="content__main">
      <section class="top">
        <h1 class="top__title">Договоры</h1>
      </section>
      В дальнейшем на этой странице будет перечень объектов и их статусы
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

const moment = require('moment');
require('moment/locale/ru');

Vue.use(require('vue-moment'), {
  moment,
});

export default {
  computed: {
    contracts() {
      return this.$store.getters.contracts;
    },
    sideFlag() {
      return this.$store.getters.sideOpen;
    },
  },
  methods: {
    sideClose() {
      this.$store.dispatch('setSideState', false);
    },
  },
  created() {
    this.$store.dispatch('getContracts', this.$store.getters.user.token);
  },
  mounted() {
    this.$moment.locale('ru');
  },
};
</script>
