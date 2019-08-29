<template>
  <div class="Header">
    <div class="Header--Left">

      <div class="Header__LogoContainer">
        <img class="Header__Logo" src="/static/images/komber-logo.png"/>
      </div>
      <div
        v-if="isAuthenticated"
      >
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }"><i class="el-icon-user"/>Team</el-breadcrumb-item>
          <el-breadcrumb-item>Dashboard</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div
      v-if="isAuthenticated"
      class="Header--Right"
    >
      <el-dropdown @command="handleClickDropdown">
        <span class="el-dropdown-link">
          {{ getCurrentUser.name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="adminitem in adminMenuItems"
            :command="adminitem.path"
            :icon="el-icon-plus"
            :key="adminitem.index"
            :index="adminitem.index"
          >
            <i :class="adminitem.icon" />
            {{ adminitem.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
    handleClickDropdown: function(name) {
      if (name === 'logout') {
        this.logout()
      } else {
        this.$router.push(name)
      }
    },
  }
}
</script>
