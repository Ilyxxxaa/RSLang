import getUserWords, {
  createHardWord,
  createLearnedWord,
  getAllWords,
  getNotLearedUserWords,
  updateHardWord,
  updateLearnedWord,
  updateUserWord,
} from '../../../common/apiRequests';
import Utils from '../../../common/utils';
import State, { AudioCallState } from '../../../types/state';
import AudioCallCreator from './audioCallCreator';

export default class AudioCall1 {
  audioCallCreator: AudioCallCreator;

  state: State;

  audioState: AudioCallState;

  constructor(state: State) {
    this.state = state;
    this.audioState = {
      arrayOfRestIndexes: [],
      wordsOrderArray: [],
      wordsArray: [],
      wordsCount: 0,
      rightWordsCount: 0,
      rightWordsArray: [],
      wrongWordsArray: [],
      pageNumber: Utils.getRandomPage(),
    };
    this.audioCallCreator = new AudioCallCreator(this.audioState);
  }

  async sayHello() {
    console.log('hello');
    this.audioCallCreator.createAudioCallContainer();
    const words = await this.getWordsForGame();
    this.prepareArray();
    this.createNewGameOrder();
  }

  prepareArray() {
    const array = Utils.createRandomArray(20);
    console.log(array);
    this.audioState.arrayOfRestIndexes = [...array]; // определяет порядок угадывания слов
  }

  createNewGameOrder = () => {
    const set: Set<Number> = new Set();
    // eslint-disable-next-line prefer-destructuring
    const length = this.audioState.arrayOfRestIndexes.length;
    const currentWordNumber = this.audioState.arrayOfRestIndexes[length - 1];
    set.add(currentWordNumber);
    this.audioState.arrayOfRestIndexes.pop();
    while (set.size < 5) {
      set.add(Utils.randomInteger(0, 19));
    }
    this.audioState.wordsOrderArray = Array.from(set);
    console.log(this.audioState);
  };

  async getWordsForGame() {
    const token = localStorage.getItem('token');
    const group = this.state.gameLevel;
    const page = this.state.gamePage;
    if (token) {
      if (this.state.view === 'games') {
        const words = await getUserWords(group, page);
        console.log('return aggregated');
        return words;
        // eslint-disable-next-line no-else-return
      } else {
        const words = await getNotLearedUserWords(group, page);
        return words;
      }
      // eslint-disable-next-line no-else-return
    } else {
      const words = await getAllWords(group, page);
      return words;
    }
  }
}
