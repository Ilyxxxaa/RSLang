export default class AudioCallCreator {
  audioCallContainer: HTMLElement = document.createElement('div');

  audioButton: HTMLButtonElement = document.createElement('button');

  audioCallWordsContainer: HTMLElement = document.createElement('div');

  acceptButton: HTMLButtonElement = document.createElement('button');

  createAudioCallContainer() {
    this.createGameContainer();
    const pageContent = document.querySelector('.page__content');
    if (pageContent) {
      pageContent.innerHTML = '';
      pageContent.append(this.audioCallContainer);
    }
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
    this.audioCallContainer.append(this.acceptButton);
  }
}
