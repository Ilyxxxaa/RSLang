/* eslint-disable import/no-cycle */
import '../AudioCall/audioCallModal.scss';
import CreateChart from '../AudioCall/createChart';
import State from '../../../types/state';
import Book from '../../book/book';
// eslint-disable-next-line import/no-cycle
import Games from '../games';
import { baseLink } from '../../../const';

export default class SprintResultModal {
  state: State;

  constructor(state: State) {
    this.state = state;
  }

  modalWindow: HTMLElement = document.createElement('div');

  modalWindowContent: HTMLElement = document.createElement('div');

  modalWindowTabs: HTMLElement = document.createElement('div');

  modalRightTab: HTMLButtonElement = document.createElement('button');

  modalLeftTab: HTMLButtonElement = document.createElement('button');

  modalResultsContainer = document.createElement('div');

  modalResultAllAnswers = document.createElement('div');

  modalResultRightAnswers = document.createElement('div');

  modalResultWrongAnswers = document.createElement('div');

  modalCanvasContainer: HTMLElement = document.createElement('div');

  modalCanvas: HTMLCanvasElement = document.createElement('canvas');

  modalButtonsContainer: HTMLElement = document.createElement('div');

  modalPlayAgainButton: HTMLButtonElement = document.createElement('button');

  modalGoToBookButton: HTMLButtonElement = document.createElement('button');

  rightAnswersContainer: HTMLElement = document.createElement('div');

  wrongAnswersContainer: HTMLElement = document.createElement('div');

  drawResults() {
    this.modalResultsContainer.innerHTML = '';
    this.modalRightTab.classList.remove('audioCall-modal__tabs-item--active');
    this.createModalWindow();
    const sprintContainer = document.querySelector('.sprint');
    if (sprintContainer) {
      sprintContainer.innerHTML = '';
      sprintContainer.append(this.modalWindow);
    }
    this.modalCanvas.innerHTML = '';
    const allWords = this.state.sprint.wrongAnswers.length + this.state.sprint.rightAnswers.length;
    CreateChart.createChart(allWords, this.state.sprint.rightAnswers.length);
  }

  createModalWindow() {
    this.createModalWindowContent(
      this.state.sprint.wrongAnswers.length + this.state.sprint.rightAnswers.length,
      this.state.sprint.rightAnswers.length,
    );

    this.modalWindow.classList.add('audioCall-modal');
    this.modalWindow.append(this.modalWindowContent);
  }

