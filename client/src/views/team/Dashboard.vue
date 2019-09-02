<template>
  <div>
    <h1 class="Content__Head1">Team dashboard</h1>
    <h2 class="Content__Head2">Google charts</h2>
    <div style="display:flex;flex-direction:row">
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
        [
          '',
          'New-York',
          'Los Angeles',
          'London',
          'Paris',
          { role: 'annotation' }
        ],
        ['JAN 19', 150, 125, 40, 20, 335],
        ['FEV 19', 150, 117, 46, 25, 338],
        ['MAR 19', 150, 118, 46, 30, 344],
        ['AVR 19', 150, 118, 46, 30, 344],
        ['MAI 19', 150, 118, 46, 30, 344],
        ['JUN 19', 150, 118, 46, 30, '344'],
        ['TODAY', 150, 118, 46, 30, 344],
        ['JUL 19', 150, 118, 46, 30, 344],
        ['AGU 19', 150, 118, 46, 30, 344],
        ['SEP 19', 150, 118, 46, 30, 344]
      ],
      barChartOptions: {
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
        // Bleu: 74/88/137 , #4A5889
        // Rouge: 181/52/70 , #5B3446
        // Jaune: 255/195/0 , #FFC300
        // Vert: 54/127/110 , #347F6E
      },
      donutChartData: [
        ['Office', 'Headcount'],
        ['New-York', 150],
        ['Los Angeles', 118],
        ['London', 46],
        ['Paris', 30],
      ],
      donutChartOptions: {
        width: 600,
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
        // TOTAL in the middle
        // https://codepen.io/cireriddler/pen/yyeLpE
      },
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
