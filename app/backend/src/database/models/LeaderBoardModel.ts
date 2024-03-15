import IMatch from '../../Interfaces/IMatch';
import Team from './teams.model';
import Match from './match.model';

export default class MatchesModel {
  private model = Match;
  async getInProgressTrue(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      where: { inProgress: true },
      include: [{
        model: Team,
        as: 'homeTeam',
        attributes: ['teamName'],
      }, {
        model: Team,
        as: 'awayTeam',
        attributes: ['teamName'],
      }],
    });
    return matches;
  }

  async getInProgressFalse(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      where: { inProgress: false },
      include: [{
        model: Team,
        as: 'homeTeam',
        attributes: ['teamName'],
      }, {
        model: Team,
        as: 'awayTeam',
        attributes: ['teamName'],
      }],
    });
    return matches;
  }
}
