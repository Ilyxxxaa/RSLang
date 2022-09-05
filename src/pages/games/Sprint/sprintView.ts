import State from '../../../types/state';
import './_sprint.scss';

class SprintView {
  state: State;

  constructor(state: State) {
    this.state = state;
  }

  drawSprintGameView() {
    const rightAnswerAudio = document.createElement('audio');
    rightAnswerAudio.className = 'sprint-audio_right';
    rightAnswerAudio.src = './assets/images/sounds/rightAnswerAudio.mp3';

    const wrongAnswerAudio = document.createElement('audio');
    wrongAnswerAudio.className = 'sprint-audio_wrong';
    wrongAnswerAudio.src = './assets/images/sounds/wrongAnswerAudio.mp3';

    const increasePointsAudio = document.createElement('audio');
    increasePointsAudio.className = 'sprint-audio_points';
    increasePointsAudio.src = './assets/images/sounds/line_open.mp3';

    const pageContent = document.querySelector('.page__content') as HTMLElement;
    pageContent.innerHTML = '';

    const sprintContainer = document.createElement('div');
    sprintContainer.className = 'sprint';

    const clockImage = document.createElement('img');
    clockImage.className = 'alarm-clock';
    clockImage.alt = 'alarm-clock';
    clockImage.src = './assets/images/alarm-clock.png';

    const countDown = document.createElement('div');
    countDown.className = 'sprint__countdown';
    countDown.textContent = '60';

    const sprintClose = document.createElement('img');
    sprintClose.className = 'sprint__close';
    sprintClose.alt = 'cancel';
    sprintClose.src = './assets/images/cancel.png';

    const sprintUnmute = document.createElement('img');
    sprintUnmute.className = 'sprint__unmute';
    sprintUnmute.alt = 'unmute';
    sprintUnmute.src = './assets/images//music.png';

    const sprintMute = document.createElement('img');
    sprintMute.className = 'sprint__mute hidden';
    sprintMute.alt = 'mute';
    sprintMute.src = './assets/images//mute.png';

    const sprintScore = document.createElement('div');
    sprintScore.className = 'sprint__score';
    sprintScore.textContent = '0';

    const sprintGame = document.createElement('div');
    sprintGame.className = 'sprint__game';

    const audioImage = document.createElement('img');
    audioImage.className = 'sprint__audio';
    audioImage.alt = 'audio';
    audioImage.src = './assets/images//audio-icon.svg';

    const checkbox = document.createElement('div');
    checkbox.className = 'sprint__checkbox';

    const checkboxItem1 = document.createElement('div');
    checkboxItem1.className = 'checkbox__item';

    const checkboxItem2 = document.createElement('div');
    checkboxItem2.className = 'checkbox__item';

    const checkboxItem3 = document.createElement('div');
    checkboxItem3.className = 'checkbox__item';

    const sprintPoints = document.createElement('div');
    sprintPoints.className = 'sprint__points';
    sprintPoints.textContent = '+10 очков за слово';

    const word = document.createElement('div');
    word.className = 'word word_en';

    const translate = document.createElement('div');
    translate.className = 'word word_ru';

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button__container';

    const buttonFalse = document.createElement('button');
    buttonFalse.className = 'sprint__button sprint__button_false';
    buttonFalse.value = 'false';
    buttonFalse.textContent = 'неверно';

    const buttonTrue = document.createElement('button');
    buttonTrue.className = 'sprint__button sprint__button_true';
    buttonTrue.value = 'true';
    buttonTrue.textContent = 'верно';

    sprintContainer.append(rightAnswerAudio, wrongAnswerAudio, increasePointsAudio);
    sprintContainer.append(sprintMute, sprintUnmute);
    sprintContainer.append(clockImage, countDown, sprintClose, sprintScore, sprintGame);
    checkbox.append(checkboxItem1, checkboxItem2, checkboxItem3);
    buttonContainer.append(buttonFalse, buttonTrue);
    sprintGame.append(checkbox, audioImage, sprintPoints, word, translate, buttonContainer);
    pageContent.append(sprintContainer);
  }
}

export default SprintView;
