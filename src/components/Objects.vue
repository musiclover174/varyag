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
          <li class="content__side-item">
            <router-link
              to="/objects/history"
              class="content__side-href"
              active-class="active"
              exact
            >История сигналов</router-link>
            <ul class="content__side-sublist">
              <li
                class="content__side-subitem"
                v-for="object of objects"
                :key="object.id"
              >
                <router-link
                  :to="'/objects/history/' + object.id"
                  class="content__side-subhref"
                  active-class="active"
                  exact
                >{{ object.name }}
                </router-link>
              </li>
            </ul>
          </li>
          <li class="content__side-item">
            <router-link
              to="/objects/users"
              class="content__side-href"
              active-class="active"
              exact
            >Пользователи объектов</router-link>
          </li>
          <li class="content__side-item">
            <router-link
              to="/objects/persons"
              class="content__side-href"
              active-class="active"
              exact
            >Контактные лица</router-link>
          </li>
        </ul>
      </nav>
    </aside>
    <span class="content__side-overlay"></span>

    <div class="content__main">
      <section class="top">
        <h1 class="top__title">Объекты</h1>
      </section>

      <ul
        class="objects__list objects__list_main"
        v-if="objects">
        <li
          class="objects__item objects__item_locked"
          :class="{
            objects__item_locked: object.info.status,
            objects__item_unlocked: !object.info.status
          }"
          v-for="object of objects"
          :key="object.id"
        >
          <p class="objects__name">
            {{ object.name }}
            <button
              type="button"
              class="object__name-edit"
              @click="openModal(object.id, object.name)"
            ></button>
          </p>
          <p class="objects__place">{{ object.address }}</p>
          <div class="objects__signal">
            <p class="objects__signal-date">{{ object.info.last_signal.time | toDate }}</p>
            <p class="objects__signal-time">{{ object.info.last_signal.time | toTime }}</p>
            <p class="objects__signal-text">{{ object.info.last_signal.title }}</p>
          </div>
          <div class="objects__signal objects__signal_toall">
            <p class="objects__signal-date"></p>
            <p class="objects__signal-time">
              <router-link
                :to="'/objects/history/' + object.id"
                class="objects__signal-time_icon"
              ></router-link>
            </p>
            <p class="objects__signal-text">
              <router-link
                :to="'/objects/history/' + object.id"
                class="objects__signal-href"
              >Еще</router-link>
            </p>
          </div>
        </li>
      </ul>
    </div>

    <transition name="fade">
      <div v-if="showModal" class="modal" v-cloak>
        <form class="modal__inner modal__inner_name">
          <input
            type="text"
            class="modal__input js-changeInp"
            v-model="name"
          >
          <div class="modal__buttons modal__buttons_right">
            <button
              type="button"
              class="modal__button"
              @click="closeModal"
            >Отмена</button>
            <button
              type="submit"
              class="modal__button"
              @click.prevent="changeName"
            >Сохранить</button>
          </div>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
import {
  formatDate,
  formatTime,
} from '../helpers/helpers';

const cDate = new Date();
const tDate = formatDate(cDate);
cDate.setDate(cDate.getDate() - 1);
const yDate = formatDate(cDate);

export default {
  data() {
    return {
      showModal: false,
      changeNumber: null,
      name: '',
    };
  },
  methods: {
    sideClose() {
      this.$store.dispatch('setSideState', false);
    },
    closeModal() {
      this.showModal = false;
      this.changeNumber = null;
      this.name = '';
    },
    openModal(id, name) {
      this.changeNumber = id;
      this.showModal = true;
      this.name = name;
    },
    changeName() {
      if (this.name.replace(/\s/g, '') !== '') {
        document.querySelector('.js-changeInp').classList.remove('warning');

        this.$store.dispatch('changeObjectName', {
          token: this.$store.getters.user.token,
          id: this.changeNumber,
          name: this.name,
        });

        this.showModal = false;
        this.changeNumber = null;
        this.name = '';
      } else {
        document.querySelector('.js-changeInp').classList.add('warning');
      }
    },
  },
  computed: {
    objects() {
      return this.$store.getters.objects;
    },
    sideFlag() {
      return this.$store.getters.sideOpen;
    },
  },
  filters: {
    toDate: (val) => {
      const date = new Date();
      date.setTime(val);

      let finalDate = formatDate(date);

      if (tDate === finalDate) finalDate = 'Сегодня';
      if (yDate === finalDate) finalDate = 'Вчера';
      return finalDate;
    },
    toTime: (val) => {
      const date = new Date();
      date.setTime(val);
      return formatTime(date);
    },
  },
};
</script>
