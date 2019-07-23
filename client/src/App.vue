<template>
  <div class="layout">
    <el-container style="min-height: 100vh">
      <el-header style="height: 64px;padding:0;">
        <app-header />
      </el-header>
      <el-main style="height: 100vh;padding:10px;">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from './components/common/Header.vue'

export default {
  components: {
    'app-header': Header,
  },
  data() {
    return {
    }
  }
}
</script>

<style>

</style>
