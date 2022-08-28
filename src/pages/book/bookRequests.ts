const serverAdress = 'https://serverforrslang.herokuapp.com';
const wordsPath = `${serverAdress}/words`;

export default async function getWords(group: number, page: number) {
  const response = await fetch(`${wordsPath}/?group=${group}&page=${page}`);
  const words = await response.json();
  return words;
}
