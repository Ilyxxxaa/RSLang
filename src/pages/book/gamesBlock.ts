import currentWords from './bookState';
import { createElement } from './utils';
import State, { Game } from '../../types/state';
import AudioCall from '../games/AudioCall/audioCall';

export const drawGamesBlock = (state: State) => {
  const gameButtonsContainer = createElement('div', 'game-buttons-container');
  const gameContainerTitle = document.createElement('h2');
  gameContainerTitle.classList.add('games-title');
  gameContainerTitle.innerText = 'Игры';
  const toAudioCall = createElement('button', 'button-to-audioCall');
  const toSprint = createElement('button', 'button-to-sprint');
  toAudioCall.addEventListener('click', () => {
    const audioGame = new AudioCall(state);
    audioGame.drawAudioCall();
    // eslint-disable-next-line no-param-reassign
    state.view = 'games';
    const menuButtons = document.querySelectorAll('.menu__list-item');
    menuButtons.forEach((item) => item.classList.remove('menu__list-item--active'));
    const gameButton = document.querySelector('.menuItemGames');
    if (gameButton) {
      gameButton.classList.add('menu__list-item--active');
    }
  });
  // toSprint.addEventListener('click', () => {
  //   console.log('спринт');
  // });
  toAudioCall.innerText = 'Аудиовызов';
  toSprint.innerText = 'Спринт';
  gameButtonsContainer.append(toAudioCall, toSprint);
  return [gameContainerTitle, gameButtonsContainer];
};
