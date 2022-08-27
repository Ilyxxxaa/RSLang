export default interface State {
  name: string;
  view: View;
  game: Game;
  level: Level;
}

type View = 'main' | 'book' | 'games' | 'statistics';

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export enum Game {
  audiocall = 'Аудиовызов',
  sprint = 'Спринт',
}
