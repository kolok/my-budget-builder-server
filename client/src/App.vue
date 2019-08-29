<template>
  <div class="Layout">
    <Header />
    <div class="Body">
      <div class="Sider">
        <Sider />
      </div>
      <div class="Content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/common/Header.vue'
import Sider from './components/common/Sider.vue'

export default {
  components: {
    Header,
    Sider
  }
}
</script>

<style>
</style>
