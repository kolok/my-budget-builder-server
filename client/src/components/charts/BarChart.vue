<script>
  import { Bar } from 'vue-chartjs'

  export default {
    extends: Bar,
    data: () => ({
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],

// Bleu: 74/88/137
// Rouge: 181/52/70
// Jaune: 255/195/0
// Vert: 54/127/110

        datasets: [{
          label: 'dataset 1',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgba(74,88,137, 1)',
          borderColor: 'rgba(74,88,137, 1)',
          borderWidth: 1
        },
        {
          label: 'dataset 2',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgba(181,52,70, 1)',
          borderColor: 'rgba(181,52,705, 1)',
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            beginAtZero: true
          }
        }]
        }
      },
    }),
    mounted () {
      this.renderChart(this.data, this.options)
    }
  }
</script>
