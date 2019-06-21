<template>
  <el-container>
    <el-aside width="200px">
      <Sider
        v-model="isCollapsed"
        :style="{background: '#fff'}"
        :collapsed-width="78"
        collapsible
      >
        <app-sider :is-collapsed="isCollapsed" />
      </Sider>
    </el-aside>
    <el-main style="background: #f5f7f9;height:100vh">
      <router-view />
    </el-main>
  </el-container>
</template>


<script>
import { Sider } from 'iview'

export default {
  components: {
    'app-sider': () => import('../components/Sider.vue'),
    Sider
  },
  data() {
    return {
      isCollapsed: false
    }
  }
}
</script>
