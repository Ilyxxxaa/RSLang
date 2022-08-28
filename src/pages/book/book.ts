import updateCards from './bookVIew';
import drawLevelsBlock from './levels';
import drawPagination from './pagination';
import currentWords from './bookState';
import State from '../../types/state';

export default class Book {
  state: State;

  constructor(state: State) {
    this.state = state;
  }

  public async drawBook() {
    console.log(this.state);
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
    bookTitle.innerText = 'Учебник';
    bookTitle.classList.add('book-title');

    const wordsTitle = document.createElement('h2');
    wordsTitle.innerText = 'Слова';
    wordsTitle.classList.add('words-title');

    bookContainer.append(bookTitle, drawLevelsBlock(), wordsTitle);

    await updateCards(currentWords.currentLevel, currentWords.currentPage);
    bookContainer.append(await drawPagination());
  }
}
