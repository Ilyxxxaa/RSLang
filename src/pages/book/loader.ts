const loaderDiv = document.createElement('div');

export function loaderInit() {
  // console.log('init');
  loaderDiv.classList.add('lds-ring');
  loaderDiv.innerHTML = '<div></div><div></div><div></div><div></div>';
}

export function startLoader() {
  const content = document.querySelector('.book_container');
  content?.append(loaderDiv);
}

export function stopLoader() {
  const img: HTMLImageElement | null = document.querySelector('.card-img-container');
  setTimeout(() => {
    const div = document.querySelector('.lds-ring');
    div?.remove();
  }, 1000);
}
