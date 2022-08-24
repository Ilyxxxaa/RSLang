import './dictionaryVIew'
import { updateCards } from './dictionaryVIew';
import { drawGroupsBlock } from './groups';
import { drawPagination } from './pagination';

export const currentWords = {
  currentPage: localStorage.getItem('currentPage') || 1,
  currentGroup: localStorage.getItem('currentGroup') || 1
}

export class Dictionary {
  public async drawDictionary(state: string) {
    const content = document.querySelector('.content'); // куда её вставлять
    if (content) content.innerHTML = '';

    const dictionaryContainer = document.createElement('div');
    dictionaryContainer.classList.add('dictionary_container');
    content?.append(dictionaryContainer);

    dictionaryContainer.append(drawPagination());
    dictionaryContainer.append(drawGroupsBlock());
    document.querySelector(`.group-${+currentWords.currentGroup + 1}-button`)?.classList.add('active-group'); // выделяем активную группу
    await updateCards(+currentWords.currentGroup, +currentWords.currentPage);
  }
}

