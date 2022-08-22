import { createElement } from "./dictionaryVIew";
import { updateCards } from "./dictionaryVIew";

import { currentWords } from "./dictionaryVIew";

const groupColors = ['#30e976', '#e6e930', '#e97e30', '#e93030', '#0095ff', '#0012ff', '#ff00aa'];


export function drawGroupsBlock() {
  const groupsContainer = createElement('div', 'groups-container');
  for (let i = 1; i <= 6; i++) {
    const groupButton = createElement('button', 'group-button');
    groupButton.classList.add(`group-${i}-button`);
    groupButton.innerHTML = `${i}`;
    groupsContainer.append(groupButton);
    groupButton.style.backgroundColor = groupColors[i - 1];

    groupButton.addEventListener('click', (e) => choseWordGroup(e, groupButton));
  }

  return groupsContainer;
}

function choseWordGroup(e: MouseEvent, element: HTMLElement) {
  const buttonGroup = <HTMLElement>e.target;

  if (buttonGroup.classList.contains('active-group')) return;
  document.querySelectorAll('.active-group').forEach(el => el.classList.remove('active-group'))
  buttonGroup.classList.add('active-group');

  const group = +buttonGroup.innerText - 1;

  updateCards(group, +currentWords.currentPage);
}