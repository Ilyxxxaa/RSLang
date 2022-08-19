import { Server } from './dictionaryRequests';
import { IWord } from './dictionaryTypes';

const main = document.querySelector('.content'); // куда её вставлять

const dictionaryContainer = document.createElement('div');
dictionaryContainer.classList.add('dictionary_container');
main?.append(dictionaryContainer);


const test = new Server();

(async function () {
  const arrayWords = await test.getWords(1, 1);
  await drawPagination();
  await drawCards(arrayWords);

})();




function drawPagination() {
  const paginationContainer = createElement('div', 'pagination-container');
  const doubleLeft = createElement('button', 'paginationButton');
  const left = createElement('button', 'paginationButton');
  const doubleRight = createElement('button', 'paginationButton');
  const right = createElement('button', 'paginationButton');
  const paginationPageCounter = createElement('div', 'pagination_page_counter');

  doubleLeft.innerHTML = "<<";
  left.innerHTML = "<";
  doubleRight.innerHTML = ">>";
  right.innerHTML = ">";
  paginationPageCounter.innerHTML = `<span>1 / 30 </span>`;
  doubleLeft.classList.add('paginationButton_doubleLeft');
  doubleRight.classList.add('paginationButton_doubleRight');
  right.classList.add('paginationButton_right');
  left.classList.add('paginationButton_left');

  paginationContainer.append(doubleLeft, left, paginationPageCounter, doubleRight, right);
  dictionaryContainer.append(paginationContainer);
}

function drawCards(array: IWord[]) {
  const cardsContainer = createElement('div', 'cards-container');
  dictionaryContainer.append(cardsContainer);

  array.forEach(card => cardsContainer.append(drawCard(card)));

}

function drawCard(card: IWord) {
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
  // cardAudioContainer.addEventListener('click', (e) => playSounds(e.target));
  cardAudioContainer.addEventListener('click', playSounds);

  return cardContainer;
}

function createElement(elem: string, className: string) {
  const htmlElem: HTMLElement = document.createElement(elem);
  htmlElem.classList.add(className);
  return htmlElem;
}

function playSounds() {
  console.log('ggg');
}
// const audio = new Audio(
//   "https://serverforrslang.herokuapp.com/files/02_0622_meaning.mp3"
// );

// function playAudio() {
//   audio.play()
// }


var audio = new Audio('https://serverforrslang.herokuapp.com/files/02_0622_meaning.mp3');
audio.play();
