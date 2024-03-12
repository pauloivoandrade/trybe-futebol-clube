import { RequestHandler } from 'express';
import IMatchService from '../Interfaces/IMatchService';

export default class MatchController {
  constructor(private _MatchService: IMatchService) {}

  findAll: RequestHandler = async (req, res) => {
    let matches = [];
    if (req.query.inProgress) {
      const inProgress = req.query.inProgress === 'true';
      matches = await this._MatchService.findWithWhere(inProgress);
    } else {
      matches = await this._MatchService.findAll();
    }
    return res.status(200).json(matches);
  };

  finishMatch: RequestHandler = async (req, res) => {
    await this._MatchService.finishMatch(Number(req.params.id));
    return res.status(200).json({ message: 'Finished' });
  };
}
