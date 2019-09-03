<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Google Chart" name="google"></el-tab-pane>
      <el-tab-pane label="Chart.js" name="chartjs">
      </el-tab-pane>
    </el-tabs>
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
    <div style="display:flex;flex-direction:row;justify-content:start;align-items:center;">
      <div style="margin-left:20px;">
        <el-button type="primary" icon="el-icon-plus" @click="updateData">New Hire</el-button>
      </div>
      <div style="margin-left:20px;">
        <el-dropdown>
          <span class="el-dropdown-link" style="padding:10px 20px;border:1px solid;width:200px;">
            Filter<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>blah blah blah</el-dropdown-item>
            <el-dropdown-item>blah blah blah</el-dropdown-item>
            <el-dropdown-item>blah blah blah</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div style="margin-left:20px;">
        <el-dropdown>
          <span class="el-dropdown-link" style="padding:10px 20px;border:1px solid;">
            Sort by<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>blah blah blah</el-dropdown-item>
            <el-dropdown-item>blah blah blah</el-dropdown-item>
            <el-dropdown-item>blah blah blah</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
// Color for the Graph
// Bleu: 74/88/137 , #4A5889
// Rouge: 181/52/70 , #5B3446
// Jaune: 255/195/0 , #FFC300
// Vert: 54/127/110 , #347F6E


import { GChart } from 'vue-google-charts'

export default {
  components: {
    GChart
  },
  data () {
    return {
      activeName: 'google',
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
      this.donutChartData = [
        ['Office', 'Headcount'],
        ['New-York', 15],
        ['Los Angeles', 112],
        ['London', 49],
        ['Paris', 3],
      ];
      this.barChartData= [
        [
          '',
          'New-York',
          'Los Angeles',
          'London',
          'Paris',
          { role: 'annotation' }
        ],
        ['JAN 19', 150, 125, 40, 20, 335],
        ['FEV 19', 151, 117, 46, 25, 339],
        ['MAR 19', 152, 118, 46, 30, 345],
        ['AVR 19', 153, 118, 46, 30, 346],
        ['MAI 19', 154, 118, 46, 30, 347],
        ['JUN 19', 155, 118, 46, 30, 348],
        ['TODAY', 156, 118, 46, 30, 349],
        ['JUL 19', 157, 118, 46, 30, 350],
        ['AGU 19', 158, 118, 46, 30, 351],
        ['SEP 19', 159, 118, 46, 30, 352]
      ]
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
