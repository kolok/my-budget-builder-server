<template>
  <div>
    <div>
      <ContentMenu activeName="apex"/>

      <div class="GoogleChart" style="display:flex;flex-direction:row">
        <VueApexCharts width="360" type="donut" :options="dOptions" :series="dSeries"></VueApexCharts>
        <VueApexCharts width="500" height="300" type="bar" :options="options" :series="series"></VueApexCharts>
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





import VueApexCharts from 'vue-apexcharts'

import ContentMenu from '../../components/common/ContentMenu.vue'
import ChartLegend from '../../components/charts/ChartLegend.vue'

let baseAnnotationsPointsLabel = {
  borderWidth: 0,
  offsetY: 0,
  style: {
    color: '#606266',
  }
};

export default {
  components: {
    VueApexCharts,
    ContentMenu,
    ChartLegend
  },
  data () {
    return {
      dataVersion: 1,
      dOptions: {
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  color: '#606266',
                  label: 'Total'
                },
                name: {
                  show: true,
                },
                value: {
                  show: true,
                }
              }
            }
          }
        },
        colors:['#4A5889', '#B53446', '#FFC300', '#347F6E'],
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            return opts.w.config.series[opts.seriesIndex]
          }
        },
        labels: ['New York', 'Los Angeles', 'London', 'Paris'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    show: false
                }
            }
        }],
        legend: {
          show: false
        }
      },
      dSeries: [150, 118, 46, 30],

      options: {
        chart: {
            height: 350,
            type: 'bar',
            stacked: true,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: true
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0
                }
            }
        }],
        plotOptions: {
            bar: {
                horizontal: false,
            },
        },
        grid: {
          show: false,
        },

        xaxis: {
          categories: ['JAN 19', 'FEV 19', 'MAR 19', 'AVR 19', 'MAI 19', 'JUN 19', 'TODAY', 'JUL 19', 'AGU 19', 'SEP 19'],
          labels: {
            rotate: 45,
          },
        },
        legend: {
          show: false
        },
        fill: {
            opacity: 1
        },
        colors:['#4A5889', '#B53446', '#FFC300', '#347F6E'],
        dataLabels: {
          enabled: false,
        },
        annotations: {
          points: [
            {
              x: 'JAN 19',
              y: 325,
              marker: {
                size: 0,
              },
              label: {
                ...baseAnnotationsPointsLabel,
                ...{text: "325"}
              }
            },
            {
              x: 'FEV 19',
              y: 328,
              marker: {
                size: 0,
              },
              label: {
              ...baseAnnotationsPointsLabel,
              ...{text: "328"}
              }
            },

            {
              x: 'MAR 19',
              y: 335,
              marker: {
                size: 0,
              },
              label: {
              ...baseAnnotationsPointsLabel,
              ...{text: "335"}
              }
            },
            {
              x: 'AVR 19',
              y: 338,
              marker: {
                size: 0,
              },
              label: {
              ...baseAnnotationsPointsLabel,
              ...{text: "338"}
              }
            },
            {
              x: 'MAI 19',
              y: 341,
              marker: {
                size: 0,
              },
              label: {
              ...baseAnnotationsPointsLabel,
              ...{text: "341"}
              }
            },
            {
              x: 'JUN 19',
              y: 352,
              marker: {
                size: 0,
              },
              label: {
              ...baseAnnotationsPointsLabel,
              ...{text: "352"}
              }
            },
            {
              x: 'TODAY',
              y: 360,
              marker: {
                size: 0,
              },
              label: {
              ...baseAnnotationsPointsLabel,
              ...{text: "360"}
              }
            },
            {
              x: 'JUL 19',
              y: 368,
              marker: {
                size: 0,
              },
              label: {
              ...baseAnnotationsPointsLabel,
              ...{text: "368"}
              }
            },

            {
              x: 'AGU 19',
              y: 377,
              marker: {
                size: 0,
              },
              label: {
                ...baseAnnotationsPointsLabel,
                ...{text: "377"}
              }
            },
            {
              x: 'SEP 19',
              y: 406,
              marker: {
                size: 0,
              },
              label: {
                ...baseAnnotationsPointsLabel,
                ...{text: "406"}
              }
            },
          ]
        },
      },

      series: [{
          name: 'New-York',
          data: [140,141,144,144,144,145,148,150,152,160]
      },{
          name: 'Los Angeles',
          data: [125,122,121,121,121,125,128,130,130,140]
      },{
          name: 'London',
          data: [40,40,40,41,41,41,42,43,45,46]
      },{
          name: 'Paris',
          data: [20,25,30,32,35,40,42,45,50,60]
      }]
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
    },

    updateData: function() {
      let baseAnnotationsPointsLabel = {
        borderWidth: 0,
        offsetY: 0,
        style: {
          color: '#606266',
        },

        text: "356"
      };

      if (this.dataVersion != 2)
      {
        this.dataVersion = 2
        this.series= [{
            name: 'New-York',
            data: [130,131,134,134,134,135,138,150,152,160]
        },{
            name: 'Los Angeles',
            data: [125,122,121,121,121,125,128,130,130,140]
        },{
            name: 'London',
            data: [40,40,40,41,41,51,52,53,55,56]
        },{
            name: 'Paris',
            data: [20,25,30,32,35,40,42,45,50,60]
        }];
        this.dSeries = [138, 128, 52, 42];
        this.options = {...this.options, ...{
          annotations: {
            points: [
            {
              x: 'JAN 19',
              y: 315,
              marker: {
                size: 0,
              },
              label: {
                ...baseAnnotationsPointsLabel,
                ...{text: "315"}
              }
            },
            {
              x: 'FEV 19',
              y: 318,
              marker: {
                size: 0,
              },
              label: {
              ...baseAnnotationsPointsLabel,
              ...{text: "318"}
              }
            },

            {
              x: 'MAR 19',
              y: 325,
              marker: {
                size: 0,
              },
              label: {
              ...baseAnnotationsPointsLabel,
              ...{text: "325"}
              }
            },
            {
              x: 'AVR 19',
              y: 328,
              marker: {
                size: 0,
              },
              label: {
              ...baseAnnotationsPointsLabel,
              ...{text: "328"}
              }
            },
            {
              x: 'MAI 19',
              y: 331,
              marker: {
                size: 0,
              },
              label: {
              ...baseAnnotationsPointsLabel,
              ...{text: "331"}
              }
            },
            {
              x: 'JUN 19',
              y: 352,
              marker: {
                size: 0,
              },
              label: {
              ...baseAnnotationsPointsLabel,
              ...{text: "352"}
              }
            },
            {
              x: 'TODAY',
              y: 360,
              marker: {
                size: 0,
              },
              label: {
              ...baseAnnotationsPointsLabel,
              ...{text: "360"}
              }
            },
            {
              x: 'JUL 19',
              y: 378,
              marker: {
                size: 0,
              },
              label: {
              ...baseAnnotationsPointsLabel,
              ...{text: "378"}
              }
            },

            {
              x: 'AGU 19',
              y: 387,
              marker: {
                size: 0,
              },
              label: {
                ...baseAnnotationsPointsLabel,
                ...{text: "387"}
              }
            },
            {
              x: 'SEP 19',
              y: 416,
              marker: {
                size: 0,
              },
              label: {
                ...baseAnnotationsPointsLabel,
                ...{text: "416"}
              }
            },            ]
          }
        }}
      }
      else {
        this.dataVersion = 1

        this.options = {...this.options, ...{
          annotations: {
            points: [
              {
                x: 'JAN 19',
                y: 325,
                marker: { size: 0 },
                label: {
                  ...baseAnnotationsPointsLabel,
                  ...{text: "325"}
                }
              },
              {
                x: 'FEV 19',
                y: 328,
                marker: { size: 0 },
                label: {
                  ...baseAnnotationsPointsLabel,
                  ...{text: "328"}
                }
              },
              {
                x: 'MAR 19',
                y: 335,
                marker: { size: 0 },
                label: {
                  ...baseAnnotationsPointsLabel,
                  ...{text: "335"}
                }
              },
              {
                x: 'AVR 19',
                y: 338,
                marker: { size: 0 },
                label: {
                  ...baseAnnotationsPointsLabel,
                  ...{text: "338"}
                }
              },
              {
                x: 'MAI 19',
                y: 341,
                marker: { size: 0 },
                label: {
                  ...baseAnnotationsPointsLabel,
                  ...{text: "341"}
                }
              },
              {
                x: 'JUN 19',
                y: 352,
                marker: { size: 0 },
                label: {
                  ...baseAnnotationsPointsLabel,
                  ...{text: "352"}
                }
              },
              {
                x: 'TODAY',
                y: 360,
                marker: { size: 0 },
                label: {
                  ...baseAnnotationsPointsLabel,
                  ...{text: "360"}
                }
              },
              {
                x: 'JUL 19',
                y: 368,
                marker: { size: 0 },
                label: {
                  ...baseAnnotationsPointsLabel,
                  ...{text: "368"}
                }
              },
              {
                x: 'AGU 19',
                y: 377,
                marker: { size: 0 },
                label: {
                  ...baseAnnotationsPointsLabel,
                  ...{text: "377"}
                }
              },
              {
                x: 'SEP 19',
                y: 406,
                marker: { size: 0 },
                label: {
                  ...baseAnnotationsPointsLabel,
                  ...{text: "406"}
                }
              },
            ]
          }
        }}



        this.series= [{
            name: 'New-York',
            data: [140,141,144,144,144,145,148,150,152,160]
        },{
            name: 'Los Angeles',
            data: [125,122,121,121,121,125,128,130,130,140]
        },{
            name: 'London',
            data: [40,40,40,41,41,41,42,43,45,46]
        },{
            name: 'Paris',
            data: [20,25,30,32,35,40,42,45,50,60]
        }];
        this.dSeries = [150, 118, 46, 30];
      }
    }





  }
}
</script>
