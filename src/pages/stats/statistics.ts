export default class Statistics {
  statistics: HTMLElement = document.createElement('div');

  drawStatistics() {
    const pageContent = document.querySelector('.page__content');
    this.createStatistics();
    if (pageContent) {
      pageContent.innerHTML = '';
      pageContent.append(this.statistics);
    }
  }

  createStatistics() {
    this.statistics.classList.add('games');
    this.statistics.textContent = 'Тут будет статистика';
  }
}
