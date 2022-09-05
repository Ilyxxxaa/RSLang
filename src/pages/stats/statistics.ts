import StatisticsView from './statisticsView';

export default class Statistics {
  drawStatistics() {
    const pageContent = document.querySelector('.page__content');
    if (pageContent) {
      pageContent.innerHTML = '';
    }
    this.createStatistics();
  }

  createStatistics() {
    const statView = new StatisticsView();
    statView.drawStatContainer();
    statView.drawGameStatCard('audiocall', 'Аудиовызов');
    statView.drawGameStatCard('sprint', 'Спринт');
  }
}
