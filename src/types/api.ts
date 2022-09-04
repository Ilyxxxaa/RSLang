export interface IBody {
  difficulty: string;
  optional: {
    isNew: boolean;
    learned: boolean;
    date: Date;
    games: {
      sprint: {
        right: number;
        wrong: number;
      };
      audioCall: {
        right: number;
        wrong: number;
      };
    };
    tryCount: number;
    inRow: number;
  };
}
