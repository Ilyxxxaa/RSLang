import { getDifficultWords } from './bookRequests';
import { drawCards } from './bookVIew';

const local: string | null = localStorage.getItem('user');
const user = local ? JSON.parse(local) : null;

export async function drawDictionaryCards() {
  if (user) {
    const arrayWords = await getDifficultWords(user);
    drawCards(arrayWords);
  }

  // await drawCards(arrayWords, level, user);
}

export default function drawDictionary() {
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
