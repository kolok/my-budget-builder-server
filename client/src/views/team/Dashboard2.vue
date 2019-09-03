<template>
<div>
<div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Google Chart" name="google"></el-tab-pane>
      <el-tab-pane label="Chart.js" name="chartjs"></el-tab-pane>
    </el-tabs>
    <div class="GoogleChart" style="display:flex;flex-direction:row">
      <BarChartContainer />
      <BarChartContainer />
    </div>

  </div>
  <div style="display:flex;flex-direction:row;justify-content:center;align-items:center;">
  <svg height="20" width="20" class="dot">
    <circle cx="10" cy="10" r="7" stroke="#4A5889" stroke-width="4" fill="white" />
    <span class="dot--blue"></span>
  </svg>
    <p>New-York</p>
    <svg height="20" width="20" class="dot">
      <circle cx="10" cy="10" r="7" stroke="#B53446" stroke-width="4" fill="white" />
      <span class="dot--red"></span>
    </svg><p>Los Angeles</p>
    <svg height="20" width="20" class="dot">
      <circle cx="10" cy="10" r="7" stroke="#FFC300" stroke-width="4" fill="white" />
      <span class="dot--yellow"></span>
    </svg><p>London</p>
    <svg height="20" width="20" class="dot">
      <circle cx="10" cy="10" r="7" stroke="#347F6E" stroke-width="4" fill="white" />
      <span class="dot--green"></span>
    </svg><p>Paris</p>
    </div>
    </div>
</template>

<script>
// Color for the Graph
// Bleu: 74/88/137 , #4A5889
// Rouge: 181/52/70 , #5B3446
// Jaune: 255/195/0 , #FFC300
// Vert: 54/127/110 , #347F6E

import BarChartContainer from '../../components/charts/BarChartContainer.vue'

export default {
  components: {
    BarChartContainer
  },
  data () {
    return {
      activeName: 'chartjs',
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log('handleClick2');
      if (this.activeName === 'google') {
        this.$router.push('/teamDashboard')
      }
      if (this.activeName === 'chartjs') {
        this.$router.push('/teamDashboard2')
      }
    }
  }
}
</script>

<style>
  .dot {
    margin-left:10px;
    margin-right:5px;
  }
  .dot--blue {
    background-color: #4A5889;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    display: inline-block;
  }
  .dot--red {
    background-color: #B53446;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    display: inline-block;
  }
  .dot--yellow {
    background-color: #FFC300;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    display: inline-block;
  }
  .dot--green {
    background-color: #347F6E;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    display: inline-block;
  }

</style>
