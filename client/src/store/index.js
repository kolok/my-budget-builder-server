import Vue from 'vue'
/** Vuex **/
import Vuex from 'vuex'
/** Modules **/
import auth from './modules/auth'
import things from './modules/things'
import companies from './modules/companies'
import entities from './modules/entities'
import countries from './modules/countries'
import currencies from './modules/currencies'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { auth, things, companies, entities, countries, currencies}
})
