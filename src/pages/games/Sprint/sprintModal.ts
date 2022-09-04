import State from '../../../types/state';
import './_sprintModal.scss';
import './_sprint.scss';

class SprintModal {
  state: State;

  constructor(state: State) {
    this.state = state;
  }

  static drawSprintInModal() {
    const sprintModalWindow = document.createElement('div');
    sprintModalWindow.className = 'sprint-modal hidden';

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'sprint-modal__overlay';

    const sprintModal = document.createElement('div');
    sprintModal.className = 'sprint-modal__stop';

    const sprintModalClose = document.createElement('img');
    sprintModalClose.className = 'sprint-modal__close';
    sprintModalClose.alt = 'cancel';
    sprintModalClose.src = '../assets/images/cancel.png';

    const sprintModalText = document.createElement('p');
    sprintModalText.className = 'sprint-modal__title';
    sprintModalText.textContent = 'Игра не закончена!\n Если вы закроете игру, ваши результаты обнулятся';

    const buttonClose = document.createElement('button');
    buttonClose.className = 'sprint__button sprint__button_close';
    buttonClose.textContent = 'закрыть игру';

    const buttonContinue = document.createElement('button');
    buttonContinue.className = 'sprint__button sprint__button_continue';
    buttonContinue.textContent = 'продолжить';

    sprintModal.append(sprintModalClose, sprintModalText, buttonClose, buttonContinue);
    sprintModalWindow.append(modalOverlay, sprintModal);

    document.querySelector('body')?.append(sprintModalWindow);
  }
}

export default SprintModal;
