import { audiocallDescription, sprintDescription } from '../../const';
import GameCardView from './gameCardView';
import GameLevels from './gameLevels';
import State from '../../types/state';
import SprintView from './Sprint/sprintView';
import AudioCall from './AudioCall/audioCall';
import './styles/games.scss';

export default class GamesController {
  state: State;

  levels: GameLevels;

  constructor(state: State) {
    this.state = state;
    this.levels = new GameLevels(state);
  }

  clearPageContent() {
    const pageContent = document.querySelector('.page__content');
    if (pageContent) {
      pageContent.innerHTML = '';
    }
  }

  drawGamesCards() {
    const pageContent = document.querySelector('.page__content');
    const games = document.createElement('div');
    games.className = 'games';
    pageContent?.append(games);

    GameCardView.drawGameCard('audiocall', 'Аудиовызов', audiocallDescription);
    GameCardView.drawGameCard('sprint', 'Спринт', sprintDescription);
  }

  addHandlersToChooseGame() {
    document.querySelectorAll<HTMLButtonElement>('.game__button_card')?.forEach((button) => {
      button.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement;
        this.state.game = target.id;
        this.clearPageContent();
        this.levels.drawGameLevels();
        this.addHandlersToBack();
        this.addHandlersToStart();
      });
    });
  }

  addHandlersToBack() {
    document.querySelector('.game__button_back')?.addEventListener('click', () => {
      this.clearPageContent();
      this.drawGamesCards();
      this.addHandlersToChooseGame();
    });
    console.log(document.querySelector('.game__button_start'));
  }

  addHandlersToStart() {
    document.querySelector('.game__button_start')?.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      this.clearPageContent();
      if (target.id === 'sprint') {
        this.drawGameSprint();
      }
      if (target.id === 'audiocall') {
        this.drawGameAudioCall();
      }
    });
  }

  drawGameAudioCall() {
    AudioCall.drawAudioCall();
  }

  drawGameSprint() {
    SprintView.drawSprintGameView();
  }
}
