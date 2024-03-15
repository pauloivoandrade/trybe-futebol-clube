import ITeam from '../Interfaces/ITeam';
import { ITeamsModel } from '../Interfaces/ITeamsModel';
import SequelizeTeams from '../database/models/teams.model';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeam[]> {
    const dbTeams = await this.model.findAll();
    return dbTeams.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findById(id: number): Promise<ITeam | null> {
    const dbTeam = await this.model.findByPk(id);
    if (!dbTeam) return null;
    const { teamName }: ITeam = dbTeam;
    return { id, teamName };
  }
}
