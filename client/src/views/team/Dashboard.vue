<template>
  <div>
    <ContentMenu activeName='google'/>
    <div class="GoogleChart" style="display:flex;flex-direction:row">
      <div>
        <GChart
          type="PieChart"
          :data="donutChartData"
          :options="donutChartOptions"
        />
      </div>
      <div>
        <GChart
          type="ColumnChart"
          :data="barChartData"
          :options="barChartOptions"
        />
      </div>
    </div>
    <ChartLegend/>

    <div style="margin-left:20px;">
      <el-button type="primary" icon="el-icon-plus" @click="updateData">Update data</el-button>
    </div>

  </div>
</template>

<script>
// Color for the Graph
// Bleu: 74/88/137 , #4A5889
// Rouge: 181/52/70 , #5B3446
// Jaune: 255/195/0 , #FFC300
// Vert: 54/127/110 , #347F6E

import ContentMenu from '../../components/common/ContentMenu.vue'
import ChartLegend from '../../components/charts/ChartLegend.vue'

import { GChart } from 'vue-google-charts'

export default {
  components: {
    GChart,
    ContentMenu,
    ChartLegend
  },
  data () {
    return {
      dataVersion: 2,
      barChartData: [
        [
          '',
          'New-York',
          'Los Angeles',
          'London',
          'Paris',
          { role: 'annotation' }
        ],
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
      ],
      barChartOptions: {
        animation: {
          duration: 1000,
          easing: 'out',
          startup: true
        },
        isStacked: true,
        width: 600,
        height: 400,
        legend: { position: 'bottom', maxLines: 2 },
        legend: 'none',
        series: {
          0: {color: "#4A5889"},
          1: {color: "#B53446"},
          2: {color: "#FFC300"},
          3: {color: "#347F6E"},
        },
        annotations: {
        alwaysOutside: true,
          datum: {
            stem: {
              color: 'white'
            }
          },
          textStyle: {
            fontName: "sans-serif",
            fontSize: '14px',
            color: '#606266',
          }
        },
        vAxis: {
            gridlines: {
                color: 'transparent'
            },
            textPosition: 'none'
        },
        hAxis: {
          slantedText:true,
          slantedTextAngle:45,
          textStyle: {
            fontName: "sans-serif",
            fontSize: '14px',
            color: '#606266',
          }
        },
      },
      donutChartData: [
        ['Office', 'Headcount'],
        ['New-York', 150],
        ['Los Angeles', 118],
        ['London', 46],
        ['Paris', 30],
      ],
      donutChartOptions: {
        width: 400,
        height: 400,
        legend: {
          position: 'none',
          //position: 'bottom',
          maxLines: 2,
          textStyle: {
            fontName: "sans-serif",
            fontSize: '14px',
            color: '#606266',
          }
        },
        pieHole: 0.4,
        pieSliceText: 'value',
        slices: {
          0: {color: "#4A5889"},
          1: {color: "#B53446"},
          2: {color: "#FFC300"},
          3: {color: "#347F6E"},
        },
        animation: {
          duration: 1000,
          //easing: 'out',
          startup: true
        },
        // TOTAL in the middle
        // https://codepen.io/cireriddler/pen/yyeLpE
      },
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log('handleClick1');
      if (this.activeName === 'google') {
        this.$router.push('/teamDashboard')
      }
      if (this.activeName === 'chartjs') {
        this.$router.push('/teamDashboard2')
      }
    },
    updateData: function() {
      if (this.dataVersion != 2)
      {
        this.dataVersion = 2
        this.barChartData= [
          [
            '',
            'New-York',
            'Los Angeles',
            'London',
            'Paris',
            { role: 'annotation' }
          ],
          ['JAN 19', 130, 125, 40, 20, 315],
          ['FEV 19', 131, 122, 40, 25, 318],
          ['MAR 19', 134, 121, 40, 30, 325],
          ['AVR 19', 134, 121, 41, 32, 328],
          ['MAI 19', 134, 121, 41, 35, 331],
          ['JUN 19', 136, 125, 51, 40, 352],
          ['TODAY',  138, 128, 52, 42, 360],
          ['JUL 19', 150, 130, 53, 45, 378],
          ['AGU 19', 152, 130, 55, 50, 387],
          ['SEP 19', 160, 140, 56, 60, 416]
        ],
        this.donutChartData = [
          ['Office', 'Headcount'],
          ['New-York', 138],
          ['Los Angeles', 128],
          ['London', 52],
          ['Paris', 42],
        ];
      }
      else
      {
        this.dataVersion = 1
        this.barChartData= [
          [
            '',
            'New-York',
            'Los Angeles',
            'London',
            'Paris',
            { role: 'annotation' }
          ],
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
        ];
      }
    }
  }
}
</script>
