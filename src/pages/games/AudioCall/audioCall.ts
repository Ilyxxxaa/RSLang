import './audioCall.scss';
import { IWord } from '../../../types/dictionaryTypes';

export default class AudioCall {
  audioCallContainer: HTMLElement = document.createElement('div');

  audioButton: HTMLButtonElement = document.createElement('button');

  audioCallWordsContainer: HTMLElement = document.createElement('div');

  drawAudioCall() {
    this.createGameContainer();
    const pageContent = document.querySelector('.page__content');
    if (pageContent) {
      pageContent.innerHTML = '';
      pageContent.append(this.audioCallContainer);
    }
    this.getWords();
  }

  group: number = 1;

  serverAdress = 'https://serverforrslang.herokuapp.com';

  wordsPath = `${this.serverAdress}/words`;

  getWords = async () => {
    const response = await fetch(`${this.wordsPath}/?group=${this.group}`);
    const words = await response.json();
    console.log(words);
    const audio: HTMLAudioElement = document.createElement('audio');
    const src = `${this.serverAdress}/${words[3].audio}`;
    audio.src = src;
    const pageContent = document.querySelector('.page__content');
    words.forEach((item: IWord) => {
      const word = document.createElement('div');
      word.classList.add('audioCall__words-item');
      word.textContent = `${item.word}`;
      this.audioCallWordsContainer.append(word);
    });
    if (pageContent) {
      pageContent.addEventListener('click', () => {
        console.log('click');
        audio.play();
      });
    }
  };

  createGameContainer() {
    this.audioCallContainer.classList.add('audioCall__container');
    this.audioButton.classList.add('audioCall__audio-btn');
    this.audioButton.innerHTML = ' <img src="./assets/images/audio-icon.svg" alt="audio">';
    this.audioCallContainer.append(this.audioButton);
    this.audioCallWordsContainer.classList.add('audioCall__words');
    this.audioCallContainer.append(this.audioCallWordsContainer);
  }
}
