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
        <h1 class="top__title">Пользователи объектов</h1>
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
          <span class="breadcrumbs__item">Пользователи объектов</span>
        </div>
      </section>
      <ul class="objects__list">
        <li
          class="objects__item"
          v-for="object of objects"
          :key="object.id"
        >
          <p class="objects__name">{{ object.name }}</p>
          <p class="objects__place">{{ object.address }}</p>
          <ul class="users__list">
            <li
              class="users__item"
              v-for="(responsible, index) in object.responsibles"
              :key="responsible.id"
            >{{ (index + 1) + '. ' + responsible.full_name }}
              <button class="users__item-remove" type="button" aria-label="Удалить"></button>
            </li>
            <li class="users__item">
              <button class="users__item-add" type="button">Добавить</button>
            </li>
          </ul>
        </li>
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
    sideFlag() {
      return this.$store.getters.sideOpen;
    },
  },
};
</script>
