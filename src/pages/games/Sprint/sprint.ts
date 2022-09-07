/* eslint-disable import/no-cycle */
import State from '../../../types/state';
import getRandomNumber from '../random';
import SprintView from './sprintView';
import { baseLink } from '../../../const';
import SprintModal from './sprintModal';
import SprintResultModal from './sprintResultModal';
import { requestGetAuth } from './sprintRequests';
import { createUserWord, updateUserWord } from '../../../common/apiRequests';
import { request } from '../../main/authorization/requests';

class Sprint {
  state: State;

  sprintView: SprintView;

  intervalId?: ReturnType<typeof setInterval>;

  constructor(state: State) {
    this.state = state;
    this.sprintView = new SprintView(this.state);
    SprintModal.drawSprintModal();
  }

  async getWordsForGameAnonymous(page: number, level: number) {
    const url = `words?page=${page}&group=${level}`;
    const wordsForGame = request('GET', url);
    return wordsForGame.then((result) => {
      this.state.sprint.wordsForGame = [...result];
    });
  }

  async getWordsForGameAuth(url: string) {
    const wordsForGame = requestGetAuth(url);
    return wordsForGame.then((result) => {
      this.state.sprint.wordsForGame = [...result];
    });
  }

  async helper(page: number, level: number) {
    if (!localStorage.getItem('token')) {
      return this.getWordsForGameAnonymous(this.state.gamePage, this.state.gameLevel);
    }
    if (localStorage.getItem('token')) {
      const userId = localStorage.getItem('userId')?.slice(1, -1);
      if (this.state.gameInit === 'menu') {
        const urlAuthWords = `${baseLink}/users/${userId}/aggregatedWords?group=${level}&page=${page}&wordsPerPage=20`;
        return this.getWordsForGameAuth(urlAuthWords);
      }
      if (this.state.gameInit === 'book') {
        const urlAuthUnlearnedWords = `${baseLink}/users/${userId}/aggregatedWords?group=${level}&page=${page}&filter={"$or":[{"$and":[{"userWord.optional.learned":false}]},{"userWord":null}]}&wordsPerPage=20`;
        return this.getWordsForGameAuth(urlAuthUnlearnedWords);
      }
    }
    return this.state.sprint.wordsForGame;
  }

  drawSprintView() {
    this.setCountdown();
    this.sprintView.drawSprintGameView();
    this.addHandlersToSprintButtons();
    this.showSprintModalWindow();
    this.addHandlerToAudio();
    this.addHandlersToMute();
    this.addHandlersToUnMute();
  }

  setCountdown = () => {
    this.intervalId = setInterval(this.updateCountdown, 1000);
    this.state.sprint.timerId = this.intervalId;
  };

  updateCountdown = () => {
    const countdown = document.querySelector('.sprint__countdown') as HTMLElement;
    const sprintResultModal = new SprintResultModal(this.state);
    let seconds = Number(countdown.textContent);
    if (seconds > 0) {
      seconds -= 1;
      countdown.textContent = seconds.toString();
    }
    if (!seconds) {
      clearInterval(this.state.sprint.timerId);
      this.showSprintResultsModal();
    }
  };

  showSprintModalWindow() {
    document.querySelector('.sprint__close')?.addEventListener('click', () => {
      clearInterval(this.state.sprint.timerId);
      document.querySelector('.sprint-modal')?.classList.remove('hidden');
      (document.querySelector('body') as HTMLElement).style.overflow = 'hidden';
    });
  }

  addHandlersToSprintModal() {
    document.querySelector('.sprint-modal__button_close')?.addEventListener('click', () => {
      document.querySelector('.sprint-modal')?.classList.add('hidden');
      (document.querySelector('body') as HTMLElement).style.overflow = 'visible';
      clearInterval(this.state.sprint.timerId);
      this.showSprintResultsModal();
    });

    document.querySelector('.sprint-modal__button_continue')?.addEventListener('click', () => {
      document.querySelector('.sprint-modal')?.classList.add('hidden');
      (document.querySelector('body') as HTMLElement).style.overflow = 'visible';
      this.setCountdown();
    });
  }

