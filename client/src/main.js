// Older browser support fix
import 'es6-promise/auto'

import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'

/** Router **/
import router from './router'

/** Store **/
import store from './store/'
import AuthService from './api/auth.service'

/** Style **/
import style from './styles/main.scss';

/*
 * FIXME: Babel could be updated
 * FIXME: use babel plugin : https://element.eleme.io/#/fr-FR/component/quickstart
 */
Vue.use(ElementUI);

function initialisation() {
  new Vue({
    el:'#app',
    router,
    store,
    render: h=>h(App)
  })
}

(function () {
  if (localStorage.getItem('accessToken')) {
    return AuthService.getCurrentUser()
      .then(user => {
        store.dispatch('autoLogin', user)
        initialisation()
      })
      /*eslint no-unused-vars: ["error", {"args": "none"}]*/
      .catch(err => {
        initialisation()
      })
  } else {
    initialisation()
  }
})()
