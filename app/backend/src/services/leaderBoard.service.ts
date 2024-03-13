import { QueryTypes } from 'sequelize';
import ILeaderBoard from '../Interfaces/ILeaderBoard';
import sequelizeModel from '../database/models';
import query from '../utils/queryGenBoard';
import leaderBoardCreate from '../utils/leaderBoardCreate';
import { teamGoals, reference, ILeaderBoardService } from '../Interfaces/ILeaderBoardService';

export default class LeaderboardService implements ILeaderBoardService {
  constructor(private _model = sequelizeModel) {}

  getClassification = async (
    team1: teamGoals,
    team2: teamGoals,
    teamReference: reference,
  ): Promise<ILeaderBoard[]> => {
    const classification: ILeaderBoard[] = await this._model
      .query(
        query
          .replace(/:team1/g, team1)
          .replace(/:team2/g, team2)
          .replace(/:reference/g, teamReference),
        {
          type: QueryTypes.SELECT,
        },
      );

    return classification;
  };

  getGeneralClassification = async (): Promise<ILeaderBoard[]> => {
    const homeClassification = await this
      .getClassification('home_team_goals', 'away_team_goals', 'home_team');
    const awayClassification = await this
      .getClassification('away_team_goals', 'home_team_goals', 'away_team');

    const classification: ILeaderBoard[] = leaderBoardCreate(
      homeClassification,
      awayClassification,
    );
    return classification;
  };
}
