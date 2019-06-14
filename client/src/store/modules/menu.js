export default {
  state: {
    menuItems: [
      {
        title: 'Things',
        path: '/things',
        icon: 'ios-keypad'
      },
      {
        title: 'Users',
        path: '/users',
        icon: 'ios-person',
        roles: ['admin']
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

console.log(mainMenu)
      switch (mainMenu) {
        case 'team':
          state.menuItems = [
            {
              title: 'Teams',
              path: '/team',
              icon: 'ios-keypad'
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
