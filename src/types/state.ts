export default interface State {
  name: string;
  view: View;
}

type View = 'main' | 'book' | 'games' | 'statistics';
