<template>
  <div class="Layout">
    <div class="Header">
      <Header />
    </div>
    <div class="Content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from './components/common/Header.vue'

export default {
  components: {
    Header
  }
}
</script>

<style>
  .Layout{
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  .Header{
    height: 64px;
    padding:0;
    width:100%;
    height:64px;
    padding-top:4px;
    background-color:#545c64;
  }
  .Content{
    height: 100%;
  }
</style>
