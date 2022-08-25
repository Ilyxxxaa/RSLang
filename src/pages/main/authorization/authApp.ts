import AuthModalView from './authview';
import {
  showAuthModal,
  closeAuthModal,
  showPassword,
  signIn,
  signUp,
  showAuthorizedUser,
  clearLocalStorage,
} from './authFunc';

class Authorization {
  signUpModal = AuthModalView.drawSignUpModal();

  signInModal = AuthModalView.drawSignInModal();

  static addAuthHandlers() {
    this.addHandlerToShowModal();
    this.addHandlerToShowModalAdd();
    this.addHandlerToCloseModal();
    this.addHandlerToShowPassword();
    this.addHandlerToAuth();
    this.addHandlerToLoadWindow();
    this.addHandlerToUnAuth();
  }

  static addHandlerToShowModal() {
    document.querySelector('.header__auth')?.addEventListener('click', showAuthModal);
  }

  static addHandlerToCloseModal() {
    document
      .querySelectorAll('.modal')
      ?.forEach((modal) => modal.addEventListener('click', closeAuthModal));
  }

  static addHandlerToShowModalAdd() {
    document.querySelectorAll('.auth-button_add')?.forEach((button) =>
      button.addEventListener('click', (event: Event) => {
        closeAuthModal(event);
        showAuthModal(event);
      }),
    );
  }

  static addHandlerToShowPassword() {
    document
      .querySelectorAll('.checkbox')
      ?.forEach((elem) => elem.addEventListener('input', showPassword));
  }

  static addHandlerToAuth() {
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
          signIn(email, password);
        }
        if (target.classList.contains('form_signup')) {
          const name = (target.querySelector(`#${target.dataset.form}-name`) as HTMLInputElement)
            .value;
          signUp(name, email, password);
        }
      }),
    );
  }

  static addHandlerToUnAuth() {
    document.querySelector('.user__avatar')?.addEventListener('click', () => {
      clearLocalStorage('user');
      showAuthorizedUser('user');
    });
  }

  static addHandlerToLoadWindow() {
    window.addEventListener('load', () => {
      showAuthorizedUser('user');
    });
  }
}

export default Authorization;
