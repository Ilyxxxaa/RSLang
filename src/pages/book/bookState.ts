const currentWords = {
  currentPage: localStorage.getItem('currentPage') || 0,
  currentLevel: localStorage.getItem('currentLevel') || 0,
};

export default currentWords;
