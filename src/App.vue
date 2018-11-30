<template>
  <div id="app">
    <header class="header" v-if="isUserLoggedIn">

      <section
        class="header__top"
        :class="{ open: infoOpen }"
      >
        <div class="container">
          <div class="header__bar">
            <a class="header__logo" href="#">
              <img class="header__img" src="./assets/logo_small.png" alt="" role="presentation">
            </a>
            <aside class="header__buttons">
              <button
                class="header__sideopen"
                type="button"
                @click="sideChanger"
              ><span></span></button>
              <button
                class="header__menuopen"
                type="button"
                @click="burgerOpen = !burgerOpen"
              ><span></span></button>
              <button
                class="header__infoopen"
                type="button"
                @click="infoOpen = !infoOpen"
              ></button>
            </aside>
          </div>
          <div class="header__topbar">
            <span class="header__greetings">Здравствуйте, <i>{{ userName }}</i></span>
            <a class="header__notification header__notification_notice" href="#"></a>
            <a class="header__messages" href="#"></a>
          </div>
        </div>
      </section>

      <section class="header__bottom">
        <div class="container">
          <nav
            class="menu"
            :class="{ open: burgerOpen }"
          >
            <button
              class="menu__close"
              type="button"
              aria-label="Закрыть"
              @click="burgerOpen = !burgerOpen"
            ></button>
            <ul class="menu__list">
              <li class="menu__item">
                <router-link
                  to="/"
                  class="menu__href"
                  active-class="active"
                  exact
                >Главная</router-link>
              </li>
              <li
                class="menu__item"
                :class="{ menu__item_sub: link.child }"
                v-for="link of links"
                :key="link.title"
              >
                <router-link
                  :to="link.href"
                  class="menu__href"
                  active-class="active"
                >{{ link.title }}</router-link>
                <ul class="menu__sublist" v-if="link.child">
                  <li class="menu__subitem" v-for="sublink of link.child" :key="sublink.title">
                    <router-link
                      :to="sublink.href"
                      class="menu__subhref"
                      active-class="active"
                    >{{ sublink.title }}</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          <span class="menu__overlay"></span>
          <form class="search"><input class="search__input" type="text" placeholder="Поиск...">
            <button class="search__btn" type="submit" aria-label="Найти"></button>
          </form>
        </div>
      </section>
    </header>

    <main class="content" role="main">
      <router-view/>
    </main>

  </div>
</template>

<script>
export default {
  data() {
    return {
      infoOpen: false,
      burgerOpen: false,
      sideOpen: false,
      links: [{
        title: 'Объекты',
        href: '/objects',
        child: [
          {
            title: 'История сигналов',
            href: '/objects/history',
          },
          {
            title: 'Ответственные',
            href: '/objects/responsible',
          },
          {
            title: 'Пользователи',
            href: '/objects/users',
          },
        ],
      },
      {
        title: 'Договоры',
        href: '/contracts',
      }],
    };
  },
  methods: {
    sideChanger() {
      this.$store.dispatch('setSideState', !this.sideFlag);
    },
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    userName() {
      return this.$store.getters.user.name.split(' ')[1];
    },
    sideFlag() {
      return this.$store.getters.sideOpen;
    },
  },
  created() {
    this.$store.dispatch('getAllObjects', this.$store.getters.user.token);
  },
  watch: {
    $route() {
      this.$store.dispatch('setSideState', false);
    },
  },
};
</script>
