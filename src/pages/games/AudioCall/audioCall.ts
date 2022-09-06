import getUserWords, {
  createUserWord,
  getAllWords,
  getNotLearedUserWords,
  updateUserWord,
} from '../../../common/apiRequests';
import './audioCall.scss';
import Utils from '../../../common/utils';
import State, { AudioCallState, Render } from '../../../types/state';
import AudioCallCreator from './audioCallCreator';
import AudioCallModal from './audioCallModal';

export default class AudioCall {
  audioCallCreator: AudioCallCreator;

  state: State;

  audioState: AudioCallState;

  audioCallModal: AudioCallModal;

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
      rightNumber: -1,
    };

    this.audioCallCreator = new AudioCallCreator(this.audioState);
    this.audioCallModal = new AudioCallModal(this.audioState);
  }

  async drawAudioCall() {
    this.clearState();
    this.removeListenerFromButtons();
    this.audioCallCreator.acceptButton.removeEventListener('click', this.listenerToAcceptButton);
    this.audioCallCreator.createAudioCallContainer();
    const words = await this.getWordsForGame();
    console.log(words);
    this.audioState.wordsArray = [...words];
    this.prepareArray();
    await this.renderWords();
    this.addListeners();
  }

  async renderWords() {
    this.createNewGameOrder();
    const rightNumber = this.audioState.wordsOrderArray[0];
    this.audioState.rightNumber = rightNumber;
    Utils.shuffleArray(this.audioState.wordsOrderArray);
    this.drawWords(rightNumber);
  }

  drawWords(rightNumber: Number) {
    const words = this.audioState.wordsArray;
    this.audioCallCreator.audioCallWordsContainer.innerHTML = '';
    this.audioState.wordsOrderArray.forEach((item, index) => {
      const word = document.createElement('div');
      if (item === rightNumber) {
        word.setAttribute('data-answer', 'true');
        word.setAttribute('data-rightAnswer', `${rightNumber}`);
        word.setAttribute('data-text', `${words[+item].word}`);
        this.audioCallCreator.wordAudio.src = `${Utils.returnServerAdress()}/${words[+item].audio}`;
        this.audioCallCreator.addSrcToWordImage(
          `${Utils.returnServerAdress()}/${words[+item].image}`,
        );
        this.audioCallCreator.wordText.textContent = `${words[+item].word}`;
      } else {
        word.setAttribute('data-answer', 'false');
      }

      word.setAttribute('data-index', `${index + 1}`);
      word.classList.add('audioCall__words-item', 'audioCall__words-item-enabled');
      word.textContent = `${index + 1}.${words[+item].wordTranslate}`;
      this.audioCallCreator.audioCallWordsContainer.append(word);

      this.audioCallCreator.acceptButton.disabled = true;
      this.addListenerToWordContainer();
      this.addListenerToButtons();
      this.removeListenerFromSpace();
    });
  }

  listenerToWordContainer = (e: Event) => {
    const currentTarget = e.currentTarget as HTMLElement;
    const target = e.target as HTMLElement;

    if (target.hasAttribute('data-answer')) {
      const dataAnswer = target.getAttribute('data-answer');
      const dataIndex = target.getAttribute('data-index');
      const rightNumber = target.getAttribute('data-rightAnswer');

      if (dataAnswer === 'true') {
        if (rightNumber) this.rightAnswerHandler(target, +rightNumber);
      }

      if (dataAnswer === 'false') {
        this.wrongAnswerHandler(target);
      }

      this.removeListenerFromWordContainer();
      this.audioCallCreator.disableWordsButtons();
      this.audioCallCreator.toggleVisionWord();
      this.audioCallCreator.audioButton.classList.remove('audioCall__audio-btn--bigger');
      this.audioCallCreator.acceptButton.disabled = false;
      this.addListenerToSpace();
    }
  };

  wrongAnswerHandler = async (element: HTMLElement) => {
    element.classList.add('audioCall__words-item--wrong');
    const rightWord = document.querySelector('div[data-answer= true]');
    if (rightWord) {
      rightWord.classList.add('audioCall__words-item--right');
    }

    this.wrongAnswerAudioPlay();
    const token = localStorage.getItem('token');
    // eslint-disable-next-line prefer-destructuring
    const rightNumber = this.audioState.rightNumber;
    const rightItem = this.audioState.wordsArray[+rightNumber];
    if (token) {
      if (rightItem.userWord) {
        await updateUserWord(rightItem, 'audioCall', false);
      } else await createUserWord(rightItem, 'audioCall', false);
    }

    this.audioState.wrongWordsArray.push(rightItem);
  };

  rightAnswerHandler = async (element: HTMLElement, rightNumber: number) => {
    element.classList.add('audioCall__words-item--right');

    this.rightAnswerAudioPlay();
    const token = localStorage.getItem('token');
    const rightItem = this.audioState.wordsArray[rightNumber];

    if (token) {
      if (rightItem.userWord) {
        await updateUserWord(rightItem, 'audioCall', true);
      } else await createUserWord(rightItem, 'audioCall', true);
    }

    this.audioState.rightWordsArray.push(rightItem);
    this.audioState.rightWordsCount += 1;
  };

  addListenerToButtons() {
    window.addEventListener('keyup', this.listnerToButtons);
  }

  removeListenerFromButtons() {
    window.removeEventListener('keyup', this.listnerToButtons);
  }

  listnerToButtons(e: KeyboardEvent) {
    console.log(e.code);
    if (e.code === 'Digit1') {
      document.querySelectorAll('.audioCall__words-item').forEach((item, index) => {
        const button = item as HTMLElement;
        if (index === 0) button.click();
      });
    }
    if (e.code === 'Digit2') {
      document.querySelectorAll('.audioCall__words-item').forEach((item, index) => {
        const button = item as HTMLElement;
        if (index === 1) button.click();
      });
    }
    if (e.code === 'Digit3') {
      document.querySelectorAll('.audioCall__words-item').forEach((item, index) => {
        const button = item as HTMLElement;
        if (index === 2) button.click();
      });
    }
    if (e.code === 'Digit4') {
      document.querySelectorAll('.audioCall__words-item').forEach((item, index) => {
        const button = item as HTMLElement;
        if (index === 3) button.click();
      });
    }
    if (e.code === 'Digit5') {
      document.querySelectorAll('.audioCall__words-item').forEach((item, index) => {
        const button = item as HTMLElement;
        if (index === 4) button.click();
      });
    }

    if (e.code === 'Space') {
      const button = document.querySelector<HTMLButtonElement>('.audioCall__audio-btn');
      button?.click();
    }
  }

  addListeners() {
    this.audioCallCreator.acceptButton.addEventListener('click', this.listenerToAcceptButton);
    this.addListenerToWordContainer();
  }

  addListenerToSpace() {
    document.addEventListener('keydown', this.spaceHandler);
  }

  removeListenerFromSpace() {
    document.removeEventListener('keydown', this.spaceHandler);
  }

  removeListeners() {
    this.audioCallCreator.acceptButton.removeEventListener('click', this.listenerToAcceptButton);
  }

  spaceHandler = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      this.acceptButtonHandler();
    }
  };

  listenerToAcceptButton = async () => {
    this.acceptButtonHandler();
  };

  addListenerToWordContainer() {
    this.audioCallCreator.audioCallWordsContainer.addEventListener(
      'click',
      this.listenerToWordContainer,
    );
  }

  removeListenerFromWordContainer() {
    this.audioCallCreator.audioCallWordsContainer.removeEventListener(
      'click',
      this.listenerToWordContainer,
    );
  }

  acceptButtonHandler = async () => {
    if (this.audioState.wordsCount + 1 < 20) {
      await this.renderWords();
      this.audioState.wordsCount += 1;
      this.audioCallCreator.resultAllAnswers.textContent = `Всего слов: ${this.audioState.wordsCount}/20`;
      this.audioCallCreator.resultRightAnswers.textContent = `Правильных слов: ${this.audioState.rightWordsCount}`;
      this.audioCallCreator.toggleVisionWord();
    } else {
      this.audioCallModal.drawResults();
      this.audioCallModal.addListenerToTabs();
      console.log(this.audioState);
      this.audioCallModal.modalPlayAgainButton.addEventListener('click', () => {
        this.removeListenerFromButtons();
        this.drawAudioCall();
      });
      this.audioCallModal.modalGoToBookButton.addEventListener('click', () => {
        this.removeListenerFromButtons();
        this.state.drawBook();
        this.state.view = 'book';
        const menuButtons = document.querySelectorAll('.menu__list-item');
        menuButtons.forEach((item) => item.classList.remove('menu__list-item--active'));
        const bookButton = document.querySelector('.menuItemBook');
        if (bookButton) {
          bookButton.classList.add('menu__list-item--active');
        }
      });
    }
  };

  rightAnswerAudioPlay() {
    this.audioCallCreator.rightAnswerAudio.pause();
    this.audioCallCreator.rightAnswerAudio.currentTime = 0;
    this.audioCallCreator.rightAnswerAudio.play();
  }

  wrongAnswerAudioPlay() {
    this.audioCallCreator.wrongAnswerAuido.pause();
    this.audioCallCreator.wrongAnswerAuido.currentTime = 0;
    this.audioCallCreator.wrongAnswerAuido.play();
  }

  async getWordsForGame() {
    const token = localStorage.getItem('token');
    const group = Number(localStorage.getItem('currentBookLevel')) || this.state.gameLevel;
    const page = Number(localStorage.getItem('currentBookPage')) || this.state.gamePage;
    console.log('group', group, 'page:', page);
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

  prepareArray() {
    // использовать только один раз при старте игры
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

  clearState() {
    this.audioState.arrayOfRestIndexes = [];
    this.audioState.wordsOrderArray = [];
    this.audioState.wordsArray = [];
    this.audioState.wordsCount = 0;
    this.audioState.rightWordsCount = 0;
    this.audioState.rightWordsArray = [];
    this.audioState.wrongWordsArray = [];
    this.audioState.rightNumber = -1;
  }
}
