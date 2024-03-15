import ITeam from './ITeam';

export type ID = number;

export interface ITeamsModel {
  findAll(): Promise<ITeam[]>
  findById(id: ID): Promise<ITeam | null>
}
