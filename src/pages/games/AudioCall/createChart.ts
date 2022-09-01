import { Chart, ChartItem, registerables } from 'chart.js';

Chart.register(...registerables);

export default class CreateChart {
  static createChart(wordsCount: number, rightWordsCount: number) {
    const chartStatus = Chart.getChart('myChart');
    if (chartStatus !== undefined) {
      chartStatus.destroy();
    }

    const ctx = document.getElementById('myChart') as ChartItem;

    const wrongWordsCount = wordsCount + 1 - rightWordsCount;
    if (ctx) {
      const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Правильных ответов', 'Неправильных ответов'],
          datasets: [
            {
              data: [rightWordsCount, wrongWordsCount],
              backgroundColor: ['#b03fd8', '#fff'],
              borderColor: ['#b03fd8'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          radius: '85%',
          animation: {
            duration: 3000,
            animateScale: true,
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }
  }
}
