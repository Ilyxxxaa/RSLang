import State from '../../../types/state';
import './_sprintModal.scss';

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
    sprintModalClose.src = './assets/images/cancel.png';

    const sprintModalText = document.createElement('p');
    sprintModalText.className = 'sprint-modal__title';
    sprintModalText.textContent = 'Игра не закончена!';

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'sprint-modal__buttons';

    const buttonClose = document.createElement('button');
    buttonClose.className = 'sprint-modal__button sprint-modal__button_close';
    buttonClose.textContent = 'закрыть игру';

    const buttonContinue = document.createElement('button');
    buttonContinue.className = 'sprint-modal__button sprint-modal__button_continue';
    buttonContinue.textContent = 'продолжить';

    buttonContainer.append(buttonClose, buttonContinue);
    sprintModal.append(sprintModalClose, sprintModalText, buttonContainer);
    sprintModalWindow.append(modalOverlay, sprintModal);

    document.querySelector('body')?.append(sprintModalWindow);
  }
}

export default SprintModal;
