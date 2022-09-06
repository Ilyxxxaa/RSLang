import { stat } from 'fs';
import { fixOverlay, showAuthModal, signUp } from '../main/authorization/authFunc';

export default class StatisticsView {
  constructror() {}

  statContainer = document.createElement('div');

  noAuthUserBlock = document.createElement('div');

  statBlock = document.createElement('div');

  statTodayContainer = document.createElement('div');

  wordsResultsContainer = document.createElement('div');

  learnedWords = document.createElement('div');

  drawStatContainer() {
    this.statContainer.classList.add('stat__container');
    this.createStatContainer();

    const pageContent = document.querySelector('.page__content');
    if (pageContent) {
      pageContent.innerHTML = '';
      pageContent.append(this.statContainer);
    }
  }

  createStatContainer() {
    this.statContainer.innerHTML = '';
    const token = localStorage.getItem('token');
    if (token) {
      this.createStatBlock();
      this.statContainer.append(this.statBlock);
    } else {
      this.createNoAuthUserBlock();
      this.statContainer.append(this.noAuthUserBlock);
    }
  }

  createNoAuthUserBlock() {
    this.noAuthUserBlock.innerHTML = '';
    this.noAuthUserBlock.classList.add('stat__noAuthBlock');
    const title = document.createElement('div');
    title.textContent = 'Статистика недоступна';
    title.classList.add('stat__noAuthBlock-title');

    title.textContent = 'Статистика недоступна';
    const text = document.createElement('div');
    text.textContent =
      'Статистика доступна только для авторизованных пользователей. Зарегестрируйся - и оцени полный функционал приложения!';
    text.classList.add('stat__noAuthBlock-text');

    const button = document.createElement('button');
    button.classList.add('stat__noAuthBlock-button');
    button.textContent = 'Регистрация';
    button.addEventListener('click', () => {
      document.querySelector('.modal__signup')?.classList.remove('hidden');
      fixOverlay();
    });
    this.noAuthUserBlock.append(title, text, button);
  }

  createStatBlock() {
    this.statBlock.innerHTML = '';
    this.statBlock.classList.add('stat__block');
    // const title = document.createElement('div');
    // title.textContent = 'Статистика ';
    // title.classList.add('stat__block-title');

    this.createStatToday();

    this.statBlock.append(this.statTodayContainer);
  }

  createStatToday() {
    this.statTodayContainer.innerHTML = '';
    this.statTodayContainer.classList.add('stat__today');

    const title = document.createElement('div');
    title.textContent = 'Статистика за сегодня ';
    title.classList.add('stat__today-title');

    this.createWordResultsContainer();

    this.statTodayContainer.append(title, this.wordsResultsContainer);
  }

  createWordResultsContainer() {
    this.wordsResultsContainer.classList.add('stat__wordsResultContainer');

    const learnedWordsContainer = document.createElement('div');
    learnedWordsContainer.classList.add('stat__learnedWordsContainer');
    const text = document.createElement('div');
    text.textContent = 'слов изучено';

    this.learnedWords.classList.add('stat__learnedWords');
    this.learnedWords.textContent = '0';

    learnedWordsContainer.append(this.learnedWords, text);

    this.wordsResultsContainer.append(learnedWordsContainer);
  }
}

//   drawStatContainer() {
//     const statContainer = document.createElement('div');
//     statContainer.className = 'stat__container';

//     const title = document.createElement('h1');
//     title.className = 'stat__main-title';
//     title.textContent = 'Статистика за день';

//     const statPerDay = document.createElement('div');
//     statPerDay.className = 'stat__per-day';

//     const statNewWordsPerDay = document.createElement('p');
//     statNewWordsPerDay.className = 'stat__per-day_new';
//     statNewWordsPerDay.textContent = '0 новых слов за день';

//     const statProgressPerDay = document.createElement('p');
//     statProgressPerDay.className = 'stat__per-day_progress';
//     statProgressPerDay.textContent = 'Правильных ответов 0%';

//     const statLearnedPerDay = document.createElement('p');
//     statLearnedPerDay.className = 'stat__per-day_progress';
//     statLearnedPerDay.textContent = 'Изучено слов за день: 0';

//     const statCardContainer = document.createElement('div');
//     statCardContainer.className = 'stat__card-container';

//     statPerDay.append(statNewWordsPerDay, statProgressPerDay, statLearnedPerDay);
//     statContainer.append(title, statPerDay, statCardContainer);
//     document.querySelector('.page__content')?.append(statContainer);
//   }

//   drawGameStatCard(name: string, title: string) {
//     const statCard = document.createElement('div');
//     statCard.className = `stat__card stat__card_${name}`;

//     const statTitle = document.createElement('h3');
//     statTitle.className = `stat__title stat__title_${name}`;
//     statTitle.textContent = title;

//     const statNewWords = document.createElement('p');
//     statNewWords.className = `stat__new-words stat__new-words_${name}`;
//     statNewWords.textContent = '0 новых слов за день';

//     const statProgress = document.createElement('p');
//     statProgress.className = `stat__progress stat__new-progress_${name}`;
//     statProgress.textContent = 'Правильных ответов 0%';

//     const statAnswersInARaw = document.createElement('p');
//     statAnswersInARaw.className = `stat__inARaw stat__inARaw_${name}`;
//     statAnswersInARaw.textContent = 'Самая длинная серия правильных ответов: 0';

//     statCard.append(statTitle, statNewWords, statProgress, statAnswersInARaw);
//     document.querySelector('.stat__card-container')?.append(statCard);
//   }
// }
