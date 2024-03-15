import IMatch from '../Interfaces/IMatch';
import SequelizeTeams from '../database/models/teams.model';
import Match from '../database/models/match.model';

export type upMatche = {
  homeTeamGoals: number;
  awayTeamGoals: number
};

export type NewEntity<T> = Omit<T, 'id'>;

export default class MatchesModel {
  private model = Match;

  async findAllMatches(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      include: [{
        model: SequelizeTeams,
        as: 'homeTeam',
        attributes: ['teamName'],
      }, {
        model: SequelizeTeams,
        as: 'awayTeam',
        attributes: ['teamName'],
      },
      ],
    });
    return matches;
  }

  async getInProgressTrue(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      where: { inProgress: true },
      include: [{
        model: SequelizeTeams,
        as: 'homeTeam',
        attributes: ['teamName'],
      }, {
        model: SequelizeTeams,
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
        model: SequelizeTeams,
        as: 'homeTeam',
        attributes: ['teamName'],
      }, {
        model: SequelizeTeams,
        as: 'awayTeam',
        attributes: ['teamName'],
      }],
    });
    return matches;
  }

  async updateFinish(id: number) {
    const update = await this.model.update({ inProgress: false }, { where: { id } });
    return update;
  }

  async getMatcheById(id: number): Promise<Match | null> {
    const matcheById = await this.model.findByPk(id);
    return matcheById;
  }

  async updateMatches(data: upMatche, id: number) {
    const update = await this.model.update(
      { homeTeamGoals: data.homeTeamGoals,
        awayTeamGoals: data.awayTeamGoals },
      { where: { id } },
    );
    return update;
  }

  async create(data: NewEntity<IMatch>): Promise<IMatch> {
    const createData = {
      homeTeamId: data.homeTeamId,
      awayTeamId: data.awayTeamId,
      homeTeamGoals: data.homeTeamGoals,
      awayTeamGoals: data.awayTeamGoals,
      inProgress: true,
    };
    const newMatche = await this.model.create(createData);
    const { id, homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress } = newMatche;
    return {
      id,
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    };
  }
}
