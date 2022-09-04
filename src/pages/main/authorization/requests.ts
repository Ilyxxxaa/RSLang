import { baseLink } from '../../../const';

export async function requestPost<T>(url: string, value: T) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  });
  const result = await response.json();
  return result;
}

export async function requestGet(url: string) {
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

export const request = async <T>(method: string, url: string, body?: T) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${baseLink}/${url}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (response.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');
    const userId = JSON.parse(localStorage.getItem('userId') || '');

    const responseRef = await fetch(`${baseLink}/users/${userId}/tokens`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (responseRef.status === 403) {
      console.log('функция logout');
    }

    const resultRef = await responseRef.json();
    const { token: newToken, refreshToken: newRefreshToken } = resultRef;
    localStorage.setItem('token', newToken);
    localStorage.setItem('refreshToken', newRefreshToken);
  }

  const result = await response.json();
  return result;
};

// const testRequest = async () => {
//   const refreshToken = localStorage.getItem('refreshToken');
//   const userId = JSON.parse(localStorage.getItem('userId') || '');

//   console.log('refreshToken', refreshToken);
//   console.log('token', localStorage.getItem('token'));
//   console.log('path', `${baseLink}/users/${userId}/tokens`);

//   const responseRef = await fetch(`${baseLink}/users/${userId}/tokens`, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${refreshToken}`,
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//   });

//   if (responseRef.status === 403) {
//     console.log('выйти из авторизации');
//   }

//   const resultRef = await responseRef.json();
//   const { token: newToken, refreshToken: newRefreshToken } = resultRef;
//   localStorage.setItem('token', newToken);
//   localStorage.setItem('refreshToken', newRefreshToken);
//   console.log('newToken', newToken);
//   console.log('newRefresh', newRefreshToken);
// };

// testRequest();
