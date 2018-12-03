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
              to="/objects/responsible"
              class="content__side-href"
              active-class="active"
              exact
            >Ответственныe</router-link>
          </li>
          <li class="content__side-item">
            <router-link
              to="/objects/users"
              class="content__side-href"
              active-class="active"
              exact
            >Пользователи</router-link>
          </li>
        </ul>
      </nav>
    </aside>
    <span class="content__side-overlay"></span>

    <div class="content__main">
      <section class="top">
        <h1 class="top__title">История</h1>
        <div class="breadcrumbs" v-if="breadcrumbList.length && objectById">
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
          <span class="breadcrumbs__item">№ {{ objectById.name }}</span>
        </div>
      </section>

      <section class="inner">
        <div v-if="signalsCount">
          <ul
            class="history__date-list"
            :class="{ load: loading }"
          >
            <li
              class="history__date-item"
              v-for="(events, idx) of signals"
              :key="idx"
            >
              <p class="history__date-title">{{ idx }}</p>
              <ul class="history__events-list">
                  <li
                    class="history__events-item"
                    v-for="event of events"
                    :key="event.id"
                  >
                    <span>{{ event.time }}</span>
                    {{ event.title }}
                  </li>
              </ul>
            </li>
          </ul>
          <div
            class="history__buttons"
            v-if="Math.ceil(signalsCount / signalsPerPage) > 1 && !loading"
          >
            <button
              class="history__prev"
              :disabled="page === 1"
              @click="page--"
            >Предыдущая</button>
            <button
              class="history__next"
              :disabled="page === Math.ceil(signalsCount / signalsPerPage)"
              @click="page++"
            >Следующая</button>
          </div>
        </div>
        <p class="history__enough" v-else>По этому объекту сигналов не поступало</p>
      </section>

    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      breadcrumbList: this.$route.meta.breadcrumb,
      signalsPerPage: 20,
      page: Number(this.$route.query.page) || 1,
    };
  },
  methods: {
    sideClose() {
      this.$store.dispatch('setSideState', false);
    },
  },
  computed: {
    signals() {
      return this.$store.getters.signals(this.signalsPerPage, this.page - 1);
    },
    loading() {
      return this.$store.getters.loading;
    },
    signalsCount() {
      return this.$store.getters.signalsCount;
    },
    objects() {
      return this.$store.getters.objects;
    },
    objectById() {
      return this.$store.getters.getObjectById(this.id);
    },
    sideFlag() {
      return this.$store.getters.sideOpen;
    },
  },
  created() {
    this.$store.dispatch('getSignalsObjects', {
      token: this.$store.getters.user.token,
      objectId: this.id,
    });
  },
  watch: {
    $route() {
      this.$store.dispatch('getSignalsObjects', {
        token: this.$store.getters.user.token,
        objectId: this.id,
      });
      this.page = 1;
    },
  },
};
</script>