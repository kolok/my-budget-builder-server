import HTTP from './http-common'
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
        console.log(response.data)
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
  }
}

export default AuthService
