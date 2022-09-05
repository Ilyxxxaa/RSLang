import './_statistics.scss';

class StatisticsView {
  drawStatContainer() {
    const statContainer = document.createElement('div');
    statContainer.className = 'stat__container';

    const title = document.createElement('h1');
    title.className = 'stat__main-title';
    title.textContent = 'Статистика за день';

    const statPerDay = document.createElement('div');
    statPerDay.className = 'stat__per-day';

    const statNewWordsPerDay = document.createElement('p');
    statNewWordsPerDay.className = 'stat__per-day_new';
    statNewWordsPerDay.textContent = '0 новых слов за день';

    const statProgressPerDay = document.createElement('p');
    statProgressPerDay.className = 'stat__per-day_progress';
    statProgressPerDay.textContent = 'Правильных ответов 0%';

    const statLearnedPerDay = document.createElement('p');
    statLearnedPerDay.className = 'stat__per-day_progress';
    statLearnedPerDay.textContent = 'Изучено слов за день: 0';

    const statCardContainer = document.createElement('div');
    statCardContainer.className = 'stat__card-container';

    statPerDay.append(statNewWordsPerDay, statProgressPerDay, statLearnedPerDay);
    statContainer.append(title, statPerDay, statCardContainer);
    document.querySelector('.page__content')?.append(statContainer);
  }

  drawGameStatCard(name: string, title: string) {
    const statCard = document.createElement('div');
    statCard.className = `stat__card stat__card_${name}`;

    const statTitle = document.createElement('h3');
    statTitle.className = `stat__title stat__title_${name}`;
    statTitle.textContent = title;

    const statNewWords = document.createElement('p');
    statNewWords.className = `stat__new-words stat__new-words_${name}`;
    statNewWords.textContent = '0 новых слов за день';

    const statProgress = document.createElement('p');
    statProgress.className = `stat__progress stat__new-progress_${name}`;
    statProgress.textContent = 'Правильных ответов 0%';

    const statAnswersInARaw = document.createElement('p');
    statAnswersInARaw.className = `stat__inARaw stat__inARaw_${name}`;
    statAnswersInARaw.textContent = 'Самая длинная серия правильных ответов: 0';

    statCard.append(statTitle, statNewWords, statProgress, statAnswersInARaw);
    document.querySelector('.stat__card-container')?.append(statCard);
  }
}

export default StatisticsView;
