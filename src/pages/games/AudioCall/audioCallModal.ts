import { Chart, ChartItem, registerables } from 'chart.js';
import './audioCallModal.scss';
import { AudioCallState } from '../../../types/state';

Chart.register(...registerables);

export default class AudioCallModal {
  AudioCallState: AudioCallState;

  constructor(state: AudioCallState) {
    this.AudioCallState = state;
  }

  modalWindow: HTMLElement = document.createElement('div');

  modalWindowContent: HTMLElement = document.createElement('div');

  modalWindowTabs: HTMLElement = document.createElement('div');

  modalRightTab: HTMLButtonElement = document.createElement('button');

  modalLeftTab: HTMLButtonElement = document.createElement('button');

  modalCanvas: HTMLCanvasElement = document.createElement('canvas');

  drawResults() {
    this.createModalWindow();
    const audioCallContainer = document.querySelector('.audioCall__container');
    if (audioCallContainer) {
      audioCallContainer.innerHTML = '';
      audioCallContainer.append(this.modalWindow);
    }

    this.createChart();
  }

  createModalWindow() {
    this.createModalWindowContent();

    this.modalWindow.classList.add('audioCall-modal');
    this.modalWindow.append(this.modalWindowContent);
  }

  createModalWindowContent() {
    this.modalWindowContent.classList.add('audioCall-modal__content');

    this.createModalTabs();
    this.createModalCanvas();

    this.modalWindowContent.append(this.modalWindowTabs, this.modalCanvas);
  }

  createModalTabs() {
    this.modalWindowTabs.classList.add('audioCall-modal__tabs');
    this.modalLeftTab.classList.add(
      'audioCall-modal__tabs-item',
      'audioCall-modal__tabs-item--active',
    );
    this.modalRightTab.classList.add('audioCall-modal__tabs-item');
    this.modalRightTab.textContent = 'Посмотреть слова';
    this.modalLeftTab.textContent = 'Результат';
    this.modalWindowTabs.append(this.modalLeftTab, this.modalRightTab);
  }

  createModalCanvas() {
    this.modalCanvas.setAttribute('id', 'myChart');
    this.modalCanvas.setAttribute('width', '400');
    this.modalCanvas.setAttribute('height', '400');
  }

  createChart() {
    const ctx = document.getElementById('myChart') as ChartItem;

    if (ctx) {
      console.log('afaf');
      const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Red', 'Green'],
          datasets: [
            {
              label: '# of Votes',
              data: [19, 100],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }
}
