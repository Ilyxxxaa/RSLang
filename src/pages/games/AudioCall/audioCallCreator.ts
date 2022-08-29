export default class AudioCallCreator {
  audioCallContainer: HTMLElement = document.createElement('div');

  audioButton: HTMLButtonElement = document.createElement('button');

  audioCallWordsContainer: HTMLElement = document.createElement('div');

  acceptButton: HTMLButtonElement = document.createElement('button');

  wordAudio: HTMLAudioElement = document.createElement('audio');

  createAudioCallContainer() {
    this.createGameContainer();
    const pageContent = document.querySelector('.page__content');
    if (pageContent) {
      pageContent.innerHTML = '';
      pageContent.append(this.audioCallContainer);
    }
    this.addListenerToWordContainer();
    this.addListenerToAudioButton();
  }

  createGameContainer() {
    this.audioCallContainer.classList.add('audioCall__container');
    this.audioButton.classList.add('audioCall__audio-btn');
    this.audioButton.innerHTML = ' <img src="./assets/images/audio-icon.svg" alt="audio">';
    this.audioCallContainer.append(this.audioButton);
    this.audioCallWordsContainer.classList.add('audioCall__words');
    this.audioCallContainer.append(this.audioCallWordsContainer);
    this.acceptButton.classList.add('audioCall__btn');
    this.acceptButton.textContent = 'Дальше';
    this.acceptButton.disabled = true;
    this.audioCallContainer.append(this.acceptButton);
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
    const target = event.target as HTMLElement;
    if (target.hasAttribute('data-answer')) {
      const dataAnswer = target.getAttribute('data-answer');
      if (dataAnswer === 'true') {
        target.classList.add('audioCall__words-item--right');
        this.acceptButton.disabled = false;
      }
      if (dataAnswer === 'false') {
        target.classList.add('audioCall__words-item--wrong');
        this.acceptButton.disabled = false;
      }
      this.disableWordsButtons();
      this.audioCallWordsContainer.removeEventListener('click', this.listenerToWordContainer);
    }
  };

  disableWordsButtons() {
    const buttons = this.audioCallWordsContainer.querySelectorAll('.audioCall__words-item');
    buttons.forEach((btn) => {
      btn.classList.remove('audioCall__words-item-enabled');
    });
  }
}
