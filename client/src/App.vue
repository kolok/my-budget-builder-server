<template>
  <div class="Layout">
    <Header />
    <div class="Body">
      <Sider />
      <Content />
    </div>
  </div>
</template>

<script>
import Header from './components/common/Header.vue'
import Sider from './components/common/Sider.vue'
import Content from './components/common/Content.vue'

export default {
  components: {
    Header,
    Sider,
    Content
  }
}
</script>

<style>
</style>
