import { createElement } from "./dictionaryVIew";
import { updateCards } from './dictionaryVIew';

let currentPage = 0;
let currentLevel = 0;

export function drawPagination() {
  const paginationContainer = createElement('div', 'pagination-container');
  const doubleLeft = createElement('button', 'paginationButton');
  const left = createElement('button', 'paginationButton');
  const doubleRight = createElement('button', 'paginationButton');
  const right = createElement('button', 'paginationButton');
  const paginationPageCounter = createElement('div', 'pagination-page-counter');
  const page = createElement('span', 'current-page');

  page.innerText = String(currentPage + 1);

  doubleLeft.classList.add('paginationButton_doubleLeft');
  doubleRight.classList.add('paginationButton_doubleRight');
  right.classList.add('paginationButton_right');
  left.classList.add('paginationButton_left');

  right.addEventListener('click', toNextPage);
  left.addEventListener('click', toPrevPage);
  doubleLeft.addEventListener('click', toStartPagination)
  doubleRight.addEventListener('click', toEndPagination)

  paginationPageCounter.append(page);
  paginationPageCounter.innerHTML += ` / 30 `;
  paginationContainer.append(doubleLeft, left, paginationPageCounter, right, doubleRight);

  return paginationContainer;
}

function toStartPagination() {
  if (currentPage === 0) return;
  const currentPageSpan = document.querySelector('.current-page');
  if (currentPageSpan) currentPageSpan.innerHTML = '1';
  currentPage = 0;
  updateCards(currentLevel, currentPage);
}

function toEndPagination() {
  if (currentPage === 29) return;
  const currentPageSpan = document.querySelector('.current-page');
  if (currentPageSpan) currentPageSpan.innerHTML = '30';
  currentPage = 29;
  updateCards(currentLevel, currentPage);
}

function toNextPage() {
  if (currentPage === 29) return;
  currentPage = currentPage + 1;
  const currentPageSpan = document.querySelector('.current-page');
  if (currentPageSpan) currentPageSpan.innerHTML = String(currentPage + 1);
  updateCards(currentLevel, currentPage);
}

function toPrevPage() {
  if (currentPage === 0) return;
  currentPage = currentPage - 1;
  const currentPageSpan = document.querySelector('.current-page');
  if (currentPageSpan) currentPageSpan.innerHTML = String(currentPage + 1);
  updateCards(currentLevel, currentPage);
}

