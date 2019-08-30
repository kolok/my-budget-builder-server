import CurrencyResource from '../../api/currency.service'

export default {
  state: {
    mainMenuItems: [
      {
        index: 'team',
        name: 'Team',
        path: '/teamDashboard',
        icon: 'el-icon-user',
        children : [
          {
            name: 'Dashboard',
            index: 'teamDashboard',
            path: '/teamDashboard',
          },
          {
            name: 'Movements',
            index: 'teamMovements',
            path: '/teamMovements',
          },
          {
            name: 'Individual',
            index: 'teamIndividual',
            path: '/teamIndividual',
          }
        ]
      },
      {
        index: 'budget',
        name: 'Budget',
        path: '/budgetDashboard',
        icon: 'el-icon-c-scale-to-original',
        children : [
          {
            index: 'budgetDashboard',
            name: 'Dashboard',
            path: '/budgetDashboard',
          }
        ]
      },
      {
        index: 'execution',
        name: 'Execution',
        path: '/executionDashboard',
        icon: 'el-icon-folder-checked',
        children : [
          {
            index: 'executionDashboard',
            name: 'Dashboard',
            path: '/executionDashboard',
          }
        ]
      },
      {
        index: 'settings',
        name: 'Settings',
        path: '/settingsCompany',
        icon: 'el-icon-setting',
        children : [
          {
            index: 'settingsCompany',
            name: 'Company',
            path: '/settingsCompany',
          },
          {
            index: 'settingsEntities',
            name: 'Entities',
            path: '/settingsEntities',
          },
          {
            index: 'settingsTeams',
            name: 'Teams',
            path: '/settingsTeams',
          }
        ]
      }
    ],
    mainActiveMenuItem: 'teamDashboard',
    adminMenuItems: [
      {
        index: 'profile',
        name: 'Your profile',
        path: '/profile',
        icon: 'el-icon-user'
      },
      {
        index: 'credentials',
        name: 'Credentials',
        path: '/credentials',
        icon: 'el-icon-user'
      },
      {
        index: 'account',
        path: '/account',
        name: 'Account',
        icon: 'el-icon-house'
      },
      {
        index: 'users',
        path: '/users',
        name: 'Users',
        icon: 'el-icon-user',
        roles: ['admin']
      },
      {
        index: 'logout',
        name: 'Logout',
        path: '/logout',
        icon: 'el-icon-logout'
      }
    ],
    breadcrumbMaps: {},
    breadcrumbItems: [
      {icon:"el-icon-user",name:"Team",path:"/teamDashboard"},
      {name:"Dashboard"},
    ]
  },
  getters: {
    mainMenuItems: state => state.mainMenuItems,
    mainActiveMenuItem: state => state.mainActiveMenuItem,
    adminMenuItems: state => state.adminMenuItems,
    breadcrumbItems: state => state.breadcrumbItems
  },
  mutations: {
    UPDATE_BREADCRUMB: (state, index) => {
      state.breadcrumbItems = state.breadcrumbMaps[index]
    },
    INIT_BREADCRUMB: (state)  => {
      state.mainMenuItems.forEach( menu => {
        menu.children.forEach( submenu => {
          state.breadcrumbMaps[submenu.index] = [menu,submenu]
        })
      })
      state.breadcrumbItems = [
        {icon:"el-icon-user",name:"Team",path:"/teamDashboard"},
        {name:"Dashboard"},
      ]
    }

  },
  actions: {
    updateBreadcrumbItems: ({commit}, indexes) => {
        commit('UPDATE_BREADCRUMB', indexes)
    },
    initBreadcrumb: ({commit}) =>  {
        commit('INIT_BREADCRUMB')
    },
  }
}
