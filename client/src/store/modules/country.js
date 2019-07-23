import CountryResource from '../../api/country.service'

export default {
  state: {
    countries: []
  },
  getters: {
    countries: state => state.countries
  },
  mutations: {
    SET_COUNTRIES: (state, countries) => {
      state.countries = countries
    }
  },
  actions: {
    getCountries: ({ commit }) => {
      return CountryResource.list()
        .then(response => {
          commit('SET_COUNTRIES', response.data)
        })
        .catch(err => {
          throw err
        })
    }
  }
}
