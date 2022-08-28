export default class Loader {
  content = document.querySelector('.page__content');

  loaderDiv = document.createElement('div');

  loaderInit() {
    this.loaderDiv.classList.add('lds-ring');
    this.loaderDiv.innerHTML = '<div></div><div></div><div></div><div></div>';
  }

  startLoader() {
    if (this.content) this.content?.append(this.loaderDiv);
  }

  stopLoader() {
    const img: HTMLImageElement | null = document.querySelector('.card__img');
    if (img) {
      img.onload = () => {
        const div = document.querySelector('.lds-ring');
        div?.remove();
      };
    }
  }
}
