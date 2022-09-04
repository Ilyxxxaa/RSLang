import { showAuthModal, closeAuthModal, showPassword, signIn, signUp, showAuthorizedUser, logOut } from './authFunc';

export const addAuthHandlers = () => {
  addHandlerToShowModal();
  addHandlerToShowModalAdd();
  addHandlerToCloseModal();
  addHandlerToShowPassword();
  addHandlerToAuth();
  addHandlerToLoadWindow();
  addHandlerToUnAuth();
};

export const addHandlerToShowModal = () => {
  document
    .querySelector('.header__auth')
    ?.addEventListener('click', showAuthModal);
};

export const addHandlerToCloseModal = () => {
  document
    .querySelectorAll('.modal')
    ?.forEach((modal) => modal.addEventListener('click', closeAuthModal));
};

export const addHandlerToShowModalAdd = () => {
  document.querySelectorAll('.auth-button_add')?.forEach((button) => button.addEventListener('click', (event: Event) => {
    closeAuthModal(event);
    showAuthModal(event);
  }));
};

export const addHandlerToShowPassword = () => {
  document
    .querySelectorAll('.checkbox')
    ?.forEach((elem) => elem.addEventListener('input', showPassword));
};

export const addHandlerToAuth = () => {
  document.querySelectorAll('.form').forEach((form) => form.addEventListener('submit', (event: Event) => {
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
  }));
};

export const addHandlerToUnAuth = () => {
  document.querySelector('.logout')?.addEventListener('click', () => {
    logOut();
  });
};

export const addHandlerToLoadWindow = () => {
  window.addEventListener('load', () => {
    showAuthorizedUser('name');
  });
};
