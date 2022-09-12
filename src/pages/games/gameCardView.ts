class GameCardView {
  static drawGameCard(name: string, title: string, description: string, url: string) {
    const gameContainer = document.createElement('div');
    gameContainer.className = `game game_${name}`;

    const gameCardImg = document.createElement('img');
    gameCardImg.className = 'game__image';
    gameCardImg.src = url;
    gameCardImg.alt = 'game-image';

    const gameTitle = document.createElement('p');
    gameTitle.className = `game__title game__title_${name}`;
    gameTitle.textContent = title;

    const gameDescription = document.createElement('p');
    gameDescription.className = 'description';
    gameDescription.innerHTML = description;

    const gameButton = document.createElement('button');
    gameButton.className = `game__button game__button_card game__button_${name}`;
    gameButton.id = name;
    gameButton.textContent = 'Играть';

    gameContainer.append(gameTitle, gameCardImg, gameDescription, gameButton);
    document.querySelector('.games')?.append(gameContainer);
  }
}

export default GameCardView;
