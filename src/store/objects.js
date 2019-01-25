import axios from 'axios';
import API_URL from './constants';

class Obj {
  constructor(id, number, date, address, services, agent, name, responsibles, info) {
    this.id = id;
    this.number = number;
    this.date = date;
    this.address = address;
    this.services = services;
    this.agent = agent;
    this.name = name;
    this.responsibles = responsibles;
    this.info = info;
  }
}

export default {
  state: {
    objects: [],
  },
  mutations: {
    loadObject(state, payload) {
      state.objects = payload;
    },
  },
  actions: {
    async getAllObjects({ commit, state, dispatch }, { token, router }) {
      if (state.objects.length) {
        return;
      }

      commit('clearError');
      commit('setLoading', true);

      const resultObjs = [];
      const headers = {
        headers: {
          Authorization: token,
        },
      };

      try {
        await axios
          .post(`${API_URL}/api/v2/getAllObjects`, { full: true }, headers)
          .then(({ data }) => {
            if (data.objects) {
              data.objects.forEach(async (object) => {
                resultObjs.push(
                  new Obj(
                    object.number,
                    object.contract.number,
                    object.contract.date,
                    object.address.Title,
                    object.client_name,
                    object.contract.type,
                    object.name_by_user || object.name,
                    object.persons,
                    object.object_info,
                  ),
                );
              });
            }
          })
          .catch(({ response }) => {
            if (response.status === 403) {
              commit('setLoading', false);
              commit('setError', 'Авторизация устарела. Сейчас вы будете перенаправлены на страницу авторизации, чтобы актуализировать ваш профиль.');
              setTimeout(() => {
                commit('clearError');
                dispatch('logoutUser');
                router.push('/login');
              }, 5000);
            } else {
              commit('setLoading', false);
              commit('setError', response.statusText);
            }
          });

        commit('loadObject', resultObjs);
        commit('setLoading', false);
      } catch (e) {
        commit('setLoading', false);
        commit('setError', e.message);
        throw e;
      }
    },
  },
  getters: {
    objects: state => state.objects,
    getObjectsByContract: state => number => state.objects.filter(obj => obj.number === number),
    getObjectById: state => id => state.objects.find(obj => obj.id === Number(id)),
  },
};
