const serverAddress = 'https://serverforrslang.herokuapp.com';
const wordsPath = `${serverAddress}/words`;

export default async function getWords(group: number, page: number) {
  const response = await fetch(`${wordsPath}/?group=${group}&page=${page}`);
  const words = await response.json();
  return words;
}

export async function getUserWords(id: string) {
  const response = await fetch(`${serverAddress}/users/${id}/words`);
  const userWords = await response.json();
  return userWords;
}
