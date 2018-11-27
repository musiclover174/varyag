import store from '../store';

export default function (to, from, next) {
  if (store.getters.user || JSON.parse(localStorage.getItem('user'))) {
    next();
  } else {
    next('/login');
  }
}
