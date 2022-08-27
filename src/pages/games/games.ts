import './styles/games.scss';
import { audiocallDescription, sprintDescription } from '../../const';
import GameLevels from './gameLevels';
// import { Game } from '../../types/state';

export default class Games {
  games: HTMLElement = document.createElement('div');

  drawGames() {
    const pageContent = document.querySelector('.page__content');
    if (pageContent) {
      pageContent.innerHTML = '';
      this.games.innerHTML = '';
      pageContent.append(this.games);
    }
    this.createGames();
  }

  createGames() {
    this.games.classList.add('games');
    this.drawGame('audiocall', 'Аудиовызов', audiocallDescription);
    this.drawGame('sprint', 'Спринт', sprintDescription);
    this.addHandlersToGames();
  }

  drawGame(name: string, title: string, description: string) {
    const gameContainer = document.createElement('div');
    gameContainer.className = `game game_${name}`;

    const gameTitle = document.createElement('h3');
    gameTitle.className = `game__title game__title_${name}`;
    gameTitle.textContent = title;

    const gameDescription = document.createElement('p');
    gameDescription.className = 'description';
    gameDescription.textContent = description;

    const gameButton = document.createElement('button');
    gameButton.className = `game__button game__button_${name}`;
    gameButton.id = name;
    gameButton.textContent = 'играть';

    gameContainer.append(gameTitle, gameDescription, gameButton);
    this.games.append(gameContainer);
  }

  addHandlersToGames() {
    document.querySelectorAll<HTMLButtonElement>('.game__button')?.forEach((button) => {
      button.addEventListener('click', (event: Event) => {
        GameLevels.drawGameLevels(event);
      });
    });
  }
}
