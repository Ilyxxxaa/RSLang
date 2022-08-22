import AuthModalView from './authview';
import { showAuthModal, closeAuthModal, showPassword, signIn, signUp } from './authFunc';

class Authorization {
  signUpModal = AuthModalView.drawSignUpModal();

  signInModal = AuthModalView.drawSignInModal();

  static addAuthHandlers() {
    this.addHandlerToShowModal();
    this.addHandlerToShowModalAdd();
    this.addHandlerToCloseModal();
    this.addHandlerToShowPassword();
    this.addHandlerToSignIn();
    this.addHandlerToSignUp();
  }

  static addHandlerToShowModal() {
    document.querySelector('.header__auth')?.addEventListener('click', showAuthModal);
  }

  static addHandlerToCloseModal() {
    document.querySelectorAll('.modal')?.forEach((modal) => modal.addEventListener('click', closeAuthModal));
  }

  static addHandlerToShowModalAdd() {
    document.querySelectorAll('.auth-button_add')?.forEach((button) => button.addEventListener('click', (event: Event) => {
      closeAuthModal(event);
      showAuthModal(event);
    }));
  }

  static addHandlerToShowPassword() {
    document.querySelectorAll('.checkbox')?.forEach((elem) => elem.addEventListener('input', showPassword));
  }

  static addHandlerToSignUp() {
    document.querySelector('#signup-button')?.addEventListener('click', () => {
      signUp();
      console.log('hello');
    });
  }

  static addHandlerToSignIn() {
    document.querySelector('#signin-button')?.addEventListener('click', signIn);
  }
}

export default Authorization;
