export default interface State {
  isAuthorized: boolean,
  userId: string;
  name: string;
  token: string;
  refreshToken: string;
  view: View;
}

type View = 'main' | 'book' | 'games' | 'statistics';
