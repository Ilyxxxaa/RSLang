import { AudioCallState } from '../../../types/state';

export default class AudioCallCreator {
  audioCallState: AudioCallState;

  constructor(state: AudioCallState) {
    this.audioCallState = state;
  }

  audioCallContainer: HTMLElement = document.createElement('div');

  audioCallResultsContainer: HTMLElement = document.createElement('div');

  resultAllAnswers: HTMLElement = document.createElement('div');

  resultRightAnswers: HTMLElement = document.createElement('div');

  wordImage: HTMLElement = document.createElement('div');

  audioButtonContainer: HTMLElement = document.createElement('div');

  wordText: HTMLElement = document.createElement('div');

  audioButton: HTMLButtonElement = document.createElement('button');

  audioCallWordsContainer: HTMLElement = document.createElement('div');

  acceptButton: HTMLButtonElement = document.createElement('button');

  wordAudio: HTMLAudioElement = document.createElement('audio');

  rightAnswerAudio = document.createElement('audio');

  wrongAnswerAuido = document.createElement('audio');

  createAudioCallContainer() {
    this.createGameContainer();
    const pageContent = document.querySelector('.page__content');
    if (pageContent) {
      pageContent.innerHTML = '';
      pageContent.append(this.audioCallContainer);
    }
  }

  createGameContainer() {
    this.createAudioCallResultsContainer();
    this.createWordImage();
    this.createAudioButtonContainer();
    this.createAudioCallWordsContainer();
    this.createAcceptButton();
    this.createAudioElements();

    this.audioCallContainer.classList.add('audioCall__container');

    this.audioCallContainer.append(
      this.audioCallResultsContainer,
      this.wordImage,
      this.audioButtonContainer,
      this.audioCallWordsContainer,
      this.acceptButton,
    );
  }

  createAudioCallResultsContainer() {
    this.audioCallResultsContainer.classList.add('audioCall__results-container');
    this.resultAllAnswers.classList.add('audioCall__results-all-answers');
    this.resultRightAnswers.classList.add(
      'audioCall__results-item',
      'audioCall__results-right-answers',
    );
    this.resultAllAnswers.classList.add(
      'audioCall__results-item',
      'audioCall__results-all-answers',
    );
    this.resultAllAnswers.textContent = 'Всего слов: 0/20';
    this.resultRightAnswers.textContent = 'Правильных слов: 0';
    this.audioCallResultsContainer.append(this.resultAllAnswers, this.resultRightAnswers);
  }

  createWordImage() {
    this.wordImage.classList.add('audioCall__word-image', 'hide');
  }

  createAudioButtonContainer() {
    this.audioButtonContainer.classList.add('audioCall__button-container');
    this.createAudioButton();
    this.createWordText();
    this.audioButtonContainer.append(this.wordText, this.audioButton);
  }

  createWordText() {
    this.wordText.classList.add('audioCall__word-text', 'hide');
  }

  createAudioButton() {
    this.audioButton.classList.add('audioCall__audio-btn', 'audioCall__audio-btn--bigger');
    this.audioButton.innerHTML = ' <img src="./assets/images/audio-icon.svg" alt="audio">';
    this.wordAudio.setAttribute('autoplay', '');
    this.addListenerToAudioButton();
  }

  createAudioCallWordsContainer() {
    this.audioCallWordsContainer.classList.add('audioCall__words');
    this.addListenerToWordContainer();
  }

  createAcceptButton() {
    this.acceptButton.classList.add('audioCall__btn');
    this.acceptButton.textContent = 'Дальше';
    this.acceptButton.disabled = true;
  }

  createAudioElements() {
    this.rightAnswerAudio.src = '../../../assets/sounds/rightAnswerAudio.mp3';
    this.wrongAnswerAuido.src = '../../../assets/sounds/wrongAnswerAudio.mp3';
    this.wrongAnswerAuido.volume = 0.4;
  }

  addSrcToWordImage(src: string) {
    this.wordImage.innerHTML = `<img src="${src}" alt="word__image">`;
  }

  toggleVisionWord() {
    this.wordImage.classList.toggle('hide');
    this.wordText.classList.toggle('hide');
    this.audioButton.classList.toggle('audioCall__audio-btn--bigger');
  }

  addListenerToAudioButton() {
    this.audioButton.addEventListener('click', () => {
      this.wordAudio.play();
    });
  }

  addListenerToWordContainer() {
    this.audioCallWordsContainer.addEventListener('click', this.listenerToWordContainer);
  }

  listenerToWordContainer = (event: Event) => {
    const currentTarget = event.currentTarget as HTMLElement;
    const target = event.target as HTMLElement;
    if (target.hasAttribute('data-answer')) {
      const dataAnswer = target.getAttribute('data-answer');

      if (dataAnswer === 'true') {
        target.classList.add('audioCall__words-item--right');
        this.rightAnswerAudio.play();
        this.acceptButton.disabled = false;
        this.audioCallState.rightWordsCount += 1;
      }

      if (dataAnswer === 'false') {
        target.classList.add('audioCall__words-item--wrong');
        const rightWord = currentTarget.querySelector('div[data-answer= true]');
        rightWord?.classList.add('audioCall__words-item--right');

        this.wrongAnswerAuido.play();
        this.acceptButton.disabled = false;
      }

      this.disableWordsButtons();
      this.audioCallWordsContainer.removeEventListener('click', this.listenerToWordContainer);
      this.toggleVisionWord();
      this.audioButton.classList.remove('audioCall__audio-btn--bigger');
    }
  };

  disableWordsButtons() {
    const buttons = this.audioCallWordsContainer.querySelectorAll('.audioCall__words-item');
    buttons.forEach((btn) => {
      btn.classList.remove('audioCall__words-item-enabled');
    });
  }
}
