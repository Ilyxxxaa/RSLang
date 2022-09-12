let isPlay = false;
let audio: HTMLAudioElement | null = null;
let audioMeaning: HTMLAudioElement | null = null;
let audioExample: HTMLAudioElement | null = null;

export function stopAudio() {
  if (isPlay && audio && audioMeaning && audioExample) {
    audio.pause();
    audio.currentTime = 0;
    audioMeaning.pause();
    audioMeaning.currentTime = 0;
    audioExample.pause();
    audioExample.currentTime = 0;
  }
}

export function playSounds(e: MouseEvent, element: HTMLElement) {
  const buttonPlay = <HTMLElement>e.target;

  if (buttonPlay.classList.contains('playing')) {
    stopAudio();
    buttonPlay.classList.remove('playing');
    return;
  }
  if (isPlay) {
    stopAudio();
    document.querySelectorAll('.playing').forEach((el) => el.classList.remove('playing'));
  }
  if (!element.classList.contains('playing')) {
    element.classList.add('playing');
  }

  const soundsCollect = buttonPlay.querySelectorAll('audio');
  const sounds: HTMLAudioElement[] = Array.from(soundsCollect);
  audio = new Audio(`${sounds[0].src}`);
  audioMeaning = new Audio(`${sounds[1].src}`);
  audioExample = new Audio(`${sounds[2].src}`);
  isPlay = true;
  audio.play();
  audio.onended = () => {
    audioMeaning?.play();
    if (audioMeaning) {
      audioMeaning.onended = () => {
        audioExample?.play();
        if (audioExample) {
          audioExample.onended = () => {
            element.classList.remove('playing');
            isPlay = false;
          };
        }
      };
    }
  };
}
