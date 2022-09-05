import { IUserAuthorized } from '../../../types/auth';
import { request } from './requests';
import AuthModalView from './authview';

const signUpModal = AuthModalView.drawSignUpModal();
const signInModal = AuthModalView.drawSignInModal();

export const fixOverlay = () => {
  const signin = document.querySelector('.modal__signin') as HTMLElement;
  const signup = document.querySelector('.modal__signup') as HTMLElement;
  if (!signin.classList.contains('hidden') || !signup.classList.contains('hidden')) {
    (document.querySelector('body') as HTMLElement).style.overflow = 'hidden';
  } else {
    (document.querySelector('body') as HTMLElement).style.overflow = 'visible';
  }
};

export const showAuthModal = (event: Event) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains('auth__btn') || target.classList.contains('auth-button_add')) {
    document.querySelector(`.modal__${target.dataset.auth}`)?.classList.remove('hidden');
  }
  fixOverlay();
};

export const closeAuthModal = (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.modal__auth') || target.classList.contains('cancel') || target.classList.contains('auth-button_add')) {
    target.closest('.modal')?.classList.add('hidden');
  }
  fixOverlay();
};

export const showPassword = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const password = document.querySelector<HTMLInputElement>(`#${target.value}-password`);
  if (password) {
    if (target.checked) {
      password.type = 'text';
    } else {
      password.type = 'password';
    }
  }
};

export const showAuthorizedUser = (key: string) => {
  if (localStorage.getItem(key)) {
    const userName = JSON.parse(localStorage.getItem(key) || '');
    document.querySelectorAll('.auth__btn')?.forEach((btn) => btn.classList.add('hidden'));
    document.querySelectorAll('.user')?.forEach((user) => user.classList.remove('hidden'));
    (document.querySelector('.user__name') as HTMLElement).textContent = userName;
  } else {
    document.querySelectorAll('.auth__btn')?.forEach((btn) => btn.classList.remove('hidden'));
    document.querySelectorAll('.user')?.forEach((user) => user.classList.add('hidden'));
  }
};

export const setLocalStorage = (key: string, data: IUserAuthorized) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const clearLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const signIn = (email: string, password: string) => {
  request('POST', 'signin', { email, password })
    .then((response) => {
      localStorage.setItem('currentView', 'main');
      document.location.reload();
      fixOverlay();
      showAuthorizedUser('name');
      document.querySelectorAll('.modal')?.forEach((modal) => modal.classList.add('hidden'));
      Object.keys(response).forEach((key) => {
        setLocalStorage(key, response[key]);
      });
    })
    .finally(() => document.querySelectorAll<HTMLButtonElement>('.auth-button').forEach((button) => {
      button.removeAttribute('disabled');
    }));
};

export const signUp = (name: string, email: string, password: string) => {
  request('POST', 'users', { name, email, password }).then(() => {
    signIn(email, password);
    fixOverlay();
  }).finally(() => document.querySelectorAll<HTMLButtonElement>('.auth-button').forEach((button) => {
    button.removeAttribute('disabled');
  }));
};

export const logOut = () => {
  localStorage.setItem('currentView', 'main');
  document.location.reload();
  clearLocalStorage('user');
  clearLocalStorage('message');
  clearLocalStorage('token');
  clearLocalStorage('refreshToken');
  clearLocalStorage('name');
  clearLocalStorage('userId');
  showAuthorizedUser('user');
};
