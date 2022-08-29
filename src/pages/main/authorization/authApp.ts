import Authorization from './authFunc';
import State from '../../../types/state';

class AuthorizationHandlers {
  state: State;

  authorization: Authorization;

  constructor(state: State) {
    this.state = state;
    this.authorization = new Authorization(state);
  }

  addAuthHandlers() {
    this.addHandlerToShowModal();
    this.addHandlerToShowModalAdd();
    this.addHandlerToCloseModal();
    this.addHandlerToShowPassword();
    this.addHandlerToAuth();
    this.addHandlerToLoadWindow();
    this.addHandlerToUnAuth();
  }

  addHandlerToShowModal() {
    document
      .querySelector('.header__auth')
      ?.addEventListener('click', this.authorization.showAuthModal);
  }

  addHandlerToCloseModal() {
    document
      .querySelectorAll('.modal')
      ?.forEach((modal) => modal.addEventListener('click', this.authorization.closeAuthModal));
  }

  addHandlerToShowModalAdd() {
    document.querySelectorAll('.auth-button_add')?.forEach((button) =>
      button.addEventListener('click', (event: Event) => {
        this.authorization.closeAuthModal(event);
        this.authorization.showAuthModal(event);
      }),
    );
  }

  addHandlerToShowPassword() {
    document
      .querySelectorAll('.checkbox')
      ?.forEach((elem) => elem.addEventListener('input', this.authorization.showPassword));
  }

  addHandlerToAuth() {
    document.querySelectorAll('.form').forEach((form) =>
      form.addEventListener('submit', (event: Event) => {
        const target = event.target as HTMLFormElement;
        event.preventDefault();
        const email = (target.querySelector(`#${target.dataset.form}-email`) as HTMLInputElement)
          .value;
        const password = (target.querySelector(
          `#${target.dataset.form}-password`,
        ) as HTMLInputElement).value;
        (document.querySelector(
          `#${target.dataset.form}-button`,
        ) as HTMLInputElement).disabled = true;
        if (target.classList.contains('form_signin')) {
          this.authorization.signIn(email, password);
        }
        if (target.classList.contains('form_signup')) {
          const name = (target.querySelector(`#${target.dataset.form}-name`) as HTMLInputElement)
            .value;
          this.authorization.signUp(name, email, password);
        }
      }),
    );
  }

  addHandlerToUnAuth() {
    document.querySelector('.user__avatar')?.addEventListener('click', () => {
      this.state.isAuthorized = false;
      this.state.name = '';
      this.state.userId = '';
      this.state.token = '';
      this.state.refreshToken = '';
      this.authorization.clearLocalStorage('user');
      this.authorization.showAuthorizedUser('user');
    });
  }

  addHandlerToLoadWindow() {
    window.addEventListener('load', () => {
      this.authorization.showAuthorizedUser('user');
    });
  }
}

export default AuthorizationHandlers;
