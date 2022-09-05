import Menu from './pages/main/menu';
import { addAuthHandlers } from './pages/main/authorization/authApp';
import State from './types/state';
import Header from './pages/main/header';
import MainPage from './pages/main/mainPage';
import Games from './pages/games/games';
import Statistics from './pages/stats/statistics';
import Book from './pages/book/book';
import './pages/main/styles/main.scss';
import Footer from './pages/main/footer';
import Utils from './common/utils';

import { createHardWord } from './common/apiRequests';

class App {
  state: State;

  menu: Menu;

  header: Header;

  mainPage: MainPage;

  games: Games;

  statistics: Statistics;

  book: Book;

  footer: Footer;

  constructor() {
    this.state = {
      view: localStorage.getItem('currentView') || 'main',
      game: '',
      gameInit: 'menu',
      gamePage: 0,
      gameLevel: 0,
      sprint: {
        pointsScored: 0,
        pointsPerWord: 10,
        countRightAnswers: 0,
        wordsForGame: [],
        rightAnswers: [],
        wrongAnswers: [],
        countRightAnswersInARow: 0,
      },
    };
    this.menu = new Menu();
    this.header = new Header();
    this.mainPage = new MainPage();
    this.games = new Games(this.state);
    this.statistics = new Statistics();
    this.book = new Book();
    this.footer = new Footer();
  }

  start() {
    this.menu.drawMenu();
    this.addListenersToMenuButtons();
    this.header.drawHeader();
    addAuthHandlers();
    this.games.addHandlersToStartGameFromBook();

    if (this.state.view === 'main') this.renderMainPage();
    if (this.state.view === 'games') this.renderGamesPage();
    if (this.state.view === 'statistics') this.renderStatisticsPage();
    if (this.state.view === 'book') this.renderBookPage();
  }

  addListenersToMenuButtons() {
    this.menu.menuItemMain.addEventListener('click', () => {
      if (this.state.view !== 'main') {
        this.state.view = 'main';
        localStorage.setItem('currentView', 'main');

        this.renderMainPage();
        this.menu.closeMenu();

        console.log(this.state);
      }
    });

    this.menu.menuItemGames.addEventListener('click', () => {
      if (this.state.view !== 'games') {
        this.state.view = 'games';
        localStorage.setItem('currentView', 'games');

        this.renderGamesPage();
        this.menu.closeMenu();
      }
    });

    this.menu.menuItemStats.addEventListener('click', () => {
      if (this.state.view !== 'statistics') {
        this.state.view = 'statistics';
        localStorage.setItem('currentView', 'statistics');

        this.renderStatisticsPage();
        this.menu.closeMenu();
      }
    });

    this.menu.menuItemBook.addEventListener('click', () => {
      if (this.state.view !== 'book') {
        this.state.view = 'book';
        localStorage.setItem('currentView', 'book');

        this.renderBookPage();
        this.menu.closeMenu();
      }
    });
  }

  renderMainPage = () => {
    this.menu.clearAllActiveButtons();

    const content: HTMLDivElement | null = document.querySelector('.content');
    if (content) content.style.background = 'url("../assets/images/content-bg.png") no-repeat';

    const nav = document.querySelector('.nav');
    if (nav) {
      nav.classList.remove('hide');
    }

    this.mainPage.drawMainPage();

    const startLearnButton = document.querySelector('.about__info-btn');
    if (startLearnButton) {
      startLearnButton.addEventListener('click', () => {
        this.state.view = 'book';
        localStorage.setItem('currentView', 'book');
        this.renderBookPage();
      });
    }

    this.footer.drawFooter();
    this.menu.menuItemMain.classList.add('menu__list-item--active');
  };

  renderGamesPage = () => {
    this.menu.clearAllActiveButtons();

    const nav = document.querySelector('.nav');
    if (nav) {
      nav.classList.add('hide');
    }

    this.games.clearPageContent();
    this.games.drawGamesCards();
    this.games.addHandlersToChooseGame();
    (document.querySelector('.content') as HTMLElement).style.background = '#a198db';
    this.menu.menuItemGames.classList.add('menu__list-item--active');
  };

  renderStatisticsPage = () => {
    this.menu.clearAllActiveButtons();

    const nav = document.querySelector('.nav');
    if (nav) {
      nav.classList.add('hide');
    }

    this.statistics.drawStatistics();
    this.footer.drawFooter();
    this.menu.menuItemStats.classList.add('menu__list-item--active');
  };

  renderBookPage = () => {
    this.menu.clearAllActiveButtons();

    const nav = document.querySelector('.nav');
    if (nav) {
      nav.classList.add('hide');
    }

    this.book.drawBook();
    this.footer.drawFooter();
    this.menu.menuItemBook.classList.add('menu__list-item--active');
  };
}

const app = new App();
app.start();
Utils.smoothScroll();
