import './bookVIew';
import { updateCards } from './bookVIew';
import { drawGroupsBlock } from './groups';
import { drawPagination } from './pagination';

export const currentWords = {
  currentPage: localStorage.getItem('currentPage') || 1,
  currentGroup: localStorage.getItem('currentGroup') || 1,
};

export class Book {
  public async drawBook() {
    const content = document.querySelector('.page__content'); // куда её вставлять
    if (content) content.innerHTML = '';

    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book_container');
    content?.append(bookContainer);

    bookContainer.append(drawPagination());
    bookContainer.append(drawGroupsBlock());
    document
      .querySelector(`.group-${+currentWords.currentGroup + 1}-button`)
      ?.classList.add('active-group'); // выделяем активную группу
    await updateCards(+currentWords.currentGroup, +currentWords.currentPage);
  }
}
