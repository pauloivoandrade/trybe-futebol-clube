import { RequestHandler } from 'express';
import ErrorGenerate from '../utils/errorGen';
import IUserService from '../Interfaces/IUserService';

export default class UserController {
  constructor(private _userService: IUserService) {}

  login: RequestHandler = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }

      const token = await this._userService.login(req.body);
      return res.status(200).json({ token });
    } catch (error) {
      // Verifique se o erro é uma instância da sua classe ErrorGenerate
      if (error instanceof ErrorGenerate) {
        return res.status(error.status).json({ message: error.message });
      }

      next(error);
    }
  };

  findRole: RequestHandler = async (req, res, next) => {
    try {
      const role = await this._userService.findRole(req.body.user.email);
      return res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  };
}
