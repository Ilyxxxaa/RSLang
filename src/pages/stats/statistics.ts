import StatisticsView from './statisticsView';
import './_statistics.scss';

export default class Statistics {
  statView: StatisticsView;

  constructor() {
    this.statView = new StatisticsView();
  }

  drawStatistics() {
    this.statView.drawStatContainer();
  }
}
