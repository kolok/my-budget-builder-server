import CompanyResource from '../../api/company.service'

export default {
  state: {
    all: []
  },
  getters: {
    companies: state => state.all
  },
  mutations: {
    EDIT_COMPANY: (state, company) => {
      state.all.forEach(item => {
        if (item._id === company._id) {
          item.name = company.name
          item.info = company.info
        }
      })
    }
  },
  actions: {
    editCompany: ({commit}, payload) => {
      return CompanyResource.update(payload._id, payload.content)
        .then(response => {
          commit('EDIT_COMPANY', response.data)
        })
        .catch(err => {
          throw err
        })
    }
  }
}
