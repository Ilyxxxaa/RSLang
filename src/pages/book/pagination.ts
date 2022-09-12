import { createElement, levelColors } from './utils';
// eslint-disable-next-line import/no-cycle
import updateCards from './bookVIew';
import currentWords from './bookState';

function toStartPagination() {
  if (currentWords.currentPage === 0) return;
  const currentPageSpan = document.querySelector('.current-page');
  if (currentPageSpan) currentPageSpan.innerHTML = '1';
  currentWords.currentPage = 0;
  updateCards(+currentWords.currentLevel, currentWords.currentPage);
}

function toEndPagination() {
  if (currentWords.currentPage === 29) return;
  const currentPageSpan = document.querySelector('.current-page');
  if (currentPageSpan) currentPageSpan.innerHTML = '30';
  currentWords.currentPage = 29;
  updateCards(currentWords.currentLevel, currentWords.currentPage);
}

function toNextPage() {
  if (currentWords.currentPage === 29) return;

  const currentPageSpan = document.querySelector('.current-page');
  currentWords.currentPage += 1;
  if (currentPageSpan) currentPageSpan.innerHTML = String(currentWords.currentPage + 1);

  updateCards(currentWords.currentLevel, currentWords.currentPage);
}

function toPrevPage() {
  if (currentWords.currentPage === 0) return;

  const currentPageSpan = document.querySelector('.current-page');
  currentWords.currentPage -= 1;
  if (currentPageSpan) currentPageSpan.innerHTML = String(currentWords.currentPage + 1);

  updateCards(currentWords.currentLevel, currentWords.currentPage);
}

export default function drawPagination() {
  const paginationContainer = createElement('div', 'pagination-container');
  const doubleLeft = createElement('button', 'paginationButton');
  const left = createElement('button', 'paginationButton');
  const doubleRight = createElement('button', 'paginationButton');
  const right = createElement('button', 'paginationButton');
  const paginationPageCounter = createElement('div', 'pagination-page-counter');
  const page = createElement('span', 'current-page');

  page.innerText = String(currentWords.currentPage + 1);
  paginationPageCounter.style.background = `${levelColors[currentWords.currentLevel]}`;
  doubleLeft.classList.add('paginationButton_doubleLeft');
  doubleRight.classList.add('paginationButton_doubleRight');
  right.classList.add('paginationButton_right');
  left.classList.add('paginationButton_left');

  right.addEventListener('click', toNextPage);
  left.addEventListener('click', toPrevPage);
  doubleLeft.addEventListener('click', toStartPagination);
  doubleRight.addEventListener('click', toEndPagination);

  paginationPageCounter.append(page);
  paginationPageCounter.innerHTML += ' / 30 ';
  paginationContainer.append(doubleLeft, left, paginationPageCounter, right, doubleRight);

  return paginationContainer;
}

export function updatePaginationColor() {
  const paginationPageCounter: HTMLDivElement | null = document.querySelector('.pagination-page-counter');
  if (paginationPageCounter) {
    paginationPageCounter.style.background = `${levelColors[currentWords.currentLevel]}`;
  }
}
