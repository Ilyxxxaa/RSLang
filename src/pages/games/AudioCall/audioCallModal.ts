import './audioCallModal.scss';
import { AudioCallState } from '../../../types/state';
import CreateChart from './createChart';

export default class AudioCallModal {
  AudioCallState: AudioCallState;

  constructor(state: AudioCallState) {
    this.AudioCallState = state; // здесь я подключаю State Своей игры - объект с разными свойствами
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
    // ф-ция для отрисовки модалки, вызываю как слова закончились
    this.modalResultsContainer.innerHTML = '';
    this.modalRightTab.classList.remove('audioCall-modal__tabs-item--active');
    this.createModalWindow();
    const audioCallContainer = document.querySelector('.audioCall__container');
    if (audioCallContainer) {
      audioCallContainer.innerHTML = '';
      audioCallContainer.append(this.modalWindow);
    }
    this.modalCanvas.innerHTML = '';
    CreateChart.createChart(this.AudioCallState.wordsCount, this.AudioCallState.rightWordsCount);
    //  здесь я беру из State св-ва wordsCount - кол-во слов(всех что были),
    //  и rightWordsCount - кол-во правильных слов
    // в методе ниже всё тоже самое
  }

  createModalWindow() {
    this.createModalWindowContent(
      this.AudioCallState.wordsCount,
      this.AudioCallState.rightWordsCount,
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
    const wrongWordsCount = wordsCount + 1 - rightWordsCount;
    this.modalResultsContainer.classList.add('audioCall-modal__results-container');
    this.modalResultAllAnswers.classList.add('audioCall-modal__results-item');
    this.modalResultRightAnswers.classList.add('audioCall-modal__results-item');
    this.modalResultWrongAnswers.classList.add('audioCall-modal__results-item');
    this.modalResultAllAnswers.textContent = `Всего слов: ${wordsCount + 1}`;
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
    CreateChart.createChart(this.AudioCallState.wordsCount, this.AudioCallState.rightWordsCount);
    //  здесь я беру из State св-ва wordsCount - кол-во слов(всех что были),
    //  и rightWordsCount - кол-во правильных слов
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

    if (this.AudioCallState.rightWordsArray.length !== 0) {
      this.rightAnswersContainer.append(rightAnswersContainerTitle);
      //  здесь для св-ва state.rightWordsArray вызываю перебор
      // rightWordsArray  - массив с обьектами правильно отвеченных слов
      this.AudioCallState.rightWordsArray.forEach((word) => {
        const item = document.createElement('div');
        item.classList.add('item');
        const audio = document.createElement('audio');
        audio.src = `${word.audio}`;
        const itemImageContainer = document.createElement('div');
        itemImageContainer.classList.add('imageContainer');
        const itemImage = document.createElement('img');
        itemImage.src = './assets/images/audio-icon.svg';
        const itemText = document.createElement('div');
        itemText.classList.add('itemText');
        itemText.textContent = `${word.translate} - ${word.word}`;
        itemImageContainer.append(itemImage);
        item.append(itemImageContainer, itemText);
        this.rightAnswersContainer.append(item);

        itemImageContainer.addEventListener('click', () => {
          audio.play();
        });
      });
    }

    if (this.AudioCallState.wrongWordsArray.length !== 0) {
      this.wrongAnswersContainer.append(wrongAnswersContainerTitle);
      //  здесь для св-ва state.wrongWordsArray вызываю перебор
      // wrongWordsArray  - массив с обьектами правильно отвеченных слов
      this.AudioCallState.wrongWordsArray.forEach((word) => {
        const item = document.createElement('div');
        item.classList.add('item');
        const audio = document.createElement('audio');
        audio.src = `${word.audio}`;
        const itemImageContainer = document.createElement('div');
        itemImageContainer.classList.add('imageContainer');
        const itemImage = document.createElement('img');
        itemImage.src = './assets/images/audio-icon.svg';
        const itemText = document.createElement('div');
        itemText.classList.add('itemText');
        itemText.textContent = `${word.translate} - ${word.word}`;
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
