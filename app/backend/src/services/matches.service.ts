import ErrorGenerate from '../utils/errorGen';
import Match from '../database/models/match.model';
import IMatch from '../Interfaces/IMatch';
import IMatchService, {
  MatchGoals,
} from '../Interfaces/IMatchService';
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

  updateMatch = async (id: number, match: MatchGoals): Promise<void> => {
    await this._Match.update(
      { homeTeamGoals: match.homeTeamGoals, awayTeamGoals: match.awayTeamGoals },
      { where: { id } },
    );
  };

  newMatch = async (match: IMatch): Promise<IMatch> => {
    const homeTeamExists = await this._teamModel.findByPk(match.homeTeamId);
    const awayTeamExists = await this._teamModel.findByPk(match.awayTeamId);
    if (!homeTeamExists || !awayTeamExists) {
      throw new ErrorGenerate(404, 'There is no team with such id!');
    }
    if (match.homeTeamId === match.awayTeamId) {
      throw new ErrorGenerate(422, 'It is not possible to create a match with two equal teams');
    }
    const createdMatch = await this._Match.create({ ...match, inProgress: true });
    return createdMatch;
  };
}
