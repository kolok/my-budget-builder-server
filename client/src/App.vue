<template>
  <div class="layout">


  <el-container style="min-height: 100vh">
    <el-header style="height: 64px;padding:0;"><app-header /></el-header>
    <el-main style="height: 100vh;padding:0;"><router-view /></el-main>
  </el-container>
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
