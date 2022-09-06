export const baseLink = 'https://serverforrslang.herokuapp.com';
export const signUpLink = `${baseLink}/users`;
export const signInLink = `${baseLink}/signin`;

export const audiocallDescription = '<p>Улучшает восприятие речи на слух. Используй мышь, чтобы выбрать. Используй цифровые клавиши от 1 до 5 для выбора ответа. Используй пробел для повтроного звучания слова. Используй клавишу Enter для перехода к следующему слову</p>';

export const sprintDescription = '<p>Тренировка Спринт поможет тебе проверить знаешь ли ты правильный перевод.Игра длится 20 секунд или пока не закончатся слова. Чтобы дать ответ, кликай по нему мышкой или нажимай клавиши-стрелки. Получай баллы за 3 верных ответа подряд</p>';

export const PAGE_COUNTS = 30;
export const WORDS_PER_PAGE = 20;

export const stateSprintDefault = {
  pointsScored: 0,
  pointsPerWord: 10,
  countRightAnswers: 0,
  wordsForGame: [],
  rightAnswers: [],
  wrongAnswers: [],
  countRightAnswersInARow: 0,
};
