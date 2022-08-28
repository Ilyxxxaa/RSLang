class GameCardView {
  static drawGameCard(name: string, title: string, description: string) {
    const gameContainer = document.createElement('div');
    gameContainer.className = `game game_${name}`;

    const gameTitle = document.createElement('h3');
    gameTitle.className = `game__title game__title_${name}`;
    gameTitle.textContent = title;

    const gameDescription = document.createElement('p');
    gameDescription.className = 'description';
    gameDescription.textContent = description;

    const gameButton = document.createElement('button');
    gameButton.className = `game__button game__button_card game__button_${name}`;
    gameButton.id = name;
    gameButton.textContent = 'играть';

    gameContainer.append(gameTitle, gameDescription, gameButton);
    document.querySelector('.games')?.append(gameContainer);
  }
}

export default GameCardView;
