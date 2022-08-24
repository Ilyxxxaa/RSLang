import { IUserAuthorized } from '../../../types/auth';
import { requestPost } from './requests';

const baseLink = 'https://serverforrslang.herokuapp.com';
const signUpLink = `${baseLink}/users`;
const signInLink = `${baseLink}/signin`;

function fixOverlay() {
  const signin = document.querySelector('.modal__signin') as HTMLElement;
  const signup = document.querySelector('.modal__signup') as HTMLElement;
  if (!signin.classList.contains('hidden') || !signup.classList.contains('hidden')) {
    (document.querySelector('body') as HTMLElement).style.overflow = 'hidden';
  } else {
    (document.querySelector('body') as HTMLElement).style.overflow = 'visible';
  }
}

export function showAuthModal(event: Event) {
  const target = event.target as HTMLElement;
  if (target.classList.contains('auth__btn') || target.classList.contains('auth-button_add')) {
    document.querySelector(`.modal__${target.dataset.auth}`)?.classList.remove('hidden');
  }
  fixOverlay();
}

export function closeAuthModal(event: Event) {
  const target = event.target as HTMLElement;
  if (!target.closest('.modal__auth') || target.classList.contains('cancel') || target.classList.contains('auth-button_add')) {
    target.closest('.modal')?.classList.add('hidden');
  }
  fixOverlay();
}

export function showPassword(event: Event) {
  const target = event.target as HTMLInputElement;
  const password = document.querySelector<HTMLInputElement>(`#${target.value}-password`);
  if (password) {
    if (target.checked) {
      password.type = 'text';
    } else {
      password.type = 'password';
    }
  }
}

export function showAuthorizedUser(key: string) {
  if (localStorage.getItem(key)) {
    const { name } = JSON.parse(localStorage.getItem(key) || '');
    document.querySelectorAll('.auth__btn')?.forEach((btn) => btn.classList.add('hidden'));
    document.querySelectorAll('.user')?.forEach((user) => user.classList.remove('hidden'));
    (document.querySelector('.user__name') as HTMLElement).textContent = name;
  } else {
    document.querySelectorAll('.auth__btn')?.forEach((btn) => btn.classList.remove('hidden'));
    document.querySelectorAll('.user')?.forEach((user) => user.classList.add('hidden'));
  }
}

export function setLocalStorage(key: string, data: IUserAuthorized) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function clearLocalStorage(key: string) {
  localStorage.removeItem(key);
}

export function signIn(email: string, password: string) {
  requestPost(signInLink, { email, password }).then((response) => {
    setLocalStorage('user', response);
    document.querySelectorAll('.modal')?.forEach((modal) => modal.classList.add('hidden'));
    fixOverlay();
    showAuthorizedUser('user');
  }).finally(() => document.querySelectorAll<HTMLButtonElement>('.auth-button').forEach((button) => {
    button.removeAttribute('disabled');
  }));
}

export function signUp(name: string, email: string, password: string) {
  requestPost(signUpLink, { name, email, password }).then(() => {
    signIn(email, password);
    fixOverlay();
  }).finally(() => document.querySelectorAll<HTMLButtonElement>('.auth-button').forEach((button) => {
    button.removeAttribute('disabled');
  }));
}
