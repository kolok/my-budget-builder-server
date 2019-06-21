<template>
  <Menu
    v-if="isAuthenticated"
    :active-name="activeMenu"
    :class="menuitemClasses"
    theme="light"
    width="auto"
    @on-select="handleClickMenu"
  >
    <MenuItem
      v-for="item in permittedMenuItems"
      :key="item.title"
      :name="item.path"
    >
      <Icon :type="item.icon" />
      <span>{{ item.title }}</span>
    </MenuItem>
  </Menu>
</template>

<script>
import { mapGetters } from 'vuex'
import { Menu, MenuItem, Icon } from 'iview'

export default {
  components: {
    Menu, MenuItem, Icon
  },
  props: {
    'isCollapsed': {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
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
    }
  },
  afterMount(){
    this.updateDefaultActiveMenu()
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'getCurrentUser', 'getMenuItems']),
    menuitemClasses: function () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    },
    permittedMenuItems: function() {
      let _this = this
      return this.getMenuItems.filter(function(item) {
        return _this.isPermitted(item.roles)
      })
    },
    activeMenu: function() {
      console.log(this.permittedMenuItems[0].path)
      return this.permittedMenuItems[0].path
    },
    updateDefaultActiveMenu: function() {
      this.activeMenu = this.menuItems[0].path
      console.log('activeMenu: '+athis.activeMenu)
    }
  },
  methods: {
    handleClickMenu: function(name) {
      this.$router.push(name)
    },
    /*
     * Check if the user role meets the defined requirement roles
     */
    isPermitted: function(rolesRequired) {
      if (!rolesRequired) {
        return true
      }
      if (rolesRequired.includes(this.getCurrentUser.role)) {
        return true
      }
      return false
    }
  }
}
</script>

<style scoped>
.menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 120px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
}
.menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
}
.collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
}
.collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
}
</style>
