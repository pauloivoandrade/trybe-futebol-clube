import IMatch from './IMatch';

export default interface IMatchService {
  findAll(): Promise<IMatch[]>;
  findWithWhere(query: boolean): Promise<IMatch[]>;
}