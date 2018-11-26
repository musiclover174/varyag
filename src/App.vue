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
                @click="sideOpen = !sideOpen"
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
              <li class="menu__item" v-for="link of links" :key="link.title">
                <a class="menu__href" :href="link.href">{{ link.title }}</a>
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

    <!--<div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->

    <main class="content" role="main">
      <div class="container">
        <router-view/>
      </div>
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
    };
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
    links() {
      return [
        { title: 'Главная', href: '/' },
        { title: 'Объекты', href: '/objects' },
        { title: 'Договоры', href: '/contracts' },
      ];
    },
  },
};
</script>
