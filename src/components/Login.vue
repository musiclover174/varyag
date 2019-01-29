<template>
  <main class="auth" role="main">
    <img class="auth__logo" src="/i/logo.png" alt="" role="presentation">

    <form class="auth__form" @submit="checkPhone" v-if="!phoneEnter">
      <p class="auth__title">Личный кабинет</p>
      <p
        class="auth__subtitle"
      >Для входа введите номер телефона и нажмите кнопку "Отправить смс"</p>
      <div class="auth__row">
        <input
          class="auth__input"
          type="text"
          placeholder="Номер телефона"
          :value="phone"
          v-imask="mask"
          @accept="onAccept"
        >
      </div>
      <div class="auth__row auth__row_end">
        <button class="auth__btn" type="submit">Отправить смс</button>
      </div>
    </form>

    <form class="auth__form" @submit="sendData" v-if="phoneEnter">
      <p class="auth__title">Личный кабинет</p>
      <div class="auth__row">
        <input
          class="auth__input"
          type="text"
          placeholder="Код из смс"
          maxlength="4"
          v-model="smscode"
        >
        <p class="auth__error" v-if="error">{{ error }}</p>
      </div>
      <div class="auth__row auth__row_end">
        <button class="auth__btn" type="submit">Войти</button>
        <a class="auth__forgot" href="#" v-on:click="phoneEnter = !phoneEnter">Другой номер?</a>
      </div>
    </form>
    <div class="auth__info">
      <a href="https://play.google.com/store/apps/details?id=ru.variag.variag&hl=ru" target="_blank" class="auth__app">
        <img class="auth__gplay" alt="Доступно в Google Play" src="https://play.google.com/intl/en_us/badges/images/generic/ru_badge_web_generic.png">
      </a>
    </div>
  </main>
</template>

<script>
import { IMaskDirective } from 'vue-imask';

export default {
  data() {
    return {
      phone: '',
      unMasked: '',
      phoneEnter: false,
      smscode: '',
      mask: {
        mask: '(000)000-00-00',
        lazy: false,
      },
    };
  },
  created() {
    document.body.classList.add('login');
  },
  destroyed() {
    document.body.classList.remove('login');
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  methods: {
    onAccept(e) {
      this.unMasked = e.detail.unmaskedValue;
    },
    checkPhone(e) {
      if (this.unMasked.length === 10) {
        this.$store.dispatch('sendSms', {
          phone: this.unMasked,
        });
        this.phoneEnter = true;
      }
      e.preventDefault();
    },
    sendData(e) {
      this.$store.dispatch('loginUser', { phone: this.unMasked, code: this.smscode })
        .then(() => {
          this.$router.push('/');
        })
        .catch(() => {
        });

      e.preventDefault();
    },
  },
  directives: {
    imask: IMaskDirective,
  },
};
</script>
