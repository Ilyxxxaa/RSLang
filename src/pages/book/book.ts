import updateCards from './bookVIew';
import drawLevelsBlock from './levels';
import drawPagination from './pagination';
import currentWords from './bookState';

export default class Book {
  public async drawBook() {
    const content = document.querySelector('.page__content');
    if (content) content.innerHTML = '';

    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book_container');
    content?.append(bookContainer);

    bookContainer.append(drawLevelsBlock());
    await updateCards(+currentWords.currentLevel, +currentWords.currentPage);
    bookContainer.append(drawPagination());
  }
}
