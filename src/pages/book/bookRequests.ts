/* eslint-disable quote-props */
import State from '../../types/state';
import updateCards from './bookVIew';
import currentWords from './bookState';

const serverAddress = 'https://serverforrslang.herokuapp.com';
const wordsPath = `${serverAddress}/words`;

export async function getWords(group: number, page: number) {
  const response = await fetch(`${wordsPath}/?group=${group}&page=${page}`);
  const words = await response.json();
  return words;
}

export async function getAggregatedWords(level: number, page: number, user: State) {
  const response = await fetch(`${serverAddress}/users/${user.userId}/aggregatedWords?group=${level}&page=${page}&wordsPerPage=20`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: 'application/json',
    },
  });
  const aggregatedWords = await response.json();
  return aggregatedWords[0].paginatedResults;
}

export const updateUserWord = async (user: State, wordId: string, word) => {
  const rawResponse = await fetch(`${serverAddress}/users/${user.userId}/words/${wordId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
  const content = await rawResponse.json().catch((err) => { console.log(err); });
};

export const createUserWord = async (user: State, wordId: string, word) => {
  const rawResponse = await fetch(`${serverAddress}/users/${user.userId}/words/${wordId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
  const content = await rawResponse.json().catch((err) => { updateUserWord(user, wordId, word); });
  updateCards(currentWords.currentLevel, currentWords.currentPage);
};

export async function getDifficultWords(user: State) {
  const response = await fetch(`${serverAddress}/users/${user.userId}/aggregatedWords?wordsPerPage=3600&filter=%7B%22%24or%22%3A%5B%7B%22%24and%22%3A%5B%7B%22userWord.difficulty%22%3A%22hard%22%7D%5D%7D%5D%7D`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: 'application/json',
    },
  });
  const aggregatedWords = await response.json();
  return aggregatedWords[0].paginatedResults;
}
