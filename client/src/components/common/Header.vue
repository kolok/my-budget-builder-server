<template>
  <el-row>
    <el-col :span="4">
      <div class="Header__LogoContainer">
        <img class="Header__Logo" src="/static/images/komber-logo.png"/>
      </div>
    </el-col>
    <el-col :span="20">
      <div
        v-if="isAuthenticated"
        class="Header__MenuContainer"
      >
        <el-menu
          :default-active="defaultMenu"
          class="Header__Menu"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="handleClickHeader"
        >
          <el-submenu
            v-for="item in menuItems"
            :key="item.index"
            :index="item.index"
          >
            <template slot="title">
              <i :class="item.icon" />
              {{ item.name }}
            </template>
            <el-menu-item
              class="Header__MenuItem"
              v-for="subitem in item.children"
              :key="subitem.index"
              :index="subitem.index"
            >
              <i :class="subitem.icon" />
              {{ subitem.name }}
            </el-menu-item>
          </el-submenu>

          <el-submenu
            index="adminsettings"
            class="Header__MenuItem Header__MenuItem--Right"
          >
            <template slot="title">
              {{ getCurrentUser.name }}
            </template>
            <el-menu-item
              v-for="adminitem in adminMenuItems"
              :key="adminitem.index"
              :index="adminitem.index"
            >
              <i :class="adminitem.icon" />
              {{ adminitem.name }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
  },
  data() {
    return {
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
          icon: 'el-icon-house',
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
      menuItems: [
        {
          index: 'teamDashboard',
          name: 'Team',
          path: '/teamDashboard',
          icon: 'el-icon-user',
          children : [
            {
              index: 'teamDashboard',
              name: 'Dashboard',
              path: '/teamDashboard',
              icon: 'el-icon-pie-chart'
            },
            {
              index: 'teams',
              name: 'Teams',
              path: '/teams',
              icon: 'el-icon-user'
            },
            {
              index: 'positions',
              path: '/positions',
              name: 'Positions',
              icon: 'el-icon-refresh-right'
            },
            {
              index: 'employees',
              name: 'Employees',
              path: '/employees',
              icon: 'el-icon-user'
            }
          ]
        },
        {
          index: 'planning',
          name: 'Planning',
          path: '/planning',
          icon: 'el-icon-c-scale-to-original',
          children : [
            {
              index: 'planning',
              name: 'Planning',
              path: '/planning',
              icon: 'el-icon-c-scale-to-original'
            }
          ]
        },
        {
          index: 'execution',
          name: 'Execution',
          path: '/execution',
          icon: 'el-icon-folder-checked',
          children : [
            {
              index: 'execution',
              name: 'Execution',
              path: '/execution',
              icon: 'el-icon-folder-checked'
            }
          ]
        },
        {
          index: 'company',
          name: 'Settings',
          path: '/company',
          icon: 'el-icon-setting',
          children : [
            {
              index: 'company',
              name: 'Settings',
              path: '/company',
              icon: 'el-icon-house'
            },
            {
              index: 'entities',
              name: 'Entities',
              path: '/entities',
              icon: 'el-icon-files'
            },
            {
              index: 'teams',
              name: 'Teams',
              path: '/teams',
              icon: 'el-icon-user'
            }
          ]
        }
      ],
      defaultMenu : ''
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'getCurrentUser'])
  },
  beforeMount(){
    this.getDefaultMenu()
  },
  methods: {
    logout: function() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
    handleClickHeader: function(name) {
      if (name === 'logout') {
        this.logout()
      } else {
        this.$router.push(name)
      }
    },
    getDefaultMenu: function () {
      this.defaultMenu = this.menuItems[0].index
    }
  }
}
</script>

<style scoped>
  .Header__MenuItem--Right {
    float: right;
  }
</style>
