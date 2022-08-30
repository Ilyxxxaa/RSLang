export default class AudioCallCreator {
  audioCallContainer: HTMLElement = document.createElement('div');

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
    this.createWordImage();
    this.createAudioButtonContainer();
    this.createAudioCallWordsContainer();
    this.createAcceptButton();
    this.createAudioElements();

    this.audioCallContainer.classList.add('audioCall__container');
    this.audioCallContainer.append(
      this.wordImage,
      this.audioButtonContainer,
      this.audioCallWordsContainer,
      this.acceptButton,
    );
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
      }
      if (dataAnswer === 'false') {
        target.classList.add('audioCall__words-item--wrong');
        const rightWord = currentTarget.querySelector('div[data-answer= true]');
        rightWord?.classList.add('audioCall__words-item--right');
        console.log(rightWord);
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
