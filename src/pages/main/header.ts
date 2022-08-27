export default class Header {
  header: HTMLElement = document.createElement('div');

  drawHeader() {
    const headerContent = document.querySelector('.header__content');
    this.createHeader();
    headerContent?.append(this.header);
  }

  createHeader() {
    this.header.classList.add('header');
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
              <a class="nav__list-link" href="#adv">
                Преимущества
              </a>
            </li>
            <li class="nav__list-item">
              <a class="nav__list-link" href="#team">
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
  }
}
