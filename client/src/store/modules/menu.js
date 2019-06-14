export default {
  state: {
    menuItems: [
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
  },
  getters: {
    getMenuItems: state => {
      return state.menuItems
    }
  },
  mutations: {
    UpdateMenuItemsBy: (state, mainMenu) => {
      switch (mainMenu) {
        case 'teamDashboard':
          state.menuItems = [
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
          ];
          break;
        case 'planning':
          state.menuItems = [
            {
              title: 'Planning',
              path: '/planing',
              icon: 'ios-keypad'
            },
            {
              title: 'Result',
              path: '/result',
              icon: 'ios-person'
            }
          ];
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
        case 'settings':
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
        case 'adminsettings':
          state.menuItems = [
            {
              title: 'Your profile',
              path: '/profile',
              icon: 'ios-keypad'
            },
            {
              title: 'Users',
              path: '/users',
              icon: 'ios-person',
              roles: ['admin']
            }
          ];
          break;
        default:
          console.log('Sorry, we are out of ' + mainMenu + '.');
      }
    }
  }
}
