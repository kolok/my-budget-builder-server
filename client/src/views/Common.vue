<template>
  <Layout>
    <Sider
      v-model="isCollapsed"
      :style="{background: '#fff'}"
      :collapsed-width="78"
      collapsible
    >
      <app-sider :is-collapsed="isCollapsed" />
    </Sider>
    <Layout :style="{padding: '0 24px 24px'}">
      <Content>
        <router-view />
      </Content>
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
