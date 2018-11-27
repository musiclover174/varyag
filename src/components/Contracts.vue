<template>
  <div class="container">
    <aside class="content__side">
      <button class="content__side-close" type="button"></button>
      <nav class="content__side-nav">
        <ul class="content__side-list">
          <li
            class="content__side-item"
            v-for="object of objects"
            :key="object.id"
          >
            <a
              class="content__side-href"
              :href=object.id
            >
              № {{ object.number }} от {{ object.date | moment("Do MMMM YYYY")}}
            </a>
          </li>
        </ul>
      </nav>
    </aside>
    <span class="content__side-overlay"></span>

    <div class="content__main">
      <section class="top">
        <h1 class="top__title">Договоры</h1>
      </section>
      <section class="inner">
        <section class="contract">
          <div class="contract__top">
            <div class="contract__about">
              <p class="contract__about-number">№ 587498/17</p>
              <p class="contract__about-from">от 28 сентября 2017 г.</p>
            </div>
            <div class="contract__balance">Баланс: <span>1 500 р.</span></div>
          </div>
          <div class="contract__info">
            <div class="contract__info-row">Контрагент: ООО НПО Панцирь</div>
            <div class="contract__info-row">Вид услуг: Пультовая охрана</div>
            <div class="contract__info-row">Перечень объектов:
              <ul class="contract__list">
                <li class="contract__item">
                  <p class="contract__name">Лаборатория</p>
                  <p class="contract__addres">Челябинск, Производственная 8а</p>
                </li>
                <li class="contract__item">
                  <p class="contract__name">Помещение</p>
                  <p class="contract__addres">Челябинск, Производственная 8а</p>
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
  computed: {
    objects() {
      return this.$store.getters.objects;
    },
  },
  created() {
    this.$store.dispatch('getAllObjects', this.$store.getters.user.token);
  },
  mounted() {
    this.$moment.locale('ru');
  },
};
</script>
