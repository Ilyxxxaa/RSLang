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
