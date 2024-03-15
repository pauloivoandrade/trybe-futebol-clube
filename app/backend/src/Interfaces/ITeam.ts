import IMatch from './IMatch';

export default interface ITeam {
  id: number;
  teamName: string;
  homeMatches?: IMatch[],
  awayMatches?: IMatch[],
}
