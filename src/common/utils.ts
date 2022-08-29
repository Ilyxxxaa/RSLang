export default class Utils {
  static getWords = async (group: number, page = this.getRandomPage()) => {
    const serverAdress = 'https://serverforrslang.herokuapp.com';
    const wordsPath = `${serverAdress}/words`;
    const response = await fetch(`${wordsPath}/?group=${group}&page=${page}`);
    const words = await response.json();
    console.log(`page: ${page}, group: ${group}`);
    console.log(words);
    return words;
  };

  static getRandomPage() {
    // return this.randomInteger(0, 29);
    return 0;
  }

  static randomInteger(min: number, max: number) {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return +Math.round(rand);
  }

  // static isRepeated(array: Number[], i: number) {
  //   const randomNumber = Utils.randomInteger(0, 19);
  //   if (!array.includes(randomNumber)) {
  //     array[i] = randomNumber;
  //     return true;
  //   } else Utils.isRepeated(array, i);
  // }
}
