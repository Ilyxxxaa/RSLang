import { Level } from '../../types/state';
import Games from './games';
import './styles/games.scss';

class GameLevels {
  // state: State;

  // constructor(state: State) {
  //   this.state = state;
  // }

  static drawGameLevels(event: Event) {
    const target = event.target as HTMLElement;

    const pageContent = document.querySelector('.page__content') as HTMLElement;
    pageContent.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'levels__container';

    const gameName = document.createElement('h1');
    gameName.className = 'game__name';
    gameName.textContent = `${target.id}`;

    const gameLevelsContainer = document.createElement('div');
    gameLevelsContainer.className = 'levels';

    const levels: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    levels.forEach((level) => {
      const levelItem = document.createElement('div');
      levelItem.className = 'level';
      levelItem.textContent = level;
      gameLevelsContainer.append(levelItem);
    });

    const buttonBack = document.createElement('button');
    buttonBack.className = 'game__button game__button_back';
    buttonBack.textContent = 'назад';

    container.append(gameName, gameLevelsContainer, buttonBack);
    pageContent.append(container);

    buttonBack.addEventListener('click', () => {
      const games = new Games();
      games.drawGames();
    });
  }
}

export default GameLevels;
