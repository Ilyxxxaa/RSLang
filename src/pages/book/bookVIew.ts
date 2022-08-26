import { IWord } from '../../types/bookTypes';
import './styles/main.scss'
import { playSounds } from './audio';
import { getWords } from './bookRequests';
import { Loader } from './loader';

// loader: Loader; 
// constructor () {
//   this.loader = new Loader();
// }

export const loader = new Loader();
loader.loaderInit();

export async function updateCards(group: number, page: number) {
  loader.startLoader();
  localStorage.setItem('currentPage', `${page}`);
  localStorage.setItem('currentGroup', `${group}`);
  const arrayWords = await getWords(group, page);
  const bookContainer = document.querySelector('.book_container');
  bookContainer?.append(await drawCards(arrayWords, group));
  loader.stopLoader();
}

const cardsContainerBackgrounds = ['pattern-attention-drops', 'pattern-bubbles-up-down', 'pattern-dashed-waves', 'pattern-geometric-chaos', 'pattern-hash-stars-2', 'pattern-micro-rhomb-grid', 'pattern-millennium-wicker'];

const cardContainerBackgrounds = ['#BF2ED1', '#985CE4', '#6E8BF8', '#00E5E5', '#7682F4', '#0BFF96'];

function drawCards(array: IWord[], group: number) {
  if (document.querySelector('.cards-container')) document.querySelector('.cards-container')?.remove();
  const cardsContainer = createElement('div', 'cards-container');

  // cardsContainer.style.background = `url('../assets/images/book/bookBackgrounds/${cardsContainerBackgrounds[group]}.png')`;

  array.forEach(card => cardsContainer.append(createCard(card, group)));
  return cardsContainer;
}

function createCard(card: IWord, group: number) {
  const cardData = card;
  const cardContainer = createElement('div', 'card-container');
  cardContainer.style.background = `${cardContainerBackgrounds[group]}`;
  const cardContent = createElement('div', 'card-content');
  const cardImg = document.createElement('img');
  const wordContainer = createElement('div', 'word-container');

  const wordDescriptionContainer = createElement('div', 'word-description-container');
  const wordMeaningContainer = createElement('div', 'word-meaning-container');
  const wordExampleContainer = createElement('div', 'word-example-container');
  const textMeaning = createElement('p', 'text-meaning');
  const textMeaningTranslate = createElement('p', 'text-meaning-translate');
  const textExample = createElement('p', 'text-example');
  const textExampleTranslate = createElement('p', 'text-example-translate');
  textMeaning.innerHTML = `${card.textMeaning}`;
  textMeaningTranslate.innerHTML = `${card.textMeaningTranslate}`;
  textExample.innerHTML = `${card.textExample}`;
  textExampleTranslate.innerHTML = `${card.textExampleTranslate}`;

  wordDescriptionContainer.append(wordMeaningContainer, wordExampleContainer);
  wordMeaningContainer.append(textMeaning, textMeaningTranslate);
  wordExampleContainer.append(textExample, textExampleTranslate);

  const wordTitle = createElement('h4', 'word-title');
  const wordTranslator = createElement('p', 'word-translation');
  const cardAudioContainer = createElement('div', 'card-audio-container');

  wordTitle.innerHTML = `<span class="english-word">${card.word[0].toUpperCase() + card.word.slice(1)} </span>`
  wordTitle.innerHTML += `<span class="transcript">${card.transcription}</span>`

  cardImg.classList.add('card__img');
  cardImg.src = `https://serverforrslang.herokuapp.com/${cardData.image}`;

  cardContainer.append(cardImg);
  cardContainer.append(cardContent);
  cardContent.append(wordContainer, cardAudioContainer, wordDescriptionContainer);
  wordContainer.append(wordTitle, wordTranslator);

  const audio = document.createElement('audio');
  audio.src = `https://serverforrslang.herokuapp.com/${cardData.audio}`
  const audioMeaning = document.createElement('audio');
  audioMeaning.src = `https://serverforrslang.herokuapp.com/${cardData.audioMeaning}`
  const audioExample = document.createElement('audio');
  audioExample.src = `https://serverforrslang.herokuapp.com/${cardData.audioExample}`
  cardAudioContainer.append(audio, audioMeaning, audioExample);

  cardAudioContainer.addEventListener('click', (e) => playSounds(e, cardAudioContainer));

  return cardContainer;
}

export function createElement(elem: string, className: string) {
  const htmlElem: HTMLElement = document.createElement(elem);
  htmlElem.classList.add(className);
  return htmlElem;
}


