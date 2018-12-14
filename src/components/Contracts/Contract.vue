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
        <ul class="content__side-list" v-if="contracts">
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
        <h1 class="top__title">Договор</h1>
        <div class="breadcrumbs" v-if="breadcrumbList.length && contract">
          <router-link
            to="/"
            class="breadcrumbs__item breadcrumbs__item_home"
          ></router-link>
          <router-link
            class="breadcrumbs__item"
            v-for="(breadcrumb, idx) in breadcrumbList"
            :to="'/' + breadcrumb.link"
            :key="idx"
          >{{ breadcrumb.name }}</router-link>
          <span class="breadcrumbs__item">№ {{ contract.number }}</span>
        </div>
      </section>

      <section class="inner">
        <section class="contract" v-if="contract">
          <div class="contract__top">
            <div class="contract__about">
              <p class="contract__about-number">№ {{ contract.number }}</p>
              <p class="contract__about-from">от {{ contract.date | moment("Do MMMM YYYY")}} г.</p>
            </div>
            <div class="contract__balance">
              Баланс: <span>{{ contract.balance | digiter }} р.</span>
            </div>
          </div>
          <div class="contract__info">
            <div class="contract__info-row">Контрагент: {{ contract.client }}</div>
            <div class="contract__info-row">Вид услуг: {{ contract.type }}</div>
            <div class="contract__info-row" v-if="objects">Перечень объектов:
              <ul class="contract__list">
                <li
                  class="contract__item"
                  v-for="object of objects"
                  :key="object.id"
                >
                  <p class="contract__name">{{ object.name }}</p>
                  <p class="contract__addres">{{ object.address }}</p>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </section>
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
  props: ['id'],
  data() {
    return {
      breadcrumbList: this.$route.meta.breadcrumb,
    };
  },
  methods: {
    sideClose() {
      this.$store.dispatch('setSideState', false);
    },
  },
  computed: {
    contract() {
      return this.$store.getters.getContractById(this.id);
    },
    contracts() {
      return this.$store.getters.contracts;
    },
    objects() {
      return this.$store.getters.getObjectsByContract(this.id);
    },
    sideFlag() {
      return this.$store.getters.sideOpen;
    },
  },
  created() {
    this.$store.dispatch('getContracts', {
      token: this.$store.getters.user.token,
      router: this.$router,
    });
  },
  mounted() {
    this.$moment.locale('ru');
  },
  filters: {
    digiter(val) {
      return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
    },
  },
};
</script>
