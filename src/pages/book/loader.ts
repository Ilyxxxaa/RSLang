const content = document.querySelector('.page__content');

const loaderDiv = document.createElement('div');

export function loaderInit() {
  loaderDiv.classList.add('lds-ring');
  loaderDiv.innerHTML = '<div></div><div></div><div></div><div></div>';
}

export function startLoader() {
  content?.append(loaderDiv);
}

export function stopLoader() {
  const img: HTMLImageElement | null = document.querySelector('.card__img');
  if (img) {
    img.onload = () => {
      const div = document.querySelector('.lds-ring');
      div?.remove();
    };
  }
}
