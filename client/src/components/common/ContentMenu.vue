<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="Google Chart" name="google"></el-tab-pane>
    <el-tab-pane label="ApexChart" name="apex">
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    props: {
      activeName: {
        type: String,
        required: true
      },

    },
    methods: {
      handleClick(tab, event) {
        console.log('handleClick1');
        if (this.activeName === 'google') {
          this.$router.push('/teamDashboard')
        }
        if (this.activeName === 'apex') {
          this.$router.push('/teamDashboard2')
        }
      }
    }
  }
</script>
