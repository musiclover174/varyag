import axios from 'axios';
import API_URL from './constants';

class Contract {
  constructor(id, number, date, balance, type, client) {
    this.id = id;
    this.number = number;
    this.date = date;
    this.balance = balance;
    this.type = type;
    this.client = client;
    this.objects = [];
  }
}

export default {
  state: {
    contracts: [],
  },
  mutations: {
    loadContracts(state, payload) {
      state.contracts = payload;
    },
  },
  actions: {
    async getContracts({ commit, state }, token) {
      if (state.contracts.length) {
        return;
      }

      commit('clearError');
      commit('setLoading', true);

      const resultContracts = [];
      const headers = {
        headers: {
          Authorization: token,
        },
      };

      try {
        await axios
          .post(`${API_URL}/api/v2/getContracts`, null, headers)
          .then(({ data }) => {
            if (data.contracts) {
              data.contracts.forEach((contract) => {
                resultContracts.push(
                  new Contract(
                    contract.id,
                    contract.number,
                    contract.date,
                    contract.balance,
                    contract.type,
                    contract.client,
                  ),
                );
              });
            }
          });

        commit('loadContracts', resultContracts);
        commit('setLoading', false);
      } catch (e) {
        commit('setLoading', false);
        commit('setError', e.message);
        throw e;
      }
    },
  },
  getters: {
    contracts: state => state.contracts,
    getContractById: state => number => state.contracts.find(cont => cont.number === number),
  },
};
