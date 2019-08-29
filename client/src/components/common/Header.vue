<template>
  <div class="Header">
    <div class="Header__LogoContainer">
      <img class="Header__Logo" src="/static/images/komber-logo.png"/>
    </div>
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
          style="float:right"
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
  </div>
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
      ]
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'getCurrentUser'])
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
  }
}
</script>
