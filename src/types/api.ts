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
        learned: number;
        inRow: number;
        inRowMax: number;
      };
      audioCall: {
        right: number;
        wrong: number;
        learned: number;
        inRow: number;
        inRowMax: number;
      };
    };
    tryCount: number;
    inRow: number;
  };
}
