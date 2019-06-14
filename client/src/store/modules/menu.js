var menuTeam = [
  {
    title: 'Dashboard',
    path: '/teamDashboard',
    icon: 'ios-pulse'
  },
  {
    title: 'Teams',
    path: '/teams',
    icon: 'ios-people'
  },
  {
    title: 'Positions',
    path: '/positions',
    icon: 'ios-contact'
  },
  {
    title: 'Employees',
    path: '/employees',
    icon: 'ios-person'
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
              icon: 'ios-keypad'
            }
          ];
          state.menuActive = 'planning'
          break;
        case 'execution':
          state.menuItems = [
            {
              title: 'Reporting',
              path: '/execution',
              icon: 'ios-keypad'
            }
          ];
          break;
        case 'company':
          state.menuItems = [
            {
              title: 'Company',
              path: '/company',
              icon: 'ios-keypad'
            },
            {
              title: 'Entities',
              path: '/entities',
              icon: 'ios-keypad'
            }
          ];
          break;
        case 'account':
          state.menuItems = [
            {
              title: 'Your profile',
              path: '/profile',
              icon: 'ios-keypad'
            },
            {
              title: 'Credentials',
              path: '/credentials',
              icon: 'ios-person'
            },
            {
              title: 'Users',
              path: '/users',
              icon: 'ios-person',
              roles: ['admin']
            },
            {
              path: '/things',
              title: 'Things',
              icon: 'ios-keypad'
            }
          ];
          break;
        default:
          console.log('Sorry, we are out of ' + mainMenu + '.');
      }
    }
  }
}
