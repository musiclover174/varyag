import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    const user = JSON.parse(localStorage.getItem('user')) || '';
    if (user) {
      this.$store.dispatch('autoLoginUser', user);
      this.$router.push('/');
    }
  },
}).$mount('#app');
