import currentWords from './bookState';
import { createElement } from './utils';
import { Game } from '../../types/state';

export const drawGamesBlock = () => {
  const gameButtonsContainer = createElement('div', 'game-buttons-container');
  const gameContainerTitle = document.createElement('h2');
  gameContainerTitle.classList.add('games-title');
  gameContainerTitle.innerText = 'Игры';
  const toAudioCall = createElement('button', 'button-to-audioCall');
  const toSprint = createElement('button', 'button-to-sprint');
  toAudioCall.addEventListener('click', () => console.log('Аудиовызов', currentWords));
  // toSprint.addEventListener('click', () => {
  //   console.log('спринт');
  // });
  toAudioCall.innerText = 'Аудиовызов';
  toSprint.innerText = 'Спринт';
  gameButtonsContainer.append(toAudioCall, toSprint);
  return [gameContainerTitle, gameButtonsContainer];
};
