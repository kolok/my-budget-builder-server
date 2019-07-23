import Vue from 'vue'
/** Vuex **/
import Vuex from 'vuex'
/** Modules **/
import auth from './modules/auth'
import company from './modules/company'
import entity from './modules/entity'
import country from './modules/country'
import currency from './modules/currency'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { auth, company, entity, country, currency}
})
