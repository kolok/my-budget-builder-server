<template>
  <div>
    <h1 class="Content__Head1">Team dashboard</h1>
    <h2 class="Content__Head2">Google charts</h2>
    <div style="display:flex;flex-direction:row">
      <div>
        <GChart
        type="ColumnChart"
        :data="barChartData"
        :options="barChartOptions"
        />
      </div>
      <div>
        <GChart
        type="PieChart"
        :data="donutChartData"
        :options="donutChartOptions"
        />
      </div>
    </div>
    <h2 class="Content__Head2">Chart.js charts</h2>
    <div style="width: 600px;height: 400px">
      <BarChart />
    </div>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'

import BarChart from '../../components/charts/BarChart.vue'

export default {
  components: {
    GChart,
    BarChart
  },
  data () {
    return {
      barChartData: [
        ['Year', 'Sales', 'Expenses', 'Profit'],
        ['2014', 1000, 400, 200],
        ['2015', 1170, 460, 250],
        ['2016', 660, 1120, 300],
        ['2017', 1030, 540, 350]
      ],
      barChartOptions: {
        isStacked: true,
        width: 600,
        height: 400,
        legend: { position: 'bottom', maxLines: 2 },
      },
      donutChartData: [
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['Watch TV', 2],
        ['Sleep',    7]
      ],
      donutChartOptions: {
        width: 600,
        height: 400,
        legend: { position: 'bottom', maxLines: 2 },
      },
    }
  }
}
</script>
