import State from '../../types/state';
import './styles/games.scss';

class GameLevels {
  state: State;

  constructor(state: State) {
    this.state = state;
  }

  drawGameLevels() {
    const pageContent = document.querySelector('.page__content') as HTMLElement;
    pageContent.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'levels__container';

    const gameName = document.createElement('h1');
    gameName.className = 'game__name';
    gameName.textContent = `${this.state.game}`;

    const gameLevelsContainer = document.createElement('div');
    gameLevelsContainer.className = 'levels';

    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    levels.forEach((level) => {
      const levelItem = document.createElement('div');
      levelItem.className = 'level';
      levelItem.textContent = level;
      gameLevelsContainer.append(levelItem);
    });

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'level__buttons';

    const buttonBack = document.createElement('button');
    buttonBack.className = 'game__button game__button_back';
    buttonBack.textContent = 'назад';

    const buttonStart = document.createElement('button');
    buttonStart.className = 'game__button game__button_start';
    buttonStart.id = `${this.state.game}`;
    buttonStart.textContent = 'начать';
    buttonStart.disabled = true;

    buttonContainer.append(buttonBack, buttonStart);
    container.append(gameName, gameLevelsContainer, buttonContainer);
    pageContent.append(container);
  }
}

export default GameLevels;
