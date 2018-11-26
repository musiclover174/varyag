import axios from 'axios';

class User {
  constructor(token, name) {
    this.token = token;
    this.name = name;
  }
}

export default {
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async sendSms({ commit }, { phone }) {
      commit('clearError');
      commit('setLoading', true);

      try {
        await axios
          .post(`https://testlk.variag.ru/api/v2/sendSms/${phone}`);
      } catch (e) {
        commit('setLoading', false);
        commit('setError', e.message);
        throw e;
      }
    },
    async loginUser({ commit }, { phone, code }) {
      commit('clearError');
      commit('setLoading', true);

      try {
        await axios
          .post('https://testlk.variag.ru/api/v2/register', {
            phone,
            smscode: code,
          })
          .then(({ data }) => {
            const user = new User(data.token, data.full_name);
            localStorage.setItem('user', JSON.stringify(user));
            commit('setUser', user);
          });
      } catch (e) {
        commit('setLoading', false);
        commit('setError', e.message);
        throw e;
      }
    },
    autoLoginUser({ commit }, { token, name }) {
      commit('setUser', new User(token, name));
    },
    logoutUser({ commit }) {
      localStorage.removeItem('user');
      commit('setUser', null);
      this.$router.push('/login');
    },
  },
  getters: {
    user: state => state.user,
    isUserLoggedIn: state => state.user != null,
  },
};
