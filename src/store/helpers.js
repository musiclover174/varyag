export default {
  state: {
    sideOpen: false,
  },
  mutations: {
    setSideOpen(state, payload) {
      state.sideOpen = payload;
    },
  },
  actions: {
    async setSideState({ commit }, flag) {
      commit('setSideOpen', flag);
    },
  },
  getters: {
    sideOpen: state => state.sideOpen,
  },
};
