<template>
  <Layout style="height:100%;">
    <Sider
      v-model="isCollapsed"
      :style="{background: '#fff'}"
      :collapsed-width="78"
      collapsible
    >
      <app-sider :is-collapsed="isCollapsed" />
    </Sider>
    <Layout style="padding:24px">
        <router-view />
    </Layout>
  </Layout>
</template>

<script>
import { Layout, Sider, Content, Breadcrumb, BreadcrumbItem } from 'iview'

export default {
  components: {
    'app-sider': () => import('../components/Sider.vue'),
    Layout, Sider, Content, Breadcrumb, BreadcrumbItem
  },
  data() {
    return {
      isCollapsed: false
    }
  }
}
</script>
