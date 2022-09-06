export interface IcurrentBookWords {
  currentPage: number,
  currentLevel: number,
  learnedPage: boolean
}

const currentBookWords: IcurrentBookWords = {
  currentPage: localStorage.getItem('currentBookPage') ? Number(localStorage.getItem('currentBookPage')) : 0,
  currentLevel: localStorage.getItem('currentBookLevel') ? Number(localStorage.getItem('currentBookLevel')) : 0,
  learnedPage: false,
};

export default currentBookWords;
