import AuthService from '../../api/auth.service'
//import HTTP from '../../api/common/http'
//import store from '../../store'

export default {
  state: {
    // store the current user in the state
    // FIXME: if you reload the page, the current user is lost.
    // 2 ways to solve this issue :
    //   1. store the user (or user.email) in the localStorage
    //   2. do not use the user.email in the refresh token action
    //   3. manage this case using autoLogin
    user: null,
  },
  getters: {
    // used in router and to display or not elements
    isAuthenticated: state => {
      return !!state.user
    },
    // shortcut to admin role of the user
    isAdmin: state => {
      return state.user.role === 'admin'
    },
    // return the current user
    getCurrentUser: state => {
      return state.user
    }
  },
  mutations: {
    // Save current user just after it is logged
    LOGIN (state, data) {
      state.user = data
    },
    // Remove current user and tokens just after it is logged out
    LOGOUT (state) {
      state.user = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  },
  actions: {
    // login action
    login: ({ commit }, body) => {
      return AuthService.login(body)
        .then(user => {
          commit('LOGIN', user)
        })
        .catch(err => {
          throw err
        })
    },

    // logout action
    logout: ({ commit }) => {
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

    // actions used to refresh the accessTokens using the refreshToken
    async refreshUserTokens ({ dispatch, commit, getters, rootGetters }) {
      return await AuthService.refreshAccessToken( getters.getCurrentUser.email, localStorage.getItem('refreshToken') )
        .catch(err => {
          throw err
        })
    },

  }
}
