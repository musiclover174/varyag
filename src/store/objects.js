import axios from 'axios';
import API_URL from './constants';

class Obj {
  constructor(id, number, date, address, services, agent, name, responsibles) {
    this.id = id;
    this.number = number;
    this.date = date;
    this.address = address;
    this.services = services;
    this.agent = agent;
    this.name = name;
    this.responsibles = responsibles;
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
    async getAllObjects({ commit, state }, token) {
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
          .post(`${API_URL}/api/v2/getAllObjects`, null, headers)
          .then(({ data }) => {
            if (data.objects) {
              data.objects.forEach(async (object) => {
                await axios
                  .post(`${API_URL}/api/v2/loadPreferences/${object.number}`, null, headers)
                  .then(({ data }) => {
                    resultObjs.push(
                      new Obj(
                        object.number,
                        object.contract.number,
                        object.contract.date,
                        object.address.Title,
                        'ООО НПО Панцирь',
                        'Пультовая охрана',
                        object.name_by_user || object.name,
                        data.persons,
                      ),
                    );
                  });
              });
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
  },
};
