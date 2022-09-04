import './audioCall.scss';
import Utils from '../../../common/utils';
import AudioCallCreator from './audioCallCreator';
import State, { AudioCallState } from '../../../types/state';
import AudioCallModal from './audioCallModal';

export default class AudioCall {
  audioCallCreator: AudioCallCreator;

  audioCallModal: AudioCallModal;

  audioCallState: AudioCallState;

  state: State;

  constructor(state: State) {
    this.state = state;
    this.audioCallState = {
      arrayOfIndexes: [],
      arrayOfRestIndexes: [],
      wordsArray: [],
      wordsCount: 0,
      rightWordsCount: 0,
      rightWordsArray: [],
      wrongWordsArray: [],
      pageNumber: Utils.getRandomPage(),
    };
    this.audioCallCreator = new AudioCallCreator(this.audioCallState);
    this.audioCallModal = new AudioCallModal(this.audioCallState);
  }

  async drawAudioCall(level: number, page: number = this.audioCallState.pageNumber) {
    if (page) {
      this.audioCallState.pageNumber = page;
    }
    this.clearState();
    this.audioCallCreator.createAudioCallContainer();
    this.createArray();
    await this.getWords(level, page);
    this.addListeners();
    this.audioCallModal.addListenerToTabs();
  }

  async refreshAudioCall() {
    this.audioCallCreator.createAudioCallContainer();
    this.createArray();
    await this.getWords(this.state.gameLevel, this.audioCallState.pageNumber);
  }

  clearState() {
    this.audioCallState.arrayOfIndexes = [];
    this.audioCallState.arrayOfRestIndexes = [];
    this.audioCallState.wordsArray = [];
    this.audioCallState.wordsCount = 0;
    this.audioCallState.rightWordsCount = 0;
    this.audioCallState.rightWordsArray = [];
    this.audioCallState.wrongWordsArray = [];
  }

  createArray() {
    const array = Array.from({ length: 20 }, (v, i) => i).sort(() => 0.5 - Math.random());
    this.audioCallState.arrayOfIndexes = [...array];
    this.audioCallState.arrayOfRestIndexes = [...array];
  }

  createSetOfIndexes() {
    const set: Set<Number> = new Set();
    const lastNumber = this.audioCallState.arrayOfRestIndexes[
      this.audioCallState.arrayOfRestIndexes.length - 1
    ];
    set.add(lastNumber);
    this.audioCallState.arrayOfRestIndexes.pop();
    while (set.size < 5) {
      set.add(this.audioCallState.arrayOfIndexes[Utils.randomInteger(0, 19)]);
    }
    this.audioCallState.wordsArray = Array.from(set);
  }

  getWords = async (level: number, page: number) => {
    const words = await Utils.getWords(level, page);
    console.log(words);
    this.createSetOfIndexes();
    const rigthWord = this.audioCallState.wordsArray[0];
    this.audioCallCreator.audioCallWordsContainer.innerHTML = '';
    this.audioCallState.wordsArray
      .sort(() => 0.5 - Math.random())
      .forEach((item) => {
        const word = document.createElement('div');
        if (item === rigthWord) {
          word.setAttribute('data-answer', 'true');
          word.setAttribute('data-audio', `${Utils.returnServerAdress()}/${words[+item].audio}`);
          word.setAttribute('data-text', `${words[+item].word}`);
          this.audioCallCreator.wordAudio.src = `${Utils.returnServerAdress()}/${
            words[+item].audio
          }`;
          this.audioCallCreator.addSrcToWordImage(
            `${Utils.returnServerAdress()}/${words[+item].image}`,
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
    this.audioCallCreator.acceptButton.addEventListener('click', this.listenerToAcceptButton);
  }

  listenerToAcceptButton = () => {
    if (this.audioCallState.wordsCount + 1 < 5) {
      this.getWords(this.state.gameLevel, this.audioCallState.pageNumber);
      this.audioCallState.wordsCount += 1;
      this.audioCallCreator.resultAllAnswers.textContent = `Всего слов: ${this.audioCallState.wordsCount}/5`;
      this.audioCallCreator.resultRightAnswers.textContent = `Правильных слов: ${this.audioCallState.rightWordsCount}`;
      this.audioCallCreator.toggleVisionWord();
    } else {
      this.audioCallModal.drawResults();
      this.audioCallModal.modalPlayAgainButton.addEventListener('click', () => {
        this.clearState();
        this.refreshAudioCall();
      });
    }
  };
}
