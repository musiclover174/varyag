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
        <h1 class="top__title">Оплата</h1>
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
          <router-link
            class="breadcrumbs__item"
            :to="'/contracts/' + contract.number"
          >№ {{ contract.number }}</router-link>
          <span class="breadcrumbs__item">Оплата</span>
        </div>
      </section>

      <section class="inner">
        <section class="contract" v-if="contract">
          <p class="contract__payment-top">По договору:
            <span>№ {{ contract.number }} от {{ contract.date | moment("Do MMMM YYYY")}} г.</span>
          </p>

          <div class="contract__payment-info">
            <p
              class="contract__payment-info-elem"
              v-if="objects"
            >{{ objects }}</p>
            <p
              class="contract__payment-info-elem"
              v-if="contract.type"
            >{{ contract.type }}</p>
            <p
              class="contract__payment-info-elem"
              v-if="contract.payment"
            >{{ contract.payment }}</p>
            <p
              class="contract__payment-info-elem"
              v-if="contract.recommend"
            >{{ contract.recommend }}</p>
          </div>

          <form class="contract__payment-form">
            <label class="contract__payment-label">Сумма:</label>
            <div class="contract__payment-inpover">
              <input
                class="contract__payment-input"
                type="number"
                v-model="money"
              >
            </div>
            <button
              type="submit"
              class="contract__payment-sbm"
              @click.prevent="wantPay"
            >Оплатить</button>
          </form>
        </section>
      </section>
    </div>

    <transition name="fade">
      <div v-if="showModal" class="modal" v-cloak>
        <div class="modal__inner">
          <i class="modal__icon" data-type="cog"></i>
          Пожалуйста, подождите
        </div>
      </div>
    </transition>
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
      money: '',
    };
  },
  methods: {
    sideClose() {
      this.$store.dispatch('setSideState', false);
    },
    wantPay() {
      const contractsArray = [];
      contractsArray.push(this.contract.id);

      this.$store.dispatch('setPaymentStart', {
        summa: this.money,
        email: '',
        phone: this.user.phone,
        s: '1',
        contractIds: contractsArray,
        id: this.id,
      });
    },
  },
  computed: {
    contract() {
      return this.$store.getters.getContractById(this.id);
    },
    contracts() {
      return this.$store.getters.contracts;
    },
    user() {
      return this.$store.getters.user;
    },
    showModal() {
      return this.$store.getters.showModal;
    },
    objects() {
      const objects = this.$store.getters.getObjectsByContract(this.id);
      let objectsInfo = '';

      if (objects.length) {
        if (objects.length > 3) {
          let ender = '';
          if (objects.length - 2 === 2) ender = 'а';
          if (objects.length - 2 > 2) ender = 'ов';

          objectsInfo = `${objects[0].name};${objects[1].name};и еще ${objects.length - 2} объект${ender}`;
        } else {
          objects.forEach((object) => {
            objectsInfo += `${object.name};`;
          });
        }
      }
      return objectsInfo;
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
