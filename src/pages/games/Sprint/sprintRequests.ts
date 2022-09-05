// export const requestGetAnonymous = async (url: string) => {
//   const response = await fetch(url);
//   const result = await response.json();
//   return result;
// };

export const requestGetAuth = async (url: string) => {
  const token = JSON.parse(localStorage.getItem('token') ?? '');
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (response.status === 401) {
    localStorage.removeItem('message');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('name');
    localStorage.removeItem('userId');
    localStorage.setItem('currentView', 'main');
    document.location.reload();
    document.querySelectorAll('.auth__btn')?.forEach((btn) => btn.classList.remove('hidden'));
    document.querySelectorAll('.user')?.forEach((user) => user.classList.add('hidden'));
  }

  const result = await response.json();
  const { paginatedResults } = result[0];
  return paginatedResults;
};

// export const requestPostWord = async (url: string, word: {}) => {
//   const token = localStorage.getItem('token');
//   const response = await fetch(url, {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${token}`,
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(word),
//   });
//   const result = await response.json();
//   return result;
// };
