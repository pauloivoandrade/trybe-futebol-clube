import ITeamService from '../Interfaces/ITeamService';
import Team from '../database/models/teams.model';
import ITeam from '../Interfaces/ITeam';

export default class TeamService implements ITeamService {
  constructor(private _teamModel = Team) {}

  findAll = async (): Promise<ITeam[] | void> => {
    const teams = await this._teamModel.findAll();
    if (teams) return teams;
  };

  findByPk = async (id: number): Promise<ITeam | void> => {
    const team = await this._teamModel.findByPk(id);
    if (team) return team;
  };
}
