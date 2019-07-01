import Vue from 'vue'
/** Router **/
import VueRouter from 'vue-router'
/** Store **/
import store from './store/'

const Common = () => import(
  /* webpackChunkName: "group-common" */
  './views/Common.vue'
)

/** Router **/
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
      }
    },
    {
      path: '/signupnoplugin',
      component: () => import(
        /* webpackChunkName: "group-account" */
        './views/account/SignupNoPlugin.vue'
      ),
      beforeEnter: (to, from, next) => {
        if (store.getters.isAuthenticated) {
          next('/teamDashboard')
        } else {
          next()
        }
      }
    },
    {
      path: '/',
      redirect: '/teamDashboard',
      component: Common,
      children: [
        {
          path: '/teamDashboard',
          name: 'Dashboard',
          component: () => import(
            /* webpackChunkName: "group-common" */
            './views/team/Dashboard.vue'
          ),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/teams',
          name: 'Teams',
          component: () => import(
            /* webpackChunkName: "group-common" */
            './views/team/Teams.vue'
          ),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/positions',
          name: 'Positions',
          component: () => import(
            /* webpackChunkName: "group-common" */
            './views/team/Positions.vue'
          ),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/employees',
          name: 'Employees',
          component: () => import(
            /* webpackChunkName: "group-common" */
            './views/team/Employees.vue'
          ),
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/planning',
      component: Common,
      children: [
        {
          path: '/planning',
          name: 'Planning',
          component: () => import(
            /* webpackChunkName: "group-common" */
            './views/planning/Planning.vue'
          ),
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/execution',
      redirect: '/reporting',
      component: Common,
      children: [
        {
          path: '/reporting',
          name: 'Reporting',
          component: () => import(
            /* webpackChunkName: "group-common" */
            './views/execution/Reporting.vue'
          ),
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/settings',
      redirect: '/company',
      component: Common,
      children: [
        {
          path: '/company',
          name: 'Company',
          component: () => import(
            /* webpackChunkName: "group-common" */
            './views/company/Company.vue'
          ),
          meta: {
            requiresAuth: true, title: 'Loop - Your Company'
          }
        },
        {
          path: '/entities',
          name: 'Entities',
          component: () => import(
            /* webpackChunkName: "group-common" */
            './views/company/Entities.vue'
          ),
          meta: {
            requiresAuth: true
          }
        }
      ]
    },




    {
      path: '/account',
      redirect: '/profile',
      component: Common,
      children: [
        {
          path: '/profile',
          name: 'Your Profile',
          component: () => import(
            /* webpackChunkName: "group-account" */
            './views/account/Profile.vue'
          ),
          meta: {
            requiresAuth: true, title: 'Your profile'
          }
        },
        {
          path: '/credentials',
          name: 'Credentials',
          component: () => import(
            /* webpackChunkName: "group-account" */
            './views/account/Settings.vue'
          ),
          meta: {
            requiresAuth: true, title: 'Your profile'
          }
        },
        {
          path: '/users',
          name: 'Users',
          component: () => import(
            /* webpackChunkName: "group-admin" */
            './views/admin/Users.vue'
          ),
          meta: {
            requiresAuth: true, roles: ['admin'], title: 'Users'
          }
        },
        {
          path: '/things',
          name: 'Things',
          component: () => import(
            /* webpackChunkName: "group-common" */
            './views/Things.vue'
          ),
          meta: {
            requiresAuth: true
          }
        }
      ]
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
  next('/')
})

router.afterEach((to, from) => {
    // FIXME: End our vue-progressbar ?
    // router.app.$Progress.finish()
})

export default router
