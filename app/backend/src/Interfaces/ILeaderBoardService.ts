import ILeaderBoard from './ILeaderBoard.js';

export type teamGoals = 'home_team_goals' | 'away_team_goals';

export type reference = 'home_team' | 'away_team';

export interface ILeaderBoardService {
  getClassification(
    team1: teamGoals,
    team2: teamGoals,
    teamReference: reference,
  ): Promise<ILeaderBoard[]>

  getGeneralClassification(): Promise<ILeaderBoard[]>
}
