/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import { IWord } from '../../types/dictionaryTypes';
import './styles/main.scss';
import { getWords } from './bookRequests';
import { levelColors, createElement } from './utils';
import { playSounds, stopAudio } from './audio';
import { user } from './book';
import getUserWords, { createHardWord, createLearnedWord, updateHardWord, updateLearnedWord } from '../../common/apiRequests';
import currentBookWords from './bookState';
import drawDictionary from './dictionary';
import { startLoader, stopLoader } from './loader';
import State from '../../types/state';

const noBgColor = '#FFFFFF';
let currentActiveWord: IWord | null = null;

// eslint-disable-next-line max-len
function createCardWord(card: IWord, level: number, index: number, wordsContainer: HTMLElement) {
  const cardWord = createElement('button', 'card-word');

  if (index === 0) {
    cardWord.classList.add('active-word');
    cardWord.style.background = `${levelColors[level]}`;
  }
  cardWord.innerHTML = `<h4 class="">${card.word}</h4>
  <p class="">${card.wordTranslate}</p>
  </button>`;
  if (card.userWord && card.userWord.difficulty === 'hard') {
    cardWord.classList.add('difficult-card-word');
    cardWord.classList.remove('learned-card-word');
  }
  if (card.userWord && card.userWord.optional.learned === true) {
    cardWord.classList.add('learned-card-word');
    cardWord.classList.remove('difficult-card-word');
  }

  cardWord.addEventListener('click', () => {
    const prevActive: HTMLButtonElement | null = document.querySelector('.active-word');
    if (prevActive) prevActive.style.background = noBgColor;
    wordsContainer
      .querySelectorAll('.active-word')
      .forEach((el) => el.classList.remove('active-word'));
    cardWord.classList.add('active-word');
    cardWord.style.background = (level >= 0) ? `${levelColors[level]}` : `${levelColors[7]}`;
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    updateCard(card);
  });
  currentActiveWord = null;
  return cardWord;
}

async function addWordDifficult(cardData: IWord, button: HTMLButtonElement, bookView: string) {
  const buttonElement = button;
  if (button) buttonElement.disabled = true;
  if (cardData.userWord) {
    if (cardData.userWord.difficulty === 'hard') {
      await updateHardWord(cardData, 'string');
    } else await updateHardWord(cardData, 'hard');
  } else {
    await createHardWord(cardData, 'hard');
  }
  currentActiveWord = cardData;
  console.log(currentActiveWord);

  if (bookView && bookView === 'dictionary') {
    await drawDictionary();
  } else await updateCards(currentBookWords.currentLevel, currentBookWords.currentPage);
  buttonElement.disabled = false;
}

async function addWordLearned(cardData: IWord, button: HTMLButtonElement, bookView: string) {
  const buttonElement = button;
  if (button) buttonElement.disabled = true;
  if (cardData.userWord) {
    if (cardData.userWord.optional.learned === true) {
      await updateLearnedWord(cardData, false);
    } else await updateLearnedWord(cardData, true);
  } else {
    await createLearnedWord(cardData, true);
  }
  if (bookView && bookView === 'dictionary') {
    await drawDictionary();
  } else await updateCards(currentBookWords.currentLevel, currentBookWords.currentPage);
  buttonElement.disabled = false;
}

function createCard(cardData: IWord) {
  const bookView = localStorage.getItem('currentBookView') || 'book';
  const isAutorizated = localStorage.getItem('userId');

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

  const cardButtonsContainer = createElement('div', 'card-buttons-container');
  cardButtonsContainer.append(cardAudioContainer);

  if (isAutorizated) {
    if (cardData.userWord && cardData.userWord.difficulty === 'hard') {
      cardContainer.classList.add('difficult-card');
    }
    if (cardData.userWord && cardData.userWord.optional
      && cardData.userWord.optional.learned === true) {
      cardContainer.classList.add('learned-card');
    }

    const buttonAddToDiff: HTMLButtonElement = document.createElement('button');
    buttonAddToDiff.classList.add('button-add-to-diff');
    const buttonAddToLearned: HTMLButtonElement = document.createElement('button');
    buttonAddToLearned.classList.add('button-add-to-learned');

    buttonAddToDiff.innerText = '+ В СЛОЖНЫЕ СЛОВА';
    if (cardData.userWord && cardData.userWord.difficulty === 'hard') buttonAddToDiff.innerText = '- ИЗ СЛОЖНЫХ';

    buttonAddToDiff.addEventListener('click', () => addWordDifficult(cardData, buttonAddToDiff, bookView));

    buttonAddToLearned.innerText = 'ИЗУЧЕНО';
    if (cardData.userWord && cardData.userWord.optional.learned === true) {
      buttonAddToLearned.innerText = 'ИЗУЧАТЬ';
    }
    buttonAddToLearned.addEventListener('click', () => addWordLearned(cardData, buttonAddToLearned, bookView));

    cardButtonsContainer.append(buttonAddToDiff, buttonAddToLearned);

    const wordGameResultsContainer = createElement('div', 'word-results-container');
    const gameResultsTitle = createElement('p', 'game-results-title');
    const wordGameStatistic = createElement('div', 'word-game-statistic');
    gameResultsTitle.innerText = 'Результаты игр';
    wordGameStatistic.innerHTML = `
        <div class="game-statistic-wrapper" >
          <span class="game-name"> Спринт </span>
          <span class="game-stat">${getGameResults(cardData, 'sprint')}</span>
        </div>
        <div class="game-statistic-wrapper">
          <span class="game-name"> Аудивызов </span>
          <span class="game-stat">${getGameResults(cardData, 'audioCall')}</span>
        </div>
        `;
    wordGameResultsContainer.append(gameResultsTitle, wordGameStatistic);
    wordDescriptionContainer.append(wordGameResultsContainer);
  }

  wordContainer.append(cardButtonsContainer);
  return cardContainer;
}

function updateCard(cardData: IWord) {
  stopAudio();
  const cardContainer = document.querySelector('.card');
  const cardsContainer = document.querySelector('.cards-container');
  if (cardContainer) {
    cardContainer.remove();
    cardsContainer?.append(createCard(cardData));
  }
}

export function drawCards(array: IWord[], level: number) {
  let cardsContainer = document.querySelector('.cards-container');
  if (cardsContainer) {
    cardsContainer.innerHTML = '';
  } else {
    cardsContainer = createElement('div', 'cards-container');
    const bookContainer = document.querySelector('.book_container');
    bookContainer?.append(cardsContainer);
  }

  const wordsContainer = createElement('div', 'words-container');
  array.forEach((card, i) => wordsContainer.append(createCardWord(card, level, i, wordsContainer)));
  cardsContainer.append(wordsContainer);
  cardsContainer.append(createCard(array[0]));
}

export default async function updateCards(level: number, page: number, state?: State) {
  if (state) {
    state.gameLevel = level;
    state.gamePage = page;
  }
  localStorage.setItem('currentBookPage', `${page}`);
  localStorage.setItem('currentBookLevel', `${level}`);

  const arrayWords = user.userId ? await getUserWords(level, page)
    : await getWords(level, page);
  await drawCards(arrayWords, level);
}

function getGameResults(cardData: IWord, game: 'sprint' | 'audioCall') {
  const result = cardData.userWord ? `${cardData.userWord.optional.games[game].right} / ${cardData.userWord.optional.games[game].right + cardData.userWord.optional.games.sprint.wrong}` : '0 / 0';
  return result;
}
