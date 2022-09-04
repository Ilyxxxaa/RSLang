import { IWord } from '../../types/bookTypes';
import './styles/main.scss';
import { getWords, getAggregatedWords, createUserWord, updateUserWord } from './bookRequests';
import { levelColors, createElement } from './utils';
import { playSounds, stopAudio } from './audio';
import State from '../../types/state';
import { drawDictionaryCards } from './dictionary';
import { WORDS_PER_PAGE } from '../../const';

const noBgColor = '#FFFFFF';

// eslint-disable-next-line max-len
function createCardWord(card: IWord, level: number, index: number, wordsContainer: HTMLElement) {
  const cardWord = createElement('button', 'card-word');
  if (index === 0) {
    console.log(level);
    cardWord.classList.add('active-word');
    cardWord.style.background = (level >= 0) ? `${levelColors[level]}` : `${levelColors[7]}`;
  }
  cardWord.innerHTML = `<h4 class="">${card.word}</h4>
  <p class="">${card.wordTranslate}</p>
  </button>`;

  if (card.userWord && card.userWord.difficulty === 'hard') {
    cardWord.classList.add('difficult-card-word');
  }
  if (card.userWord && card.userWord.optional && card.userWord.optional.learned) {
    cardWord.classList.add('learned-card-word');
  }

  cardWord.addEventListener('click', () => {
    const prevActive: HTMLButtonElement | null = document.querySelector('.active-word');
    if (prevActive) prevActive.style.background = noBgColor;
    wordsContainer.querySelectorAll('.active-word').forEach((el) => el.classList.remove('active-word'));
    cardWord.classList.add('active-word');
    console.log(level);
    cardWord.style.background = (level >= 0) ? `${levelColors[level]}` : `${levelColors[7]}`;
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    updateCard(card);
  });
  return cardWord;
}

function addWordDifficult(cardData: IWord) {
  const id = cardData.id ? cardData.id : cardData._id;
  const local: string | null = localStorage.getItem('user');
  const user = local ? JSON.parse(local) : null;

  if (cardData.userWord) {
    if (cardData.userWord.difficulty === 'hard') {
      const params = { difficulty: 'none', optional: { learned: false } };
      updateUserWord(user, id, params);
      drawDictionaryCards();
      // localStorage.setItem('book-last-active-word', `${cardData.word}`);
    } else {
      const params = { difficulty: 'hard', optional: { learned: false } };
      updateUserWord(user, id, params);
      drawDictionaryCards();
      // localStorage.setItem('book-last-active-word', `${cardData.word}`);
    }
  } else {
    const params = { difficulty: 'hard', optional: { learned: false } };
    createUserWord(user, id, params);
  }
}

function addWordLearned(cardData: IWord) {
  const id = cardData.id ? cardData.id : cardData._id;
  const local: string | null = localStorage.getItem('user');
  const user = local ? JSON.parse(local) : null;

  if (cardData.userWord && cardData.userWord.optional) {
    if (cardData.userWord.optional.learned === true) {
      const params = { difficulty: 'none', optional: { learned: false } };
      updateUserWord(user, id, params);
      // localStorage.setItem('book-last-active-word', `${cardData.word}`);
    } else {
      const params = { difficulty: 'none', optional: { learned: true } };
      updateUserWord(user, id, params);
      // localStorage.setItem('book-last-active-word', `${cardData.word}`);
    }
  } else {
    const params = { difficulty: 'none', optional: { learned: true } };
    createUserWord(user, id, params);
  }
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

  if (cardData.userWord && cardData.userWord.difficulty === 'hard') {
    cardContainer.classList.add('difficult-card');
  }
  if (cardData.userWord && cardData.userWord.optional && cardData.userWord.optional.learned) {
    cardContainer.classList.add('learned-card');
  }

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
  const user = localStorage.getItem('user');
  if (user) {
    const buttonAddToDiff = createElement('button', 'button-add-to-diff');
    if (cardData.userWord && cardData.userWord.difficulty === 'hard') {
      buttonAddToDiff.innerText = '- ИЗ СЛОЖНЫХ СЛОВ';
    } else buttonAddToDiff.innerText = '+ В СЛОЖНЫЕ СЛОВА';

    buttonAddToDiff.addEventListener('click', () => addWordDifficult(cardData));

    const buttonAddToLearned = createElement('button', 'button-add-to-learned');
    buttonAddToLearned.innerText = 'ИЗУЧЕНО';
    buttonAddToLearned.addEventListener('click', () => addWordLearned(cardData));
    cardButtonsContainer.append(buttonAddToDiff, buttonAddToLearned);

    const wordGameResultsContainer = createElement('div', 'word-results-container');
    const gameResultsTitle = createElement('p', 'game-results-title');
    const wordGameStatistic = createElement('div', 'word-game-statistic');
    gameResultsTitle.innerText = 'Результаты игр';
    wordGameStatistic.innerHTML = `
      <div class="game-statistic-wrapper" >
        <span class="game-name"> Спринт </span>
        <span class="game-stat"> 0 </span>
      </div>
      <div class="game-statistic-wrapper">
        <span class="game-name"> Аудивызов </span>
        <span class="game-stat"> 0 </span>
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

export function drawCards(array: IWord[], level: number, user: State) {
  let cardsContainer = document.querySelector('.cards-container');
  if (cardsContainer) {
    cardsContainer.innerHTML = '';
  } else {
    cardsContainer = createElement('div', 'cards-container');
    const bookContainer = document.querySelector('.book_container');
    bookContainer?.append(cardsContainer);
  }

  const wordsContainer = createElement('div', 'words-container');
  cardsContainer.append(wordsContainer);

  array.forEach(
    (card, index) => wordsContainer.append(createCardWord(card, level, index, wordsContainer)),
  );

  cardsContainer.append(createCard(array[0]));
}

export default async function updateCards(level: number, page: number) {
  localStorage.setItem('currentBookPage', `${page}`);
  localStorage.setItem('currentBookLevel', `${level}`);
  const local: string | null = localStorage.getItem('user');
  const user = local ? JSON.parse(local) : null;

  const arrayWords = user ? await getAggregatedWords(level, page, user)
    : await getWords(level, page);
  await drawCards(arrayWords, level, user);
}
