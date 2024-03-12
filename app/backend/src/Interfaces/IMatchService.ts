import IMatch from './IMatch';

export type MatchGoals = { homeTeamGoals: string, awayTeamGoals: string };

export default interface IMatchService {
  findAll(): Promise<IMatch[]>;
  findWithWhere(query: boolean): Promise<IMatch[]>;
  finishMatch(id: number): Promise<void>;
  updateMatch(id: number, match: MatchGoals): Promise<void>;
}
