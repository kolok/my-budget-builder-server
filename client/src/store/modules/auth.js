import AuthService from '../../api/auth.service'
//import HTTP from '../../api/common/http'
//import store from '../../store'

export default {
  state: {
    user: null,
    accessToken: null,
    refreshToken: null
  },
  getters: {
    isAuthenticated: state => {
      return !!state.user
    },
    isAdmin: state => {
      return state.user.role === 'admin'
    },
    getCurrentUser: state => {
      return state.user
    },
    accessToken (state) {
      return state.accessToken
    },
    refreshToken (state) {
      return state.refreshToken
    }
  },
  mutations: {
    LOGIN (state, data) {
      state.user = data
    },
    STORE_ACCESS_TOKEN (state, accessToken) {
      state.accessToken = accessToken
      localStorage.setItem('accessToken', accessToken)
    },
    STORE_REFRESH_TOKEN (state, refreshToken) {
      state.refreshToken = refreshToken
      localStorage.setItem('refreshToken', refreshToken)
    },
    LOGOUT (state) {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  },
  actions: {
    login: ({ commit }, body) => {
      return AuthService.login(body)
        .then(user => {
          commit('LOGIN', user)
        })
        .catch(err => {
          throw err
        })
    },

    logout: ({ commit }) => {
      localStorage.removeItem('accessToken')
      commit('LOGOUT')
    },

    autoLogin: ({commit}, user) => {
      commit('LOGIN', user)
    },

    signup: ({ commit }, body) => {
      return AuthService.signup(body)
        .then(user => {
          commit('LOGIN', user)
        })
        .catch(err => {
          throw err
        })
    },

    async refreshUserTokens ({ dispatch, commit, getters, rootGetters }) {
      return await AuthService.refreshAccessToken( getters.getCurrentUser.email, localStorage.getItem('refreshToken') )
        .then(token => {
          console.log(token)
        })
        .catch(err => {
          console.log(err)
          throw err
        })
    },

  }
}
