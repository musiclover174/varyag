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
    modalWaiter: false,
  },
  mutations: {
    loadContracts(state, payload) {
      state.contracts = payload;
    },
    showModalWaiter(state, payload) {
      state.modalWaiter = payload;
    },
  },
  actions: {
    async setPaymentStart({ commit }, {
      summa,
      email,
      phone,
      s,
      contractIds,
      id,
    }) {
      commit('clearError');
      commit('showModalWaiter', true);

      try {
        await axios
          .post(`${API_URL}/api/v2/acquiring/DoPayment`, {
            summa,
            email,
            phone,
            s,
            contract_ids: contractIds,
          }).then(({ data }) => {
            let requestCounter = 0;
            let delay = 0;

            function statusChecker(orderId) {
              axios
                .post(`${API_URL}/api/v2/acquiring/CheckPayment`, {
                  orderId,
                }).then((response) => {
                  if (response.data.status !== 0) {
                    requestCounter += 1;
                    if (requestCounter < 4) {
                      setTimeout(statusChecker, 3000, orderId);
                    } else {
                      commit('showModalWaiter', false);
                      window.location.href = `/contracts/${id}/payment/fail`;
                    }
                  } else {
                    if (!requestCounter) delay = 500;
                    setTimeout(() => {
                      commit('showModalWaiter', false);
                      window.location.href = response.data.formUrl;
                    }, delay);
                  }
                }).catch((e) => {
                  commit('showModalWaiter', false);
                  window.location.href = `/contracts/${id}/payment/fail`;
                  throw e;
                });
            }

            statusChecker(data.orderId);
          });
      } catch (e) {
        commit('showModalWaiter', false);
        commit('setError', e.message);
        window.location.href = `/contracts/${id}/payment/fail`;
        throw e;
      }
    },
    async getContracts({ commit, state, dispatch }, { token, router }) {
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
    showModal: state => state.modalWaiter,
    getContractById: state => number => state.contracts.find(cont => cont.number === number),
  },
};
