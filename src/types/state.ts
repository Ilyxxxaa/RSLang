import { TimeScale } from 'chart.js';
import { IWord, IOptional } from './dictionaryTypes';

export default interface State {
  view: View;
  gameInit?: string,
  game: string;
  gamePage: number;
  gameLevel: number;
  sprint: {
    wordsForGame: IWord[];
    gameCurrentWord?: IWord;
    countRightAnswers: number;
    countRightAnswersInARow: number;
    pointsPerWord: number;
    pointsScored: number;
    rightAnswers: IWord[];
    wrongAnswers: IWord[];
    difficulty: string,
    optional: IOptional;
  };
}

type View = 'main' | 'book' | 'games' | 'statistics' | string;

// export type Level = '' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export enum Game {
  audiocall = 'Аудиовызов',
  sprint = 'Спринт',
}

export interface AudioCallState {
  arrayOfIndexes: Number[];
  arrayOfRestIndexes: Number[];
  wordsArray: Number[];
  wordsCount: number;
  rightWordsCount: number;
  rightWordsArray: AudioCallWordInfo[];
  wrongWordsArray: AudioCallWordInfo[];
  pageNumber: number;
}

type AudioCallWordInfo = {
  word: string | null;
  translate: string | null;
  audio: string | null;
};
