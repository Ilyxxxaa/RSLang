import { IBody } from '../types/api';
import { IWord } from '../types/dictionaryTypes';
import request from './request';

const deepClone = require('rfdc/default');

const server = 'https://serverforrslang.herokuapp.com';
const notLearnedFilter = '{"$or":[{"$and":[{"userWord.optional.learned":false}]},{"userWord":null}]}';
const difficultyFilter = '{"$or":[{"userWord.difficulty":"hard"}]}';

const standardBody: IBody = {
  difficulty: 'string',
  optional: {
    isNew: false,
    learned: false,
    date: new Date(),
    games: {
      sprint: {
        right: 0,
        wrong: 0,
      },
      audioCall: {
        right: 0,
        wrong: 0,
      },
    },
    inRow: 0,
    tryCount: 0,
  },
};

export default async function getUserWords(group: number, page: number) {
  const token = localStorage.getItem('token')?.slice(1, -1);
  const userId = localStorage.getItem('userId')?.slice(1, -1);

  try {
    const response = await request(
      'GET',
      `${server}/users/${userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=20`,
      false,
      token,
    );
    const data = await response.json();
    console.log(data);
    return data[0].paginatedResults;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getNotLearedUserWords(group: number, page: number) {
  const token = localStorage.getItem('token')?.slice(1, -1);
  const userId = localStorage.getItem('userId')?.slice(1, -1);

  try {
    const response = await request(
      'GET',
      `${server}/users/${userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=20&filter=${notLearnedFilter}`,
      false,
      token,
    );
    const data = await response.json();
    console.log(data);
    return data[0].paginatedResults;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getDifficultWords() {
  const token = localStorage.getItem('token')?.slice(1, -1);
  const userId = localStorage.getItem('userId')?.slice(1, -1);

  try {
    const response = await request(
      'GET',
      `${server}/users/${userId}/aggregatedWords?wordsPerPage=3600&filter=${difficultyFilter}`,
      false,
      token,
    );
    const data = await response.json();
    console.log(data);
    return data[0].paginatedResults;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function createUserWord(word: IWord, game: string, isCorrect: boolean) {
  const token = localStorage.getItem('token')?.slice(1, -1);
  const userId = localStorage.getItem('userId')?.slice(1, -1);
  const body = deepClone(standardBody);
  const { _id: wordId } = word;
  if (isCorrect) {
    body.optional.games[game].right += 1;
    body.optional.inRow += 1;
  } else {
    body.optional.games[game].wrong += 1;
    body.optional.inRow = 0;
  }
  body.optional.tryCount += 1;
  body.optional.date = new Date();

  try {
    const response = await request(
      'POST',
      `${server}/users/${userId}/words/${wordId}`,
      body,
      token,
    );
    console.log(response);
    console.log('Слово создано');
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

export async function updateUserWord(word: IWord, game: string, isCorrect: boolean) {
  const body = deepClone(word.userWord);

  const token = localStorage.getItem('token')?.slice(1, -1);
  const userId = localStorage.getItem('userId')?.slice(1, -1);
  const { _id: wordId } = word;

  if (isCorrect) {
    body.optional.games[game].right += 1;
    body.optional.inRow += 1;
    if (body.optional.inRow >= 3) {
      body.difficulty = 'string';
      body.optional.learned = true;
    }
  } else {
    body.optional.games[game].wrong += 1;
    body.optional.inRow = 0;
    if (body.optional.learned === true) {
      body.optional.learned = false;
    }
  }
  body.optional.tryCount += 1;

  try {
    const response = await request('PUT', `${server}/users/${userId}/words/${wordId}`, body, token);
    console.log('Слово обновлено');
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

export async function updateHardWord(word: IWord, difficulty: string) {
  const body = deepClone(word.userWord);

  const token = localStorage.getItem('token')?.slice(1, -1);
  const userId = localStorage.getItem('userId')?.slice(1, -1);
  const { _id: wordId } = word;

  if (difficulty === 'hard') {
    body.difficulty = 'hard';
    body.optional.learned = 'false';
  } else {
    body.difficulty = 'string';
  }

  try {
    const response = await request('PUT', `${server}/users/${userId}/words/${wordId}`, body, token);
    console.log('Слово теперь сложное');
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

export async function createHardWord(word: IWord, difficulty: string) {
  const token = localStorage.getItem('token')?.slice(1, -1);
  const userId = localStorage.getItem('userId')?.slice(1, -1);
  const body = deepClone(standardBody);
  const { _id: wordId } = word;

  if (difficulty === 'hard') {
    body.difficulty = 'hard';
  }

  try {
    const response = await request(
      'POST',
      `${server}/users/${userId}/words/${wordId}`,
      body,
      token,
    );
    console.log(response);
    console.log('Слово создано и стало тяжёлым');
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

export async function updateLearnedWord(word: IWord, learned: boolean) {
  const body = deepClone(word.userWord);

  const token = localStorage.getItem('token')?.slice(1, -1);
  const userId = localStorage.getItem('userId')?.slice(1, -1);
  const { _id: wordId } = word;

  if (learned === true) {
    body.difficulty = 'string';
    body.optional.learned = true;
  }
  if (learned === false) {
    body.optional.learned = false;
  }

  try {
    const response = await request('PUT', `${server}/users/${userId}/words/${wordId}`, body, token);
    console.log('Слово теперь стало изученным');
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

export async function createLearnedWord(word: IWord, learned: boolean) {
  const token = localStorage.getItem('token')?.slice(1, -1);
  const userId = localStorage.getItem('userId')?.slice(1, -1);
  const body = deepClone(standardBody);
  const { _id: wordId } = word;

  if (learned === true) {
    body.difficulty = 'string';
    body.optional.learned = true;
  }

  try {
    const response = await request(
      'POST',
      `${server}/users/${userId}/words/${wordId}`,
      body,
      token,
    );
    console.log(response);
    console.log('Слово создано и стало изученным');
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
