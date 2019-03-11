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
              <img
                class="header__img header__img_full"
                src="/i/logo.png"
                alt=""
                role="presentation"
              >
              <img
                class="header__img header__img_scroll"
                src="/i/logo_small.png"
                alt=""
                role="presentation"
              >
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
            <addUserInfo :user="user"></addUserInfo>
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

    <section
      class="snackbar"
      :class="{ show: error }"
    >
      <p class="snackbar__text">{{ error }}</p>
    </section>

    <main class="content" role="main">
      <router-view/>
    </main>

  </div>
</template>

<script>
import UserInfo from './components/UserInfo.vue';

if (navigator.userAgent.indexOf('MSIE') >= 0) {
  alert('You are using an unsupported version of Internet Explorer. Please upgrade to Internet Explorer 11 or use a different web browser.');
} else {
  const initializeFirebase = require('./push-notification');
}

export default {
  data() {
    if (this.$store.getters.user) initializeFirebase();

    return {
      infoOpen: false,
      burgerOpen: false,
      sideOpen: false,
      getData: false,
      links: [{
        title: 'Объекты',
        href: '/objects',
        child: [
          {
            title: 'История сигналов',
            href: '/objects/history',
          },
          {
            title: 'Пользователи объектов',
            href: '/objects/users',
          },
          {
            title: 'Контактные лица',
            href: '/objects/persons',
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
    user() {
      return this.$store.getters.user;
    },
    sideFlag() {
      return this.$store.getters.sideOpen;
    },
  },
  created() {
    if (this.isUserLoggedIn) {
      this.$store.dispatch('getAllObjects', {
        token: this.$store.getters.user.token,
        router: this.$router,
      });
    }
  },
  mounted() {
    let elHeaderClassList;
    let lastScrollTop = 0;
    let curOffset;

    window.addEventListener('scroll', () => {
      curOffset = window.pageYOffset;

      if (document.querySelector('.header')) {
        elHeaderClassList = document.querySelector('.header').classList;
        if (window.pageYOffset > 200 && curOffset > lastScrollTop) {
          if (!elHeaderClassList.contains('shorten')) {
            elHeaderClassList.add('shorten');
          }
        } else if (elHeaderClassList.contains('shorten')) {
          elHeaderClassList.remove('shorten');
        }

        lastScrollTop = curOffset;
      }
    });
  },
  watch: {
    $route() {
      this.$store.dispatch('setSideState', false);
      if (!this.getData && this.isUserLoggedIn) {
        this.$store.dispatch('getAllObjects', {
          token: this.$store.getters.user.token,
          router: this.$router,
        });
        this.getData = true;
      }
    },
  },
  components: {
    addUserInfo: UserInfo,
  },
};
</script>
