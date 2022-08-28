export interface ICurrentWords {
  currentPage: number,
  currentLevel: number,
}

const currentWords: ICurrentWords = {
  currentPage: localStorage.getItem('currentPage') ? Number(localStorage.getItem('currentPage')) : 0,
  currentLevel: localStorage.getItem('currentLevel') ? Number(localStorage.getItem('currentLevel')) : 0,
};

export default currentWords;
