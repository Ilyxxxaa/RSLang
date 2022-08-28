import Menu from './pages/main/menu';
import AuthorizationHandlers from './pages/main/authorization/authApp';
import State from './types/state';
import Header from './pages/main/header';
import MainPage from './pages/main/mainPage';
import GamesController from './pages/games/gamesController';
import Statistics from './pages/stats/statistics';
import Book from './pages/book/book';

import './pages/main/styles/main.scss';
import Footer from './pages/main/footer';
// import './pages/games/styles/games.scss';

class App {
  state: State;

  menu: Menu;

  authorization: AuthorizationHandlers;

  header: Header;

  mainPage: MainPage;

  games: GamesController;

  statistics: Statistics;

  book: Book;

  footer: Footer;

  constructor() {
    this.state = {
      isAuthorized: false,
      name: '',
      userId: '',
      token: '',
      refreshToken: '',
      view: 'main',
      game: '',
      level: '',
    };
    this.menu = new Menu();
    this.header = new Header();
    this.authorization = new AuthorizationHandlers(this.state);
    this.mainPage = new MainPage();
    this.games = new GamesController(this.state);
    this.statistics = new Statistics();
    this.book = new Book();
    this.footer = new Footer();
  }

  start() {
    this.menu.drawMenu();
    this.addListenersToMenuButtons();
    this.header.drawHeader();
    this.authorization.addAuthHandlers();
    this.mainPage.drawMainPage();
    this.footer.drawFooter();
  }

  addListenersToMenuButtons() {
    this.menu.menuItemMain.addEventListener('click', () => {
      const content: HTMLDivElement | null = document.querySelector('.content'); // нужно возвращать фон заново
      if (content) content.style.background = 'url("../assets/images/header-bg.png")'; // не знаю как лучше реализовать

      if (this.state.view !== 'main') {
        this.state.view = 'main';

        this.menu.clearAllActiveButtons();
        this.menu.menuItemMain.classList.add('menu__list-item--active');

        const nav = document.querySelector('.nav');
        if (nav) {
          nav.classList.remove('hide');
        }
        this.mainPage.drawMainPage();
        this.footer.drawFooter();
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
        this.games.clearPageContent();
        this.games.drawGamesCards();
        this.games.addHandlersToChooseGame();
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
        this.footer.drawFooter();
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
        this.book.drawBook();
        this.footer.drawFooter();
      }
    });
  }
}

const app = new App();
app.start();
