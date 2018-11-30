import axios from 'axios';
import API_URL from './constants';

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
          .post(`${API_URL}/api/v2/sendSms/${phone}`)
          .then(({ data }) => {
            if (!data.success) {
              commit('setError', data.message);
            }
          });
        commit('setLoading', false);
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
          .post(`${API_URL}/api/v2/register`, {
            phone,
            smscode: code,
          })
          .then(({ data }) => {
            const user = new User(data.token, data.full_name);
            localStorage.setItem('user', JSON.stringify(user));
            commit('setUser', user);
            commit('setLoading', false);
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
