import { IUser, IUserAuthorized } from '../../../types/auth';
import { requestPost } from './requests';

const baseLink = 'https://serverforrslang.herokuapp.com';
const signUpLink = `${baseLink}/users`;
const signInLink = `${baseLink}/signin`;

export function showAuthModal(event: Event) {
  const target = event.target as HTMLElement;
  if (target.classList.contains('auth__btn') || target.classList.contains('auth-button_add')) {
    document.querySelector(`.modal__${target.dataset.auth}`)?.classList.remove('hidden');
    (document.querySelector('body') as HTMLElement).style.overflow = 'hidden';
  }
}

export function closeAuthModal(event: Event) {
  (document.querySelector('body') as HTMLElement).style.overflow = 'visible';
  const target = event.target as HTMLElement;
  if (!target.closest('.modal__auth') || target.classList.contains('cancel') || target.classList.contains('auth-button_add')) {
    target.closest('.modal')?.classList.add('hidden');
  }
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

export function setLocalStorage(name: string, data: IUserAuthorized) {
  localStorage.setItem(name, JSON.stringify(data));
}

export function signIn() {
  const email = (document.querySelector('#signin-email') as HTMLInputElement).value;
  const password = (document.querySelector('#signin-password') as HTMLInputElement).value;
  (document.querySelector('#signin-button') as HTMLInputElement).disabled = true;

  requestPost(signInLink, { email, password }).then((userAuth) => {
    console.log('результат авторизации', userAuth);
    const { name } = userAuth;
    setLocalStorage('userAuth', userAuth);
    (document.querySelector('#signin-button') as HTMLInputElement).disabled = false;
    document.querySelector('.modal__signin')?.classList.add('hidden');
    document.querySelectorAll('.auth__btn')?.forEach((btn) => btn.classList.add('hidden'));
    document.querySelectorAll('.user')?.forEach((user) => user.classList.remove('hidden'));
    (document.querySelector('.user__name') as HTMLElement).textContent = name;
  });
}

export function signUp() {
  const name = (document.querySelector('#signup-name') as HTMLInputElement).value;
  const email = (document.querySelector('#signup-email') as HTMLInputElement).value;
  const password = (document.querySelector('#signup-password') as HTMLInputElement).value;
  (document.querySelector('#signup-button') as HTMLInputElement).disabled = true;

  requestPost<IUser>(signUpLink, { name, email, password }).then(() => {
    requestPost<IUser>(signInLink, { email, password }).then((userAuth) => {
      setLocalStorage('userAuth', userAuth);
      (document.querySelector('#signup-button') as HTMLInputElement).disabled = false;
      document.querySelector('.modal__signup')?.classList.add('hidden');
      document.querySelectorAll('.auth__btn')?.forEach((btn) => btn.classList.add('hidden'));
      document.querySelectorAll('.user')?.forEach((user) => user.classList.remove('hidden'));
      (document.querySelector('.user__name') as HTMLElement).textContent = name;
    });
  });
}

// export function getLocalStorage() {
//   if (localStorage.getItem('users')) {
//     const users = JSON.parse(localStorage.getItem('users') || '{}');
//     return users;
//   }
// }
