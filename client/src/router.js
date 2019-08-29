import Vue from 'vue'
/** Router **/
import VueRouter from 'vue-router'
/** Store **/
import store from './store/'

/** Vue Router **/
Vue.use(VueRouter)

let router = new VueRouter({
  /*
   * The default mode for vue-router is hash mode - it uses the URL hash to
   * simulate a full URL so that the page won't be reloaded when
   * the URL changes. To get rid of the hash, we can use the router's
   * history mode.
   */
  // mode: 'history',
  routes: [
    {
      path: '/login',
      component: () => import(
        /* webpackChunkName: "group-account" */
        './views/account/Login.vue'
      ),
      beforeEnter: (to, from, next) => {
        if (store.getters.isAuthenticated) {
          next('/teamDashboard')
        } else {
          next()
        }
      },
      meta: {
        requiresAuth: false,
        title: 'Komber - Sign in'
      }
    },
    {
      path: '/signup',
      component: () => import(
        /* webpackChunkName: "group-account" */
        './views/account/Signup.vue'
      ),
      beforeEnter: (to, from, next) => {
        if (store.getters.isAuthenticated) {
          next('/teamDashboard')
        } else {
          next()
        }
      },
      meta: {
        requiresAuth: false,
        title: 'Komber - Sign up'
      }
    },
    {
      path: '/',
      redirect: '/teamDashboard'
    },

// Team menu

    {
      path: '/teamDashboard',
      name: 'Dashboard',
      component: () => import(
        './views/team/Dashboard.vue'
      ),
      meta: {
        requiresAuth: true,
        title: 'Komber - Team Dashboard'
      }
    },
    {
      path: '/teamMovements',
      name: 'Movements',
      component: () => import(
        './views/team/Movements.vue'
      ),
      meta: {
        requiresAuth: true,
        title: 'Komber - Team movements'
      }
    },
    {
      path: '/teamIndividual',
      name: 'Individual',
      component: () => import(
        './views/team/Individual.vue'
      ),
      meta: {
        requiresAuth: true,
        title: 'Komber - Team Individual'
      }
    },

// Budget menu

    {
      path: '/budgetDashboard',
      name: 'Budget',
      component: () => import(
        './views/budget/Dashboard.vue'
      ),
      meta: {
        requiresAuth: true,
        title: 'Komber - Budget Dashboard'
      }
    },

// Execution menu

    {
      path: '/executionDashboard',
      name: 'Execution',
      component: () => import(
        './views/execution/Dashboard.vue'
      ),
      meta: {
        requiresAuth: true,
        title: 'Komber - Execution Dashboard'
      }
    },

// Execution menu

    {
      path: '/settingsCompany',
      name: 'Company',
      component: () => import(
        /* webpackChunkName: "group-common" */
        './views/settings/Company.vue'
      ),
      meta: {
        requiresAuth: true,
        title: 'Komber - Settings Company'
      }
    },
    {
      path: '/settingsEntities',
      name: 'Entities',
      component: () => import(
        /* webpackChunkName: "group-common" */
        './views/settings/Entities.vue'
      ),
      meta: {
        requiresAuth: true,
        title: 'Komber - Settings Entities'
      }
    },
    {
      path: '/settingsTeams',
      name: 'Teams',
      component: () => import(
        /* webpackChunkName: "group-common" */
        './views/settings/Teams.vue'
      ),
      meta: {
        requiresAuth: true,
        title: 'Komber - Settings Teams'
      }
    },







    {
      path: '/profile',
      name: 'Your Profile',
      component: () => import(
        /* webpackChunkName: "group-account" */
        './views/account/Profile.vue'
      ),
      meta: {
        requiresAuth: true,
        title: 'Komber - Profile'
      }
    },
    {
      path: '/credentials',
      name: 'Credentials',
      component: () => import(
        './views/account/ChangePassword.vue'
      ),
      meta: {
        requiresAuth: true,
        title: 'Komber - Profile'
      }
    },
    {
      path: '/users',
      name: 'Users',
      component: () => import(
        './views/account/Users.vue'
      ),
      meta: {
        roles: ['client_admin'],
        requiresAuth: true,
        title: 'Komber - Users'
      }
    },
    {
      path: '/account',
      name: 'Account',
      component: () => import(
        './views/account/Account.vue'
      ),
      meta: {
        requiresAuth: true,
        title: 'Komber - Account'
      }
    },
    {
      path: '/denied',
      name: 'Denied',
      component: () => import(
        './views/account/Denied.vue'
      ),
      meta: {
        requiresAuth: true,
        title: 'Komber - Denied'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // FIXME: Start our vue-progressbar ?
  //router.app.$Progress.start()

  // To set the title of each route
  document.title = to.meta.title

/* FIXME: Manage tokens
  // Grab the accessToken and refreshToken. Dealing with the localStorage and Vuex has been tricky,
  // so we'll just set everything here at the top of the waterfall.
  let accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null
  let refreshToken = localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken') : null

  // What we're accounting for is the instance of a reload, because up until then the user object will be
  // present if they've already logged in. So if an accessToken is present let's set the user object
  // and their access/refresh tokens.
  if (accessToken) {
      router.app.$options.store.dispatch('auth/setUserAndTokens', {accessToken: accessToken, refreshToken: refreshToken})
  }
*/

  // If doesn't require authentication, accept.
  if (!to.meta.requiresAuth) {
    return next()
  }
  // If require auth but user is not authenticated, go to login.
  if (!store.getters.isAuthenticated) {
    return next('/login')
  }
  // If user is authenticated and page doesn't define roles, accept.
  if(!to.meta.roles) {
    return next()
  }
  // If page defines roles, check if user type is included in the roles.
  if (to.meta.roles.includes(store.getters.getCurrentUser.role)) {
    return next()
  }
  // Otherwise, denied.
  next('/denied')
})

router.afterEach((to, from) => {
    // FIXME: End our vue-progressbar ?
    // router.app.$Progress.finish()
})

export default router
