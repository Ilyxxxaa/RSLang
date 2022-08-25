import State from '../../types/state';

export default class Header {
  header: HTMLElement = document.createElement('div');

  drawHeader(state: State) {
    const headerContent = document.querySelector('.header__content');
    this.createHeader(state);
    headerContent?.append(this.header);
  }

  createHeader(state: State) {
    this.header.classList.add('header');
    if (state.view === 'main') {
      this.header.innerHTML = ` <div class=" container">
      <div class="header__inner">
        <div class="header__logo"><a href="#">RSLang<div class="header__logo-text">Учить английский - легко</div>
          </a>
  
        </div>
        <nav class="nav">
          <ul class="nav__list">
            <li class="nav__list-item">
              <a class="nav__list-link" href="#">
                О нас
              </a>
            </li>
            <li class="nav__list-item">
              <a class="nav__list-link" href="#">
                Преимущества
              </a>
            </li>
            <li class="nav__list-item">
              <a class="nav__list-link" href="#">
                Наша команда
              </a>
            </li>
          </ul>
        </nav>
        <div class="header__auth">
          <button class="auth__btn auth__btn-login" id='login' data-auth="signin">Войти</button>
          <button class="auth__btn auth__btn-registration" id='password' data-auth="signup">Регистрация</button>
          <img class="user user__avatar hidden" src="../../assets/images/user.png" alt="avatar">
          <span class="user user__name hidden"></span>
        </div>
      </div>
    </div>`;
    } else {
      this.header.innerHTML = ` <div class=" container">
      <div class="header__inner">
        <div class="header__logo"><a href="#">RSLang<div class="header__logo-text">Учить английский - легко</div>
          </a>
        </div>
        <div class="header__auth">
          <button class="auth__btn auth__btn-login" id='login' data-auth="signin">Войти</button>
          <button class="auth__btn auth__btn-registration" id='password' data-auth="signup">Регистрация</button>
          <img class="user user__avatar hidden" src="../../assets/images/user.png" alt="avatar">
          <span class="user user__name hidden"></span>
        </div>
      </div>
    </div>`;
    }
  }
}
