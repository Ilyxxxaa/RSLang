import './styles/games.scss';

export default class Games {
  games: HTMLElement = document.createElement('div');

  drawGames() {
    const pageContent = document.querySelector('.page__content');
    this.createGames();
    if (pageContent) {
      pageContent.innerHTML = '';
      pageContent.append(this.games);
    }
  }

  createGames() {
    this.games.classList.add('games');
    this.games.textContent = 'Тут будут игры';
  }
}
