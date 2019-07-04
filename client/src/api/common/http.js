/*
 * HTTP is a overdefined layer on the top of axios. It is used to connect to the
 * backend and handle the Authentication / Authorization of the application
 */


/*
 * Axios is the most popular HTTP Client library,
 * by the time of writing this piece of code.
 */
import axios from 'axios'
/** Store **/
import store from '../../store'
/** Router **/
import router from '../../router'

// A new instance of axios with a custom config.
let HTTP = axios.create({
  baseURL: 'http://localhost:3000/api/v1/'
})

// Add a request interceptor
// For each request
// Set the Authorization token with the access token
HTTP.interceptors.request.use(function (config) {
  if (localStorage.getItem('accessToken') !== null) {
    config.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken')
  }
  return config
}, function(error) {
  return Promise.reject(error)
})

// Add a response interceptor to manage authentication process
// If the request failed, we intercept if it is because the AccessToken is expired.
// If yes, we try to get a new one using the refreshToken then we check if the authentication (log out if it is expired)
// Else we return the error
HTTP.interceptors.response.use(undefined, async function(error) {
  if (error.response.status === 401 && error.response.data.message === 'TOKEN_EXPIRED' && !error.config.__isRetryRequest) {
    try {
      await store.dispatch('refreshUserTokens')
      error.config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken')
      error.config.__isRetryRequest = true
      return HTTP(error.config)
    } catch (error) {
      store.dispatch('logout')
      router.push('/login')
    }
  }
  if (error.response.status === 401) {
    store.dispatch('logout')
    router.push('/login')
  }
  return Promise.reject(error.response.data)
})

export default HTTP
