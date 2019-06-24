var menuTeam = [
  {
    title: 'Dashboard',
    path: '/teamDashboard',
    icon: 'el-icon-pie-chart'
  },
  {
    title: 'Teams',
    path: '/teams',
    icon: 'el-icon-user'
  },
  {
    title: 'Positions',
    path: '/positions',
    icon: 'el-icon-refresh-right'
  },
  {
    title: 'Employees',
    path: '/employees',
    icon: 'el-icon-user'
  }
]

export default {
  state: {
    menuItems: menuTeam,
    menuActive: 'teamDashboard'
  },
  getters: {
    getMenuItems: state => {
      return state.menuItems
    },
    getMenuActive: state => {
      return state.menuActive
    }
  },
  mutations: {
    UpdateMenuItemsBy: (state, mainMenu) => {
      switch (mainMenu) {
        case 'teamDashboard':
          state.menuItems = menuTeam;
          state.menuActive = 'teamDashboard'
          break;
        case 'planning':
          state.menuItems = [
            {
              title: 'Planning',
              path: '/planning',
              icon: 'el-icon-c-scale-to-original'
            }
          ];
          state.menuActive = 'planning'
          break;
        case 'execution':
          state.menuItems = [
            {
              title: 'Reporting',
              path: '/execution',
              icon: 'el-icon-folder-checked'
            }
          ];
          break;
        case 'company':
          state.menuItems = [
            {
              title: 'Company',
              path: '/company',
              icon: 'el-icon-house'
            },
            {
              title: 'Entities',
              path: '/entities',
              icon: 'el-icon-files'
            },
            {
              title: 'Teams',
              path: '/teams',
              icon: 'el-icon-user'
            }
          ];
          break;
        case 'account':
          state.menuItems = [
            {
              title: 'Your profile',
              path: '/profile',
              icon: 'el-icon-user'
            },
            {
              title: 'Credentials',
              path: '/credentials',
              icon: 'el-icon-user'
            },
            {
              title: 'Users',
              path: '/users',
              icon: 'el-icon-user',
              roles: ['admin']
            },
            {
              path: '/things',
              title: 'Things',
              icon: 'el-icon-user'
            }
          ];
          break;
        default:
          console.log('Sorry, we are out of ' + mainMenu + '.');
      }
    }
  }
}
