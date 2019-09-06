<template>
  <div>
    <div>
      <ContentMenu activeName="echarts"/>

      <div class="GoogleChart" style="display:flex;flex-direction:row">
        <ECharts :options="polar"/>
      </div>

    </div>
    <ChartLegend/>

    <div style="display:flex;flex-direction:row;justify-content:start;align-items:center;">
      <div style="margin-left:20px;">
        <el-button type="primary" icon="el-icon-plus" @click="updateData">New Hire</el-button>
      </div>
    </div>


  </div>
</template>

<script>
// Color for the Graph
// Bleu: 74/88/137 , #4A5889
// Rouge: 181/52/70 , #B53446
// Jaune: 255/195/0 , #FFC300
// Vert: 54/127/110 , #347F6E


/*
['JAN 19', 140, 125, 40, 20, 325],
['FEV 19', 141, 122, 40, 25, 328],
['MAR 19', 144, 121, 40, 30, 335],
['AVR 19', 144, 121, 41, 32, 338],
['MAI 19', 144, 121, 41, 35, 341],
['JUN 19', 146, 125, 41, 40, 352],
['TODAY',  148, 128, 42, 42, 360],
['JUL 19', 150, 130, 43, 45, 368],
['AGU 19', 152, 130, 45, 50, 377],
['SEP 19', 160, 140, 46, 60, 406]
]
this.donutChartData = [
['Office', 'Headcount'],
['New-York', 150],
['Los Angeles', 118],
['London', 46],
['Paris', 30],
*/

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'

import ContentMenu from '../../components/common/ContentMenu.vue'
import ChartLegend from '../../components/charts/ChartLegend.vue'

export default {
  components: {
    ContentMenu,
    ChartLegend,
    ECharts
  },
  data () {
    let data = []

    for (let i = 0; i <= 360; i++) {
        let t = i / 180 * Math.PI
        let r = Math.sin(2 * t) * Math.cos(2 * t)
        data.push([r, i])
    }
    return {
      dataVersion: 1,
      polar: {
        title: {
          text: 'boo'
        },
        legend: {
          data: ['line']
        },
        polar: {
          center: ['50%', '54%']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [
          {
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: data
          }
        ],
        animationDuration: 2000
      }
    }
  },
  methods: {
    updateData: function() {}
  }
}
</script>

<style>
/**
 * The default size is 600px×400px, for responsive charts
 * you may need to set percentage values as follows (also
 * don't forget to provide a size for the container).
 */
.echarts {
  width: 300px;
  height: 300px;
}
</style>
