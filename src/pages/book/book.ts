/* eslint-disable import/no-cycle */
import updateCards from './bookVIew';
import drawLevelsBlock from './levels';
import drawPagination from './pagination';
import currentWords from './bookState';
import { createElement } from './utils';
import drawDictionary from './dictionary';
import { drawGamesBlock, toggleActiveGamesButtons } from './gamesBlock';
import Games from '../games/games';
import State from '../../types/state';
import { loaderInit } from './loader';

export const user = {
  message: localStorage.getItem('message'),
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  userId: localStorage.getItem('userId'),
};

export default class Book {
  state: State;

  constructor(state: State) {
    this.state = state;
  }

  public async drawBook() {
    loaderInit();
    const pageContent = document.querySelector('.page__content');
    if (pageContent) pageContent.innerHTML = '';
    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book_container');
    pageContent?.append(bookContainer);
    const bookTitle = createElement('h1', 'book-main-title');
    const bookButton = createElement('button', 'button-to-book');
    bookButton.classList.add('book-title-active');
    bookButton.innerHTML = 'Учебник';
    bookTitle.append(bookButton);
    localStorage.setItem('currentBookView', 'book');

    if (user.userId) {
      const dictionaryButton = createElement('button', 'button-to-dictionary');
      dictionaryButton.innerHTML = 'Словарь';
      bookTitle.append(dictionaryButton);
      dictionaryButton.addEventListener('click', () => drawDictionary());
    }
    bookButton.addEventListener('click', () => this.drawBook());

    const wordsTitle = document.createElement('h2');
    wordsTitle.innerText = 'Слова';
    wordsTitle.classList.add('words-title');

    bookContainer.append(bookTitle, drawLevelsBlock(), wordsTitle);

    await updateCards(currentWords.currentLevel, currentWords.currentPage, this.state);

    bookContainer.append(drawPagination());
    bookContainer.append(...drawGamesBlock(this.state));
    if (currentWords.learnedPage) {
      toggleActiveGamesButtons(true);
    }
    const games = new Games(this.state);
    games.addHandlersToStartGameFromBook();
  }
}
