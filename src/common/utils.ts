export default class Utils {
  static getWords = async (group: number, page: number) => {
    const serverAdress = 'https://serverforrslang.herokuapp.com';
    const wordsPath = `${serverAdress}/words`;
    const response = await fetch(`${wordsPath}/?group=${group}&page=${page}`);
    const words = await response.json();
    console.log(`group: ${group},page: ${page}`);
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
}
