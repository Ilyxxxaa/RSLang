export default interface State {
  isAuthorized: boolean,
  userId: string;
  name: string;
  token: string;
  refreshToken: string;
  view: View;
  game: string;
  level: Level;
}

type View = 'main' | 'book' | 'games' | 'statistics';

export type Level = '' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export enum Game {
  audiocall = 'Аудиовызов',
  sprint = 'Спринт',
}