  closeSprintModalWindow() {
    document.querySelector('.sprint-modal__close')?.addEventListener('click', () => {
      document.querySelector('.sprint-modal')?.classList.add('hidden');
      (document.querySelector('body') as HTMLElement).style.overflow = 'visible';
      this.setCountdown();
    });
  }

  addHandlerToAudio() {
    document.querySelector('.sprint__audio')?.addEventListener('click', () => {
      const audio = document.createElement('audio');
      audio.src = `${baseLink}/${this.state.sprint.gameCurrentWord?.audio}`;
      audio.play();
    });
  }

  addHandlersToSprintButtons = () => {
    document.querySelector('.button__container')?.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLButtonElement;
      const userAnswer = target.value;

      if (target.classList.contains('sprint__button')) {
        this.checkAnswer(userAnswer);
        this.setPoints();
        this.scorePoints();
        this.setRandomWord();
      }
    });
  };

  addHandlersFromKeyboard() {
    document.addEventListener('keyup', (event: KeyboardEvent) => {
      let userAnswer = '';
      if (event.code === 'ArrowLeft') {
        userAnswer = 'false';
      }
      if (event.code === 'ArrowRight') {
        userAnswer = 'true';
      }
      if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
        this.checkAnswer(userAnswer);
        this.setPoints();
        this.scorePoints();
        this.setRandomWord();
      }
    });
  }

  setRandomWord() {
    const wordEn = document.querySelector('.word_en') as HTMLElement;
    const wordRu = document.querySelector('.word_ru') as HTMLElement;

    const words = this.state.sprint.wordsForGame;
    const currentWord = words[getRandomNumber(0, words.length - 1)];
    this.state.sprint.gameCurrentWord = currentWord;
    wordEn.textContent = currentWord.word;

    const statusWordTranslate = words.length === 1 ? 1 : getRandomNumber(0, 1);

    if (statusWordTranslate) {
      wordRu.textContent = currentWord.wordTranslate;
    } else {
      const listWithoutCurrentWord = words.filter((word) => word !== currentWord);
      const wrongTranslates = listWithoutCurrentWord.map((word) => word.wordTranslate);
      const currentWrongTranslate = wrongTranslates[getRandomNumber(0, wrongTranslates.length - 1)];
      wordRu.textContent = currentWrongTranslate;
    }

    this.state.sprint.wordsForGame = words.filter((word) => word !== currentWord);

    if (this.state.gamePage) {
      if (!this.state.sprint.wordsForGame.length) {
        this.state.gamePage -= 1;
        this.helper(this.state.gamePage, this.state.gameLevel);
      }
    }
    if (!this.state.gamePage) {
      if (!this.state.sprint.wordsForGame.length) {
        this.endSprintGame();
      }
    }
  }

  checkAnswer = async (userAnswer: string) => {
    const rightAnswerAudio = document.querySelector('.sprint-audio_right') as HTMLAudioElement;
    const wrongAnswerAudio = document.querySelector('.sprint-audio_wrong') as HTMLAudioElement;
    const increasePointsAudio = document.querySelector('.sprint-audio_points') as HTMLAudioElement;

    const checkbox = document.querySelectorAll<HTMLElement>('.checkbox__item');
    const currentWord = this.state.sprint.gameCurrentWord;

    const wordRu = document.querySelector('.word_ru') as HTMLElement;
    const rightAnswer = currentWord?.wordTranslate === wordRu.textContent;
    const checkedUserAnswer = String(rightAnswer) === userAnswer;

    if (checkedUserAnswer) {
      rightAnswerAudio.pause();
      rightAnswerAudio.currentTime = 0;
      rightAnswerAudio.play();

      this.state.sprint.countRightAnswersInARow += 1;
      this.state.sprint.pointsScored += this.state.sprint.pointsPerWord;

      if (currentWord) {
        this.state.sprint.rightAnswers.push(currentWord);
      }

      checkbox?.forEach((item, index) => {
        if (this.state.sprint.countRightAnswersInARow % 4 === 0) {
          increasePointsAudio.play();
          item.classList.remove('checkbox__item_active');
        }
        if (index + 1 === this.state.sprint.countRightAnswersInARow % 4) {
          item.classList.add('checkbox__item_active');
        }
      });
    }

    if (!checkedUserAnswer) {
      if (currentWord) {
        this.state.sprint.wrongAnswers.push(currentWord);
      }

      wrongAnswerAudio.pause();
      wrongAnswerAudio.currentTime = 0;
      wrongAnswerAudio.play();

      this.state.sprint.countRightAnswersInARow = 0;
      checkbox.forEach((item) => {
        item.classList.remove('hidden');
        item.classList.remove('checkbox__item_active');
      });
    }

    if (localStorage.getItem('token') && currentWord) {
      if (currentWord?.userWord) {
        updateUserWord(currentWord, 'sprint', checkedUserAnswer);
      } else {
        createUserWord(currentWord, 'sprint', checkedUserAnswer);
      }
    }
  };

  setPoints() {
    const { countRightAnswersInARow } = this.state.sprint;
    if (countRightAnswersInARow <= 3) {
      this.state.sprint.pointsPerWord = 10;
    } else if (countRightAnswersInARow >= 4 && countRightAnswersInARow <= 7) {
      this.state.sprint.pointsPerWord = 20;
    } else if (countRightAnswersInARow >= 8 && countRightAnswersInARow <= 11) {
      this.state.sprint.pointsPerWord = 40;
    } else if (countRightAnswersInARow >= 12 && countRightAnswersInARow <= 15) {
      this.state.sprint.pointsPerWord = 80;
    } else {
      this.state.sprint.pointsPerWord = 100;
    }
  }

  scorePoints() {
    (document.querySelector(
      '.sprint__points',
    ) as HTMLElement).textContent = `+${this.state.sprint.pointsPerWord} очков за слово`;
    const score = document.querySelector('.sprint__score') as HTMLElement;
    score.textContent = this.state.sprint.pointsScored.toString();
  }

  showSprintResultsModal() {
    const sprintResultModal = new SprintResultModal(this.state);
    sprintResultModal.drawResults();
    sprintResultModal.addListenerToTabs();
    sprintResultModal.addHandlersToSprintResultModal();
  }

  addHandlersToMute = () => {
    document.querySelector('.sprint__unmute')?.addEventListener('click', (event: Event) => {
      (event.target as HTMLElement).classList.add('hidden');
      document.querySelector('.sprint__mute')?.classList.remove('hidden');

      (document.querySelector('.sprint-audio_right') as HTMLAudioElement).muted = true;
      (document.querySelector('.sprint-audio_wrong') as HTMLAudioElement).muted = true;
      (document.querySelector('.sprint-audio_points') as HTMLAudioElement).muted = true;
    });
  };

  addHandlersToUnMute = () => {
    document.querySelector('.sprint__mute')?.addEventListener('click', (event: Event) => {
      (event.target as HTMLElement).classList.add('hidden');
      document.querySelector('.sprint__unmute')?.classList.remove('hidden');

      (document.querySelector('.sprint-audio_right') as HTMLAudioElement).muted = false;
      (document.querySelector('.sprint-audio_wrong') as HTMLAudioElement).muted = false;
      (document.querySelector('.sprint-audio_points') as HTMLAudioElement).muted = false;
    });
  };

  endSprintGame() {
    clearInterval(this.intervalId);
    const sprintResultModal = new SprintResultModal(this.state);
    this.showSprintResultsModal();
  }
}

export default Sprint;
