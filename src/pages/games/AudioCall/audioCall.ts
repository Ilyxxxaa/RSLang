import './audioCall.scss';
import Utils from '../../../common/utils';
import AudioCallCreator from './audioCallCreator';
import { AudioCallState } from '../../../types/state';

export default class AudioCall {
  audioCallCreator: AudioCallCreator;

  state: AudioCallState;

  constructor() {
    this.state = {
      name: 'Ilya',
      arrayOfIndexes: [],
      arrayOfRestIndexes: [],
      wordsArray: [],
    };
    this.audioCallCreator = new AudioCallCreator();
  }

  async drawAudioCall() {
    this.audioCallCreator.createAudioCallContainer();
    this.createArray();
    await this.getWords();
    this.addListeners();
    // await this.audioCallCreator.wordAudio.play();
  }

  group: number = 0;

  createArray() {
    const array = Array.from({ length: 20 }, (v, i) => i).sort(() => 0.5 - Math.random());
    this.state.arrayOfIndexes = [...array];
    this.state.arrayOfRestIndexes = [...array];
  }

  createSetOfIndexes() {
    const set: Set<Number> = new Set();
    const lastNumber = this.state.arrayOfRestIndexes[this.state.arrayOfRestIndexes.length - 1];
    set.add(lastNumber);
    this.state.arrayOfRestIndexes.pop();
    while (set.size < 5) {
      set.add(this.state.arrayOfIndexes[Utils.randomInteger(0, 19)]);
    }
    this.state.wordsArray = Array.from(set);
    console.log(this.state);
  }

  getWords = async () => {
    const words = await Utils.getWords(this.group);
    this.createSetOfIndexes();
    const rigthWord = this.state.wordsArray[0];
    this.audioCallCreator.audioCallWordsContainer.innerHTML = '';
    this.state.wordsArray
      .sort(() => 0.5 - Math.random())
      .forEach((item) => {
        const word = document.createElement('div');
        if (item === rigthWord) {
          word.setAttribute('data-answer', 'true');
          this.audioCallCreator.wordAudio.setAttribute('autoplay', '');
          this.audioCallCreator.wordAudio.src = `https://serverforrslang.herokuapp.com/${
            words[+item].audio
          }`;
          this.audioCallCreator.addSrcToWordImage(
            `https://serverforrslang.herokuapp.com/${words[+item].image}`,
          );
          this.audioCallCreator.wordText.textContent = `${words[+item].word}`;
        } else {
          word.setAttribute('data-answer', 'false');
        }
        word.classList.add('audioCall__words-item', 'audioCall__words-item-enabled');
        word.textContent = `${words[+item].wordTranslate}`;

        this.audioCallCreator.audioCallWordsContainer.append(word);
        this.audioCallCreator.acceptButton.disabled = true;
        this.audioCallCreator.addListenerToWordContainer();
      });
  };

  addListeners() {
    this.audioCallCreator.acceptButton.addEventListener('click', () => {
      this.getWords();
      this.audioCallCreator.toggleVisionWord();
    });
  }
}
