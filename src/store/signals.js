import axios from 'axios';
import API_URL from './constants';

class Signal {
  constructor(id, title, day, time) {
    this.id = id;
    this.title = title;
    this.day = day;
    this.time = time;
  }
}

function formatDate(date) {
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  const yy = date.getFullYear();

  if (dd < 10) dd = `0${dd}`;
  if (mm < 10) mm = `0${mm}`;

  return `${dd}.${mm}.${yy}`;
}

function formatTime(date) {
  let hh = date.getHours();
  let mm = date.getMinutes();

  if (hh < 10) hh = `0${hh}`;
  if (mm < 10) mm = `0${mm}`;

  return `${hh}:${mm}`;
}

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

export default {
  state: {
    signals: {},
    count: 0,
  },
  mutations: {
    loadSignals(state, payload) {
      state.signals = Object.assign({}, mergeDeep(state.signals, payload));
    },
    setSignalsCount(state, payload) {
      state.count = payload;
    },
    clearSignals(state) {
      state.signals = Object.assign({});
    },
  },
  actions: {
    async getSignalsCountObjects({ commit, dispatch }, { token, objectId, router }) {
      commit('clearError');
      commit('setLoading', true);

      const headers = {
        headers: {
          Authorization: token,
        },
      };

      try {
        await axios
          .post(`${API_URL}/api/v2/getObjectInfo/${objectId}`, null, headers)
          .then((response) => {
            commit('setSignalsCount', response.data.signal_count);
          })
          .catch(({ response }) => {
            if (response.status === 403) {
              commit('setLoading', false);
              commit('setError', 'Авторизация устарела. Сейчас вы будете перенаправлены на страницу авторизации, чтобы актуализировать ваш профиль.');
              setTimeout(() => {
                dispatch('logoutUser');
                router.push('/login');
              }, 5000);
            } else {
              commit('setLoading', false);
              commit('setError', response.statusText);
            }
            setTimeout(() => {
              commit('clearError');
            }, 5000);
          });
        commit('setLoading', false);
      } catch (e) {
        commit('setLoading', false);
        commit('setError', e.message);
        throw e;
      }
    },
    async getSignalsObjects({ commit, state }, {
      token, objectId, offset, limit,
    }) {
      if (state.signals[objectId] && state.signals[objectId][offset]) return;

      commit('clearError');
      commit('setLoading', true);

      const resultObjs = [];
      const headers = {
        headers: {
          Authorization: token,
        },
      };
      const cDate = new Date();
      const tDate = formatDate(cDate);
      cDate.setDate(cDate.getDate() - 1);
      const yDate = formatDate(cDate);

      try {
        await axios
          .post(`${API_URL}/api/v2/getSignals`, {
            object_number: objectId,
            offset,
            limit,
          }, headers)
          .then(({ data }) => {
            if (data.signals) {
              data.signals.forEach((signal) => {
                const date = new Date();
                date.setTime(signal.time);

                let finalDate = formatDate(date);

                if (tDate === finalDate) finalDate = 'Сегодня';
                if (yDate === finalDate) finalDate = 'Вчера';

                resultObjs.push(
                  new Signal(
                    signal.signal_id,
                    signal.title,
                    finalDate,
                    formatTime(date),
                  ),
                );
              });
            }
          });

        commit('loadSignals', {
          [objectId]: {
            [offset]: resultObjs,
          },
        });
        commit('setLoading', false);
      } catch (e) {
        commit('setLoading', false);
        commit('setError', e.message);
        throw e;
      }
    },
    clearSignalsObjects({ commit }) {
      commit('clearSignals');
    },
  },
  getters: {
    signals: state => (objectId, pageCount, page = 0, morePage = 0) => {
      const signalsObjects = {};

      if (state.signals[objectId]) {
        let signalsMass = [];
        if (page === morePage) {
          signalsMass = state.signals[objectId][pageCount * page] || [];
        } else {
          for (let i = morePage; i <= page; i++) {
            signalsMass = signalsMass.concat(state.signals[objectId][pageCount * i] || []);
          }
        }

        signalsMass.forEach((signal) => {
          if (!signalsObjects[signal.day]) signalsObjects[signal.day] = [];
          signalsObjects[signal.day].push(signal);
        });
      }
      return signalsObjects;
    },
    signalsCount: state => state.count,
  },
};
