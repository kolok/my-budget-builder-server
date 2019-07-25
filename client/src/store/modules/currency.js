import CurrencyResource from '../../api/currency.service'

export default {
  state: {
    currencies: []
  },
  getters: {
    currencies: state => state.currencies,
    getCurrencyById: (state) => (id) => {
      return state.currencies.find(country => country.id === id)
    }
  },
  mutations: {
    SET_CURRENCIES: (state, currencies) => {
      state.currencies = currencies
    },
    CREATE_CURRENCY: (state, currency) => {
      state.currencies.push(currency)
    },
    UPDATE_CURRENCY: (state, currency) => {
      state.currencies.forEach(item => {
        if (item._id === currency._id) {
          item.name = currency.name
          item.info = currency.info
        }
      })
    },
    DELETE_CURRENCY: (state, id) => {
      state.currencies = state.currencies.filter(item => item._id !== id)
    }
  },
  actions: {
    getCurrencies: ({ commit }) => {
      return CurrencyResource.list()
        .then(response => {
          var currencyList = []
          response.data
          .sort(function(a, b){
            if (a.name < b.name) {return -1;}
            if (a.name > b.name) {return 1;}
            return 0;
          })
          .forEach(function(currency){
            currency.id = currency.id
            currency.longName = currency.name + ' (' + currency.symbol + ')'
            currencyList.push(currency)
          })
          commit('SET_CURRENCIES', currencyList)
        })
        .catch(err => {
          throw err
        })
    },
    createCurrency: ({commit}, currency) => {
      return CurrencyResource.create(currency)
        .then(response => {
          commit('CREATE_CURRENCY', response.data)
        })
        .catch(err => {
          throw err
        })
    },
    updateCurrency: ({commit}, payload) => {
      return CurrencyResource.update(payload._id, payload.content)
        .then(response => {
          commit('UPDATE_CURRENCY', response.data)
        })
        .catch(err => {
          throw err
        })
    },
    /*eslint no-unused-vars: [2, { "args": "none" }]*/
    deleteCurrency: ({commit}, id) => {
      return CurrencyResource.delete(id)
        .then(response => {
          commit('DELETE_CURRENCY', id)
        })
        .catch(err => {
          throw err
        })
    }
  }
}
