<template>
  <Header>
    <Menu mode="horizontal" theme="dark" active-name="team" @on-select="handleClickHeader">
      <div class="layout-logo"></div>
      <div class="layout-nav" v-if="isAuthenticated">
        <MenuItem name="team">
          <Icon type="ios-body"></Icon>
          Team
          </MenuItem>
        <MenuItem name="planning">
        <Icon type="ios-calculator"></Icon>
          Planning
        </MenuItem>
        <MenuItem name="execution">
          <Icon type="ios-speedometer"></Icon>
          Execution
        </MenuItem>
        <MenuItem name="4">
          <Icon type="ios-settings"></Icon>
          Settings
        </MenuItem>
      </div>
      <div class="layout-dropdown" v-if="isAuthenticated">
        <Dropdown @on-click="handleClickUserDropdown">
          <a href="javascript:void(0)">
            {{ getCurrentUser.name }}
            <Icon type="arrow-down-b" />
          </a>
          <DropdownMenu slot="list">
            <DropdownItem name="settings">
              Settings
            </DropdownItem>
            <DropdownItem name="logout">
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </Menu>
  </Header>
</template>

<script>
import { mapGetters } from 'vuex'
import { Header, Menu, MenuItem, Dropdown, DropdownMenu, DropdownItem, Icon } from 'iview'

export default {
  components: {
    Header, Menu, MenuItem, Dropdown, DropdownMenu, DropdownItem, Icon
  },
  data() {
    return {

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
    handleClickUserDropdown: function(name) {
      if (name === 'logout') {
        this.logout()
      } else {
        this.$router.push(name)
      }
    },
    handleClickHeader: function(name) {
      this.$router.push(name)
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
    width: 500px;
    margin: 0 auto;
}
.layout-dropdown{
    float: right;
}
</style>
