<template>
  <div class="layout">
    <Layout style="min-height: 100vh">
      <app-header />
      <router-view />
    </Layout>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import { Layout } from 'iview'

export default {
  components: {
    'app-header': Header,
    // 'app-footer': Footer,
    Layout
  },
  data() {
    return {

    }
  }
}
</script>

<style>

</style>
