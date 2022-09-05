/* eslint-disable import/no-cycle */
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
        this.state.gameInit = 'menu';
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
        console.log('level:', this.state.gameLevel);
        console.log('page:', this.state.gamePage);
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

  addHandlersToStartGameFromBook() {
    document.querySelector('.button-to-sprint')?.addEventListener('click', () => {
      this.state.gameInit = 'book';
      this.state.game = 'sprint';
      if (localStorage.getItem('currentLevel') && localStorage.getItem('currentPage')) {
        // this.state.gameLevel = Number(localStorage.getItem('currentBookLevel'));
        // this.state.gamePage = Number(localStorage.getItem('currentBookPage'));
      }
      (document.querySelector('.page__content') as HTMLElement).innerHTML = '';
      this.drawGameSprint(this.state.gamePage, this.state.gameLevel);
    });
  }

  drawGameAudioCall() {
    this.audioCall.drawAudioCall();
  }

  async drawGameSprint(page: number, level: number) {
    this.sprint.helper(page, level).then(() => {
      this.sprint.drawSprintView();
      this.sprint.setRandomWord();
    });
  }
}
