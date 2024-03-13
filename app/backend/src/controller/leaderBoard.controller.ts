import { RequestHandler } from 'express';
import { ILeaderBoardService } from '../Interfaces/ILeaderBoardService';

export default class LeaderboardController {
  constructor(private _leaderboardService: ILeaderBoardService) {}

  getLeaderHome: RequestHandler = async (req, res) => {
    const tabulation = await this._leaderboardService
      .getClassification('home_team_goals', 'away_team_goals', 'home_team');
    return res.status(200).json(tabulation);
  };

  getLeaderAway: RequestHandler = async (req, res) => {
    const tabulation = await this._leaderboardService
      .getClassification('away_team_goals', 'home_team_goals', 'away_team');
    return res.status(200).json(tabulation);
  };

  getGeneralLeader:RequestHandler = async (req, res) => {
    const generalClassification = await this._leaderboardService.getGeneralClassification();
    return res.status(200).json(generalClassification);
  };
}
