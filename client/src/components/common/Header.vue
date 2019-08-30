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
          <el-breadcrumb-item
            v-for="item in breadcrumbItems"
            :key=item.name
          ><i :class="item.icon" v-if="item.icon"/>{{ item.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div
      v-if="isAuthenticated"
      class="Header--Right"
    >
      <el-dropdown @command="handleClickDropdown">
        <div style="width:200px;display:flex;flex-direction:row;align-items:center;justify-content:flex-end;">
          <div>{{ getCurrentUser.name }}</div>
          <div><el-avatar size="large" :src="avatarURL"></el-avatar></div>
          <div><i class="el-icon-arrow-down el-icon--right"></i></div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="adminMenuItem in adminMenuItems"
            :command="adminMenuItem.path"
            :icon="adminMenuItem.icon"
            :key="adminMenuItem.index"
            :index="adminMenuItem.index"
          >
            {{ adminMenuItem.name }}
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
      avatarURL: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'getCurrentUser', 'adminMenuItems', 'breadcrumbItems'])
  },
  methods: {
    logout: function() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
    handleClickDropdown: function(name) {
    console.log(name)
      if (name === '/logout') {
        this.logout()
      } else {
        this.$router.push(name)
      }
    },
  }
}
</script>
