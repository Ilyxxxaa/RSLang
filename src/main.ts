import Menu from './pages/main/menu';
import Authorization from './pages/main/authorization/authApp';
import State from './types/state';
import Header from './pages/main/header';
import MainPage from './pages/main/mainPage';
import Games from './pages/games/games';
import Statistics from './pages/stats/statistics';

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

  constructor() {
    this.state = {
      name: 'Ilya',
      view: 'main',
    };
    this.menu = new Menu();
    this.header = new Header();
    this.authorization = new Authorization();
    this.mainPage = new MainPage();
    this.games = new Games();
    this.statistics = new Statistics();
  }

  start() {
    this.menu.drawMenu();
    this.addListenersToMenuButtons();
    this.header.drawHeader(this.state);
    Authorization.addAuthHandlers();
    this.mainPage.drawMainPage();
  }

  addListenersToMenuButtons() {
    this.menu.menuItemMain.addEventListener('click', () => {
      if (this.state.view !== 'main') {
        this.state.view = 'main';

        this.menu.clearAllActiveButtons();
        this.menu.menuItemMain.classList.add('menu__list-item--active');

        this.header.drawHeader(this.state);
        this.mainPage.drawMainPage();
        console.log(this.state);
      }
    });

    this.menu.menuItemGames.addEventListener('click', () => {
      if (this.state.view !== 'games') {
        this.state.view = 'games';

        this.menu.clearAllActiveButtons();
        this.menu.menuItemGames.classList.add('menu__list-item--active');

        this.header.drawHeader(this.state);
        this.games.drawGames();
        console.log(this.state);
      }
    });

    this.menu.menuItemStats.addEventListener('click', () => {
      if (this.state.view !== 'statistics') {
        this.state.view = 'statistics';

        this.menu.clearAllActiveButtons();
        this.menu.menuItemStats.classList.add('menu__list-item--active');

        this.header.drawHeader(this.state);
        this.statistics.drawStatistics();
        console.log(this.state);
      }
    });
  }
}

const app = new App();
app.start();
