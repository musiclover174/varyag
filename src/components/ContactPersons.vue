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
        <h1 class="top__title">Контактные лица</h1>
        <div class="breadcrumbs" v-if="breadcrumbList.length">
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
          <span class="breadcrumbs__item">Контактные лица</span>
        </div>
      </section>
      <!-- Тут будет цикл итераций по договорам -->
      <p class="person__contract">по договору № 587498/17 от 28.09.2017 г.</p>
      <ul class="person__list">
        <li
          class="person__item"
          v-for="person of persons"
          :key="person.id"
        >
          <aside class="person__imgover">
            <img src="/i/avatar.svg" class="person__avatar">
          </aside>
          <div class="person__info">
            <p class="person__name">{{ person.name }}
              <button class="person__edit" type="button" aria-label="Редактировать"></button>
            </p>
            <p class="person__place">Руководитель отдела</p>
            <p class="person__telover">тел.:
              <a href="tel:79090909090" class="person__tel">+79090909090</a>
            </p>
            <a href="mailto:iamalinin@variag.ru" class="person__mail">iamalinin@variag.ru</a>
          </div>
        </li>
        <!-- кнопка "добавить" для цикла -->
        <button class="person__add" type="button">Добавить</button>
      </ul>

    </div>
  </div>
</template>

<script>
export default {
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
    objects() {
      return this.$store.getters.objects;
    },
    persons() {
      return this.$store.getters.persons;
    },
    sideFlag() {
      return this.$store.getters.sideOpen;
    },
  },
  created() {
    this.$store.dispatch('getPersons', {
      token: this.$store.getters.user.token,
      router: this.$router,
    });
  },
};
</script>
