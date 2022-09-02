import { IWord } from '../../types/bookTypes';
import './styles/main.scss';
import playSounds from './audio';
import getWords from './bookRequests';
import { levelColors, createElement, backgrounds } from './utils';

const noBgColor = '#FFFFFF';

function createCardWord(card: IWord, level: number, index: number, wordsContainer: HTMLElement) {
  const cardWord = createElement('button', 'card-word');
  if (index === 0) {
    cardWord.classList.add('active-word');
    cardWord.style.background = `${levelColors[level]}`;
  }
  cardWord.innerHTML = `<h4 class="">${card.word}</h4>
  <p class="">${card.wordTranslate}</p>
  </button>`;

  cardWord.addEventListener('click', () => {
    const prevActive: HTMLButtonElement | null = document.querySelector('.active-word');
    if (prevActive) prevActive.style.background = noBgColor;
    wordsContainer
      .querySelectorAll('.active-word')
      .forEach((el) => el.classList.remove('active-word'));
    cardWord.classList.add('active-word');
    cardWord.style.background = `${levelColors[level]} `;
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    updateCard(card);
  });
  return cardWord;
}

function createCard(cardData: IWord) {
  const cardContainer = createElement('div', 'card');
  const cardContent = createElement('div', 'card-content');
  const cardImgContainer = createElement('div', 'card-img-container');
  const wordContainer = createElement('div', 'word-container');
  const wordDescriptionContainer = createElement('div', 'word-description-container');

  cardImgContainer.style.background = `url('https://serverforrslang.herokuapp.com/${cardData.image}')`;

  const cardAudioContainer = createElement('div', 'card-audio-container');
  const audio = document.createElement('audio');
  audio.src = `https://serverforrslang.herokuapp.com/${cardData.audio}`;
  const audioMeaning = document.createElement('audio');
  audioMeaning.src = `https://serverforrslang.herokuapp.com/${cardData.audioMeaning}`;
  const audioExample = document.createElement('audio');
  audioExample.src = `https://serverforrslang.herokuapp.com/${cardData.audioExample}`;
  cardAudioContainer.append(audio, audioMeaning, audioExample);
  cardAudioContainer.addEventListener('click', (e) => playSounds(e, cardAudioContainer));

  wordContainer.innerHTML = `
    <h4 class="word-word">${cardData.word}</h4>
    <h4 class="word-translate">${cardData.wordTranslate}</h4>
    <span class="word-transcription">${cardData.transcription}</span>
  `;
  wordContainer.append(cardAudioContainer);

  const wordMeaningContainer = createElement('div', 'word-meaning-container');
  const wordExampleContainer = createElement('div', 'word-example-container');
  const textMeaning = createElement('p', 'text-meaning');
  const textMeaningTranslate = createElement('p', 'text-meaning-translate');
  const textExample = createElement('p', 'text-example');
  const textExampleTranslate = createElement('p', 'text-example-translate');
  textMeaning.innerHTML = `${cardData.textMeaning}`;
  textMeaningTranslate.innerHTML = `${cardData.textMeaningTranslate}`;
  textExample.innerHTML = `${cardData.textExample}`;
  textExampleTranslate.innerHTML = `${cardData.textExampleTranslate}`;

  wordDescriptionContainer.append(wordMeaningContainer, wordExampleContainer);
  wordMeaningContainer.append(textMeaning, textMeaningTranslate);
  wordExampleContainer.append(textExample, textExampleTranslate);

  cardContent.append(wordContainer, wordDescriptionContainer);
  cardContainer.append(cardImgContainer, cardContent);
  return cardContainer;
}

function updateCard(cardData: IWord) {
  const cardContainer = document.querySelector('.card');
  const cardsContainer = document.querySelector('.cards-container');
  if (cardContainer) {
    cardContainer.remove();
    cardsContainer?.append(createCard(cardData));
  }
}

function drawCards(array: IWord[], level: number) {
  let cardsContainer = document.querySelector('.cards-container');
  if (cardsContainer) {
    cardsContainer.innerHTML = '';
  } else {
    cardsContainer = createElement('div', 'cards-container');
    const bookContainer = document.querySelector('.book_container');
    bookContainer?.append(cardsContainer);
  }

  const content: HTMLDivElement | null = document.querySelector('.content');
  if (content) {
    content.style.backgroundImage = `url('../assets/images/book/bookBackgrounds/${backgrounds[level]}.png')`;
  }

  const wordsContainer = createElement('div', 'words-container');
  cardsContainer.append(wordsContainer);

  array.forEach((card, index) =>
    wordsContainer.append(createCardWord(card, level, index, wordsContainer)),
  );

  cardsContainer.append(createCard(array[0]));
}

export default async function updateCards(level: number, page: number) {
  localStorage.setItem('currentPage', `${page}`);
  localStorage.setItem('currentLevel', `${level}`);
  const arrayWords = await getWords(level, page);
  await drawCards(arrayWords, level);
}
