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
HTTP.interceptors.request.use(function (config) {
  if (localStorage.getItem('accessToken') !== null) {
    config.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken')
  }
  return config
}, function(error) {
  return Promise.reject(error)
})

// Add a response interceptor to manage authentication process
HTTP.interceptors.response.use(undefined, async function(error) {
  if (error.response.status === 401 && error.response.data.message === 'TOKEN_EXPIRED' && !error.config.__isRetryRequest) {
    try {
      let response = await getAuthToken()
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

//FIXME: do we need authTokenRequest
let authTokenRequest
async function getAuthToken () {
  if (!authTokenRequest) {
    authTokenRequest = store.dispatch('refreshUserTokens')
    // reset authTokenRequest ?
    authTokenRequest.then(() => {
      authTokenRequest = null
    }).catch(() => {
      authTokenRequest = null
    })
  }
  return authTokenRequest
}

/*
HTTP.interceptors.response.use(undefined, async (error) => {
    if (error.response.status === 401 && error.response.data.message === 'TOKEN_EXPIRED' && !error.config.__isRetryRequest) {
        try {
            let response = await getAuthToken()
            await store.dispatch('user/setUserAndTokens', {accessToken: response.data.accessToken, refreshToken: response.data.refreshToken})
            error.config.headers['Authorization'] = 'Bearer ' + store.getters['user/accessToken']
            error.config.__isRetryRequest = true
            return HTTP(error.config)
        } catch (error) {
          store.dispatch('logout')
          router.push('/login')
        }
    }

    // This is for a user that isn't logged in correctly
    if (error.response.status === 401 && error.response.data.message === 'AUTHENTICATION_ERROR') {
      store.dispatch('logout')
      router.push('/login')
    }
})
*/


export default HTTP
