class AudioCall {
  static drawAudioCall() {
    const pageContent = document.querySelector('.page__content');
    if (pageContent) {
      pageContent.innerHTML = 'ЗДЕСЬ БУДЕТ АУДИОВЫЗОВ';
    }
  }
}

export default AudioCall;
