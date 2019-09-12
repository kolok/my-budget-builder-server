<script>
  import { Bar } from 'vue-chartjs'
  import ChartDataLabels from 'chartjs-plugin-datalabels';


  export default {
    extends: Bar,
    data: () => ({
      data: {
        labels: ['JAN 19', 'FEV 19', 'MAR 19', 'AVR 19', 'MAI 19', 'JUN 19', 'TODAY', 'JUL 19', 'AGU 19', 'SEP 19'],
        datasets: [{
          label: 'New-York',
          data: [150,150,150,150,150,150,150,150,150,150],
          backgroundColor: 'rgba(74,88,137, 1)',
          borderColor: 'rgba(74,88,137, 1)',
          borderWidth: 0,
        },
        {
          label: 'Los Angeles',
          data: [125, 117, 118,118,118,118,118,118,118,118],
          backgroundColor: 'rgba(181,52,70, 1)',
          borderColor: 'rgba(181,52,705, 1)',
          borderWidth: 0
          },
        {
          label: 'London',
          data: [40,46,46,46,46,46,46,46,46,46],
          backgroundColor: 'rgba(255,195,0, 1)',
          borderColor: 'rgba(255,195,0, 1)',
          borderWidth: 0
          },
        {
          label: 'Paris',
          data: [20,25,30,30,30,30,30,30,30,30,],
          backgroundColor: 'rgba(54,127,110, 1)',
          borderColor: 'rgba(54,127,110, 1)',
          borderWidth: 0
        }]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines:{
              display: false
            },
            stacked: true,
          }],
          yAxes: [{
            display: false,
            gridLines:{
              display: false
            },
            stacked: true,
            ticks: {
              beginAtZero: true
            }
          }]
        },
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              if (ctx.datasetIndex == 3)
                return value;
              else
                return "";
            },
            anchor: 'end',
            align: 'end'
          }
        }
      },
    }),
    mounted () {
      this.renderChart(this.data, this.options)
    }
  }
</script>
