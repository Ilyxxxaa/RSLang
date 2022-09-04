export interface ICurrentWords {
  currentPage: number,
  currentLevel: number,
}

const currentWords: ICurrentWords = {
  currentPage: localStorage.getItem('currentBookPage') ? Number(localStorage.getItem('currentBookPage')) : 0,
  currentLevel: localStorage.getItem('currentBookLevel') ? Number(localStorage.getItem('currentBookLevel')) : 0,
};

export default currentWords;
