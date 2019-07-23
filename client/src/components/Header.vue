<template>
  <el-row style="width:100%;height:64px;padding-top:4px;background-color:#545c64;" >
    <el-col :span="4">
      <div class="layout-logo"></div>
    </el-col>
    <el-col :span="20">
      <div class="layout-nav" v-if="isAuthenticated">
        <el-menu
          :default-active="defaultMenu"
          class="header-menu"
          mode="horizontal"
          @select="handleClickHeader"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu
            v-for="item in menuItems"
            :key="item.index"
            :index="item.index"
          >
            <template slot="title">
              <i :class="item.icon"/>
              {{item.name}}
            </template>
            <el-menu-item
              v-for="subitem in item.children"
              :key="subitem.index"
              :index="subitem.index"
            >
              <i :class="subitem.icon"/>
              {{subitem.name}}
            </el-menu-item>
          </el-submenu>

          <el-submenu index="adminsettings" style="float:right">
            <template slot="title">{{ getCurrentUser.name }}</template>
            <el-menu-item
              v-for="adminitem in adminMenuItems"
              :key="adminitem.index"
              :index="adminitem.index"
            >
              <i :class="adminitem.icon"/>
              {{adminitem.name}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

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
  .layout{
      border: 1px solid #d7dde4;
      background: #f5f7f9;
      position: relative;
      border-radius: 4px;
      overflow: hidden;
  }
  .layout-logo{
      width: 100px;
      height: 30px;
      background: #5b6270;
      border-radius: 3px;
      float: left;
      position: relative;
      top: 15px;
      left: 20px;
  }
  .layout-nav{
      width: 100 %;
      margin: 0;
  }
  .layout-dropdown{
      float: right;
  }
</style>
