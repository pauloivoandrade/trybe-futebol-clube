import Match from '../database/models/match.model';
import IMatch from '../Interfaces/IMatch';
import IMatchService from '../Interfaces/IMatchService';
import Team from '../database/models/teams.model';

export default class MatchService implements IMatchService {
  constructor(private _Match = Match, private _teamModel = Team) {}

  findAll = async (): Promise<IMatch[]> => {
    const matches = await this._Match.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  };

  findWithWhere = async (query: boolean): Promise<IMatch[]> => {
    const matches = await this._Match.findAll({
      where: {
        inProgress: query,
      },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  };

  finishMatch = async (id: number): Promise<void> => {
    await this._Match.update(
      { inProgress: false },
      { where: { id } },
    );
  };
}
