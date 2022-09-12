export default class Utils {
  static getWords = async (group: number, page: number) => {
    const serverAdress = 'https://serverforrslang.herokuapp.com';
    const wordsPath = `${serverAdress}/words`;
    const response = await fetch(`${wordsPath}/?group=${group}&page=${page}`);
    const words = await response.json();
    return words;
  };

  static getRandomPage() {
    return this.randomInteger(0, 29);
  }

  static randomInteger(min: number, max: number) {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return +Math.round(rand);
  }

  static returnServerAdress() {
    return 'https://serverforrslang.herokuapp.com';
  }

  static createRandomArray(amount: number) {
    const array = Array.from({ length: amount }, (v, i) => i).sort(() => 0.5 - Math.random());
    return array;
  }

  static shuffleArray(arr: Number[]) {
    return arr.sort(() => 0.5 - Math.random());
  }

  static smoothScroll() {
    document.querySelectorAll('a[href^="#"').forEach((item) => {
      const link = item as HTMLElement;

      let href: string = link.getAttribute('href') as string;
      href = href.substring(1);

      link.addEventListener('click', (e) => {
        e.preventDefault();

        const scrollTarget = document.getElementById(href);

        const topOffset = 0;
        const elementPosition = scrollTarget?.getBoundingClientRect().top;
        if (elementPosition) {
          const offsetPosition = elementPosition - topOffset;

          window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      });
    });
  }
}
