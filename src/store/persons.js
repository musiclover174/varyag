import axios from 'axios';
import API_URL from './constants';

class Person {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

export default {
  state: {
    persons: [],
  },
  mutations: {
    loadPersons(state, payload) {
      state.persons = payload;
    },
  },
  actions: {
    async getPersons({ commit, state }, token) {
      if (state.persons.length) {
        return;
      }

      commit('clearError');
      commit('setLoading', true);

      const resultPersons = [];
      const headers = {
        headers: {
          Authorization: token,
        },
      };

      try {
        await axios
          .post(`${API_URL}/api/v2/getPersons`, null, headers)
          .then(({ data }) => {
            if (data.persons) {
              data.persons.forEach((person) => {
                resultPersons.push(
                  new Person(person.id, person.full_name),
                );
              });
            }
          });

        commit('loadPersons', resultPersons);
        commit('setLoading', false);
      } catch (e) {
        commit('setLoading', false);
        commit('setError', e.message);
        throw e;
      }
    },
  },
  getters: {
    persons: state => state.persons,
  },
};
