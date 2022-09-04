import { getDifficultWords } from '../../common/apiRequests';
// eslint-disable-next-line import/no-cycle
import { drawCards } from './bookVIew';

const dictionaryGroupNumber = 7;

export async function drawDictionaryCards() {
  const arrayWords = await getDifficultWords();
  drawCards(arrayWords, dictionaryGroupNumber);
}

export default function drawDictionary() {
  localStorage.setItem('currentBookView', 'dictionary');
  const buttonToDictionary = document.querySelector('.button-to-dictionary');
  const buttonToBook = document.querySelector('.button-to-book');
  buttonToDictionary?.classList.add('book-title-active');
  buttonToBook?.classList.remove('book-title-active');
  const pagination: HTMLDivElement | null = document.querySelector('.pagination-container');
  if (pagination) pagination.style.display = 'none';
  const levels: HTMLDivElement | null = document.querySelector('.levels-container');
  if (levels) levels.style.display = 'none';
  const wordsTitle: HTMLElement | null = document.querySelector('.words-title');
  if (wordsTitle) wordsTitle.innerText = 'Cложные слова';
  drawDictionaryCards();
}
