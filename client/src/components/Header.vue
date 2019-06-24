<template>
  <el-row style="width:100%;height:64px;padding-top:4px;background-color:#545c64;" >
    <el-col :span="4">
      <div class="layout-logo"></div>
    </el-col>
    <el-col :span="20">
      <div class="layout-nav" v-if="isAuthenticated">
        <el-menu
          default-active="teamDashboard"
          class="header-menu"
          mode="horizontal"
          @select="handleClickHeader"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="teamDashboard"><i class="el-icon-user"/>Team</el-menu-item>
          <el-menu-item index="planning"><i class="el-icon-c-scale-to-original"/>Planning</el-menu-item>
          <el-menu-item index="execution"><i class="el-icon-folder-checked"/>Execution</el-menu-item>
          <el-menu-item index="company"><i class="el-icon-setting"/>Settings</el-menu-item>
          <el-submenu index="adminsettings" style="float:right">
            <template slot="title">{{ getCurrentUser.name }}</template>
            <el-menu-item index="account">Account</el-menu-item>
            <el-menu-item index="logout">Logout</el-menu-item>
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
      }
    },
    computed: {
    ...mapGetters(['isAuthenticated', 'getCurrentUser'])
    },
    methods: {
      ...mapMutations(['UpdateMenuItemsBy']),
      logout: function() {
        this.$store.dispatch('logout')
        this.$router.push('/login')
      },
      handleClickHeader: function(name) {
        if (name === 'logout') {
          this.logout()
        } else {
          this.UpdateMenuItemsBy(name)
          this.$router.push(name)
        }
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
