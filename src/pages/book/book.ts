import updateCards from './bookVIew';
import drawLevelsBlock from './levels';
import drawPagination from './pagination';
import currentWords from './bookState';
import State from '../../types/state';
import { createElement } from './utils';
import { getAggregatedWords, getDifficultWords } from './bookRequests';
import drawDictionary from './dictionary';

let user: State | null = null;

export default class Book {
  state: State;

  constructor(state: State) {
    this.state = state;
  }

  public async drawBook() {
    const local: string | null = localStorage.getItem('user');
    user = local ? JSON.parse(local) : null;

    const content: HTMLDivElement | null = document.querySelector('.content');
    if (content) {
      content.style.background = 'url("../assets/images/book/bookBackgrounds/bg2.png")';
    }
    const pageContent = document.querySelector('.page__content');
    if (pageContent) pageContent.innerHTML = '';

    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book_container');
    pageContent?.append(bookContainer);

    const bookTitle = document.createElement('h1');
    const bookButton = createElement('button', 'button-to-book');
    bookButton.classList.add('book-title-active');
    bookButton.innerHTML = 'Учебник';
    bookTitle.append(bookButton);
    if (user) {
      const dictionaryButton = createElement('button', 'button-to-dictionary');
      dictionaryButton.innerHTML = 'Словарь';
      bookTitle.append(dictionaryButton);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      dictionaryButton.addEventListener('click', () => drawDictionary());
    }
    bookButton.addEventListener('click', () => this.drawBook());

    const wordsTitle = document.createElement('h2');
    wordsTitle.innerText = 'Слова';
    wordsTitle.classList.add('words-title');

    bookContainer.append(bookTitle, drawLevelsBlock(), wordsTitle);

    await updateCards(currentWords.currentLevel, currentWords.currentPage);
    bookContainer.append(await drawPagination());

    const gameButtonsContainer = createElement('div', 'game-buttons-container');
    const gameContainerTitle = document.createElement('h2');
    gameContainerTitle.classList.add('games-title');
    gameContainerTitle.innerText = 'Игры';
    const toAudioCall = createElement('button', 'button-to-audioCall');
    toAudioCall.addEventListener('click', () => console.log('Аудиовызов', currentWords));
    const toSprint = createElement('button', 'button-to-sprint');
    toSprint.addEventListener('click', () => console.log('Спринт', currentWords));
    toAudioCall.innerText = 'Аудиовызов';
    toSprint.innerText = 'Спринт';
    gameButtonsContainer.append(toAudioCall, toSprint);
    bookContainer.append(gameContainerTitle, gameButtonsContainer);
  }
}
