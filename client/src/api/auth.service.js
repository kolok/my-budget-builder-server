import HTTP from './common/http'
import UserResource from './user.service'

/*
 * Service should be singleton,
 * hence we could declare a simple object literal.
 */
let AuthService = {
  login(body) {
    return HTTP.post('users/signin', body)
      .then(res => {
        localStorage.setItem('accessToken', res.data.accessToken)
        localStorage.setItem('refreshToken', res.data.refreshToken)
        return UserResource.get()
      })
      .then(response => {
        return response.data
      })
      .catch(err => {
        throw err
      })
  },

  signup(body) {
    return UserResource.signup(body)
      .then(res => {
        localStorage.setItem('accessToken', res.data.accessToken)
        localStorage.setItem('refreshToken', res.data.refreshToken)
        return UserResource.get()
      })
      .then(response => {
        return response.data
      })
      .catch(err => {
        throw err
      })
  },

  forget() {

  },

  reset() {

  },

  getCurrentUser() {
    return UserResource.get().then(response => {
      return response.data
    })
      .catch(err => {
        throw err
      })
  },

  changePassword(body) {
    return UserResource.changePassword(body)
      .then(response => {
        return response.data
      })
      .catch(err => {
        throw err
      })
  },

// refreshAccessToken is called when the accessToken is expired and we received a 401 RESET_TOKEN_EXPIRED
// it calls API with refreshToken, the API check the validity of refresh token and generate a new couple of accessToken, refreshToken
  refreshAccessToken(email, refreshToken) {
    return HTTP.post('users/me/refreshAccessToken', {
      email: email,
      refreshToken: localStorage.getItem('refreshToken')
    })
    .then(response => {
      localStorage.setItem('accessToken', response.data.accessToken)
      localStorage.setItem('refreshToken', response.data.refreshToken)
      return response.data
    })
    .catch(err => {
      throw err
    })
  }

}

export default AuthService
