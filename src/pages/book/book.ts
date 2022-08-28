import updateCards from './bookVIew';
import drawLevelsBlock from './levels';
import drawPagination from './pagination';
import currentWords from './bookState';

export default class Book {
  public async drawBook() {
    console.log(currentWords.currentLevel, currentWords.currentPage);
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
