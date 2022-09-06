import { TimeScale } from 'chart.js';
import { IWord } from './dictionaryTypes';

export default interface State {
  view: View;
  gameInit?: string;
  game: string;
  gamePage: number;
  gameLevel: number;
  sprint: {
    timerId?: ReturnType <typeof setInterval>;
    wordsForGame: IWord[];
    gameCurrentWord?: IWord;
    countRightAnswers: number;
    countRightAnswersInARow: number;
    pointsPerWord: number;
    pointsScored: number;
    rightAnswers: IWord[];
    wrongAnswers: IWord[];
  };
}

type View = 'main' | 'book' | 'games' | 'statistics' | string;

export enum Game {
  audiocall = 'Аудиовызов',
  sprint = 'Спринт',
}

export interface AudioCallState {
  wordsArray: IWord[];
  arrayOfRestIndexes: Number[];
  wordsOrderArray: Number[];
  wordsCount: number;
  rightWordsCount: number;
  rightWordsArray: IWord[];
  wrongWordsArray: IWord[];
  rightNumber: Number;
}

type AudioCallWordInfo = {
  word: string | null;
  translate: string | null;
  audio: string | null;
};
