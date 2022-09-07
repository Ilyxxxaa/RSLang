import {
  getAllWords,
  getDifficultWords,
  getLearnedUserWords,
  getNewUserWords,
} from '../../common/apiRequests';
import { IWord } from '../../types/dictionaryTypes';
import StatisticsView from './statisticsView';
import './_statistics.scss';

export default class Statistics {
  statView: StatisticsView;

  constructor() {
    this.statView = new StatisticsView();
  }

  async drawStatistics() {
    this.statView.drawStatContainer();

    const token = localStorage.getItem('token');
    if (token) {
      this.refreshLearnedWords();
      this.refreshNewWords();
    }
  }

  refreshLearnedWords = async () => {
    const words = await getLearnedUserWords();
    if (words.length !== undefined && words.length !== null) {
      const learnedWords = words.length;
      this.statView.learnedWords.textContent = `${learnedWords}`;
    }
  };

  refreshNewWords = async () => {
    const words: IWord[] = await getNewUserWords();
    if (words.length !== undefined && words.length !== null) {
      const newWords = words.length;
      this.statView.newWords.textContent = `${newWords}`;
    }

    const counts = words.reduce((count, item) => {
      if (item.userWord) {
        return count + item.userWord.optional.tryCount;
      }
      return 0;
    }, 0);

    const rightSprintAnswers = words.reduce((count, item) => {
      if (item.userWord) {
        return count + item.userWord.optional.games.sprint.right;
      }
      return 0;
    }, 0);

    const rightAudioAnswers = words.reduce((count, item) => {
      if (item.userWord) {
        return count + item.userWord.optional.games.audioCall.right;
      }
      return 0;
    }, 0);

    const rightAnswersPercent = Math.floor(
      ((rightSprintAnswers + rightAudioAnswers) / counts) * 100,
    );

    if (rightAnswersPercent) {
      this.statView.rightWords.textContent = `${rightAnswersPercent} %`;
    }

    const wrongSprintAnswers = words.reduce((count, item) => {
      if (item.userWord) {
        return count + item.userWord.optional.games.sprint.wrong;
      }
      return 0;
    }, 0);

    const wrongAudioAnswers = words.reduce((count, item) => {
      if (item.userWord) {
        return count + item.userWord.optional.games.audioCall.wrong;
      }
      return 0;
    }, 0);

    if (rightAudioAnswers && wrongAudioAnswers) {
      const winPercent = Math.floor(
        (rightAudioAnswers / (rightAudioAnswers + wrongAudioAnswers)) * 100,
      );
      this.statView.audioRightWords.textContent = `Правильных ответов: ${winPercent}%`;
    }

    if (rightSprintAnswers && wrongSprintAnswers) {
      const winPercent = Math.floor(
        (rightSprintAnswers / (rightSprintAnswers + wrongSprintAnswers)) * 100,
      );
      this.statView.sprintRightWords.textContent = `Правильных ответов: ${winPercent}%`;
    }

    const learnInSprint = words.reduce((count, item) => {
      if (item.userWord) {
        if (item.userWord?.optional.games.sprint.learned !== 0) {
          const n = item.userWord.optional.games.sprint.learned;
          return count + n;
        }
      }
      return 0;
    }, 0);

    if (learnInSprint) {
      this.statView.sprintNewWords.textContent = `Изучено: ${learnInSprint} слов`;
    }

    const learnInAudio = words.reduce((count, item) => {
      if (item.userWord) {
        if (item.userWord?.optional.games.audioCall.learned !== 0) {
          const n = item.userWord.optional.games.audioCall.learned;
          return count + n;
        }
      }
      return 0;
    }, 0);

    if (learnInAudio) {
      this.statView.audioNewWords.textContent = `Изучено: ${learnInAudio} слов`;
    }

    const inRowSprintArray: number[] = [];
    words.forEach((item) => {
      if (item.userWord?.optional.games.sprint.inRowMax) {
        const n = item.userWord?.optional.games.sprint.inRowMax;
        inRowSprintArray.push(n);
      }
    });
    if (inRowSprintArray.length !== 0) {
      const maxNumber = Math.max.apply(null, inRowSprintArray);
      if (maxNumber) {
        this.statView.sprintRightSeries.textContent = `Самая длинная серия правильных ответов: ${maxNumber}`;
      }
    }

    const inRowAudioArray: number[] = [];
    words.forEach((item) => {
      if (item.userWord?.optional.games.audioCall.inRowMax) {
        const n = item.userWord?.optional.games.audioCall.inRowMax;
        inRowAudioArray.push(n);
      }
    });

    if (inRowAudioArray.length !== 0) {
      const maxNumber = Math.max.apply(null, inRowAudioArray);
      if (maxNumber) {
        this.statView.audioRightSeries.textContent = `Самая длинная серия правильных ответов: ${maxNumber}`;
      }
    }
  };
}
