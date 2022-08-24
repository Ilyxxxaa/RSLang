// const loader: HTMLElement | null = document.querySelector('.lds-ring');


const content = document.querySelector('.content'); // where to insert
const loaderDiv = document.createElement('div'); // what insert
loaderDiv.classList.add('lds-ring');
loaderDiv.innerHTML = '<div></div><div></div><div></div><div></div>';


export function startLoader() {
  content?.append(loaderDiv);
}

export function stopLoader() {
  const img: HTMLImageElement | null = document.querySelector('.card__img');
  if (img) img.onload = function () {
    const div = document.querySelector('.lds-ring');
    div?.remove();
  }
}