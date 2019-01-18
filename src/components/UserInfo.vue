<template>
  <div class="header__user">
    <span class="header__greetings">Здравствуйте,
      <i
        class="js-showinfo"
        @click="showInfo = true"
      >{{ userName }}</i>
    </span>
    <div class="header__info" v-if="showInfo">
      <section class="header__info-top">
        <aside class="header__info-picover" v-if="imgSrc">
          <img :src="imgSrc" class="header__info-pic">
        </aside>
        <div class="header__info-about">
          <p class="header__info-fullname">{{ fullName }}</p>
          <p class="header__info-contact" v-if="contact">{{ contact }}</p>
        </div>
      </section>
      <section class="header__info-hrefs">
        <ul class="header__info-hreflist">
          <li class="header__info-hrefitem">
            <a href="#" class="header__info-href">
              <i class="header__info-icon header__info-icon_personal"></i>
              Мой профиль
            </a>
          </li>
          <li class="header__info-hrefitem">
            <button class="header__info-logout" @click="onLogout">Выйти</button>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return {
      showInfo: false,
      userName: this.user.name.split(' ')[1],
      fullName: this.user.name,
      contact: this.user.contact,
      imgSrc: this.user.img || '/i/avatar.svg',
    };
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logoutUser');
      this.$router.push('/login');
    },
  },
  mounted() {
    document.addEventListener('click', (event) => {
      if (event.target.closest('.header__info') || event.target.classList.contains('js-showinfo')) return;
      this.showInfo = false;
    });
  },
};
</script>
