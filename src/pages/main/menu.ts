export default class Menu {
  menu: HTMLElement = document.createElement('div');

  menuList: HTMLElement = document.createElement('div');

  menuTitle: HTMLButtonElement = document.createElement('button');

  menuItemMain: HTMLButtonElement = document.createElement('button');

  menuItemBook: HTMLButtonElement = document.createElement('button');

  menuItemGames: HTMLButtonElement = document.createElement('button');

  menuItemStats: HTMLButtonElement = document.createElement('button');

  menuItemLogout: HTMLButtonElement = document.createElement('button');

  content: HTMLElement = document.createElement('div');

  pageContent: HTMLElement = document.createElement('div');

  headerContent: HTMLElement = document.createElement('div');

  drawMenu() {
    this.createMenu();
    this.createContent();
    const body = document.querySelector('body');
    body?.append(this.menu, this.content);
    this.menuStart();
  }

  createContent() {
    this.content.classList.add('content');
    this.headerContent.classList.add('header__content');
    this.pageContent.classList.add('page__content');
    this.content.append(this.headerContent, this.pageContent);
  }

  createMenu() {
    this.createMenuTitle();
    this.createMenuList();
    this.menu.classList.add('menu');
    this.menu.append(this.menuTitle, this.menuList);
  }

  createMenuTitle() {
    this.menuTitle.classList.add('menu__title');
    this.menuTitle.innerHTML = `
    <div class="menu__title-img"><img src="./assets/images/menu-icon.svg" alt="menu-icon"></div>
    <div class="menu__title-name">Меню</div>
    `;
  }

  createMenuList() {
    this.menuList.classList.add('menu__list');
    this.createMenuButtons();
    this.menuList.append(
      this.menuItemMain,
      this.menuItemBook,
      this.menuItemGames,
      this.menuItemStats,
      this.menuItemLogout,
    );
  }

  createMenuButtons() {
    this.createMenuItemMainBtn();
    this.createMenuItemBookBtn();
    this.createMenuItemGamesBtn();
    this.createMenuItemStatsBtn();
    this.createMenuItemLogoutBtn();
  }

  createMenuItemMainBtn() {
    this.menuItemMain.classList.add('menu__list-item', 'menuItemMain', 'menu__list-item--active');
    this.menuItemMain.innerHTML = ` <div class="menu__list-item-img"><img src="./assets/images/home-icon.svg" alt="main-icon"></div>
    <div class="menu__list-item-name">Главная</div>`;
  }

  createMenuItemBookBtn() {
    this.menuItemBook.classList.add('menu__list-item', 'menuItemBook');
    this.menuItemBook.innerHTML = ` <div class="menu__list-item-img"><img src="./assets/images/book-icon.svg" alt="main-icon"></div>
    <div class="menu__list-item-name">Словарь</div>`;
  }

  createMenuItemGamesBtn() {
    this.menuItemGames.classList.add('menu__list-item', 'menuItemGames');
    this.menuItemGames.innerHTML = `<div class="menu__list-item-img"><img src="./assets/images/game-icon.svg" alt="game-icon"></div>
    <div class="menu__list-item-name">Игры</div>`;
  }

  createMenuItemStatsBtn() {
    this.menuItemStats.classList.add('menu__list-item', 'menuItemStats');
    this.menuItemStats.innerHTML = `<div class="menu__list-item-img"><img src="./assets/images/stats-icon.svg" alt="stats-icon"></div>
    <div class="menu__list-item-name">Статистика</div>`;
  }

  createMenuItemLogoutBtn() {
    this.menuItemLogout.classList.add('menu__list-item', 'menuItemLogout');
    this.menuItemLogout.innerHTML = `<div class="menu__list-item-img"><img src="./assets/images/logout-icon.svg" alt="logout-icon"></div>
    <div class="menu__list-item-name">Выйти</div>`;
  }

  menuStart() {
    this.menuTitle.addEventListener('click', () => {
      const menuImage = this.menuTitle.querySelector('img');
      if (menuImage) {
        if (this.menu.classList.contains('menu--enabled')) {
          this.menu.classList.remove('menu--enabled');
          menuImage.src = './assets/images/menu-icon.svg';
        } else {
          this.menu.classList.add('menu--enabled');
          menuImage.src = './assets/images/cross-icon.svg';
        }
      }
    });
  }

  clearAllActiveButtons() {
    this.menuItemMain.classList.remove('menu__list-item--active');
    this.menuItemBook.classList.remove('menu__list-item--active');
    this.menuItemGames.classList.remove('menu__list-item--active');
    this.menuItemStats.classList.remove('menu__list-item--active');
  }
}
