import { IWord } from '../../types/dictionaryTypes';
import '../dictionary/styles/main.scss'
import { playSounds } from './audio';
import { drawPagination } from './pagination';
import { drawGroupsBlock } from './groups';
import { getWords } from './dictionaryRequests';



export const currentWords = {
  currentPage: localStorage.getItem('currentPage') || 1,
  currentGroup: localStorage.getItem('currentGroup') || 1
}

const main = document.querySelector('.content'); // куда её вставлять
if (main) main.innerHTML = '';

const dictionaryContainer = document.createElement('div');
dictionaryContainer.classList.add('dictionary_container');
main?.append(dictionaryContainer);




(async function () {
  // const arrayWords = await getWords(currentWords.currentGroup, currentWords.currentPage);
  dictionaryContainer.append(drawPagination());
  dictionaryContainer.append(drawGroupsBlock());
  console.log(dictionaryContainer, `.group-${currentWords.currentGroup}-button`);
  document.querySelector(`.group-${+currentWords.currentGroup + 1}-button`)?.classList.add('active-group'); // выделяем активную группу
  await updateCards(+currentWords.currentGroup, +currentWords.currentPage);
})();



export async function updateCards(group: number, page: number) {
  localStorage.setItem('currentPage', `${page}`);
  localStorage.setItem('currentGroup', `${group}`);
  const arrayWords = await getWords(group, page);
  await drawCards(arrayWords);
}



function drawCards(array: IWord[]) {
  if (document.querySelector('.cards-container')) document.querySelector('.cards-container')?.remove();
  const cardsContainer = createElement('div', 'cards-container');
  dictionaryContainer.append(cardsContainer);

  array.forEach(card => cardsContainer.append(createCard(card)));
}

function createCard(card: IWord) {
  const cardData = card;
  const cardContainer = createElement('div', 'card-container');
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


