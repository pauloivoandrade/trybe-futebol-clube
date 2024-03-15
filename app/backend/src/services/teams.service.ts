import TeamsModel from '../Models/TeamsModel';
import ITeam from '../Interfaces/ITeam';
import { ServiceResponse } from '../utils/ServiceResponse';

export default class TeamsService {
  constructor(private teamsModel: TeamsModel = new TeamsModel()) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: teams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeam | null>> {
    const team = await this.teamsModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: `The ${id} not found` } };
    return { status: 'SUCCESSFUL', data: team };
  }
}