  createModalWindowContent(wordsCount: number, rightWordsCount: number) {
    this.modalWindowContent.classList.add('audioCall-modal__content');

    this.createModalTabs();
    this.createModalResultsContainer(wordsCount, rightWordsCount);
    this.createButtonsContainer();
    this.createListOfWords();

    this.modalWindowContent.append(
      this.modalWindowTabs,
      this.modalResultsContainer,
      this.modalButtonsContainer,
    );
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

  createModalResultsContainer(wordsCount: number, rightWordsCount: number) {
    const wrongWordsCount = wordsCount - rightWordsCount;
    this.modalResultsContainer.classList.add('audioCall-modal__results-container');
    this.modalResultAllAnswers.classList.add('audioCall-modal__results-item');
    this.modalResultRightAnswers.classList.add('audioCall-modal__results-item');
    this.modalResultWrongAnswers.classList.add('audioCall-modal__results-item');
    this.modalResultAllAnswers.textContent = `Всего слов: ${wordsCount}`;
    this.modalResultRightAnswers.textContent = `Правильных слов: ${rightWordsCount} `;
    this.modalResultWrongAnswers.textContent = `Неправильных слов: ${wrongWordsCount} `;
    this.createModalCanvas();
    this.modalResultsContainer.append(
      this.modalResultAllAnswers,
      this.modalResultRightAnswers,
      this.modalResultWrongAnswers,
      this.modalCanvasContainer,
    );
  }

  createModalCanvas() {
    this.modalCanvasContainer.innerHTML = '';
    this.modalCanvasContainer.classList.add('audioCall-modal__canvas-container');
    this.modalCanvas.setAttribute('id', 'myChart');
    this.modalCanvasContainer.setAttribute('width', '300');
    this.modalCanvasContainer.setAttribute('height', '300');
    this.modalCanvasContainer.setAttribute('position', 'relative');
    this.modalCanvasContainer.append(this.modalCanvas);
  }

  createButtonsContainer() {
    this.modalButtonsContainer.classList.add('audioCall-modal__buttons-container');
    this.modalPlayAgainButton.classList.add('audioCall-modal__buttons-item');
    this.modalGoToBookButton.classList.add('audioCall-modal__buttons-item');
    this.modalPlayAgainButton.classList.add('modal-result_start');
    this.modalGoToBookButton.classList.add('modal-result_to-book');
    this.modalPlayAgainButton.textContent = 'Сыграть еще раз';
    this.modalGoToBookButton.textContent = 'Перейти в учебник';
    this.modalButtonsContainer.append(this.modalPlayAgainButton, this.modalGoToBookButton);
  }

  createListOfWords() {
    this.rightAnswersContainer.classList.add('audioCall-modal__rightAnswers-container');
    this.wrongAnswersContainer.classList.add('audioCall-modal__wrongAnswers-container');
  }

  addListenerToTabs() {
    this.modalRightTab.addEventListener('click', () => {
      this.drawResultWithWords();
    });

    this.modalLeftTab.addEventListener('click', () => {
      this.drawResultWithChart();
    });
  }

  addHandlersToSprintResultModal() {
    const book = new Book(this.state);
    const games = new Games(this.state);
    this.modalPlayAgainButton.addEventListener('click', () => {
      document.querySelectorAll<HTMLButtonElement>('.menu__list-item')?.forEach((item) => item.removeAttribute('disabled'));
      games.clearPageContent();
      if (this.state.gameInit === 'menu') {
        games.levels.drawGameLevels();
        games.addHandlersToBack();
        games.addHandlersToStart();
        games.addHandlersToChooseLevel();
      }
      if (this.state.gameInit === 'book') {
        games.drawGameSprint(this.state.gamePage, this.state.gameLevel);
      }
      this.state.sprint = {
        pointsScored: 0,
        pointsPerWord: 10,
        countRightAnswers: 0,
        wordsForGame: [],
        rightAnswers: [],
        wrongAnswers: [],
        countRightAnswersInARow: 0,
      };
    });
    this.modalGoToBookButton.addEventListener('click', () => {
      document.querySelectorAll<HTMLButtonElement>('.menu__list-item')?.forEach((item) => item.removeAttribute('disabled'));
      this.state.view = 'book';
      this.state.sprint = {
        pointsScored: 0,
        pointsPerWord: 10,
        countRightAnswers: 0,
        wordsForGame: [],
        rightAnswers: [],
        wrongAnswers: [],
        countRightAnswersInARow: 0,
      };
      book.drawBook();
      games.addHandlersToStartGameFromBook();
    });
  }

  drawResultWithWords() {
    this.modalResultsContainer.innerHTML = '';

    this.modalLeftTab.classList.remove('audioCall-modal__tabs-item--active');
    this.modalRightTab.classList.add('audioCall-modal__tabs-item--active');

    this.modalResultsContainer.append(this.rightAnswersContainer, this.wrongAnswersContainer);

    this.renderWords();
  }

  drawResultWithChart() {
    this.modalResultsContainer.innerHTML = '';

    this.modalLeftTab.classList.add('audioCall-modal__tabs-item--active');
    this.modalRightTab.classList.remove('audioCall-modal__tabs-item--active');

    this.modalResultsContainer.append(
      this.modalResultAllAnswers,
      this.modalResultRightAnswers,
      this.modalResultWrongAnswers,
      this.modalCanvasContainer,
    );
    const allWords = this.state.sprint.wrongAnswers.length + this.state.sprint.rightAnswers.length;
    CreateChart.createChart(allWords, this.state.sprint.rightAnswers.length);
  }

  renderWords() {
    this.rightAnswersContainer.innerHTML = '';

    const rightAnswersContainerTitle = document.createElement('div');
    rightAnswersContainerTitle.classList.add('rightAnswersContainerTitle');
    rightAnswersContainerTitle.textContent = 'Правильные слова';

    this.wrongAnswersContainer.innerHTML = '';

    const wrongAnswersContainerTitle = document.createElement('div');
    wrongAnswersContainerTitle.classList.add('wrongAnswersContainerTitle');
    wrongAnswersContainerTitle.textContent = 'Неправильные слова';

    if (this.state.sprint.rightAnswers.length) {
      this.rightAnswersContainer.append(rightAnswersContainerTitle);
      this.state.sprint.rightAnswers.forEach((word) => {
        const item = document.createElement('div');
        item.classList.add('item');
        const audio = document.createElement('audio');
        audio.src = `${baseLink}/${word.audio}`;
        const itemImageContainer = document.createElement('div');
        itemImageContainer.classList.add('imageContainer');
        const itemImage = document.createElement('img');
        itemImage.src = './assets/images/audio-icon.svg';
        const itemText = document.createElement('div');
        itemText.classList.add('itemText');
        itemText.textContent = `${word.word} - ${word.wordTranslate}`;
        itemImageContainer.append(itemImage);
        item.append(itemImageContainer, itemText);
        this.rightAnswersContainer.append(item);

        itemImageContainer.addEventListener('click', () => {
          audio.play();
        });
      });
    }

    if (this.state.sprint.wrongAnswers.length) {
      this.wrongAnswersContainer.append(wrongAnswersContainerTitle);
      this.state.sprint.wrongAnswers.forEach((word) => {
        const item = document.createElement('div');
        item.classList.add('item');
        const audio = document.createElement('audio');
        audio.src = `${baseLink}/${word.audio}`;
        const itemImageContainer = document.createElement('div');
        itemImageContainer.classList.add('imageContainer');
        const itemImage = document.createElement('img');
        itemImage.src = './assets/images/audio-icon.svg';
        const itemText = document.createElement('div');
        itemText.classList.add('itemText');
        itemText.textContent = `${word.word} - ${word.wordTranslate}`;
        itemImageContainer.append(itemImage);
        item.append(itemImageContainer, itemText);
        this.wrongAnswersContainer.append(item);

        itemImageContainer.addEventListener('click', () => {
          audio.play();
        });
      });
    }
  }
}
