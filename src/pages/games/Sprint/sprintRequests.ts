export const requestGetAnonymous = async (url: string) => {
  const response = await fetch(url);
  const result = await response.json();
  return result;
};

export const requestGetAuth = async (url: string) => {
  const token = JSON.parse(localStorage.getItem('token') ?? '');
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  const result = await response.json();
  const { paginatedResults } = result[0];
  return paginatedResults;
};

export const requestPostWord = async (url: string, word: {}) => {
  const token = localStorage.getItem('token');
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
  const result = await response.json();
  return result;
};
