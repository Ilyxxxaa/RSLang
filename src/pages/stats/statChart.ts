import { Chart, ChartItem, registerables } from 'chart.js';

Chart.register(...registerables);

export default class StatChart {
  static createChart(wordsCount: number) {
    const chartStatus = Chart.getChart('myChart');
    if (chartStatus !== undefined) {
      chartStatus.destroy();
    }
    const ctx = document.getElementById('statChart') as ChartItem;

    if (ctx) {
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['0', '08.09.2022'],
          datasets: [
            {
              label: 'Новых слов',
              data: [0, wordsCount],
              backgroundColor: ['#000000'],
              borderColor: ['#b03fd8'],
              borderWidth: 5,
            },
          ],
        },
        options: {
          animation: {
            duration: 3000,
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: 'Кол-во изученных слов за каждый день обучения',
              color: '#ffffff',
              font: {
                size: 18,
              },
            },
          },
        },
      });
    }
  }
}
