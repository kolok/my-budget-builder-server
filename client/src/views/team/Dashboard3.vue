<template>
  <div>
    <div>
      <ContentMenu activeName="echarts"/>

      <div class="GoogleChart" style="display:flex;flex-direction:row">
        <ECharts :options="donutOptions"/>
        <ECharts :options="options"/>
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
    return {
      dataVersion: 1,
      options: {
        tooltip : {},
        legend: {
          data: ['New-York', 'Los Angeles','London','Paris']
        },
        grid: {
          show: false,
          top: '3%',
          left: '4%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis:  {
          showGrid: false,
          type: 'category',
          splitLine: {
            show: false
          },
          'axisLabel':{'interval':0,'rotate':45},
          data: [
            { value: 'JAN 19', },
            { value: 'FEV 19', },
            { value: 'MAR 19', },
            { value: 'AVR 19', },
            { value: 'MAI 19', },
            { value: 'JUN 19', },
            {
              value: 'TODAY',
              textStyle: {'fontWeight':'bolder'}
            },
            { value: 'JUL 19', },
            { value: 'AGU 19', },
            { value: 'SEP 19', }
          ],
        },
        yAxis: {
          show: false,
          showGrid: false,
          type: 'value',
          splitLine: {
            show: false
          },
        },
        color: ['#4A5889', '#B53446', '#FFC300', '#347F6E'],
        series: [{
          name: 'New-York',
          type: 'bar',
          stack: 'Offices',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data: [140,141,144,144,144,145,148,150,152,160]
        },
        {
          name: 'Los Angeles',
          type: 'bar',
          stack: 'Offices',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data: [125,122,121,121,121,125,128,130,130,140]
        },
        {
          name: 'London',
          type: 'bar',
          stack: 'Offices',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data: [40,40,40,41,41,41,42,43,45,46]
        },
        {
          name: 'Paris',
          type: 'bar',
          stack: 'Offices',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data: [20,25,30,32,35,40,42,45,50,60]
        }]
      },
      donutOptions: {
        tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
        orient: 'vertical',
        x: 'left',
        data:['New-York','Los Angeles','London','Paris']
        },
        color: ['#4A5889', '#B53446', '#FFC300', '#347F6E'],
        series: [{
          name:'Offices',
          itemStyle : {
            normal : {
              label : {
                show: true, position: 'inner',
                formatter : function (params){
                  return  params.name + '\n' + params.value
                },
              },
              labelLine : {
                show : false
              }
            }
          },
          type:'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '20',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data:[
            {value:150, name:'New-York'},
            {value:118, name:'Los Angeles'},
            {value:46, name:'London'},
            {value:30, name:'Paris'}
          ]
        }]
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
  width: 500px;
  height: 300px;
}
</style>
