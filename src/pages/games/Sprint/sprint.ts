import State from '../../../types/state';
import getRandomNumber from '../random';
import SprintView from './sprintView';
import { requestGet } from '../../main/authorization/requests';
import { baseLink } from '../../../const';
import SprintModal from './sprintModal';

class Sprint {
  state: State;

  sprintView: SprintView;

  constructor(state: State) {
    this.state = state;
    this.sprintView = new SprintView(this.state);
  }

  async getWordsForGame(page: number, level: number) {
    const wordsForGame = requestGet(`${baseLink}/words?page=${page}&group=${level}`);
    return wordsForGame.then((result) => {
      this.state.sprint.wordsForGame = [];
      this.state.sprint.wordsForGame = [...result];
    });
  }

  drawSprintView() {
    this.sprintView.drawSprintGameView();
    SprintModal.drawSprintInModal();
    this.addHandlersToSprintButtons();
    this.showSprintModalWindow();
    this.closeSprintModalWindow();
  }

  addHandlersToSprintButtons() {
    document.querySelector('.button__container')?.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('sprint__button')) {
        this.checkAnswer(event);
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

    if (!this.state.sprint.wordsForGame.length) {
      if (!this.state.gamePage) {
        this.endSprintGame();
      }
      this.state.gamePage -= 1;
      this.getWordsForGame(this.state.gamePage, this.state.gameLevel);
    }
  }

  checkAnswer(event: Event) {
    const target = event.target as HTMLButtonElement;
    const wordRu = document.querySelector('.word_ru') as HTMLElement;
    const rightAnswer = this.state.sprint.gameCurrentWord?.wordTranslate === wordRu.textContent;
    const userAnswer = String(rightAnswer) === target.value;
    const checkbox = document.querySelectorAll<HTMLElement>('.checkbox__item');
    if (userAnswer) {
      this.state.sprint.countRightAnswersInARow += 1;
      checkbox?.forEach((item, index) => {
        if (index + 1 === this.state.sprint.countRightAnswersInARow % 4) {
          item.classList.add('checkbox__item_active');
          // if (this.state.sprint.gameCurrentWord) {
          //   this.state.sprint.rightAnswers.push(this.state.sprint.gameCurrentWord);
          // }
        }
      });
    }
    if (!userAnswer || this.state.sprint.countRightAnswersInARow % 4 === 0) {
      this.state.sprint.countRightAnswersInARow = 0;
      checkbox.forEach((item) => item.classList.remove('checkbox__item_active'));
    }
    console.log('слово в стейте', this.state.sprint.gameCurrentWord);
    console.log('правильный перевод', this.state.sprint.gameCurrentWord?.wordTranslate);
    console.log('рандомный перевод', wordRu.textContent);
    console.log('rightAnswer', String(rightAnswer));
    console.log('target', target.value);
    console.log('Пользователь ответил', String(rightAnswer) === target.value);
  }

  endSprintGame() {
    document.querySelector('.sprint')?.classList.add('hidden');
    (document.querySelector('.page__content') as HTMLElement).textContent = 'ИГРА ЗАВРШЕНА';
  }

  showSprintModalWindow() {
    document.querySelector('.sprint__close')?.addEventListener('click', () => {
      document.querySelector('.sprint-modal')?.classList.remove('hidden');
      console.log('hello');
      (document.querySelector('body') as HTMLElement).style.overflow = 'hidden';
    });
  }

  closeSprintModalWindow() {
    document.querySelector('.sprint-modal__close')?.addEventListener('click', () => {
      document.querySelector('.sprint-modal')?.classList.add('hidden');
      (document.querySelector('body') as HTMLElement).style.overflow = 'visible';
    });
  }
}

export default Sprint;
