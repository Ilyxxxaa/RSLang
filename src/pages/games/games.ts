import { audiocallDescription, sprintDescription, PAGE_COUNTS } from '../../const';
import GameCardView from './gameCardView';
import GameLevels from './gameLevels';
import State from '../../types/state';
import Sprint from './Sprint/sprint';
import AudioCall from './AudioCall/audioCall';
import getRandomNumber from './random';
import './styles/games.scss';

export default class Games {
  state: State;

  levels: GameLevels;

  sprint: Sprint;

  audioCall: AudioCall;

  constructor(state: State) {
    this.state = state;
    this.levels = new GameLevels(state);
    this.sprint = new Sprint(state);
    this.audioCall = new AudioCall(state);
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
        this.addHandlersToChooseLevel();
      });
    });
  }

  addHandlersToChooseLevel() {
    document.querySelectorAll<HTMLElement>('.level').forEach((level, index) => {
      level.addEventListener('click', (event: Event) => {
        document.querySelectorAll<HTMLElement>('.level').forEach((elem) => {
          elem.classList.remove('level_active');
        });

        const target = event.target as HTMLElement;
        target.classList.add('level_active');

        (document.querySelector('.game__button_start') as HTMLButtonElement)?.removeAttribute(
          'disabled',
        );

        this.state.gameLevel = index;
        this.state.gamePage = getRandomNumber(0, PAGE_COUNTS - 1);
      });
    });
  }

  addHandlersToBack() {
    document.querySelector('.game__button_back')?.addEventListener('click', () => {
      this.clearPageContent();
      this.drawGamesCards();
      this.addHandlersToChooseGame();
    });
  }

  addHandlersToStart() {
    document.querySelector('.game__button_start')?.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      this.clearPageContent();
      if (target.id === 'sprint') {
        this.state.game = target.id;
        this.drawGameSprint(this.state.gamePage, this.state.gameLevel);
      }
      if (target.id === 'audiocall') {
        this.drawGameAudioCall();
      }
    });
  }

  drawGameAudioCall() {
    this.audioCall.drawAudioCall(this.state.gameLevel);
  }

  async drawGameSprint(page: number, level: number) {
    this.sprint.getWordsForGame(page, level).then(() => {
      this.sprint.drawSprintView();
      this.sprint.setRandomWord();
    });
  }
}
