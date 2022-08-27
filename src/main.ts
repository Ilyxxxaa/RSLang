import Menu from './pages/main/menu';
import Authorization from './pages/main/authorization/authApp';
import State, { Game } from './types/state';
import Header from './pages/main/header';
import MainPage from './pages/main/mainPage';
import Games from './pages/games/games';
import Statistics from './pages/stats/statistics';
import { Dictionary } from './pages/dictionary/dictionary';

import './pages/main/styles/main.scss';
// import './pages/games/styles/games.scss';

class App {
  state: State;

  menu: Menu;

  authorization: Authorization;

  header: Header;

  mainPage: MainPage;

  games: Games;

  statistics: Statistics;

  dictionary: Dictionary;

  constructor() {
    this.state = {
      name: 'Ilya',
      view: 'main',
      game: Game.sprint,
      level: 'A1',
    };
    this.menu = new Menu();
    this.header = new Header();
    this.authorization = new Authorization();
    this.mainPage = new MainPage();
    this.games = new Games();
    this.statistics = new Statistics();
    this.dictionary = new Dictionary();
  }

  start() {
    this.menu.drawMenu();
    this.addListenersToMenuButtons();
    this.header.drawHeader();
    Authorization.addAuthHandlers();
    this.mainPage.drawMainPage();
  }

  addListenersToMenuButtons() {
    this.menu.menuItemMain.addEventListener('click', () => {
      if (this.state.view !== 'main') {
        this.state.view = 'main';

        this.menu.clearAllActiveButtons();
        this.menu.menuItemMain.classList.add('menu__list-item--active');

        const nav = document.querySelector('.nav');
        if (nav) {
          nav.classList.remove('hide');
        }
        this.mainPage.drawMainPage();
      }
    });

    this.menu.menuItemGames.addEventListener('click', () => {
      if (this.state.view !== 'games') {
        this.state.view = 'games';

        this.menu.clearAllActiveButtons();
        this.menu.menuItemGames.classList.add('menu__list-item--active');

        const nav = document.querySelector('.nav');
        if (nav) {
          nav.classList.add('hide');
        }
        this.games.drawGames();
        (document.querySelector('.content') as HTMLElement).style.background = '#a198db';
      }
    });

    this.menu.menuItemStats.addEventListener('click', () => {
      if (this.state.view !== 'statistics') {
        this.state.view = 'statistics';

        this.menu.clearAllActiveButtons();
        this.menu.menuItemStats.classList.add('menu__list-item--active');

        const nav = document.querySelector('.nav');
        if (nav) {
          nav.classList.add('hide');
        }
        this.statistics.drawStatistics();
      }
    });

    this.menu.menuItemBook.addEventListener('click', () => {
      if (this.state.view !== 'book') {
        this.state.view = 'book';

        this.menu.clearAllActiveButtons();
        this.menu.menuItemBook.classList.add('menu__list-item--active');

        const nav = document.querySelector('.nav');
        if (nav) {
          nav.classList.add('hide');
        }
        this.dictionary.drawDictionary();
      }
    });
  }
}

const app = new App();
app.start();
