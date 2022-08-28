import updateCards from './bookVIew';
import currentWords from './bookState';
import { levelsName, levelColors, createElement } from './utils';

function choseWordLevel(element: HTMLElement, i: number) {
  currentWords.currentLevel = i;
  const buttonLevel = <HTMLElement>element;
  console.log(buttonLevel);

  document.querySelectorAll('.level-button').forEach((el) => el.classList.add('unactive-level'));

  buttonLevel.classList.remove('unactive-level');

  const level = i;
  updateCards(level, currentWords.currentPage);
}

export default function drawLevelsBlock() {
  const levelsContainer = createElement('div', 'levels-container');

  for (let i = 0; i <= 5; i += 1) {
    let difficulty = '';
    switch (i) {
      case 1: case 0:
        difficulty = 'EASY';
        break;
      case 2: case 3:
        difficulty = 'MEDIUM';
        break;
      default:
        difficulty = 'HARD';
        break;
    }
    const levelButton = document.createElement('button');
    levelButton.classList.add('level-button');
    if (+currentWords.currentLevel !== i) levelButton.classList.add('unactive-level');
    levelButton.type = 'button';
    levelButton.innerHTML = `
      <div class="level-button-left">
        <h2>${difficulty}</h2>
      </div>
      <div class="level-button-right">
        <h2>${levelsName[i]}</h2>
      </div>
      <div class="level-circle" style=" background : ${levelColors[i]}"></div>`;

    levelButton.classList.add(`level-${i}-button`);
    levelsContainer.append(levelButton);
    levelButton.addEventListener('click', () => choseWordLevel(levelButton, i));
  }

  return levelsContainer;
}
