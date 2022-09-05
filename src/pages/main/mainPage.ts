export default class MainPage {
  mainPage: HTMLElement = document.createElement('main');

  drawMainPage() {
    const pageContent = document.querySelector('.page__content');
    this.createMainPage();
    if (pageContent) {
      pageContent.innerHTML = '';
      pageContent.append(this.mainPage);
    }
  }

  createMainPage() {
    this.mainPage.classList.add('main');
    this.mainPage.innerHTML = `<section class="about">
    <div class="container">
      <div class="about__info">
        <h1 class="about__info-title">Приложение для изучения английского языка №1 в Беларуси</h1>
        <p class="about__info-text">Играй в интерактивные игры, учи слова и изучение английского никогда не станет
          тяжелым</p>
        <div class="about__info-age">Для всех возрастов</div>
        <button class="about__info-btn">Начать учиться</button>
      </div>
    </div>
  </section>


  <section class="adv" id='adv'>
    <div class="container">
      <h1 class="adv__title">Оцените преимущества приложения</h1>
      <div class="adv__inner">
        <div class="adv__card">
          <div class="card__img"><img src="./assets/images/book.png" alt=""></div>
          <div class="card__title">Учебник</div>
          <div class="card__info">Более 3500 тысяч слов для изучения, разбитых на разделы по уровню твоей подготовки
            с
            удобной навигацией.</div>
        </div>
        <div class="adv__card">
          <div class="card__img"><img src="./assets/images/games.png" alt=""></div>
          <div class="card__title">Игры</div>
          <div class="card__info">Чтобы обучениe не было скучным, мы подготовили 2 увлекательных
            игры на развитие запоминания слов, восприятия на слух и письма
          </div>
        </div>
        <div class="adv__card">
          <div class="card__img"><img src="./assets/images/statistic.png" alt=""></div>
          <div class="card__title">Статистика</div>
          <div class="card__info">Отслеживай свой прогресс в индивидуальной статистике, ставь цели и вдохновляйся на
            и достижение новых результатов каждый день!</div>
        </div>
      </div>
    </div>
  </section>

  <section class="team" id='team'>
   
      <div class="team__title">Наша команда</div>
      <div class="team__inner">

      <div class="team__card">
      <div class="card__content">
        <div class="card__img">
          <img src="./assets/images/ilya-avatar.jpg" alt="">
        </div>
        <div class="card__name">
          <div class="card__name-name">Ilya</div>
        </div>
        <a class="card__icons" href="https://github.com/ilyxxxaa" target="_blank">
          <img src="./assets/images/github-icon.svg" alt="">
          <div class="card__icons-name">Ilyxxxaa</div>
        </a>
        <div class="card__text">
          <ol class="team__card-info">
            <li class="team__card-info-item">Вёрстка главной страницы</щl>
            <li class="team__card-info-item">Боковое меню</li>
            <li class="team__card-info-item">Игра аудиовызов</li>
            <li class="team__card-info-item">Статистика</li>
          </ol>
        </div>
      </div>
    </div>
 
    <div class="team__card">
    <div class="card__content">
      <div class="card__img">
        <img src="./assets/images/olya-avatar.jpg" alt="">
      </div>
      <div class="card__name">
        <div class="card__name-name">Olya</div>
      </div>
      <a class="card__icons" href="https://github.com/aminkka" target="_blank">
        <img src="./assets/images/github-icon.svg" alt="">
        <div class="card__icons-name">aminkka</div>
      </a>
      <div class="card__text">
        <ol class="team__card-info">
          <li class="team__card-info-item">Дизайн приложения</li>
          <li class="team__card-info-item">Авторизация</li>
          <li class="team__card-info-item">Игра спринт</li>
          <li class="team__card-info-item">Статистика</li>
        </ol>
      </div>
    </div>
  </div>

  <div class="team__card">
      <div class="card__content">
        <div class="card__img">
          <img src="./assets/images/max-avatar.jpg" alt="">
        </div>
        <div class="card__name">
          <div class="card__name-name">Max</div>
        </div>
        <a class="card__icons" href="https://github.com/maxkovalenko97" target="_blank">
          <img src="./assets/images/github-icon.svg" alt="">
          <div class="card__icons-name">maxkovalenko97</div>
        </a>
        <div class="card__text">
          <ol class="team__card-info">
            <li class="team__card-info-item">Дизайн словаря</щl>
            <li class="team__card-info-item">Вёрстка словаря</li>
            <li class="team__card-info-item">Работа с сервером</li>
            <li class="team__card-info-item">Статистика</li>
          </ol>
        </div>
      </div>
    </div>

    
    </div>
  </section>`;
  }
}
