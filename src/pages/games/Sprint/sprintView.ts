import './sprint.scss';

class SprintView {
  static drawSprintGameView() {
    const pageContent = document.querySelector('.page__content') as HTMLElement;
    pageContent.innerHTML = '';

    const sprintContainer = document.createElement('div');
    sprintContainer.className = 'sprint';

    const sprintScore = document.createElement('div');
    sprintScore.className = 'sprint__score';

    const sprintGame = document.createElement('div');
    sprintGame.className = 'sprint__game';

    const checkbox = document.createElement('div');
    checkbox.className = 'sprint__checkbox';

    const checkboxItem1 = document.createElement('div');
    checkboxItem1.className = 'checkbox__item';

    const checkboxItem2 = document.createElement('div');
    checkboxItem2.className = 'checkbox__item';

    const checkboxItem3 = document.createElement('div');
    checkboxItem3.className = 'checkbox__item';

    const word = document.createElement('div');
    word.className = 'word word_en';
    word.textContent = 'sunrise';

    const translate = document.createElement('div');
    translate.className = 'word word__ru';
    translate.textContent = 'восход солнца';

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button__container';

    const buttonFalse = document.createElement('button');
    buttonFalse.className = 'button button_false';
    buttonFalse.textContent = 'неверно';

    const buttonTrue = document.createElement('button');
    buttonTrue.className = 'button button_true';
    buttonTrue.textContent = 'верно';

    sprintContainer.append(sprintGame);
    checkbox.append(checkboxItem1, checkboxItem2, checkboxItem3);
    buttonContainer.append(buttonFalse, buttonTrue);
    sprintGame.append(checkbox, word, translate, buttonContainer);
    pageContent.append(sprintContainer);
  }
}

export default SprintView;
