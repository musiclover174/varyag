<template>
  <div class="container">
    <aside
      class="content__side content__side_personal"
      :class="{ open: sideFlag }"
    >
      <button
        class="content__side-close"
        type="button"
        @click="sideClose"
      ></button>
      <div class="profile__imgover">
        <img class="profile__img" src="/i/avatar.svg">
        <button class="profile__img-edit"></button>
      </div>
      <p class="profile__name">{{uName}} {{uFName}}</p>
      <p class="profile__login">konstantin.k<br>{{phone}}</p>
      <button class="profile__changepass btn">Изменить пароль</button>
    </aside>
    <span class="content__side-overlay"></span>

    <div class="content__main">
      <section class="top">
        <h1 class="top__title">Профиль пользователя</h1>
      </section>
      <form class="profile__form">
        <div class="profile__col">
          <div class="profile__row">
            <label class="profile__label">Логин</label>
            <input type="text" class="profile__input" disabled value="konstantin.k">
          </div>
          <div class="profile__row">
            <label class="profile__label">Фамилия</label>
            <input
              :value="uFam"
              type="text"
              class="profile__input"
              disabled
            >
          </div>
          <div class="profile__row">
            <label class="profile__label">Имя</label>
            <input
              :value="uName"
              type="text"
              class="profile__input"
              disabled
            >
          </div>
          <div class="profile__row">
            <label class="profile__label">Отчество</label>
            <input
              :value="uFName"
              type="text"
              class="profile__input"
              disabled
            >
          </div>
          <div class="profile__row">
            <label class="profile__label">Должность</label>
            <input type="text" class="profile__input" disabled>
          </div>
        </div>
        <div class="profile__col">
          <div class="profile__row">
            <label class="profile__label">E-mail</label>
            <input type="text" class="profile__input" disabled>
          </div>
          <div class="profile__row">
            <label class="profile__label">Адрес</label>
            <input type="text" class="profile__input" disabled>
          </div>
          <div class="profile__row">
            <label class="profile__label">Телефоны</label>
            <div class="profile__phone-over">
              <input
                :value="phone"
                type="text"
                class="profile__input"
                disabled
              >
            </div>
            <button
              class="profile__phone-add"
              @click.prevent="addPhone"
            >Добавить телефон</button>
          </div>
        </div>
        <button type="submit" class="profile__submit btn">Сохранить</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uFam: this.$store.getters.user.name.split(' ')[0],
      uName: this.$store.getters.user.name.split(' ')[1],
      uFName: this.$store.getters.user.name.split(' ')[2],
      phone: this.$store.getters.user.phone,
    };
  },
  methods: {
    sideClose() {
      this.$store.dispatch('setSideState', false);
    },
    addPhone(e) {
      const div = document.createElement('div');
      div.className = 'profile__phone-over';
      div.innerHTML = `
        <input type="text" class="profile__input" disabled>
        <button type="button" class="profile__phone-remove js-phone-remove"></button>
      `;

      const newEl = e.target.parentNode.insertBefore(div, e.target);

      newEl.querySelector('.js-phone-remove').addEventListener('click', () => {
        newEl.remove();
      });
    },
  },
  computed: {
    sideFlag() {
      return this.$store.getters.sideOpen;
    },
  },
};
</script>
