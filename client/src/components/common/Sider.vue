<template>
  <div
    v-if="isAuthenticated"
    class="Sider">
    <div
      v-if="isAuthenticated"
      class="Sider__MenuContainer"
    >
      <el-menu
        :default-active="mainActiveMenuItem"
        class="Header__Menu"
        mode="vertical"
        @select="handleClickHeader"
      >
        <el-submenu
          v-for="item in mainMenuItems"
          :key="item.index"
          :index="item.index"
        >
          <template slot="title">
            <i :class="item.icon" />
            {{ item.name }}
          </template>
          <el-menu-item
            v-for="subitem in item.children"
            :key="subitem.index"
            :index="subitem.index"
          >
            {{ subitem.name }}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['isAuthenticated', 'mainMenuItems', 'mainActiveMenuItem']),
    },
    data() {
      return {
        menuItems: [
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
        defaultMenu : ''
      }
    },
    beforeMount() {
      this.getDefaultMenu()
    },
    methods: {
      ...mapActions(['updateBreadcrumbItems', 'initBreadcrumb']),
      handleClickHeader: function(name) {
        if (name === 'logout') {
          this.logout()
        } else {
          this.updateBreadcrumbItems(name);
          this.$router.push(name)
        }
      },
      getDefaultMenu: function () {
        this.initBreadcrumb()
        this.defaultMenu = this.menuItems[0].index
      }
    }
  }
</script>
