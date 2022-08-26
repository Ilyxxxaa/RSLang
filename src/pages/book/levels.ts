import { createElement } from "./bookVIew";
import { updateCards } from "./bookVIew";
import { currentWords } from "./book";

const levelColors = ['#30e976', '#e6e930', '#e97e30', '#e93030', '#0095ff', '#0012ff', '#ff00aa'];
const levelsName = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const levelsColors = ['blue', 'yellow', 'red', 'green', 'pink', 'aqua']


export function drawLevelsBlock() {
  const levelsContainer = createElement('div', 'levels-container');

  for (let i = 0; i <= 5; i++) {
    const difficulty = (i == 1 || i == 0) ? 'EASY' : (i == 2 || i == 3) ? 'MEDIUM' : 'HARD';
    const levelButton = document.createElement('button');
    levelButton.classList.add('level-button');
    levelButton.classList.add('unactive-level');
    levelButton.type = 'button';
    levelButton.innerHTML = `
      <div class="level-button-left">
        <h2>${difficulty}</h2>
      </div>
      <div class="level-button-right">
        <h2>${levelsName[i]}</h2>
      </div>
      <div class="level-circle" style=" background : ${levelColors[i]}"></div>`;
    // <div class="level-circle" style=" background : ${levelColors[i]}"></div>`;

    levelButton.classList.add(`level-${i}-button`);
    levelsContainer.append(levelButton);
    // levelButton.style.backgroundColor = levelColors[i];
    levelButton.addEventListener('click', () => choseWordlevel(levelButton, i));
  }

  return levelsContainer;
}

function choseWordlevel(element: HTMLElement, i: number) {
  const buttonLevel = <HTMLElement>element;
  console.log(buttonLevel);

  document.querySelectorAll('.level-button').forEach(el => el.classList.add('unactive-level'));

  buttonLevel.classList.remove('unactive-level');

  const level = i;
  updateCards(level, +currentWords.currentPage);
}